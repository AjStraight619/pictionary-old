"use client";

import { ReactNode } from "react";
import { RoomProvider } from "@/liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";

type RoomProps = {
  roomId: string;
  children: ReactNode;
};

export function Room({ roomId, children }: RoomProps) {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
        isDrawing: false,
      }}
    >
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
