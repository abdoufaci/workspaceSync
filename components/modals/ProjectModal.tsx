"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { ProjectForm } from "../forms/ProjectForm";
import { ScrollArea } from "../ui/scroll-area";

export const ProjectModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const { project } = data;

  const isModalOpen = isOpen && type === "projectModal";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black w-[600px]">
        <DialogHeader className="pl-6 py-2">
          <DialogTitle className="text-xl text-center font-bold">
            {project ? "Edit Project" : "Add Project"}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[600px] w-full rounded-md pr-4">
          <ProjectForm defaultValues={project} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
