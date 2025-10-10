"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { CodeNode } from "@lexical/code";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
import { EditorState } from "lexical";
import { $generateHtmlFromNodes } from "@lexical/html";
import { ImageNode } from "./nodes/images-node";
import { ToolbarPlugin } from "./plugin/toolbar-plugin";
import { ClickableLinkPlugin } from "@lexical/react/LexicalClickableLinkPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { RestoreContent } from "./plugin/restore-content-plugin";
interface LexicalEditorProps {
  initialValue?: any;
  placeholder?: string;
  onChange?: (html: string, json: any) => void;
}

const theme = {
  paragraph: "mb-2",
  heading: {
    h1: "text-3xl font-bold mb-4",
    h2: "text-2xl font-bold mb-3",
    h3: "text-xl font-bold mb-2",
  },
  list: {
    ul: "list-disc list-inside mb-2",
    ol: "list-decimal list-inside mb-2",
    listitem: "ml-4",
  },
  link: "text-blue-600 dark:text-blue-400 underline cursor-pointer hover:text-blue-800 dark:hover:text-blue-300",
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through",
    code: "bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded font-mono text-sm",
  },
  image: "editor-image",
};

const URL_MATCHER =
  /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const MATCHERS = [
  (text: string) => {
    const match = URL_MATCHER.exec(text);
    if (match === null) {
      return null;
    }
    const fullMatch = match[0];
    return {
      index: match.index,
      length: fullMatch.length,
      text: fullMatch,
      url: fullMatch.startsWith("http") ? fullMatch : `https://${fullMatch}`,
    };
  },
];

export function LexicalEditor({
  initialValue,
  placeholder = "Enter text...",
  onChange,
}: LexicalEditorProps) {
  const initialConfig = {
    namespace: "ProductEditor",
    theme,
    onError: (error: Error) => {
      console.error(error);
    },
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      LinkNode,
      AutoLinkNode,
      ImageNode,
    ],
  };

  const styleToClassMap: Record<string, string> = {
    "text-align: center": "text-center",
    "text-align: left": "text-left",
    "text-align: right": "text-right",
    "font-weight: bold": "font-bold",
    "font-weight: normal": "font-normal",
    "font-style: italic": "italic",
    "text-decoration: underline": "underline",
    "margin-bottom: 0.5rem": "mb-2",
    "margin-bottom: 1rem": "mb-4",
    "margin-top: 0.5rem": "mt-2",
    "margin-top: 1rem": "mt-4",
    // add more mappings as needed
  };

  const convertStyleToClass = (style: string): string => {
    return style
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => styleToClassMap[s])
      .filter(Boolean)
      .join(" ");
  };
  const cleanHTML = (html: string): string => {
    return (
      html
        // 1. Convert inline styles to Tailwind classes
        .replace(
          /<(\w+)([^>]*)style="([^"]*)"([^>]*)>/g,
          (match, tag, before, style, after) => {
            const classFromStyle = convertStyleToClass(style);
            const existingClassMatch =
              (before + after).match(/class="([^"]*)"/)?.[1] || "";
            const classes = [existingClassMatch, classFromStyle].filter(
              Boolean
            );
            const newClass = classes.join(" ").trim();
            const beforeClean = (before + after)
              .replace(/\s*class="[^"]*"/, "")
              .trim();
            return `<${tag}${beforeClean ? " " + beforeClean : ""}${
              newClass ? ` class="${newClass}"` : ""
            }>`;
          }
        )

        // 2. Remove all formatting tags and keep only text
        .replace(/<\/?(b|strong|i|em|u)[^>]*>/g, "")

        // 3. Remove span wrappers
        .replace(/<span[^>]*>(.*?)<\/span>/g, "$1")

        // 4. Remove unnecessary wrapping <p> or <h> around <img>
        .replace(/<p[^>]*>\s*(<img[^>]+>)\s*<\/p>/g, "$1")
        .replace(/<h[1-6][^>]*>\s*(<img[^>]+>)\s*<\/h[1-6]>/g, "$1")

        // 5. Clean dir attributes and extra whitespace
        .replace(/\s+dir="[^"]*"/g, "")
        .replace(/\n\s*\n/g, "\n")
        .trim()
    );
  };

  const jsonStyleToClassMap: Record<string, string> = {
    center: "text-center",
    left: "text-left",
    right: "text-right",
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    "mb-2": "mb-2",
    "mb-4": "mb-4",
    "mt-2": "mt-2",
    "mt-4": "mt-4",
  };

  const textFormatToClassMap: Record<number, string> = {
    1: "font-bold", // example: bold
    2: "italic", // example: italic
    4: "underline", // example: underline
    // combine formats if using bitwise flags, adjust as per your Lexical setup
  };

  const assignClassesToJSON = (node: any): any => {
    if (!node) return null;

    const newNode = { ...node };
    const classes: string[] = [];

    // Paragraph or heading alignment
    if (newNode.format) {
      const alignmentClass = jsonStyleToClassMap[newNode.format];
      if (alignmentClass) classes.push(alignmentClass);
    }

    // Default paragraph / heading classes
    if (newNode.type === "paragraph") classes.push("mb-2");
    if (newNode.type === "heading") {
      if (newNode.tag === "h1") classes.push("text-3xl font-bold mb-4");
      if (newNode.tag === "h2") classes.push("text-2xl font-bold mb-3");
      if (newNode.tag === "h3") classes.push("text-xl font-bold mb-2");
    }

    // Pull text formatting from children
    if (Array.isArray(newNode.children)) {
      newNode.children.forEach((child: any) => {
        if (child.type === "text") {
          // Map numeric format to classes
          const formatClass = textFormatToClassMap[child.format];
          if (formatClass) classes.push(formatClass);
        }
      });

      newNode.children = newNode.children
        .map(assignClassesToJSON)
        .filter((child: any) => child != null);
    }

    if (classes.length > 0) {
      newNode.className = [...new Set(classes)].join(" ");
    }

    // Promote single image child if paragraph
    if (newNode.type === "paragraph" && newNode.children?.length === 1) {
      const child = newNode.children[0];
      if (child?.type === "image") return child;
    }

    return newNode;
  };

  const cleanJSON = (json: any): any => {
    if (!json) return null;
    const cleaned = JSON.parse(JSON.stringify(json));

    const removeEmptyFields = (obj: any): any => {
      if (Array.isArray(obj)) {
        return obj
          .map(removeEmptyFields)
          .filter((item) => item !== null && item !== undefined);
      }

      if (obj && typeof obj === "object") {
        const cleanedObj: any = {};
        for (const key of Object.keys(obj)) {
          if (key === "children" && Array.isArray(obj[key])) {
            cleanedObj[key] = obj[key]
              .map(removeEmptyFields)
              .filter((item: any) => item !== null);
          } else if (
            key === "text" ||
            key === "type" ||
            key === "version" ||
            key === "tag" ||
            key === "url" ||
            key === "src" ||
            key === "altText" ||
            key === "width" ||
            key === "height" ||
            key === "format" ||
            key === "indent" ||
            key === "direction"
          ) {
            cleanedObj[key] = obj[key];
          } else if (obj[key] && typeof obj[key] === "object") {
            const cleaned = removeEmptyFields(obj[key]);
            if (Object.keys(cleaned).length > 0) {
              cleanedObj[key] = cleaned;
            }
          } else if (
            obj[key] !== null &&
            obj[key] !== undefined &&
            obj[key] !== ""
          ) {
            cleanedObj[key] = obj[key];
          }
        }
        return cleanedObj;
      }

      return obj;
    };

    return removeEmptyFields(cleaned);
  };

  const handleChange = (editorState: EditorState, editor: any) => {
    editorState.read(() => {
      let htmlString = $generateHtmlFromNodes(editor, null);
      htmlString = cleanHTML(htmlString);

      const jsonString = editorState.toJSON();
      const cleanedJSON = cleanJSON(jsonString);
      if (onChange) {
        onChange(htmlString, cleanedJSON);
      }
    });
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="relative border border-gray-300 rounded-lg overflow-hidden bg-white dark:bg-gray-950 dark:border-gray-700">
        <ToolbarPlugin />
        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="min-h-[150px] p-4 outline-none text-sm" />
            }
            placeholder={
              <div className="absolute top-4 left-4 text-gray-400 pointer-events-none text-sm">
                {placeholder}
              </div>
            }
            ErrorBoundary={(props: any) => <div>{props.children}</div>}
          />
          <OnChangePlugin onChange={handleChange} />
          <AutoFocusPlugin />
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin
            validateUrl={(url) => {
              return /^(?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(
                url
              );
            }}
          />
          <AutoLinkPlugin matchers={MATCHERS} />
          <ClickableLinkPlugin />
          <RestoreContent initialValue={initialValue} />
        </div>
      </div>
    </LexicalComposer>
  );
}
