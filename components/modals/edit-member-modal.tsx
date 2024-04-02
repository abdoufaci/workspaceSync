"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { InviteForm } from "../forms/InviteForm";
import Image from "next/image";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { removeUser } from "@/actions/mutations/user-actions/removeUser";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import { Role } from "@prisma/client";

export const EditMemberModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "editUser";

  const router = useRouter();

  const { user } = data;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black">
        <DialogHeader className="px-6 py-2 flex flex-col items-center">
          <DialogTitle className="text-secondary-1 text-xl font-medium">
            Edit Employer
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
