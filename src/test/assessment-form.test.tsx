import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AssessmentForm } from "@/components/assessment/AssessmentForm";

describe("AssessmentForm", () => {
  it("renders step one with the progress indicator", () => {
    render(<AssessmentForm />);
    expect(screen.getByRole("heading", { name: "About you" })).toBeInTheDocument();
    expect(screen.getByLabelText("Assessment progress")).toBeInTheDocument();
    expect(screen.getByLabelText("Your name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Organization")).toBeInTheDocument();
  });

  it("blocks progress and announces accessible errors on empty submit", async () => {
    render(<AssessmentForm />);
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));
    await waitFor(() => {
      expect(screen.getAllByRole("alert").length).toBeGreaterThanOrEqual(1);
    });
    // Still on step one.
    expect(screen.getByRole("heading", { name: "About you" })).toBeInTheDocument();
  });

  it("advances to step two once step-one fields validate", async () => {
    render(<AssessmentForm />);
    fireEvent.change(screen.getByLabelText("Your name"), {
      target: { value: "Avery Example" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "avery@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Organization"), {
      target: { value: "Example House" },
    });
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Your operation" }),
      ).toBeInTheDocument();
    });
  });

  it("keeps the back button disabled on the first step", () => {
    render(<AssessmentForm />);
    expect(screen.getByRole("button", { name: /back/i })).toBeDisabled();
  });
});
