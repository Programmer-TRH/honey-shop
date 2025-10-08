"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $isLinkNode } from "@lexical/link";
import { useEffect } from "react";

export function ClickableLinkPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (target.tagName === "A") {
        event.preventDefault();
        const href = target.getAttribute("href");
        if (href) {
          window.open(href, "_blank", "noopener,noreferrer");
        }
        return;
      }

      editor.getEditorState().read(() => {
        const domSelection = window.getSelection();
        if (!domSelection || domSelection.rangeCount === 0) {
          return;
        }

        const range = domSelection.getRangeAt(0);
        const node = range.startContainer;
        let element: HTMLElement | null =
          node.nodeType === Node.TEXT_NODE
            ? node.parentElement
            : (node as HTMLElement);

        while (element) {
          if (element.tagName === "A") {
            event.preventDefault();
            const href = element.getAttribute("href");
            if (href) {
              window.open(href, "_blank", "noopener,noreferrer");
            }
            break;
          }
          element = element.parentElement;
        }
      });
    };

    const editorElement = editor.getRootElement();
    if (editorElement) {
      editorElement.addEventListener("click", handleClick);
      return () => {
        editorElement.removeEventListener("click", handleClick);
      };
    }
  }, [editor]);

  return null;
}
