"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Project } from "@prisma/client";
import { MessageSquare, PenLine } from "lucide-react";

export default function EditProjectBtn({ project }: { project: Project }) {
  const { onOpen } = useModal();

  return (
    <div className="flex gap-x-4 self-end">
      <MessageSquare />
      <PenLine
        role="button"
        onClick={() => onOpen("projectModal", { project })}
      />
    </div>
  );
}
