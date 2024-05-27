"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

type ContentToShow = "create" | "join";

export default function RoomActionWrapper() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [contentToShow, setContenToShow] = useState<ContentToShow | undefined>(
    undefined
  );
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Create or Join Room</CardTitle>
        </CardHeader>
        <CardContent>
          <Button></Button>
        </CardContent>
      </Card>
    </>
  );
}
