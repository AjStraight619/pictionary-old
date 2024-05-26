import { useOthers, useSelf } from "@/liveblocks.config";
import { PencilIcon } from "lucide-react";
import { useMemo } from "react";

export default function Lobby() {
  const self = useSelf();
  const others = useOthers();

  const everyone = useMemo(() => {
    return [self, ...others];
  }, [others, self]);

  return (
    <div className="">
      {everyone.map((user) => (
        <div className="text-black ml-2" key={user.connectionId}>
          {user.connectionId}
          <span>{self.presence.isDrawing && <PencilIcon size={15} />}</span>
        </div>
      ))}
    </div>
  );
}
