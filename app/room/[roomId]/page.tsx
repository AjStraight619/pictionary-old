import Live from "@/components/Live";
import { Room } from "./room";

type RoomPageProps = {
  params: {
    roomId: string;
  };
};

export default function RoomPage({ params }: RoomPageProps) {
  return (
    <Room roomId={params.roomId}>
      <Live />
    </Room>
  );
}
