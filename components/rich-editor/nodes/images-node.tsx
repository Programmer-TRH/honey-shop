"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getNodeByKey,
  DecoratorNode,
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from "lexical";
import React, { useRef, useState, useEffect, JSX, useMemo } from "react";

export interface ImagePayload {
  altText: string;
  src: string;
  key?: NodeKey;
  width?: number;
  height?: number;
}

export type SerializedImageNode = Spread<
  {
    altText: string;
    src: string;
    width?: number;
    height?: number;
  },
  SerializedLexicalNode
>;

function convertImageElement(domNode: Node): null | DOMConversionOutput {
  if (domNode instanceof HTMLImageElement) {
    const { alt: altText, src, width, height } = domNode;
    const node = $createImageNode({
      altText,
      src,
      width: width || undefined,
      height: height || undefined,
    });
    return { node };
  }
  return null;
}

export const ImageComponent = ({
  src,
  altText,
  width,
  height,
  nodeKey,
  onResize,
}: {
  src: string;
  altText: string;
  width?: number;
  height?: number;
  nodeKey: string;
  onResize?: (width: number, height: number, editor: any) => void;
}): JSX.Element => {
  const [editor] = useLexicalComposerContext();
  const imageRef = useRef<HTMLImageElement>(null);

  const [currentWidth, setCurrentWidth] = useState<number | undefined>(width);
  const [currentHeight, setCurrentHeight] = useState<number | undefined>(
    height
  );
  const [isSelected, setIsSelected] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    if (!isResizing && width && height) {
      setCurrentWidth(width);
      setCurrentHeight(height);
    }
  }, [width, height, isResizing]);

  const handleMouseDown = (
    e: React.MouseEvent,
    direction: "left" | "right"
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);

    const startX = e.clientX;
    const startWidth = currentWidth || imageRef.current?.width || 0;
    const aspectRatio =
      (currentHeight || imageRef.current?.height || 1) / startWidth;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      let newWidth =
        direction === "right" ? startWidth + deltaX : startWidth - deltaX;
      newWidth = Math.max(50, Math.min(1200, newWidth));
      const newHeight = newWidth * aspectRatio;

      setCurrentWidth(newWidth);
      setCurrentHeight(newHeight);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      if (imageRef.current) {
        const newWidth = imageRef.current.width;
        const newHeight = imageRef.current.height;

        editor.update(() => {
          const node = $getNodeByKey(nodeKey);
          if ($isImageNode(node)) {
            node.setWidthAndHeight(newWidth, newHeight);
          }
        });

        onResize?.(newWidth, newHeight, editor);
      }

      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className="relative inline-block my-2 group"
      onMouseEnter={() => setIsSelected(true)}
      onMouseLeave={() => !isResizing && setIsSelected(false)}
    >
      <img
        ref={imageRef}
        src={src}
        alt={altText}
        width={currentWidth}
        height={currentHeight}
        className="rounded max-w-full h-auto select-none"
        draggable={false}
      />
      {isSelected && (
        <>
          <div className="absolute inset-0 border-2 border-blue-500 rounded pointer-events-none" />
          <div
            className="absolute top-1/2 -right-2 w-4 h-4 bg-blue-500 rounded-full cursor-ew-resize transform -translate-y-1/2 hover:bg-blue-600"
            onMouseDown={(e) => handleMouseDown(e, "right")}
          />
          <div
            className="absolute top-1/2 -left-2 w-4 h-4 bg-blue-500 rounded-full cursor-ew-resize transform -translate-y-1/2 hover:bg-blue-600"
            onMouseDown={(e) => handleMouseDown(e, "left")}
          />
        </>
      )}
    </div>
  );
};

export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string;
  __altText: string;
  __width?: number;
  __height?: number;

  static getType(): string {
    return "image";
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(
      node.__src,
      node.__altText,
      node.__width,
      node.__height,
      node.__key
    );
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { altText, src, width, height } = serializedNode;
    const node = $createImageNode({
      altText,
      src,
      width,
      height,
    });
    return node;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("img");
    element.setAttribute("src", this.__src);
    element.setAttribute("alt", this.__altText);
    if (this.__width)
      element.setAttribute("width", String(Math.round(this.__width)));
    if (this.__height)
      element.setAttribute("height", String(Math.round(this.__height)));
    element.className = "rounded max-w-full h-auto";
    return { element };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      img: () => ({
        conversion: convertImageElement,
        priority: 0,
      }),
    };
  }

  constructor(
    src: string,
    altText: string,
    width?: number,
    height?: number,
    key?: NodeKey
  ) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__width = width;
    this.__height = height;
  }

  exportJSON(): SerializedImageNode {
    return {
      altText: this.getAltText(),
      src: this.getSrc(),
      width: this.__width,
      height: this.__height,
      type: "image",
      version: 1,
    };
  }

  getSrc(): string {
    return this.__src;
  }

  getAltText(): string {
    return this.__altText;
  }

  setWidthAndHeight(width: number, height: number): void {
    const writable = this.getWritable();
    writable.__width = width;
    writable.__height = height;
  }

  createDOM(): HTMLElement {
    const span = document.createElement("span");
    span.className = "editor-image-wrapper inline-block";
    return span;
  }

  updateDOM(): false {
    return false;
  }

  decorate(): JSX.Element {
    return (
      <ImageComponent
        src={this.__src}
        altText={this.__altText}
        width={this.__width}
        height={this.__height}
        nodeKey={this.getKey()}
        onResize={(width, height, editor) => {
          editor.update(() => {
            this.setWidthAndHeight(width, height);
          });
        }}
      />
    );
  }
}

export function $createImageNode({
  altText,
  src,
  width,
  height,
  key,
}: ImagePayload): ImageNode {
  return new ImageNode(src, altText, width, height, key);
}

export function $isImageNode(
  node: LexicalNode | null | undefined
): node is ImageNode {
  return node instanceof ImageNode;
}
