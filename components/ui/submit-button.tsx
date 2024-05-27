import { ReactNode } from "react";
import { Button } from "./button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type SubmitButtonProps = {
  isPending: boolean;
  children: ReactNode;
  className?: string;
};

export default function SubmitButton({
  isPending,
  children,
  className,
}: SubmitButtonProps) {
  return (
    <Button
      className={cn(
        "w-full font-serif",
        className,
        isPending && "bg-opacity-50"
      )}
      disabled={isPending}
      type="submit"
    >
      {isPending ? <Loader2 className="animate-spin" /> : children}
    </Button>
  );
}
