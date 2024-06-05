"use client";

import { useMutation, useStorage } from "@/liveblocks.config";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function Word() {
  const currentWord = useStorage((root) => root.roundState.currentWord);
  const [words, setWords] = useState([]);
  const updateWord = useMutation(({ storage }, word: string) => {
    storage.get("roundState").set("currentWord", word);
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

  const fetchWords = async () => {
    const response = await fetch(`/api/words?mode=${"easy"}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const { data, refetch, isFetching, error } = useQuery({
    queryKey: ["word"],
    queryFn: fetchWords,
    refetchOnMount: false,
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (data && data.words) {
      setWords(data.words);
    }
  }, [data]);

  console.log("words: ", words);
  console.log("data:", data);

  // const getWordLength = () => {
  //   let count = 0
  //   testWord.split()
  // }
  return (
    <>
      {" "}
      {/* <div className="fixed top-2 lef-2">
        <Button onClick={() => refetch()}>Refetch word</Button>
      </div> */}
      {/* <div className="absolute transform top-1 -translate-x-1/2 left-1/2"> */}
      <div className="flex flex-col sm:flex-row items-center gap-x-2 md:gap-x-4 gap-y-1">
        <p className="text-muted-foreground text-sm self-start sm:self-end">
          Guess This:
        </p>
        <div className="flex flex-row text-lg items-center justify-center gap-x-2">
          {testWord.split("").map((char, idx) => (
            <div
              className="flex flex-col items-center -space-y-4"
              key={idx}
              style={{ minHeight: "2rem" }}
            >
              <span className="text-sm sm:text-lg">
                {char !== " " ? char.toUpperCase() : "\u00A0"}
              </span>
              <span className="block mt-auto text-sm">__</span>
            </div>
          ))}
        </div>
        <span className="self-start sm:self-end text-sm">
          {testWord.split(" ").join("").length}
        </span>
      </div>
      {/* </div> */}
    </>
  );
}
