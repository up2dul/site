type HastNode = {
  type?: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

type VFile = {
  path?: string;
};

function linkWritingImages(
  node: HastNode,
  counter: { value: number },
  insideLink = false
): void {
  if (!node.children) return;

  const nextChildren: HastNode[] = [];

  for (const child of node.children) {
    const childIsLink = child.type === "element" && child.tagName === "a";

    if (
      !insideLink &&
      child.type === "element" &&
      child.tagName === "img" &&
      typeof child.properties?.src === "string"
    ) {
      counter.value += 1;
      const alt =
        typeof child.properties.alt === "string"
          ? child.properties.alt.trim()
          : "";
      nextChildren.push({
        type: "element",
        tagName: "a",
        properties: {
          href: child.properties.src,
          dataLightboxTrigger: "",
          ariaLabel: alt ? undefined : `Open image ${counter.value}`,
        },
        children: [child],
      });
      continue;
    }

    linkWritingImages(child, counter, insideLink || childIsLink);
    nextChildren.push(child);
  }

  node.children = nextChildren;
}

export function rehypeLinkedWritingImages() {
  return (tree: HastNode, file: VFile): void => {
    if (!file.path?.includes("/src/content/writings/")) return;
    linkWritingImages(tree, { value: 0 });
  };
}
