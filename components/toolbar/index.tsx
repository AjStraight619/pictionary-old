import {
  Circle,
  MousePointer2,
  Pencil,
  RectangleHorizontal,
  Trash2,
  Triangle,
} from "lucide-react";
import ToolbarButton from "./toolbar-button";
import { Element } from "@/lib/types";

type ToolbarProps = {
  activeElement: Element;
  handleSelectElement: (element: Element) => void;
};

export default function Toolbar({
  activeElement,
  handleSelectElement,
}: ToolbarProps) {
  return (
    <div className="fixed bottom-6 transform -translate-x-[calc(1/2 - 20rem)] left-[calc(1/2 - 20rem)] p-4 bg-white shadow-xl rounded-lg">
      <div className="flex items-center gap-x-2">
        <ToolbarButton
          isActive={activeElement === "selector"}
          onClick={() => handleSelectElement("selector")}
        >
          <MousePointer2 />
        </ToolbarButton>
        <ToolbarButton
          isActive={activeElement === "pencil"}
          onClick={() => handleSelectElement("pencil")}
        >
          <Pencil />
        </ToolbarButton>
        <ToolbarButton
          isActive={activeElement === "rectangle"}
          onClick={() => handleSelectElement("rectangle")}
        >
          <RectangleHorizontal />
        </ToolbarButton>
        <ToolbarButton
          isActive={activeElement === "circle"}
          onClick={() => handleSelectElement("circle")}
        >
          <Circle />
        </ToolbarButton>
        <ToolbarButton
          isActive={activeElement === "triangle"}
          onClick={() => handleSelectElement("triangle")}
        >
          <Triangle />
        </ToolbarButton>
        <ToolbarButton onClick={() => handleSelectElement("trash")}>
          <Trash2 />
        </ToolbarButton>
      </div>
    </div>
  );
}
