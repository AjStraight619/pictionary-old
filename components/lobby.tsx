import { useOthers, useSelf } from "@/liveblocks.config";
import { useMemo } from "react";

export default function Lobby() {
  const self = useSelf();
  const others = useOthers();

  const everyone = useMemo(() => {
    return [self, ...others];
  }, [others, self]);

  return (
    <div>
      {everyone.map((user) => (
        <div key={user.connectionId}>{user.connectionId}</div>
      ))}
    </div>
  );
}
