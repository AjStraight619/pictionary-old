"use client";

import { useMyPresence, useSelf } from "@/liveblocks.config";
import Canvas from "./canvas";

export default function Live() {
  const self = useSelf();
  const [myPresence, updateMyPresence] = useMyPresence();

  const handlePointerMove = (e: React.PointerEvent) => {
    const cursor = { x: Math.floor(e.clientX), y: Math.floor(e.clientY) };
    updateMyPresence({ cursor });
    console.log("Pointer is moveing");
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    updateMyPresence({ cursor: null });
  };

  return (
    <div
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      className="h-screen flex flex-col"
    >
      <Canvas />
    </div>
  );
}
