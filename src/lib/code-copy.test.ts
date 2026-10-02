import { afterEach, describe, expect, it, vi } from "vitest";
import { setupCodeCopy } from "./code-copy";

function fixture() {
  document.body.innerHTML = `<div class="code-block"><div><button data-code-copy hidden><span data-copy-label>Copy</span></button><span data-copy-status role="status"></span></div><pre><code>  hello\nworld\n</code></pre></div>`;
  return document.querySelector<HTMLButtonElement>("button")!;
}

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  document.body.innerHTML = "";
});

describe("code copy", () => {
  it("copies original source, announces success, and resets after two seconds", async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    const button = fixture();
    document.querySelector("pre")!.dataset.code = "  original\n\n";
    setupCodeCopy();
    setupCodeCopy();
    expect(button.hidden).toBe(false);
    button.click();
    await vi.waitFor(() => expect(button.textContent).toBe("Copied"));
    expect(writeText).toHaveBeenCalledExactlyOnceWith("  original\n\n");
    expect(document.querySelector('[role="status"]')?.textContent).toBe(
      "Code copied to clipboard."
    );
    vi.advanceTimersByTime(2000);
    expect(button.textContent).toBe("Copy");
    expect(button.dataset.copied).toBeUndefined();
  });

  it("copies text content when no Shiki metadata exists", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    const button = fixture();
    setupCodeCopy();
    button.click();
    await vi.waitFor(() =>
      expect(writeText).toHaveBeenCalledExactlyOnceWith("  hello\nworld\n")
    );
  });

  it("announces failure when clipboard access is denied", async () => {
    vi.useFakeTimers();
    vi.stubGlobal("navigator", {
      clipboard: { writeText: vi.fn().mockRejectedValue(new Error("denied")) },
    });
    const button = fixture();
    setupCodeCopy();
    button.click();
    await vi.waitFor(() => expect(button.textContent).toBe("Copy failed"));
    expect(document.querySelector('[role="status"]')?.textContent).toContain(
      "copy it manually"
    );
    vi.advanceTimersByTime(2000);
    expect(button.textContent).toBe("Copy");
  });
});
