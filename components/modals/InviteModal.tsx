"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { InviteForm } from "../forms/InviteForm";

export const InviteModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "inviteUser";

  const { role } = data;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black">
        <DialogHeader className="px-6 py-2">
          <DialogTitle className="text-xl text-center font-bold">
            Invite {role === "CLIENT" ? "Client" : "Employee"}
          </DialogTitle>
        </DialogHeader>
        <InviteForm role={role} />
      </DialogContent>
    </Dialog>
  );
};
