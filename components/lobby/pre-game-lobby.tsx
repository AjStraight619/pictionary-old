"use client";

import { useMutation, useStorage } from "@/liveblocks.config";
import { Dialog, DialogContent } from "../ui/dialog";

import { useState } from "react";

export default function PreGameLobby() {
  const [preGameSettings, setPreGameSetting] = useState({});
  const isGameStarted = useStorage((root) => root.gameState.isGameStarted);

  const handleStartGame = useMutation(
    ({ storage, self }, preGameSetting: any) => {},
    []
  );

  if (isGameStarted) return null;
  return (
    <Dialog open={!isGameStarted} onOpenChange={handleStartGame}>
      <DialogContent>yo</DialogContent>
    </Dialog>
  );
}
