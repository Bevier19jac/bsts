import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SolutionsOverview } from "@/components/marketing/SolutionsOverview";
import { commercialSolutions } from "@/lib/content/commercial";

describe("SolutionsOverview", () => {
  it("renders every solution card as a link to its data href", () => {
    render(<SolutionsOverview />);

    for (const solution of commercialSolutions) {
      const link = screen.getByRole("link", { name: solution.title });
      expect(link).toHaveAttribute("href", solution.href);
    }
  });

  it("toggles each card disclosure without changing the card link", () => {
    render(<SolutionsOverview />);

    const buttons = screen.getAllByRole("button", { name: "Show details" });

    commercialSolutions.forEach((solution, index) => {
      const link = screen.getByRole("link", { name: solution.title });
      const button = buttons[index];
      const details = screen.getByText(solution.details);

      expect(button).toHaveAttribute("aria-expanded", "false");
      expect(details).not.toBeVisible();
      expect(link).toHaveAttribute("href", solution.href);

      fireEvent.click(button);

      expect(button).toHaveAttribute("aria-expanded", "true");
      expect(details).toBeVisible();
      expect(link).toHaveAttribute("href", solution.href);

      fireEvent.click(button);

      expect(button).toHaveAttribute("aria-expanded", "false");
      expect(details).not.toBeVisible();
    });
  });
});
