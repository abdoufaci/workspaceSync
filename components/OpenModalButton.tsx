"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "./ui/button";

export default function OpenModalButton({ modalName }: any) {
  const { onOpen } = useModal();
  return (
    <Button
      onClick={() => {
        onOpen(modalName);
      }}
    >
      {modalName} modal
    </Button>
  );
}
