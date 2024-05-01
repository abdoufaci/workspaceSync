"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Project } from "@prisma/client";
import { PenLine } from "lucide-react";

export default function EditProjectBtn({ project }: { project: Project }) {
  const { onOpen } = useModal();

  return (
    <div className="flex self-end pr-2">
      <PenLine
        role="button"
        onClick={() => onOpen("projectModal", { project })}
        className="text-black/70"
      />
    </div>
  );
}
