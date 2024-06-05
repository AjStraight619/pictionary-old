import { useCallback, useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import {
  Presence,
  useMutation,
  useMyPresence,
  useOthersMapped,
  useStorage,
  useUpdateMyPresence,
} from "@/liveblocks.config";
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
import LiveCursor from "./live-cursor";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const isDrawing = useRef(false);

  const pencilDraftRef = useRef<fabric.Point[]>([]);
  const tempPathRef = useRef<fabric.Path | null>(null);

  const updateMyPresence = useUpdateMyPresence();

  const [myPresence, setMyPresence] = useMyPresence();

  const lastUsedColorRef = useRef("#000000");

  const shapeRef = useRef<fabric.Object | null>(null);

  const selectedElementRef = useRef<Element | null>("selector");
  const [activeElement, setActiveElement] = useState<Element>("selector");

  const activeObjectRef = useRef<fabric.Object | null>(null);

  const isEditingRef = useRef(false);

  const othersMapped = useOthersMapped((other) => ({
    cursor: other.presence.cursor,
    isDrawing: other.presence.isDrawing,
    pencilDraft: other.presence.pencilDraft,
  }));

  const canvasObjects = useStorage((root) => root.canvasObjects);

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

  // const handleMouseDown = useCallback(
  //   (options: fabric.IEvent) => {
  //     handleCanvasMouseDown({
  //       options,
  //       canvas: fabricRef.current!,
  //       isDrawing,
  //       selectedElementRef,
  //       shapeRef,
  //       lastUsedColorRef,
  //     });
  //     if (selectedElementRef.current === "pencil") {
  //       isDrawing.current = true;
  //       pencilDraftRef.current = [
  //         new fabric.Point(options.pointer!.x, options.pointer!.y),
  //       ];
  //       const path = new fabric.Path(
  //         `M ${options.pointer!.x} ${options.pointer!.y}`,
  //         {
  //           stroke: lastUsedColorRef.current || "black",
  //           strokeWidth: 2,
  //           objectCaching: false,
  //           fill: undefined,
  //         }
  //       );
  //       fabricRef.current?.add(path);
  //       tempPathRef.current = path;
  //       updateMyPresence({
  //         isDrawing: true,
  //         pencilDraft: pencilDraftRef.current,
  //       });
  //     }
  //   },
  //   [updateMyPresence]
  // );
  // const handleMouseMove = useCallback(
  //   (options: fabric.IEvent) => {
  //     handleCanvasMouseMove({
  //       options,
  //       canvas: fabricRef.current!,
  //       isDrawing,
  //       selectedElementRef,
  //     });

  //     if (isDrawing.current && selectedElementRef.current === "pencil") {
  //       pencilDraftRef.current.push(
  //         new fabric.Point(options.pointer!.x, options.pointer!.y)
  //       );
  //       const pathData = pencilDraftRef.current.map((point, index) =>
  //         index === 0 ? ["M", point.x, point.y] : ["L", point.x, point.y]
  //       );
  //       if (tempPathRef.current) {
  //         tempPathRef.current.set({ path: pathData });
  //         fabricRef.current?.requestRenderAll();
  //       }
  //       updateMyPresence({
  //         pencilDraft: pencilDraftRef.current,
  //       });
  //     }
  //   },
  //   [updateMyPresence]
  // );

  // const handleMouseUp = useCallback(
  //   (options: fabric.IEvent) => {
  //     handleCanvasMouseUp({
  //       canvas: fabricRef.current!,
  //       isDrawing,
  //       selectedElementRef,
  //       shapeRef,
  //       setActiveElement,
  //     });
  //     if (selectedElementRef.current === "pencil") {
  //       isDrawing.current = false;
  //       updateMyPresence({ isDrawing: false, pencilDraft: null });
  //       pencilDraftRef.current = [];
  //     }
  //   },
  //   [updateMyPresence]
  // );

  useEffect(() => {
    const canvas = InitializeCanvas({ canvasRef, fabricRef });
    canvas.on("mouse:down", (options) => {
      handleCanvasMouseDown({
        options,
        canvas,
        isDrawing,
        selectedElementRef,
        shapeRef,
        lastUsedColorRef,
        setMyPresence,
      });
      // if (selectedElementRef.current === "pencil") {
      //   isDrawing.current = true;
      //   pencilDraftRef.current = [
      //     { x: options.pointer!.x, y: options.pointer!.y },
      //   ];
      //   updateMyPresence({
      //     isDrawing: true,
      //     pencilDraft: pencilDraftRef.current,
      //   });
      // }
    });

    // canvas.on("mouse:down", handleMouseDown);

    // canvas.on("mouse:up", handleMouseUp);
    // canvas.on("mouse:move", handleMouseMove);

    canvas.on("mouse:up", () => {
      handleCanvasMouseUp({
        canvas,
        isDrawing,
        selectedElementRef,
        shapeRef,
        setActiveElement,
        setMyPresence,
      });
      // if (selectedElementRef.current === "pencil") {
      //   updateMyPresence({ isDrawing: false, pencilDraft: null });
      // }
    });

    canvas.on("mouse:move", (options) => {
      handleCanvasMouseMove({
        options,
        canvas,
        isDrawing,
        selectedElementRef,
        setMyPresence,
      });
      // if (isDrawing.current && selectedElementRef.current === "pencil") {
      //   pencilDraftRef.current.push({
      //     x: options.pointer!.x,
      //     y: options.pointer!.y,
      //   });
      //   updateMyPresence({
      //     pencilDraft: pencilDraftRef.current,
      //   });
      // }
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
  }, [canvasRef, setMyPresence]);

  return (
    <div
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      className="flex h-full w-full  items-center justify-center  bg-gray-50 rounded-md"
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
