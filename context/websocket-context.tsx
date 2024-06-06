import { Message, WSMessage } from "@/lib/types";
import { decompressMessage } from "@/lib/utils";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import WebSocket, { MessageEvent } from "ws";

type WebSocketProviderProps = {
  roomId: string;
  children: ReactNode;
};

type WebSocketContextType = {
  ws: WebSocket | null;
  drawingData: any;
  chatData: any[];
};

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export default function WebSocketProvider({
  roomId,
  children,
}: WebSocketProviderProps) {
  const wsRef = useRef<WebSocket | null>(null);
  const [drawingData, setDrawingData] = useState<any>(null);
  const [chatData, setChatData] = useState<any[]>([]);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8080/ws/${roomId}`);
    socket.binaryType = "arraybuffer";

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error", error);
    };

    socket.onmessage = (event: MessageEvent) => {
      try {
        const message: WSMessage = decompressMessage(event.data as ArrayBuffer);
        handleMessage(message);
      } catch (error) {
        console.error("Error decompressing message:", error);
      }
    };

    const handleMessage = (message: WSMessage) => {
      switch (message.type) {
        case "drawing":
          setDrawingData(message.data);
          break;
        case "chat":
          setChatData((prevChatData) => [...prevChatData, message.data]);
          break;
        default:
          console.error("Unknown message type:", message.type);
      }
    };

    wsRef.current = socket;

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [roomId]);

  return (
    <WebSocketContext.Provider
      value={{
        ws: wsRef.current,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
}

export const useWebsocket = () => {
  return useContext(WebSocketContext);
};
