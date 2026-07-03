import { describe, expect, it } from "vitest";
import { calculateReadingTime } from "./reading-time";

describe("calculateReadingTime", () => {
  it("returns 1 min for empty content", () => {
    expect(calculateReadingTime("")).toBe("1 min read");
  });

  it("returns 1 min for content under word threshold", () => {
    const content = "word ".repeat(199).trim();
    expect(calculateReadingTime(content)).toBe("1 min read");
  });

  it("rounds up to nearest minute", () => {
    const content = "word ".repeat(250).trim();
    expect(calculateReadingTime(content)).toBe("2 min read");
  });

  it("uses custom words per minute", () => {
    const content = "word ".repeat(400).trim();
    expect(calculateReadingTime(content, 200)).toBe("2 min read");
  });

  it("ignores markdown syntax when counting words", () => {
    const content = "# Heading\n\nThis is **bold** and _italic_ text.";
    expect(calculateReadingTime(content)).toBe("1 min read");
  });
});
