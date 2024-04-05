"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Project, User } from "@prisma/client";
import { MessageSquare, PenLine } from "lucide-react";

export default function EditProjectBtn({
  project,
  teamLeader,
  client,
}: {
  project: Project;
  teamLeader: User;
  client: User;
}) {
  const { onOpen } = useModal();

  return (
    <div className="flex gap-x-4 self-end">
      <MessageSquare />
      <PenLine
        role="button"
        onClick={() => onOpen("addProject", { project, teamLeader, client })}
      />
    </div>
  );
}
