import { useMutation, useSelf } from "@/liveblocks.config";
import { Button } from "./ui/button";

export default function Test() {
  const myId = useSelf((me) => me.id);
  const handleIsDrawingChange = useMutation(({ setMyPresence }) => {
    setMyPresence({ isDrawing: true }, { addToHistory: true });
  }, []);

  return (
    <div className="flex items-center gap-x-2 p-2">
      <Button className="" onClick={handleIsDrawingChange}>
        isDrawing
      </Button>
    </div>
  );
}
