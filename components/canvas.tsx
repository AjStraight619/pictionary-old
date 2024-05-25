import { useEffect, useRef } from "react";
import { fabric } from "fabric";

export default function Canvas() {
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {}, [canvasRef]);

  return (
    <div className="absolute inset-0 bg-gray-50" id="canvas">
      <canvas ref={canvasRef} />
    </div>
  );
}
