import CreateRoomDialog from "@/components/landing-page/create-room-dialog";
import CreateRoom from "@/components/landing-page/create-room";
import Nav from "@/components/landing-page/nav";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import JoinRoomDialog from "@/components/landing-page/join-room-dialog";
import { getPlayerById } from "@/actions/player";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <Nav />
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Create or Join</CardTitle>
            <CardDescription>
              Create a room and set permsissions. Or join an open room.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <CreateRoomDialog />
            <JoinRoomDialog />
          </CardContent>
        </Card>
      </main>
    </>
  );
}
