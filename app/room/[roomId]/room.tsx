"use client";

import { ReactNode } from "react";
import { RoomProvider } from "@/liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Message } from "@/lib/types";
import RoomLoading from "./room-loading";

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
        lastUsedColor: null,
        pencilDraft: null,
      }}
      initialStorage={{
        gameState: new LiveObject({
          isGameStarted: false,
          isGameOver: false,
          currentWord: "",
        }),
        canvasObjects: new LiveMap(),
        messages: new LiveList<LiveObject<Message>>(),
        roundState: new LiveObject(),
      }}
    >
      <ClientSideSuspense fallback={<RoomLoading />}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
