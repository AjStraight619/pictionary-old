import { SendIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Message } from "@/lib/types";
import { useCallback, useState } from "react";

type ChatInputProps = {
  handleSendMessage: (message: string) => void;
  input: string;
  setInput: (input: string) => void;
};

export default function ChatInput({
  handleSendMessage,
  input,
  setInput,
}: ChatInputProps) {
  const handleInputChange = useCallback(
    (input: string) => {
      setInput(input);
    },
    [setInput]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;
    handleSendMessage(input.trim());
  };

  return (
    <div className="relative w-full">
      <Input
        value={input}
        onKeyDown={handleKeyDown}
        placeholder="Guess the word..."
        onChange={(e) => handleInputChange(e.target.value)}
      />
      <Button
        onClick={() => handleSendMessage(input)}
        className="absolute transfrom -translate-y-1/2  top-1/2 right-1"
        variant="ghost"
        size="sm"
      >
        <SendIcon size={20} />
      </Button>
    </div>
  );
}
