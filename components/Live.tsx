"use client";

import Canvas from "./canvas";
import Lobby from "./lobby/index";
import Chat from "./chat/index";
import Word from "./word/word";
import PreGameLobby from "./lobby/pre-game-lobby";

export default function Live() {
  return (
    <div className="h-screen flex flex-col gap-4 overflow-hidden p-4">
      <div className="flex flex-row flex-1 gap-x-4">
        <div className="w-1/2 h-full">
          <Lobby />
        </div>
        <div className="w-1/2 h-full flex flex-col gap-y-2">
          <Chat />
        </div>
      </div>
      <div className="h-3/4 flex gap-x-2 overflow-hidden w-full items-center justify-center relative">
        <Word />
        <Canvas />
      </div>
    </div>
  );
}
