"use client";

import { updatePlayer } from "@/actions/player";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/ui/submit-button";
import { ProfileSchema } from "@/lib/schemas";
import { TProfileSchema } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Player } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

type ProfileFormProps = {
  player: Player | null;
};

export default function ProfileForm({ player }: ProfileFormProps) {
  const { push } = useRouter();
  const { user, isLoaded } = useUser();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      email: player?.email ?? user?.primaryEmailAddress?.emailAddress ?? "",
      username: player?.username ?? "",
    },
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: TProfileSchema) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      updatePlayer(values).then((data) => {
        if (data?.success) {
          setSuccess("Successfully updated profile");
        } else if (data?.error) {
          setError("Error setting up profile");
        } else {
          return;
        }
      });
    });
  };

  if (!isLoaded) return null;

  return (
    <div className="flex items-center justify-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription className="pt-2">
            {!player ? (
              <span className="bg-yellow-100 rounded-md text-yellow-500 p-2">
                You must finish setting up your profile in order to join or
                create a room.
              </span>
            ) : success ? (
              <span className="bg-emerald-100 text-emerald-500 rounded-md p-2">
                {success}
              </span>
            ) : error ? (
              <span className="bg-red-100 text-red-500 rounded-md p-2">
                {error.trim() ?? null}
              </span>
            ) : null}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a username..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SubmitButton isPending={isPending}>Submit</SubmitButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
