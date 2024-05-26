"use client";

import Canvas from "./canvas";
import Lobby from "./lobby/index";
import Test from "./test";
import Chat from "./chat/index";

export default function Live() {
  return (
    <div className="h-screen flex flex-col gap-4 overflow-hidden p-4">
      <div className="flex flex-row flex-1">
        <div className="w-1/2 h-full">
          <Lobby />
        </div>
        <div className="w-1/2 h-full">
          <Test />
        </div>
      </div>
      <div className="h-3/4 flex gap-x-2 overflow-hidden w-full items-center justify-center">
        <Canvas />

        <div className="w-[20rem] h-full flex-shrink-0">
          <Chat />
        </div>
      </div>
    </div>
  );
}
