import { useEffect } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { Bold, Italic, List, ListOrdered, Heading2, Quote } from "lucide-react";
import {
  FORMAT_TEXT_COMMAND,
  INSERT_PARAGRAPH_COMMAND,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  KEY_ENTER_COMMAND,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
} from "@lexical/list";

const theme = {
  paragraph: "mb-2",
  heading: {
    h2: "text-xl font-bold mb-3 mt-4",
    h3: "text-lg font-semibold mb-2 mt-3",
  },
  list: {
    ul: "list-disc list-inside ml-4 mb-2",
    ol: "list-decimal list-inside ml-4 mb-2",
    listitem: "mb-1",
  },
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
  },
  quote: "border-l-4 border-gray-300 pl-4 italic my-3",
};

function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const formatBold = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
  };

  const formatItalic = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
  };

  const formatHeading = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode("h2"));
      }
    });
  };

  const formatBulletList = () => {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  };

  const formatNumberedList = () => {
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
  };

  const formatQuote = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createQuoteNode());
      }
    });
  };

  return (
    <div className="flex gap-1 p-2 border-b border-gray-200 bg-gray-50 rounded-t-lg flex-wrap">
      <button
        type="button"
        onClick={formatBold}
        className="p-2 hover:bg-gray-200 rounded transition-colors"
        title="Bold"
      >
        <Bold size={18} />
      </button>
      <button
        type="button"
        onClick={formatItalic}
        className="p-2 hover:bg-gray-200 rounded transition-colors"
        title="Italic"
      >
        <Italic size={18} />
      </button>
      <div className="w-px bg-gray-300 mx-1"></div>
      <button
        type="button"
        onClick={formatHeading}
        className="p-2 hover:bg-gray-200 rounded transition-colors"
        title="Heading"
      >
        <Heading2 size={18} />
      </button>
      <button
        type="button"
        onClick={formatQuote}
        className="p-2 hover:bg-gray-200 rounded transition-colors"
        title="Quote"
      >
        <Quote size={18} />
      </button>
      <div className="w-px bg-gray-300 mx-1"></div>
      <button
        type="button"
        onClick={formatBulletList}
        className="p-2 hover:bg-gray-200 rounded transition-colors"
        title="Bullet List"
      >
        <List size={18} />
      </button>
      <button
        type="button"
        onClick={formatNumberedList}
        className="p-2 hover:bg-gray-200 rounded transition-colors"
        title="Numbered List"
      >
        <ListOrdered size={18} />
      </button>
    </div>
  );
}

function OnChangePlugin({
  onChange,
}: {
  onChange: (editorState: string) => void;
}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      const json = JSON.stringify(editorState.toJSON());
      onChange(json);
    });
  }, [editor, onChange]);

  return null;
}

interface LexicalEditorProps {
  onChange: (value: string) => void;
  placeholder?: string;
  initialValue?: string;
}

export default function LexicalEditor({
  onChange,
  placeholder = "Enter text...",
  initialValue,
}: LexicalEditorProps) {
  const initialConfig = {
    namespace: "ProductEditor",
    theme,
    onError: (error: Error) => console.error(error),
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode],
    editorState: initialValue,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
        <ToolbarPlugin />
        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="min-h-[200px] p-4 outline-none" />
            }
            placeholder={
              <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
                {placeholder}
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
      </div>
      <HistoryPlugin />
      <ListPlugin />
      <OnChangePlugin onChange={onChange} />
    </LexicalComposer>
  );
}
