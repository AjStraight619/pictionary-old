import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import JoinRoom from "./join-room";

export default function JoinRoomDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Join Room</Button>
      </DialogTrigger>
      <DialogContent>
        <JoinRoom />
      </DialogContent>
    </Dialog>
  );
}
