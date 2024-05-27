"use client";

import { useMutation, useStorage } from "@/liveblocks.config";
import { useEffect } from "react";

export default function Word() {
  const currentWord = useStorage((root) => root.gameState.currentWord);
  const updateWord = useMutation(({ storage }, word: string) => {
    storage.get("gameState").set("currentWord", word);
  }, []);

  const testWord = "Ice Cream";

  useEffect(() => {
    const fetchWord = async () => {
      const data = await fetch(`/api/words?mode=${"easy"}`);
      const { word } = await data.json();
      if (word) {
        updateWord(word);
      }
    };
    fetchWord();
  }, [updateWord]);

  return (
    <div className="absolute transform top-1 -translate-x-1/2 left-1/2">
      <div className="flex flex-row text-xl items-center justify-center gap-x-2 p-2 bg-white shadow-xl rounded-md">
        {testWord.split("").map((char, idx) => (
          <div
            className="flex flex-col items-center -space-y-4"
            key={idx}
            style={{ minHeight: "2rem" }}
          >
            <span>{char !== " " ? char.toUpperCase() : "\u00A0"}</span>
            <span className="block mt-auto">__</span>
          </div>
        ))}
      </div>
    </div>
  );
}
