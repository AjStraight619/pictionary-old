import { useMutation } from "@/liveblocks.config";

export default function Test() {
  const handleIsDrawingChange = useMutation(({ setMyPresence }) => {
    setMyPresence({ isDrawing: true }, { addToHistory: true });
  }, []);
}
