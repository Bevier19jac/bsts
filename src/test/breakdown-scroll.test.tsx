/**
 * The Bevier Breakdown swaps its panel content in place. On a phone the panel
 * is taller than the viewport, so without an explicit scroll the reader is
 * left wherever they happened to be — commonly halfway down the next
 * question, sometimes past its heading entirely.
 *
 * These tests pin the behaviour rather than the implementation: after every
 * deliberate step, the panel that is now on screen must have been scrolled to
 * its start, and its heading must have taken focus without a competing second
 * scroll. Choosing an answer must NOT move the page.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BevierBreakdown } from "@/components/assessment/BevierBreakdown";

type ScrollCall = { target: Element; options: ScrollIntoViewOptions | undefined };

let calls: ScrollCall[] = [];
let reduceMotion = false;

beforeEach(() => {
  calls = [];
  reduceMotion = false;

  // jsdom implements neither of these.
  Element.prototype.scrollIntoView = function (
    this: Element,
    options?: boolean | ScrollIntoViewOptions,
  ) {
    calls.push({
      target: this,
      options: typeof options === "object" ? options : undefined,
    });
  };

  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: query.includes("prefers-reduced-motion") ? reduceMotion : false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }));
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

const last = () => calls[calls.length - 1];

/** The heading of whichever panel is currently rendered. */
function heading(): HTMLElement {
  const el = document.querySelector<HTMLElement>("[data-breakdown-heading]");
  if (!el) throw new Error("no Breakdown heading is rendered");
  return el;
}

/** Assert the most recent scroll landed on the panel wrapping `kind`. */
async function expectLandedOn(kind: "question" | "review" | "result") {
  await waitFor(() => {
    expect(heading().dataset.breakdownHeading).toBe(kind);
    expect(calls.length).toBeGreaterThan(0);
  });
  await waitFor(() => {
    expect(last().target.contains(heading())).toBe(true);
  });
  expect(last().options?.block).toBe("start");
  expect(heading()).toHaveFocus();
}

/** Answer the visible question with its first choice, then press Continue. */
async function answerAndContinue() {
  const prompt = heading().textContent;
  const choices = screen.getAllByRole("button", { pressed: false });
  fireEvent.click(choices[0]);
  const forward = screen.getByRole("button", {
    name: /continue|see what we found/i,
  });
  await waitFor(() => expect(forward).not.toBeDisabled());
  fireEvent.click(forward);
  // Wait for the panel to actually turn over.
  await waitFor(() => expect(heading().textContent).not.toBe(prompt));
}

describe("Bevier Breakdown step navigation", () => {
  it("does not scroll on first render", () => {
    render(<BevierBreakdown />);
    expect(calls).toHaveLength(0);
    expect(heading().dataset.breakdownHeading).toBe("question");
  });

  it("does not scroll when an answer is selected", () => {
    render(<BevierBreakdown />);
    fireEvent.click(screen.getAllByRole("button", { pressed: false })[0]);
    expect(calls).toHaveLength(0);
  });

  it("question to question: Continue lands at the start of the next question", async () => {
    render(<BevierBreakdown />);
    const first = heading().textContent;
    await answerAndContinue();
    await expectLandedOn("question");
    expect(heading().textContent).not.toBe(first);
  });

  it("Back lands at the start of the previous question", async () => {
    render(<BevierBreakdown />);
    const first = heading().textContent;
    await answerAndContinue();
    calls = [];

    fireEvent.click(screen.getByRole("button", { name: /back/i }));
    await waitFor(() => expect(heading().textContent).toBe(first));
    await expectLandedOn("question");
  });

  it("the final forward step lands at the top of the results panel", async () => {
    render(<BevierBreakdown />);

    // Walk the whole questionnaire. The bound is a guard, not a count.
    for (let i = 0; i < 40; i += 1) {
      if (heading().dataset.breakdownHeading !== "question") break;
      await answerAndContinue();
    }
    await expectLandedOn("review");

    calls = [];
    fireEvent.click(screen.getByRole("button", { name: /show my Breakdown/i }));
    await expectLandedOn("result");
  });

  it("Restart lands at the start of the first question", async () => {
    render(<BevierBreakdown />);
    const first = heading().textContent;

    for (let i = 0; i < 40; i += 1) {
      if (heading().dataset.breakdownHeading !== "question") break;
      await answerAndContinue();
    }
    fireEvent.click(screen.getByRole("button", { name: /show my Breakdown/i }));
    await waitFor(() =>
      expect(heading().dataset.breakdownHeading).toBe("result"),
    );

    calls = [];
    fireEvent.click(screen.getByRole("button", { name: /start over/i }));
    await waitFor(() => expect(heading().textContent).toBe(first));
    await expectLandedOn("question");
  });

  it("animates the step by default and jumps instantly under reduced motion", async () => {
    render(<BevierBreakdown />);
    await answerAndContinue();
    await waitFor(() => expect(calls.length).toBeGreaterThan(0));
    expect(last().options?.behavior).toBe("smooth");

    reduceMotion = true;
    calls = [];
    await answerAndContinue();
    await waitFor(() => expect(calls.length).toBeGreaterThan(0));
    expect(last().options?.behavior).toBe("instant");
  });

  it("reserves room for the sticky header on every panel", () => {
    render(<BevierBreakdown />);
    const panel = heading().closest("[class*='scroll-mt-']");
    expect(panel).not.toBeNull();
    expect(panel!.className).toContain("scroll-mt-24");
    expect(panel!.className).toContain("sm:scroll-mt-28");
  });
});
