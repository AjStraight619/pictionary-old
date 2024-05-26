import { ReactNode } from "react";
import { Button } from "../ui/button";

type ToolbarButtonProps = {
  children: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
};

export default function ToolbarButton({
  children,
  isActive,
  onClick,
}: ToolbarButtonProps) {
  return (
    <Button
      size="icon"
      variant={isActive ? "default" : "ghost"}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
