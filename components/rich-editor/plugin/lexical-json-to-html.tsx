export function formatLexicalToHtml(json: any) {
  if (!json?.root?.children) return "";

  const parseNode = (node: any) => {
    if (!node) return "";

    switch (node.type) {
      case "root":
        return node.children.map(parseNode).join("");

      case "heading": {
        const align =
          node.format === "center"
            ? "text-center"
            : node.format === "right"
            ? "text-right"
            : "";
        const tag = node.tag || "h2";
        return `<${tag} class="text-3xl font-bold mb-4 ${align}">${node.children
          .map(parseNode)
          .join("")}</${tag}>`;
      }

      case "paragraph": {
        // Skip empty <p> if contains only <figure>
        const inner = node.children.map(parseNode).join("");
        if (/^<figure[\s\S]*<\/figure>$/.test(inner.trim())) return inner;
        const align = node.format === "center" ? "text-center" : "";
        return `<p class="mb-2 ${align}">${inner}</p>`;
      }

      case "text": {
        let text = node.text
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");

        const bold = node.format & 1;
        const italic = node.format & 2;
        const underline = node.format & 4;

        if (bold) text = `<strong class="font-bold">${text}</strong>`;
        if (italic) text = `<em class="italic">${text}</em>`;
        if (underline) text = `<u>${text}</u>`;

        return text;
      }

      case "link": {
        const href = node.url?.startsWith("http")
          ? node.url
          : `https://${node.url}`;
        const rel = node.rel || "noreferrer";
        const linkContent = node.children.map(parseNode).join("");
        return `<a href="${href}" rel="${rel}" class="text-blue-600 dark:text-blue-400 underline cursor-pointer hover:text-blue-800 dark:hover:text-blue-300">${linkContent}</a>`;
      }

      case "image": {
        const { src, altText, width, height } = node;
        return `<figure class="text-center mb-2"><img src="${src}" alt="${
          altText || "image"
        }" width="${width || ""}" height="${
          height || ""
        }" class="rounded max-w-full h-auto"></figure>`;
      }

      case "list":
        const listClass =
          node.listType === "number"
            ? "list-decimal list-inside mb-2"
            : "list-disc list-inside mb-2";
        const tag = node.listType === "number" ? "ol" : "ul";
        return `<${tag} class="${listClass}">${node.children
          .map(parseNode)
          .join("")}</${tag}>`;

      case "listitem":
        return `<li class="ml-4">${node.children.map(parseNode).join("")}</li>`;

      default:
        return node.children?.map(parseNode).join("") || "";
    }
  };

  // Clean nested duplicates (e.g., <strong><strong>...</strong></strong>)
  let html = parseNode(json.root);
  html = html.replace(
    /<(strong|em|u)[^>]*>\s*<\1[^>]*>(.*?)<\/\1>\s*<\/\1>/g,
    "<$1>$2</$1>"
  );
  html = html.replace(/\s+/g, " "); // minify

  return html.trim();
}
