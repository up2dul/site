export function setupCodeCopy(root: ParentNode = document): void {
  for (const button of root.querySelectorAll<HTMLButtonElement>(
    "[data-code-copy]"
  )) {
    if (button.dataset.copyReady) continue;
    const block = button.closest(".code-block");
    const pre = block?.querySelector("pre");
    const code = pre?.querySelector("code");
    const label = button.querySelector("[data-copy-label]");
    const status = block?.querySelector("[data-copy-status]");
    if (!pre || !code || !label || !status) continue;
    button.dataset.copyReady = "true";
    button.hidden = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let pending = false;
    button.addEventListener("click", async () => {
      if (pending) return;
      pending = true;
      clearTimeout(timer);
      status.textContent = "";
      try {
        await navigator.clipboard.writeText(
          pre.dataset.code ?? code.textContent ?? ""
        );
        button.dataset.copied = "true";
        label.textContent = "Copied";
        status.textContent = "Code copied to clipboard.";
      } catch {
        delete button.dataset.copied;
        label.textContent = "Copy failed";
        status.textContent =
          "Copy failed. Select the code and copy it manually.";
      } finally {
        pending = false;
        timer = setTimeout(() => {
          delete button.dataset.copied;
          label.textContent = "Copy";
          status.textContent = "";
        }, 2000);
      }
    });
  }
}
