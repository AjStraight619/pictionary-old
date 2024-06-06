import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { COLORS } from "./constants";
import pako from "pako";
import { WSMessage } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  return message;
};

export const assignColor = (connectionId: number) => {
  return COLORS[connectionId % COLORS.length];
};

// Compress a message
export function compressMessage(message: object): Uint8Array {
  const jsonString = JSON.stringify(message);
  return pako.deflate(jsonString);
}

// Decompress a message
export function decompressMessage(data: ArrayBuffer): WSMessage {
  const compressedData = new Uint8Array(data);
  const decompressedData = pako.inflate(compressedData, { to: "string" });
  return JSON.parse(decompressedData);
}
