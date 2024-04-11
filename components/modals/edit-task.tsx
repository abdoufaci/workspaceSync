"use client";

import { AddTaskForm } from "@/components/forms/add-task-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { z } from "zod";
import { ScrollArea } from "../ui/scroll-area";
import { EditTaskForm } from "../forms/edit-task-form";

export const EditTask = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "editTask";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white p-5 text-black">
        <DialogHeader className="">
          <DialogTitle className="text-xl text-left font-medium text-secondary-1">
            Edit Task
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[600px]">
          <EditTaskForm />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
