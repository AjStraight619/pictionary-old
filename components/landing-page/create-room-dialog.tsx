"use client";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import CreateRoom from "./create-room";

export default function CreateRoomDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Create Room</Button>
      </DialogTrigger>
      <DialogContent>
        <CreateRoom />
      </DialogContent>
    </Dialog>
  );
}
