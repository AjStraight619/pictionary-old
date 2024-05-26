"use client";

import {
  useMutation,
  useMyPresence,
  useOther,
  useOthersConnectionIds,
  useOthersMapped,
  useSelf,
} from "@/liveblocks.config";
import Canvas from "./canvas";
import Lobby from "./lobby";
import Cursor from "./cursor";
import Test from "./test";
import { Button } from "./ui/button";

export default function Live() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-row flex-1">
        <div className="w-1/2 h-full">
          <Lobby />
        </div>
        <div className="w-1/2 h-full">
          <Test />
        </div>
      </div>
      <div className="h-3/4">
        <Canvas />
      </div>
    </div>
  );
}
