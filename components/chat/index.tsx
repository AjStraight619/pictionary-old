import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { nanoid } from "nanoid";
import ChatInput from "./chat-input";
import { motion } from "framer-motion";
import { useMutation, useStorage } from "@/liveblocks.config";
import { ScrollArea } from "../ui/scroll-area";
import { LiveObject } from "@liveblocks/client";

const TESTWORD = "TEST WORD";

export default function Chat() {
  const [input, setInput] = useState("");

  const bottomOfMessagesRef = useRef<HTMLDivElement>(null);
  const messages = useStorage((root) => root.messages);

  const checkIsClose = (guess: string) => {
    const upperMessage = guess.toUpperCase();
    const upperTestWord = TESTWORD.toUpperCase();

    if (upperTestWord.length <= 2) {
      return false;
    }

    const partialTestWord = upperTestWord.slice(0, upperTestWord.length - 2);
    return upperMessage.includes(partialTestWord);
  };

  const handleSendMessage = useMutation(({ self, storage }, input: string) => {
    if (!input.trim()) return;
    const newMessage = {
      id: nanoid(),
      content: input.trim(),
      username: self.info.username,
      isCorrect: input.toUpperCase() === TESTWORD,
      isClose: checkIsClose(input),
    };

    const currentMessages = storage.get("messages");
    currentMessages.push(new LiveObject(newMessage));

    setInput("");
  }, []);

  useEffect(() => {
    if (bottomOfMessagesRef.current) {
      bottomOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const clearMessage = useMutation(({ storage }) => {
    storage.get("messages").clear();
  }, []);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Chat</CardTitle>
        {/* <Button onClick={clearMessage}>Clear</Button> */}
      </CardHeader>
      <ScrollArea>
        <CardContent className="flex-grow">
          <motion.ul>
            {messages.map((msg) => (
              <motion.li
                className="flex items-center gap-x-2 text-wrap"
                key={msg.id}
              >
                <span className="font-semibold">{msg.username}: </span>
                <span
                  className={`${
                    msg.isCorrect
                      ? "text-green-500"
                      : msg.isClose
                      ? "text-orange-400"
                      : ""
                  }`}
                >
                  {msg.content}
                </span>
              </motion.li>
            ))}
          </motion.ul>
          <div ref={bottomOfMessagesRef} />
        </CardContent>
      </ScrollArea>

      <CardFooter className="mt-auto">
        <ChatInput
          input={input}
          setInput={setInput}
          handleSendMessage={handleSendMessage}
        />
      </CardFooter>
    </Card>
  );
}
