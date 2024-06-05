import { useSelf } from "@/liveblocks.config";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { assignColor } from "@/lib/utils";
import Timer from "../timer/timer";
import Word from "../word/word";

type User = {
  username: string;
};

type ConnectionUser = [number, User];

type LobbyProps = {
  showTimer?: boolean;
};

export default function Lobby({ showTimer }: LobbyProps) {
  const me = useSelf((me) => me.info);

  const others: ConnectionUser[] = [
    [1, { username: "Alice" }],
    [2, { username: "Bob" }],
    [3, { username: "Charlie" }],
    [4, { username: "David" }],
    [5, { username: "Eve" }],
    [6, { username: "Frank" }],
    [7, { username: "Grace" }],
  ];

  return (
    <Card className="h-full relative">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Players</CardTitle>
        {showTimer && <Timer />}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div
            style={{
              backgroundColor: assignColor(0) + "20",
              color: assignColor(0),
              borderColor: assignColor(0),
            }}
            className="col-span-1 p-2 rounded-md border"
          >
            {me.username}
          </div>
          {others.map(([connctionId, { username }]) => (
            <div
              className="p-2 rounded-md border"
              style={{
                backgroundColor: assignColor(connctionId) + "20",
                color: assignColor(connctionId),
                borderColor: assignColor(connctionId),
              }}
              key={connctionId}
            >
              {username}
            </div>
          ))}
          {/* {others.map(([connectionId, { username }]) => (
            <div className="text-black ml-2" key={connectionId}>
              {connectionId}
              <span>{username ?? ""}</span>
            </div>
          ))} */}
        </div>
      </CardContent>
    </Card>
  );
}
