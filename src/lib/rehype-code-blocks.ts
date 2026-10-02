type Node = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: Node[];
};

// Shiki replaces the original code node before rehype plugins run.
export const codeBlockMetadata = {
  name: "code-block-metadata",
  pre(this: { options: { lang: string }; source: string }, node: Node) {
    node.properties ??= {};
    node.properties.dataLanguage = this.options.lang;
    node.properties.dataCode = this.source;
  },
};

const names: Record<string, string> = {
  bash: "Bash",
  sh: "Shell",
  shell: "Shell",
  shellscript: "Shell",
  js: "JavaScript",
  javascript: "JavaScript",
  jsx: "JSX",
  ts: "TypeScript",
  typescript: "TypeScript",
  tsx: "TSX",
  json: "JSON",
  html: "HTML",
  css: "CSS",
  yaml: "YAML",
  yml: "YAML",
  md: "Markdown",
  markdown: "Markdown",
  python: "Python",
  py: "Python",
  text: "Plain text",
  txt: "Plain text",
  plaintext: "Plain text",
};

function element(
  tagName: string,
  properties: Record<string, unknown>,
  children: Node[]
): Node {
  return { type: "element", tagName, properties, children };
}

function text(value: string): Node {
  return { type: "text", value };
}

function icon(check = false): Node {
  return element(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.5,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      ariaHidden: "true",
      className: [check ? "code-copy-check" : "code-copy-icon"],
    },
    check
      ? [
          element("path", { d: "m9 12 2 2 4-4" }, []),
          element("rect", { x: 3, y: 3, width: 18, height: 18, rx: 2 }, []),
        ]
      : [
          element("rect", { x: 9, y: 9, width: 13, height: 13, rx: 2 }, []),
          element(
            "path",
            { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" },
            []
          ),
        ]
  );
}

export function rehypeCodeBlocks() {
  return (tree: Node): void => {
    function walk(node: Node): void {
      if (!node.children) return;
      node.children = node.children.map((child) => {
        if (child.tagName !== "pre") {
          walk(child);
          return child;
        }
        const code = child.children?.find((entry) => entry.tagName === "code");
        if (!code) return child;
        const classes = code.properties?.className;
        const classList = Array.isArray(classes)
          ? classes
          : String(classes ?? "").split(" ");
        const language = String(
          child.properties?.dataLanguage ??
            classList
              .find((value: string) => value.startsWith("language-"))
              ?.slice(9) ??
            "plaintext"
        );
        const label = names[language] ?? language;
        child.properties = {
          ...child.properties,
          tabIndex: 0,
          ariaLabel: `${label} code`,
        };
        return element("div", { className: ["code-block"] }, [
          element("div", { className: ["code-block-bar", "not-typeset"] }, [
            element("span", { className: ["code-block-language"] }, [
              text(label),
            ]),
            element(
              "button",
              {
                type: "button",
                className: ["code-copy"],
                dataCodeCopy: "",
                hidden: true,
                ariaLabel: `Copy ${label} code`,
              },
              [
                icon(),
                icon(true),
                element("span", { dataCopyLabel: "" }, [text("Copy")]),
              ]
            ),
            element(
              "span",
              {
                className: ["sr-only"],
                role: "status",
                ariaLive: "polite",
                ariaAtomic: "true",
                dataCopyStatus: "",
              },
              []
            ),
          ]),
          child,
        ]);
      });
    }
    walk(tree);
  };
}
