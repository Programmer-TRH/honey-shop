import { useState, useRef, useCallback } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Type,
  Undo2,
  Redo2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Image as ImageIcon,
  Link,
  Quote,
  Minus,
  Strikethrough
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

// Rich text editor using contentEditable with custom toolbar
function ToolbarPlugin({ 
  onBold, 
  onItalic, 
  onUnderline,
  onStrikethrough,
  onHeading, 
  onBulletList, 
  onNumberedList,
  onImage,
  onLink,
  onBlockquote,
  onHorizontalRule,
  onUndo,
  onRedo,
  onAlign,
  isBold,
  isItalic,
  isUnderline,
  isStrikethrough
}: {
  onBold: () => void;
  onItalic: () => void;
  onUnderline: () => void;
  onStrikethrough: () => void;
  onHeading: (level: number) => void;
  onBulletList: () => void;
  onNumberedList: () => void;
  onImage: () => void;
  onLink: () => void;
  onBlockquote: () => void;
  onHorizontalRule: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onAlign: (alignment: string) => void;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrikethrough: boolean;
}) {
  return (
    <div className="flex items-center space-x-1 p-2 border-b border-gray-200 bg-gray-50 flex-wrap gap-1">
      {/* Undo/Redo */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onUndo}
        title="Undo"
      >
        <Undo2 className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onRedo}
        title="Redo"
      >
        <Redo2 className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6" />

      {/* Headings */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => onHeading(1)}
        title="Heading 1"
      >
        H1
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => onHeading(2)}
        title="Heading 2"
      >
        H2
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => onHeading(3)}
        title="Heading 3"
      >
        H3
      </Button>

      <Separator orientation="vertical" className="h-6" />

      {/* Text Formatting */}
      <Button
        type="button"
        variant={isBold ? "default" : "ghost"}
        size="sm"
        onClick={onBold}
        title="Bold"
      >
        <Bold className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant={isItalic ? "default" : "ghost"}
        size="sm"
        onClick={onItalic}
        title="Italic"
      >
        <Italic className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant={isUnderline ? "default" : "ghost"}
        size="sm"
        onClick={onUnderline}
        title="Underline"
      >
        <Underline className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant={isStrikethrough ? "default" : "ghost"}
        size="sm"
        onClick={onStrikethrough}
        title="Strikethrough"
      >
        <Strikethrough className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6" />

      {/* Lists */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onBulletList}
        title="Bullet List"
      >
        <List className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onNumberedList}
        title="Numbered List"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6" />

      {/* Alignment */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => onAlign('left')}
        title="Align Left"
      >
        <AlignLeft className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => onAlign('center')}
        title="Align Center"
      >
        <AlignCenter className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => onAlign('right')}
        title="Align Right"
      >
        <AlignRight className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6" />

      {/* Insert Elements */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onLink}
        title="Insert Link"
      >
        <Link className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onImage}
        title="Insert Image"
      >
        <ImageIcon className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onBlockquote}
        title="Quote"
      >
        <Quote className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onHorizontalRule}
        title="Horizontal Rule"
      >
        <Minus className="h-4 w-4" />
      </Button>
    </div>
  );
}

interface LexicalEditorProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (html: string, text: string) => void;
  className?: string;
  minHeight?: string;
}

export function LexicalEditor({ 
  label, 
  placeholder = "Start typing...", 
  value = "",
  onChange,
  className = "",
  minHeight = "200px"
}: LexicalEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');

  const updateToolbarState = useCallback(() => {
    if (editorRef.current) {
      setIsBold(document.queryCommandState('bold'));
      setIsItalic(document.queryCommandState('italic'));
      setIsUnderline(document.queryCommandState('underline'));
      setIsStrikethrough(document.queryCommandState('strikeThrough'));
    }
  }, []);

  const handleInput = useCallback(() => {
    if (editorRef.current && onChange) {
      const htmlContent = editorRef.current.innerHTML;
      const textContent = editorRef.current.textContent || '';
      onChange(htmlContent, textContent);
    }
    updateToolbarState();
  }, [onChange, updateToolbarState]);

  const handleKeyUp = useCallback(() => {
    updateToolbarState();
  }, [updateToolbarState]);

  const handleMouseUp = useCallback(() => {
    updateToolbarState();
  }, [updateToolbarState]);

  const execCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    updateToolbarState();
    handleInput();
  }, [updateToolbarState, handleInput]);

  const handleBold = () => execCommand('bold');
  const handleItalic = () => execCommand('italic');
  const handleUnderline = () => execCommand('underline');
  const handleStrikethrough = () => execCommand('strikeThrough');
  
  const handleHeading = (level: number) => {
    execCommand('formatBlock', `h${level}`);
  };

  const handleBulletList = () => execCommand('insertUnorderedList');
  const handleNumberedList = () => execCommand('insertOrderedList');
  const handleBlockquote = () => execCommand('formatBlock', 'blockquote');
  const handleHorizontalRule = () => execCommand('insertHorizontalRule');
  const handleUndo = () => execCommand('undo');
  const handleRedo = () => execCommand('redo');

  const handleAlign = (alignment: string) => {
    switch (alignment) {
      case 'left':
        execCommand('justifyLeft');
        break;
      case 'center':
        execCommand('justifyCenter');
        break;
      case 'right':
        execCommand('justifyRight');
        break;
    }
  };

  const handleInsertImage = () => {
    if (imageUrl.trim()) {
      execCommand('insertImage', imageUrl);
      setImageUrl('');
      setIsImageDialogOpen(false);
      toast.success('Image inserted successfully!');
    }
  };

  const handleInsertLink = () => {
    if (linkUrl.trim()) {
      const selection = window.getSelection();
      if (selection && selection.toString().trim()) {
        // Text is selected, create link with selected text
        execCommand('createLink', linkUrl);
      } else if (linkText.trim()) {
        // No text selected, insert link with provided text
        execCommand('insertHTML', `<a href="${linkUrl}" target="_blank">${linkText}</a>`);
      } else {
        // No text provided, insert URL as text
        execCommand('insertHTML', `<a href="${linkUrl}" target="_blank">${linkUrl}</a>`);
      }
      setLinkUrl('');
      setLinkText('');
      setIsLinkDialogOpen(false);
      toast.success('Link inserted successfully!');
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <Label>{label}</Label>}
      
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
        <ToolbarPlugin
          onBold={handleBold}
          onItalic={handleItalic}
          onUnderline={handleUnderline}
          onStrikethrough={handleStrikethrough}
          onHeading={handleHeading}
          onBulletList={handleBulletList}
          onNumberedList={handleNumberedList}
          onImage={() => setIsImageDialogOpen(true)}
          onLink={() => setIsLinkDialogOpen(true)}
          onBlockquote={handleBlockquote}
          onHorizontalRule={handleHorizontalRule}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onAlign={handleAlign}
          isBold={isBold}
          isItalic={isItalic}
          isUnderline={isUnderline}
          isStrikethrough={isStrikethrough}
        />
        
        <div className="relative">
          <div
            ref={editorRef}
            contentEditable
            className="p-4 outline-none resize-none text-sm focus:ring-0"
            style={{ minHeight }}
            onInput={handleInput}
            onKeyUp={handleKeyUp}
            onMouseUp={handleMouseUp}
            dangerouslySetInnerHTML={{ __html: value }}
            suppressContentEditableWarning={true}
          />
          
          {editorRef.current?.textContent === '' && (
            <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
              {placeholder}
            </div>
          )}
        </div>
      </div>

      {/* Image Insert Dialog */}
      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Image</DialogTitle>
            <DialogDescription>
              Enter the URL of the image you want to insert.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleInsertImage();
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImageDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleInsertImage} disabled={!imageUrl.trim()}>
              Insert Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Link Insert Dialog */}
      <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Link</DialogTitle>
            <DialogDescription>
              Create a link. If you have text selected, it will be used as the link text.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="linkUrl">URL</Label>
              <Input
                id="linkUrl"
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkText">Link Text (optional)</Label>
              <Input
                id="linkText"
                placeholder="Click here"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleInsertLink();
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLinkDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleInsertLink} disabled={!linkUrl.trim()}>
              Insert Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <style jsx>{`
        [contenteditable="true"]:focus {
          outline: none;
        }
        
        [contenteditable="true"] h1 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0.5rem 0;
          line-height: 1.4;
        }
        
        [contenteditable="true"] h2 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0.5rem 0;
          line-height: 1.4;
        }
        
        [contenteditable="true"] h3 {
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0.5rem 0;
          line-height: 1.4;
        }
        
        [contenteditable="true"] ul, [contenteditable="true"] ol {
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        
        [contenteditable="true"] li {
          margin: 0.25rem 0;
        }
        
        [contenteditable="true"] p {
          margin: 0.5rem 0;
          line-height: 1.6;
        }
        
        [contenteditable="true"] blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin: 0.5rem 0;
          font-style: italic;
          color: #6b7280;
        }
        
        [contenteditable="true"] a {
          color: #3b82f6;
          text-decoration: underline;
        }
        
        [contenteditable="true"] a:hover {
          text-decoration: none;
        }
        
        [contenteditable="true"] hr {
          border: none;
          border-top: 1px solid #e5e7eb;
          margin: 1rem 0;
        }
        
        [contenteditable="true"] img {
          max-width: 100%;
          height: auto;
          margin: 0.5rem 0;
          border-radius: 0.375rem;
        }
        
        [contenteditable="true"] strong {
          font-weight: 600;
        }
        
        [contenteditable="true"] em {
          font-style: italic;
        }
        
        [contenteditable="true"]:empty::before {
          content: attr(placeholder);
          color: #9ca3af;
        }
      `}</style>
    </div>
  );
}