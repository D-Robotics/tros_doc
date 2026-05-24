/**
 * Wrap markdown tables in a scroll container so wide tables stay within
 * the article column and scroll horizontally when needed.
 */
export default function rehypeWrapTables() {
  return (tree) => {
    wrapTablesInNode(tree);
  };
}

function wrapTablesInNode(node) {
  if (!node?.children?.length) {
    return;
  }

  node.children = node.children.flatMap((child) => {
    if (child.type === "element" && child.tagName === "table") {
      return [
        {
          type: "element",
          tagName: "div",
          properties: {
            className: ["table-responsive"],
          },
          children: [child],
        },
      ];
    }

    wrapTablesInNode(child);
    return [child];
  });
}
