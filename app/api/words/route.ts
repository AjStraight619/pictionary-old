import { wordData } from "./words";
import { WordDifficulty } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  let mode = req.nextUrl.searchParams.get("mode") as WordDifficulty;
  console.log("API hit: ", mode);
  const validModes: WordDifficulty[] = ["easy", "medium", "hard"];

  if (!validModes.includes(mode)) {
    mode = "easy";
  }

  const words = wordData[mode];
  const getRandomWords = (num: number) => {
    const randomWords = new Set<string>();
    while (randomWords.size < num) {
      const randomIndex = Math.floor(Math.random() * words.length);
      randomWords.add(words[randomIndex]);
    }
    return Array.from(randomWords);
  };

  const randomWords = getRandomWords(3);

  console.log("random words: ", randomWords);

  return NextResponse.json({ words: randomWords });
}
