"use client";
import { useState, useEffect, useRef } from "react";
import { SerializedEditorState, createEditor } from "lexical";
import { $generateHtmlFromNodes } from "@lexical/html";
import { Editor } from "../blocks/editor-x/editor";
import { nodes } from "../blocks/editor-x/nodes";

function debounce<F extends (...args: any[]) => void>(fn: F, delay = 300) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

const lastHTMLCache: { [key: string]: string } = {};

export const defaultLexicalState = {
  root: {
    type: "root",
    version: 1,
    children: [
      {
        type: "paragraph",
        version: 1,
        children: [],
        direction: "ltr",
        format: "",
        indent: 0,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
  },
} as unknown as SerializedEditorState;

const generateHtmlFromNodesDebounced = (editorRef: any) =>
  debounce(
    (
      editorStateJson: SerializedEditorState,
      callback: (html: string) => void
    ) => {
      // Use persistent editor
      const editor = editorRef.current;
      const state = editor.parseEditorState(editorStateJson);
      editor.setEditorState(state);

      let html = "";
      editor.update(() => {
        html = $generateHtmlFromNodes(editor, null);
      });
      console.log("HTML:", html);
      const key = JSON.stringify(editorStateJson);
      if (lastHTMLCache[key] !== html) {
        lastHTMLCache[key] = html;
        callback(html);
      }
    },
    500
  );

export default function AddProductEditor({
  value,
  onChange,
  placeholder,
}: {
  value?: SerializedEditorState;
  onChange?: (json: SerializedEditorState, html: string) => void;
  placeholder?: string;
}) {
  const [editorState, setEditorState] = useState<SerializedEditorState>(
    value || defaultLexicalState
  );

  // Persistent editor instance
  const editorRef = useRef(createEditor({ nodes }));
  const debouncedHtml = useRef(generateHtmlFromNodesDebounced(editorRef));

  useEffect(() => {
    if (value) setEditorState(value);
  }, [value]);

  const handleSerializedChange = (json: SerializedEditorState) => {
    setEditorState(json);

    // Generate HTML debounced asynchronously
    debouncedHtml.current(json, (html) => {
      onChange?.(json, html);
    });
  };

  return (
    <Editor
      placeholder={placeholder}
      editorSerializedState={editorState}
      onSerializedChange={handleSerializedChange}
    />
  );
}
