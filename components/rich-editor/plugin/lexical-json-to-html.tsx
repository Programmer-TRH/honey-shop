export const formatLexicalToHtml = (json: any): string => {
  const formatMap: Record<number, string> = {
    1: "font-bold", // bold
    2: "italic", // italic
    4: "line-through", // strikethrough
    8: "underline", // underline
  };

  const linkClasses =
    "text-blue-600 dark:text-blue-400 underline cursor-pointer hover:text-blue-800 dark:hover:text-blue-300";

  const processText = (node: any) => {
    if (!node.text) return "";
    const classes = Object.entries(formatMap)
      .filter(([key]) => (node.format & Number(key)) > 0)
      .map(([, cls]) => cls);
    return classes.length
      ? `<span class="${[...new Set(classes)].join(" ")}">${node.text}</span>`
      : node.text;
  };

  const processNode = (node: any, parentAlignment?: string): string => {
    const alignmentClass =
      node.format === "center" ? "text-center" : parentAlignment || "";

    switch (node.type) {
      case "image": {
        // If the node is centered, add mx-auto to the img
        const imgClass = `rounded max-w-full h-auto${
          alignmentClass ? " mx-auto" : ""
        }`;
        return `<figure class="mb-2"><img src="${node.src}" alt="${
          node.altText || "Image"
        }" width="${node.width}" height="${
          node.height
        }" class="${imgClass}"></figure>`;
      }

      case "list": {
        const tag = node.listType === "number" ? "ol" : "ul";
        const listClass =
          node.listType === "number"
            ? "list-decimal list-inside mb-2"
            : "list-disc list-inside mb-2";

        // use list.format for alignment
        const alignmentClass = node.format === "center" ? "text-center" : "";

        const items = node.children
          .map((li: any) => {
            // use listitem.format or fallback to list.format
            const liAlignmentClass =
              li.format === "center" ? "text-center" : alignmentClass;
            const liContent = li.children.map(processNode).join("");
            return `<li class="ml-4 ${liAlignmentClass}">${liContent}</li>`;
          })
          .join("");

        return `<${tag} class="${listClass} ${alignmentClass}">${items}</${tag}>`;
      }

      case "quote": {
        const inner = node.children.map(processNode).join("");
        const alignmentClass =
          node.format === "center"
            ? "text-center"
            : node.format === "right"
            ? "text-right"
            : "text-left";
        return `<blockquote class="relative border-l-4 border-gray-400 dark:border-gray-600 pl-5 pr-4 py-3 italic text-gray-700 dark:text-gray-300 text-base font-medium my-3 bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-50 dark:bg-gray-900 rounded-md shadow-sm before:absolute before:-top-1 before:left-0 before:text-4xl before:text-gray-400 dark:before:text-gray-500 before:font-serif before:content-['“'] ${alignmentClass}">${inner}</blockquote>`;
      }

      case "paragraph": {
        // Process children
        const inner = node.children
          .map((child: any) => processNode(child, alignmentClass))
          .join("");

        // If paragraph is empty, preserve spacing with &nbsp;
        if (!inner) {
          return `<p class="mb-2 ${alignmentClass}">&nbsp;</p>`;
        }

        // If paragraph has only an image, delegate
        if (node.children.length === 1 && node.children[0].type === "image") {
          return processNode(node.children[0], alignmentClass);
        }

        return `<p class="mb-2 ${alignmentClass}">${inner}</p>`;
      }

      case "heading":
        const hInner = node.children
          .map((child: any) => processNode(child, alignmentClass))
          .join("");
        const tagH = node.tag || "h1";
        return `<${tagH} class="text-3xl font-bold mb-4 ${alignmentClass}">${hInner}</${tagH}>`;

      case "text":
        return processText(node);

      case "link":
        const linkInner = node.children
          .map((child: any) => processNode(child, alignmentClass))
          .join("");
        const href = node.url?.startsWith("http")
          ? node.url
          : `https://${node.url}`;
        return `<a href="${href}" rel="noreferrer" class="${linkClasses}">${linkInner}</a>`;

      default: {
        if (node.children) {
          const inner = node.children
            .map((child: any) => processNode(child, alignmentClass))
            .join("");
          // Preserve empty text nodes
          if (!inner) {
            return `<p class="mb-2 ${alignmentClass}">&nbsp;</p>`;
          }
          return inner;
        }
        return "&nbsp;"; // fallback for completely empty nodes
      }
    }
  };

  return json.root.children.map(processNode).join("");
};
