import { useMutation, useSelf } from "@/liveblocks.config";
import { Button } from "./ui/button";

export default function Test() {
  const myId = useSelf((me) => me.connectionId);

  const handleIsDrawingChange = useMutation(
    ({ setMyPresence, self }, myId: number) => {
      const me = self.connectionId === myId;
      if (me) {
        setMyPresence({ isDrawing: true });
      }
    },
    []
  );

  return (
    <div className="flex items-center gap-x-2 p-2">
      <Button className="" onClick={() => handleIsDrawingChange(myId)}>
        isDrawing
      </Button>
    </div>
  );
}
