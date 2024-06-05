"use client";

import Canvas from "./canvas";
import Lobby from "./lobby/index";
import Chat from "./chat/index";
import Timer from "./timer/timer";
import PreGameLobby from "./lobby/pre-game-lobby";

export default function Live() {
  return (
    <div className="h-screen flex flex-col gap-4 overflow-hidden p-4 container">
      <div
        className="flex flex-row gap-x-4"
        style={{ height: "calc(50% - 8rem)" }}
      >
        <div className="w-1/2 h-full overflow-hidden">
          <Lobby />
        </div>
        <div className="w-1/2 h-full flex flex-col gap-y-2 overflow-hidden select-none">
          <Chat />
        </div>
      </div>
      <div className="flex-1 flex gap-x-2 overflow-hidden w-full items-center justify-center">
        {/* <Word /> */}
        <Canvas />
      </div>
      <PreGameLobby />
    </div>
  );
}
