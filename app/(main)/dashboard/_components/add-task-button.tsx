"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Plus } from "lucide-react";

function AddTaskButton({ taskType }: { taskType: string }) {
  const { onOpen } = useModal();

  return (
    <Plus
      onClick={() =>
        onOpen("addTask", {
          taskType,
        })
      }
      role="button"
      className="text-primary-blue bg-white rounded-full p-1"
    />
  );
}

export default AddTaskButton;
