"use server";
import { db } from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import { CreatePlayerSchema, ProfileSchema } from "@/lib/schemas";
import { TProfileSchema } from "@/lib/types";

export async function updatePlayer(values: TProfileSchema) {
  const user = await currentUser();
  if (!user || !user.id) return null;
  const validatedValues = ProfileSchema.safeParse(values);
  if (!validatedValues.success) {
    return {
      success: false,
      error: getErrorMessage(validatedValues.error),
    };
  }

  const { username, email } = validatedValues.data;

  try {
    const updatedPlayer = await db.player.upsert({
      where: {
        id: user.id,
      },
      update: {
        username: username,
        email: email,
      },
      create: {
        id: user.id,
        username: username,
        email: email,
        isProfileComplete: true,
      },
    });
    return {
      success: true,
      player: updatedPlayer,
    };
  } catch (e) {
    return {
      success: false,
      error: getErrorMessage(e),
    };
  }
}

export async function createPlayer(values: z.infer<typeof CreatePlayerSchema>) {
  const validatedValues = CreatePlayerSchema.safeParse(values);

  if (!validatedValues.success) {
    return {
      success: false,
      error: getErrorMessage(validatedValues.error),
    };
  }

  const { username } = validatedValues.data;

  const currUser = await currentUser();
  if (!currUser || !currUser.id || !currUser.firstName) {
    return {
      success: false,
      error: "No valid user id or missing first name",
    };
  }
}

export async function isPlayer() {
  const currUser = await currentUser();
  if (!currUser || !currUser.id) {
    throw new Error(
      "Yo this person is not logged in and trying to create a room"
    );
  }
  const player = await db.player.findFirst({
    where: {
      id: currUser.id,
    },
  });
  return !!player;
}

export async function getPlayerById() {
  const user = await currentUser();
  if (!user || !user.id) return null;

  const player = await db.player.findUnique({
    where: {
      id: user.id,
    },
  });
  return player;
}
