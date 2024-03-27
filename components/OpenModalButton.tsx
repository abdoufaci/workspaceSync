"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "./ui/button";

export default function OpenModalButton() {
  const { onOpen } = useModal();
  return (
    <Button
      onClick={() => {
        onOpen("taskStatus");
      }}
    >
      OpenModalButton
    </Button>
  );
}
