import { MutableRefObject } from "react";

import { fabric } from "fabric";
import {
  CanvasKeyDown,
  CanvasMouseDown,
  CanvasMouseMove,
  CanvasMouseUp,
  CanvasPathCreated,
  CanvasResize,
} from "./types";

import { nanoid } from "nanoid";

export const InitializeCanvas = ({
  canvasRef,
  fabricRef,
}: {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  fabricRef: MutableRefObject<fabric.Canvas | null>;
}) => {
  const canvasElement = document.getElementById("canvas");
  const canvas = new fabric.Canvas(canvasRef.current, {
    width: canvasElement?.clientWidth,
    height: canvasElement?.clientHeight,
  });

  fabricRef.current = canvas;
  return canvas;
};

export const handleCanvasMouseDown = ({
  options,
  canvas,
  isDrawing,
  selectedElementRef,
  shapeRef,
}: CanvasMouseDown) => {
  const pointer = canvas.getPointer(options.e);

  /**
   * get target object i.e., the object that is clicked
   * findtarget() returns the object that is clicked
   *
   * findTarget: http://fabricjs.com/docs/fabric.Canvas.html#findTarget
   */
  const target = canvas.findTarget(options.e, false);

  // set canvas drawing mode to false
  canvas.isDrawingMode = false;

  if (selectedElementRef.current === "pencil") {
    isDrawing.current = true;
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 5;
    canvas.freeDrawingBrush.color = "#000000";
    return;
  }
};

export const handleCanvasMouseUp = ({
  canvas,
  isDrawing,
  shapeRef,
  selectedElementRef,
  setActiveElement,
}: CanvasMouseUp) => {
  if (selectedElementRef.current === "pencil") {
    // isDrawing.current = false;
    // canvas.isDrawingMode = false;
    // console.log("Pencil mode deactivated");
    return;
  }

  // // Reset state after mouse up
  // isDrawing.current = false;
  shapeRef.current = "null";
  selectedElementRef.current = null;

  // If the canvas is not in drawing mode, set the active element to default after 700ms
  if (!canvas.isDrawingMode) {
    setTimeout(() => {
      setActiveElement("selector");
    }, 700);
  }
};

export const handlePathCreated = ({
  options,
}: // syncShapeInStorage,
CanvasPathCreated) => {
  // get path object
  const path = options.path;
  if (!path) return;

  // set unique id to path object
  path.set({
    objectId: nanoid(),
  });

  // // sync shape in storage
  // syncShapeInStorage(path);
};

export const handleCanvasMouseMove = ({
  options,
  canvas,
  isDrawing,
  selectedElementRef,
}: CanvasMouseMove) => {
  if (!isDrawing.current) return;
  if (selectedElementRef.current === "pencil") return;
};

export const handleKeyDown = ({ e, canvas }: CanvasKeyDown) => {
  if (!canvas) return;
  const activeObjects = canvas.getActiveObjects();
  console.log("active objects: ", activeObjects);
  switch (e.key) {
    case "Backspace":
      {
        console.log("Backpsace hit");
        activeObjects.forEach((obj) => {
          canvas.remove(obj);
        });
      }
      break;

    default:
      return;
  }
};

export const handleResize = ({ canvas }: { canvas: fabric.Canvas | null }) => {
  const canvasElement = document.getElementById("canvas");
  if (!canvasElement) return;

  if (!canvas) return;

  canvas.setDimensions({
    width: canvasElement.clientWidth,
    height: canvasElement.clientHeight,
  });
};
