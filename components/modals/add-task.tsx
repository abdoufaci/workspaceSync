"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { z } from "zod";

export const AddTaskFormSchema = z.object({
  image: z.string().optional(),
  title: z.array(z.string()),
  description: z.string(),
  assignTo: z
    .array(z.any())
    .nonempty({ message: "You have to select at least one employee." }),
  timeline: z.object({
    startDate: z.date(),
    endDate: z.date(),
  }),
  links: z.array(
    z.object({
      title: z.string(),
      link: z.string(),
    })
  ),
});

export const AddTask = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "addTask";

  const { taskType } = data;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white p-5 text-black">
        <DialogHeader className="">
          <DialogTitle className="text-xl text-left font-medium text-secondary-1">
            Add Task
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
