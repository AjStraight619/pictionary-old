"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
type Message = {
  type: string;
  data: object;
};
export default function Timer() {
  const socketRef = useRef<WebSocket | null>(null);
  const [timer, setTimer] = useState<number | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/ws");
    socket.onopen = (event) => {
      console.log("Socket connected ");
    };
    socket.onmessage = (event) => {
      console.log(event.data);
      const data = JSON.parse(event.data);
      const { data: timer } = data;
      console.log("data: ", data);
      setTimer(timer);
    };

    socketRef.current = socket;

    return () => {
      socket.close();
    };
  }, [socketRef]);

  const sendMessage = () => {
    if (socketRef.current) {
      const message = {
        type: "startTimer",
        data: null,
      };
      socketRef.current.send(JSON.stringify(message));
    }
  };

  return (
    <div className="absolute top-2 right-2">
      <div className="flex flex-row items-center gap-x-2">
        <Button onClick={sendMessage}>Start Timer</Button>
        <span>{timer}</span>
      </div>
    </div>
  );
}
