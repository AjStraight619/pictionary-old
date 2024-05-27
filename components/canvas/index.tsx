import { useCallback, useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { useMutation, useOthersMapped } from "@/liveblocks.config";
import Cursor from "./cursor";
import {
  InitializeCanvas,
  handleCanvasMouseDown,
  handleCanvasMouseMove,
  handleCanvasMouseUp,
  handleKeyDown,
  handlePathCreated,
  handleResize,
} from "@/lib/canvas";
import Toolbar from "../toolbar";
import { Element } from "@/lib/types";
import LiveCurosr from "./live-cursor";
import LiveCursor from "./live-cursor";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const isDrawing = useRef(false);

  const shapeRef = useRef<fabric.Object | null>(null);

  const selectedElementRef = useRef<Element | null>("selector");
  const [activeElement, setActiveElement] = useState<Element>("selector");

  const activeObjectRef = useRef<fabric.Object | null>(null);

  const isEditingRef = useRef(false);

  const othersMapped = useOthersMapped((other) => ({
    cursor: other.presence.cursor,
    isDrawing: other.presence.isDrawing,
  }));

  const handleSelectElement = useCallback((element: Element) => {
    setActiveElement(element);
    if (!fabricRef.current) return;

    console.log(`Element selected: ${element}`);

    if (element !== "pencil") {
      isDrawing.current = false;
      fabricRef.current.isDrawingMode = false;
      fabricRef.current.defaultCursor = "default";
      fabricRef.current.hoverCursor = "default";
    }

    switch (element) {
      case "pencil":
        fabricRef.current.isDrawingMode = true;
        fabricRef.current.defaultCursor = "crosshair";
        fabricRef.current.hoverCursor = "crosshair";
        selectedElementRef.current = "pencil";
        isDrawing.current = true;
        break;
      case "rectangle":
        selectedElementRef.current = "rectangle";
        break;
      case "circle":
        selectedElementRef.current = "circle";
        break;
      case "triangle":
        selectedElementRef.current = "circle";
        break;
      case "trash":
        // Handle trash action
        selectedElementRef.current = "rectangle";
        break;
      case "selector":
      default:
        selectedElementRef.current = null;
        break;
    }

    console.log(`fabric.isDrawingMode: ${fabricRef.current.isDrawingMode}`);
    console.log(`fabric.defaultCursor: ${fabricRef.current.defaultCursor}`);
  }, []);

  const handlePointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      const cursor = { x: Math.floor(e.clientX), y: Math.floor(e.clientY) };
      setMyPresence({ cursor });
      console.log("Pointer is moving");
    },
    []
  );

  const handlePointerLeave = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      setMyPresence({ cursor: null });
    },
    []
  );

  useEffect(() => {
    const canvas = InitializeCanvas({ canvasRef, fabricRef });
    canvas.on("mouse:down", (options) => {
      handleCanvasMouseDown({
        options,
        canvas,
        isDrawing,
        selectedElementRef,
        shapeRef,
      });
    });

    canvas.on("mouse:up", () => {
      handleCanvasMouseUp({
        canvas,
        isDrawing,
        selectedElementRef,
        shapeRef,
        setActiveElement,
      });
    });

    canvas.on("mouse:move", (options) => {
      handleCanvasMouseMove({
        options,
        canvas,
        isDrawing,
        selectedElementRef,
      });
    });

    canvas.on("path:created", (options) => {
      handlePathCreated({
        options,
      });
    });

    canvas.on("mouse:over", () => {});

    window.addEventListener("keydown", (e) => {
      handleKeyDown({
        e,
        canvas,
      });
    });

    window.addEventListener("resize", () => {
      handleResize({ canvas });
    });

    return () => {
      window.removeEventListener("keydown", (e) => {
        handleKeyDown({
          e,
          canvas,
        });
      });
      window.removeEventListener("resize", () => {
        handleResize({
          canvas,
        });
      });
      canvas.dispose();
    };
  }, [canvasRef]);

  return (
    <div
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      className="flex h-full w-full flex-1 items-center justify-center bg-gray-50 rounded-md"
      id="canvas"
    >
      <canvas ref={canvasRef} />
      <LiveCursor />
      <Toolbar
        activeElement={activeElement}
        handleSelectElement={handleSelectElement}
      />
    </div>
  );
}
