"use client";
import { Prisma } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getPlayerRooms } from "@/actions/getData";
import { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

type ExistingRoomSelectionProps = {
  playerRooms: Prisma.PromiseReturnType<typeof getPlayerRooms>;
};

export default function ExistingRoomSelection({
  playerRooms,
}: ExistingRoomSelectionProps) {
  const [selectRoom, setSelectedRoom] = useState<{
    id: string;
    name: string;
  } | null>(null);

  console.log("player rooms: ", playerRooms);

  const handleSelectedRoomChange = (value: string) => {
    const room = playerRooms.find((room) => room.name === value);
    if (room)
      setSelectedRoom({
        id: room.id,
        name: room.name,
      });
  };

  if (!playerRooms.length) return null;

  return (
    <div className="flex items-center gap-x-2">
      {selectRoom !== null && (
        <Button asChild>
          <Link href={`/room/${selectRoom.id}`}>Join: {selectRoom.name}</Link>
        </Button>
      )}
      <Select onValueChange={(value) => handleSelectedRoomChange(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue
            placeholder="Your Rooms"
            defaultValue={playerRooms[0].name}
          />
        </SelectTrigger>
        <SelectContent>
          {playerRooms.map((room) => (
            <SelectItem value={room.name} key={room.id}>
              {room.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
