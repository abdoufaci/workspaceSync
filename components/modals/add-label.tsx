"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { InviteForm } from "../forms/InviteForm";
import { AddLabelForm } from "../forms/add-label-form";

export const AddLabelModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "addLabel";

  const { task } = data;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black">
        <DialogHeader className="px-6 py-2">
          <DialogTitle className="text-xl text-center font-bold">
            Add Label
          </DialogTitle>
        </DialogHeader>
        <AddLabelForm task={task} />
      </DialogContent>
    </Dialog>
  );
};
