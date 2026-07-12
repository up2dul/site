import { describe, expect, it } from "vitest";
import { estimateReadingMinutes, formatReadingTime } from "./reading-time";

describe("estimateReadingMinutes", () => {
  it("returns 0 for undefined content", () => {
    expect(estimateReadingMinutes(undefined)).toBe(0);
  });

  it("returns 0 for empty string", () => {
    expect(estimateReadingMinutes("")).toBe(0);
  });

  it("returns 0 for markdown-only content", () => {
    expect(estimateReadingMinutes("# **_`_**")).toBe(0);
  });

  it("returns 1 for content under word threshold", () => {
    const content = "word ".repeat(199).trim();
    expect(estimateReadingMinutes(content)).toBe(1);
  });

  it("rounds up to nearest minute", () => {
    const content = "word ".repeat(250).trim();
    expect(estimateReadingMinutes(content)).toBe(2);
  });

  it("uses custom words per minute", () => {
    const content = "word ".repeat(400).trim();
    expect(estimateReadingMinutes(content, 200)).toBe(2);
  });

  it("ignores markdown syntax when counting words", () => {
    const content = "# Heading\n\nThis is **bold** and _italic_ text.";
    expect(estimateReadingMinutes(content)).toBe(1);
  });
});

describe("formatReadingTime", () => {
  it("returns empty string for 0 minutes", () => {
    expect(formatReadingTime(0)).toBe("");
  });

  it("formats 1 minute", () => {
    expect(formatReadingTime(1)).toBe("1 min read");
  });

  it("formats multiple minutes", () => {
    expect(formatReadingTime(5)).toBe("5 min read");
  });
});

describe("estimateReadingMinutes + formatReadingTime", () => {
  it("composes correctly for typical content", () => {
    const content = "word ".repeat(250).trim();
    const minutes = estimateReadingMinutes(content);
    expect(formatReadingTime(minutes)).toBe("2 min read");
  });

  it("composes correctly for undefined content", () => {
    const minutes = estimateReadingMinutes(undefined);
    expect(formatReadingTime(minutes)).toBe("");
  });
});
