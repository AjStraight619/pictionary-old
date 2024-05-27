import { db } from "@/lib/db";
import { CreateRoomSchema } from "@/lib/schemas";
import { getErrorMessage } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";

export async function createRoom(values: z.infer<typeof CreateRoomSchema>) {
  const user = await currentUser();
  const validatedValues = CreateRoomSchema.safeParse(values);

  if (!user || !user.id) {
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

  try {
    const newRoom = await db.room.create({
      data: {
        name,
        numPlayers: maxPlayers,
        isOpen,
      },
    });

    await db.roomPlayer.create({
      data: {
        playerId: user.id,
        roomId: newRoom.id,
        isLeader: true,
      },
    });

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
