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
import { ImageNode } from "./nodes/images-node";
import { ToolbarPlugin } from "./plugin/toolbar-plugin";
import { ClickableLinkPlugin } from "@lexical/react/LexicalClickableLinkPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { RestoreContent } from "./plugin/restore-content-plugin";
import { formatLexicalToHtml } from "./plugin/lexical-json-to-html";
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
  quote:
    "relative border-l-4 border-gray-400 dark:border-gray-600 pl-5 pr-4 py-3 italic text-gray-700 dark:text-gray-300 text-base font-medium my-3 bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-50 dark:bg-gray-900 rounded-md shadow-sm before:absolute before:-top-1 before:left-0 before:text-4xl before:text-gray-400 dark:before:text-gray-500 before:font-serif before:content-['“']",
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

  let debounceTimeout: NodeJS.Timeout;

  const handleChange = (editorState: EditorState, editor: any) => {
    if (debounceTimeout) clearTimeout(debounceTimeout);

    // Set a new timeout
    debounceTimeout = setTimeout(() => {
      editorState.read(() => {
        const jsonString = editorState.toJSON();
        const htmlString = formatLexicalToHtml(jsonString);
        if (onChange) onChange(htmlString, jsonString);
      });
    }, 300);
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
