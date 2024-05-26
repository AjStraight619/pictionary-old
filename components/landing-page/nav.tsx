import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

export default function Nav() {
  return (
    <nav className="fixed top-0 w-full h-16 border-b border-muted-foreground">
      <div className="flex items-center justify-between px-2 h-full">
        <h1 className="text-2xl font-mono">Pictionary With Friends</h1>
        <div className="flex items-center gap-x-2">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Button asChild>
              <SignInButton>Sign In</SignInButton>
            </Button>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
