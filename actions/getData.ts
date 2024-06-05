"server only";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// import { db } from "@/lib/db";
// import { currentUser } from "@clerk/nextjs/server";
// import "server-only";

// export async function getPlayerRooms() {
//   const user = await currentUser();

//   if (!user || !user.id) {
//     return {
//       success: false,
//       error: {
//         message: "User does not have a valid session",
//       },
//       data: null,
//     };
//   }

//   const playerRooms = await db.room.findMany({
//     where: {
//       playerId: user.id,
//     },
//   });

//   return {
//     success: true,
//     error: null,
//     data: {
//       playerRooms: playerRooms,
//     },
//   };
// }

export async function getPlayerRooms() {
  const user = await currentUser();

  if (!user || !user.id) redirect("/login");

  // Find rooms where the current user is the leader
  const playerRooms = await db.room.findMany({
    where: {
      players: {
        some: {
          playerId: user.id,
          isLeader: true,
        },
      },
    },
    include: {
      players: true, // Include the players in the room if you need them
    },
  });

  console.log("player rooms: ", playerRooms);

  return playerRooms;
}

export async function getPlayer() {
  const user = await currentUser();
  if (!user || !user.id) return null;
  const player = db.player.findUnique({
    where: {
      id: user.id,
    },
  });
  return player;
}
