"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { AddProjectForm } from "../forms/AddProjectForm";
import { ScrollArea } from "../ui/scroll-area";

export const AddProject = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "addProject";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black w-[600px]">
        <DialogHeader className="pl-6 py-2">
          <DialogTitle className="text-xl text-center font-bold">
            Add Project
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[600px] w-full rounded-md pr-4">
          <AddProjectForm />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
