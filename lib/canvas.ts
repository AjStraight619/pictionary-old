import { MutableRefObject } from "react";

import { fabric } from "fabric";

export const InitializeCanvas = ({
  canvasRef,
  fabricRef,
}: {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  fabricRef: MutableRefObject<fabric.Canvas | null>;
}) => {
  const canvasElement = document.getElementById("canvas");
  const canvas = new fabric.Canvas(canvasRef.current, {
    width: canvasElement?.clientHeight,
    height: canvasElement?.clientHeight,
  });

  fabricRef.current = canvas;
  return canvas;
};
