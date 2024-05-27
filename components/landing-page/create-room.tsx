import { CreateRoomSchema } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useState, useTransition } from "react";
import { createRoom } from "@/actions/room";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { useRouter } from "next/navigation";
import SubmitButton from "../ui/submit-button";

export default function CreateRoom() {
  const [error, setError] = useState("");
  const { push } = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof CreateRoomSchema>>({
    resolver: zodResolver(CreateRoomSchema),
    defaultValues: {
      name: "",
      isOpen: true,
      maxPlayers: 5,
    },
  });

  const onSubmit = (values: z.infer<typeof CreateRoomSchema>) => {
    setError("");
    startTransition(() => {
      createRoom(values).then((data) => {
        if (!data) {
          setError("Something went wrong, try again");
          return;
        }
        if (data.success && data.room) {
          push(`/room/${data.room.id}`);
          return;
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Name</FormLabel>
              <FormControl>
                <Input placeholder="My room" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isOpen"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value || false}
                  onCheckedChange={(checked) => field.onChange(checked)}
                  onBlur={field.onBlur}
                  ref={field.ref}
                />
              </FormControl>
              <div className="flex flex-col space-y-1 items-start justify-center">
                <FormLabel>Open </FormLabel>
                <FormDescription>
                  Choose whether this room is public
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxPlayers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Players</FormLabel>
              <FormControl>
                <Input max={8} min={2} {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton isPending={isPending}>Create Room</SubmitButton>
      </form>
    </Form>
  );
}
