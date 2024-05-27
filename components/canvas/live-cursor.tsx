import { useOthersMapped } from "@/liveblocks.config";
import Cursor from "./cursor";
import { useEffect } from "react";

type LiveCursorProps = {};

export default function LiveCursor() {
  const othersMapped = useOthersMapped((other) => ({
    cursor: other.presence.cursor,
    isDrawing: other.presence.isDrawing,
  }));

  return (
    <>
      {othersMapped.map(([connectionId, { cursor, isDrawing }]) => (
        <>
          {cursor !== null && (
            <Cursor key={connectionId} x={cursor.x} y={cursor.y} />
          )}
        </>
      ))}
    </>
  );
}
