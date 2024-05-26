import { useEffect, useRef } from "react";
import { fabric } from "fabric";
import { useMutation, useOthersMapped } from "@/liveblocks.config";
import Cursor from "./cursor";
import { InitializeCanvas } from "@/lib/canvas";

export default function Canvas() {
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const othersMapped = useOthersMapped((other) => ({
    cursor: other.presence.cursor,
    isDrawing: other.presence.isDrawing,
  }));

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
  }, [canvasRef]);

  return (
    <div
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      className="h-full bg-gray-50"
      id="canvas"
    >
      <canvas className="h-full w-full" ref={canvasRef} />
      {othersMapped.map(([connectionId, { cursor, isDrawing }]) => (
        <>
          {cursor !== null && (
            <Cursor key={connectionId} x={cursor.x} y={cursor.y} />
          )}
        </>
      ))}
    </div>
  );
}
