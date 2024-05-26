import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";

export default function Chat() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Chat</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div></div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Input />
      </CardFooter>
    </Card>
  );
}
