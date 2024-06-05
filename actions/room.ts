"use server";
import { db } from "@/lib/db";
import { CreateRoomSchema } from "@/lib/schemas";
import { getErrorMessage } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import { redirect } from "next/navigation";

export async function createRoom(values: z.infer<typeof CreateRoomSchema>) {
  const user = await currentUser();
  const validatedValues = CreateRoomSchema.safeParse(values);

  if (!user || !user.id || !user.firstName) {
    return {
      error: "User could not be identified",
      success: false,
    };
  }

  if (!validatedValues.success) {
    return {
      success: false,
      error: getErrorMessage(validatedValues.error),
    };
  }

  const {
    data: { name, isOpen, maxPlayers },
  } = validatedValues;

  let player = await db.player.findUnique({
    where: { id: user.id },
  });

  if (!player) {
    redirect("/profile");
  }

  try {
    const newRoom = await db.room.create({
      data: {
        name,
        numPlayers: maxPlayers,
        isOpen,
      },
    });

    try {
      await db.roomPlayer.create({
        data: {
          playerId: player.id,
          roomId: newRoom.id,
          isLeader: true,
        },
      });
    } catch (e) {}

    return {
      success: true,
      room: newRoom,
    };
  } catch (err) {
    return {
      success: false,
      error: getErrorMessage(err),
    };
  }
}
