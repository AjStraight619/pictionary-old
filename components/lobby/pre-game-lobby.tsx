"use client";

import { useMutation, useStorage } from "@/liveblocks.config";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

import { useState } from "react";
import Lobby from ".";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Pre Game Lobby</DialogTitle>
        </DialogHeader>
        <Lobby />
        <GameOptions />
      </DialogContent>
    </Dialog>
  );
}

function GameOptions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lobby Options</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
