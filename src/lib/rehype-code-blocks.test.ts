import { createMarkdownProcessor } from "@astrojs/markdown-remark";
import { describe, expect, it } from "vitest";
import { codeBlockMetadata, rehypeCodeBlocks } from "./rehype-code-blocks";

describe("code block rendering", () => {
  it("preserves highlighted code and source while adding an accessible toolbar", async () => {
    const processor = await createMarkdownProcessor({
      rehypePlugins: [rehypeCodeBlocks],
      shikiConfig: { transformers: [codeBlockMetadata] },
    });
    const { code } = await processor.render(
      '```javascript\n  const value = "<hello>";\n```\n\nInline `code`.'
    );
    document.body.replaceChildren(
      ...new DOMParser().parseFromString(code, "text/html").body.childNodes
    );
    expect(document.querySelectorAll(".code-block")).toHaveLength(1);
    expect(document.querySelector(".code-block-language")?.textContent).toBe(
      "JavaScript"
    );
    expect(document.querySelector("pre")?.dataset.code).toBe(
      '  const value = "<hello>";'
    );
    expect(document.querySelector("pre code .line")).not.toBeNull();
    expect(document.querySelector("button")?.getAttribute("aria-label")).toBe(
      "Copy JavaScript code"
    );
    expect(document.querySelector("button")?.hidden).toBe(true);
    expect(document.querySelector("p code")?.textContent).toBe("code");
  });

  it("labels untagged and text fences as Plain text and does not double-wrap", async () => {
    const processor = await createMarkdownProcessor({
      rehypePlugins: [rehypeCodeBlocks],
    });
    const { code } = await processor.render(
      "```\nhello\n```\n\n```text\nworld\n```"
    );
    document.body.replaceChildren(
      ...new DOMParser().parseFromString(code, "text/html").body.childNodes
    );
    expect(
      Array.from(
        document.querySelectorAll(".code-block-language"),
        (node) => node.textContent
      )
    ).toEqual(["Plain text", "Plain text"]);
  });
});
