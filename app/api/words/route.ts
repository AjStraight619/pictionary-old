import { wordData } from "./words";
import { WordDifficulty } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  let mode = req.nextUrl.searchParams.get("mode") as WordDifficulty;
  console.log("api hit: ", mode);
  const validModes: WordDifficulty[] = ["easy", "medium", "hard"];

  if (!validModes.includes(mode)) {
    mode = "easy";
  }

  const words = wordData[mode];
  const randomIndex = Math.floor(Math.random() * words.length);
  const randomWord = words[randomIndex];

  return NextResponse.json({ word: randomWord });
}
