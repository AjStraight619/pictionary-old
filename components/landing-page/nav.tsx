import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getPlayer, getPlayerRooms } from "@/actions/getData";
import { Prisma } from "@prisma/client";
import ExistingRoomSelection from "./existing-rooms";
import { getPlayerById } from "@/actions/player";

export default async function Nav() {
  const user = await currentUser();

  if (!user || !user.id) redirect("/sign-in");

  const player = await getPlayer();

  if (!player) redirect("/profile");

  const playerRooms = await getPlayerRooms();

  return (
    <nav className="fixed top-0 w-full h-16 border-b border-muted-foreground">
      <div className="flex items-center justify-between px-2 h-full">
        <h1 className="text-2xl font-mono">Pictionary With Friends</h1>
        <div className="flex items-center gap-x-2">
          <ExistingRoomSelection playerRooms={playerRooms} />
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Button asChild>
              <SignInButton>Sign In</SignInButton>
            </Button>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
