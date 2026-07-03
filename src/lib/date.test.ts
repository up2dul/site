import { describe, expect, it } from "vitest";
import { formatDate, formatDateRange } from "./date";

describe("formatDate", () => {
  it("formats a date as month year", () => {
    expect(formatDate(new Date("2024-03-28"))).toBe("March 2024");
  });

  it("formats a date string as month year", () => {
    expect(formatDate("2024-03-28")).toBe("March 2024");
  });

  it("formats with short month option", () => {
    expect(formatDate(new Date("2024-03-28"), { month: "short" })).toBe(
      "Mar 2024"
    );
  });
});

describe("formatDateRange", () => {
  it("formats a date range with start and end", () => {
    expect(formatDateRange({ start: "2022-01-01", end: "2024-03-28" })).toBe(
      "Jan 2022 - Mar 2024"
    );
  });

  it("uses present as fallback when end is omitted", () => {
    expect(formatDateRange({ start: "2022-01-01" })).toBe("Jan 2022 - Present");
  });
});
