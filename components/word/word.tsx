"use client";

import { useMutation, useStorage } from "@/liveblocks.config";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Button } from "../ui/button";

export default function Word() {
  const currentWord = useStorage((root) => root.gameState.currentWord);
  const updateWord = useMutation(({ storage }, word: string) => {
    storage.get("gameState").set("currentWord", word);
  }, []);

  const testWord = "Ice Cream";

  // useEffect(() => {
  //   const fetchWord = async () => {
  //     const data = await fetch(`/api/words?mode=${"easy"}`);
  //     const { word } = await data.json();
  //     console.log("current word", word);
  //     if (word) {
  //       updateWord(word);
  //     }
  //   };
  //   fetchWord();
  // }, [updateWord]);

  const fetchWord = async () => {
    const response = await fetch(`/api/words?mode=${"easy"}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  // const { data, refetch, isFetching, error } = useQuery({
  //   queryKey: ["word"],
  //   queryFn: fetchWord,
  //   refetchOnMount: false,
  //   enabled: false,
  //   refetchOnWindowFocus: false,
  //   refetchOnReconnect: false,
  //   select: (data) => {
  //     updateWord(data);
  //   },
  // });

  // console.log("data: ", data);

  // console.log("current word: ", currentWord);
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
        {/* <Button onClick={() => refetch()}>Refetch word</Button> */}
      </div>
    </div>
  );
}
