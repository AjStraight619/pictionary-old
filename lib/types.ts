import { fabric } from "fabric";
import { z } from "zod";
import { ProfileSchema } from "./schemas";
import { Presence } from "@/liveblocks.config";

export type Cursor = {
  x: number;
  y: number;
};

export type GameState = {
  isGameStarted: boolean;
  isGameOver: boolean;
};

export type RoundState = {
  isRoundStarted: boolean;
  isRoundOver: boolean;
  personDrawing: string;
  currentWord: string;
};

export type WordDifficulty = "easy" | "medium" | "hard";

export type ActiveElement = {
  value: Element;
  icon: React.ReactElement;
} | null;

export type Element =
  | "selector"
  | "pencil"
  | "rectangle"
  | "circle"
  | "triangle"
  | "trash";

export type WSMessage = {
  type: string;
  data: any;
};

export type TProfileSchema = z.infer<typeof ProfileSchema>;

export type CanvasMouseDown = {
  options: fabric.IEvent;
  canvas: fabric.Canvas;
  selectedElementRef: React.MutableRefObject<Element | null>;
  isDrawing: React.MutableRefObject<boolean>;
  shapeRef: React.MutableRefObject<fabric.Object | null>;
  lastUsedColorRef: React.MutableRefObject<string>;
  // strokeWidthRef: React.MutableRefObject<number>;
  setMyPresence: (
    patch: Partial<Presence>,
    options?:
      | {
          addToHistory: boolean;
        }
      | undefined
  ) => void;
};

export type CanvasMouseUp = {
  canvas: fabric.Canvas;
  isDrawing: React.MutableRefObject<boolean>;
  shapeRef: any;
  // activeObjectRef: React.MutableRefObject<fabric.Object | null>;
  selectedElementRef: React.MutableRefObject<Element | null>;
  // syncShapeInStorage: (shape: fabric.Object) => void;
  setActiveElement: (element: Element) => void;
  setMyPresence: (
    patch: Partial<Presence>,
    options?:
      | {
          addToHistory: boolean;
        }
      | undefined
  ) => void;
};

export type CanvasMouseMove = {
  options: fabric.IEvent;
  canvas: fabric.Canvas;
  isDrawing: React.MutableRefObject<boolean>;
  selectedElementRef: React.MutableRefObject<Element | null>;
  setMyPresence: (
    patch: Partial<Presence>,
    options?:
      | {
          addToHistory: boolean;
        }
      | undefined
  ) => void;
};

export interface CustomFabricObject<T extends fabric.Object>
  extends fabric.Object {
  objectId?: string;
}

export type CanvasPathCreated = {
  options: (fabric.IEvent & { path: CustomFabricObject<fabric.Path> }) | any;
};

export type CanvasKeyDown = {
  e: KeyboardEvent;
  canvas: fabric.Canvas;
};

export type CanvasResize = {
  e: UIEvent;
  canvas: fabric.Canvas;
};

export type ModifyShape = {
  canvas: fabric.Canvas;
  property: string;
  value: any;
  activeObjectRef: React.MutableRefObject<fabric.Object | null>;
  syncShapeInStorage: (shape: fabric.Object) => void;
};

export type UpdateShapeColor = {
  canvas: fabric.Canvas | null;
  lastUsedColor: string;
};

export type Message = {
  id: string;
  content: string;
  username: string;
  isCorrect: boolean;
  isClose: boolean;
};
