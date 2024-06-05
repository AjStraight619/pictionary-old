import { getPlayerById, updatePlayer } from "@/actions/player";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/db";
import { ProfileSchema } from "@/lib/schemas";
import { TProfileSchema } from "@/lib/types";
import { EmailAddress, currentUser } from "@clerk/nextjs/server";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ProfileForm from "./_profile-form";

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user || !user.id) {
    redirect("/sign-in");
  }

  const player = await getPlayerById();

  return (
    <div className="flex items-center justify-center h-screen">
      <ProfileForm player={player} />
    </div>
  );
}
