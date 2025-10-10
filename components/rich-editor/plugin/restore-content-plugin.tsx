import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export function RestoreContent({ initialValue }: { initialValue?: any }) {
  const [editor] = useLexicalComposerContext();
  const initializedRef = useRef(false);
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    editor.update(() => {
      try {
        if (
          initialValue &&
          initialValue.root &&
          Array.isArray(initialValue.root.children)
        ) {
          editor.setEditorState(
            editor.parseEditorState(JSON.stringify(initialValue))
          );
        }
      } catch (err) {
        toast.error("Failed to rehydrate editor:", { description: `${err}` });
      }
    });
  }, [editor, initialValue]);
  return null;
}
