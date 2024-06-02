import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function RoomLoading() {
  return (
    <div className="h-screen flex flex-col gap-4 overflow-hidden p-4">
      <div
        className="flex flex-row gap-x-4"
        style={{ height: "calc(50% - 8rem)" }}
      >
        <Card className="w-1/2 h-full overflow-hidden animate-pulse bg-muted/30 rounded-md flex px-6 pb-6 flex-col">
          <CardHeader>
            <CardTitle>
              <Skeleton className="w-[150px] h-10" />
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4 w-full">
            {Array.from({ length: 8 }).map((_, idx) => (
              <Skeleton className="h-10 rounded-md w-full" key={idx} />
            ))}
          </CardContent>
        </Card>
        <Card className="w-1/2 h-full overflow-hidden animate-pulse bg-muted/30 rounded-md flex px-6 pb-6 flex-col">
          <CardHeader>
            <CardTitle>
              <Skeleton className="w-[150px] h-10" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div className="flex flex-row items-center gap-x-2" key={idx}>
                <Skeleton className="rounded-full size-12" />
                <Skeleton className="h-10 rounded-md w-full" />
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Skeleton className="w-full h-9" />
          </CardFooter>
        </Card>
      </div>
      <div className="flex-1 flex gap-x-2 overflow-hidden w-full items-center justify-center relative animate-pulse bg-muted/30 rounded-md">
        <div className="flex items-center justify-between flex-col w-full h-full pt-2 pb-1">
          <Skeleton className="w-[200px] h-16 rounded-md" />
          <Skeleton className="w-[250px] h-16 rounded-md" />
        </div>
      </div>
    </div>
  );
}
