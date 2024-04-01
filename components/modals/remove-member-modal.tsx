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

export const RemoveMemberModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "removeUser";

  const router = useRouter();

  const { user, identifierId } = data;

  const { mutate: removeUserMutation, isPending } = useMutation({
    mutationFn: () =>
      removeUser({
        identifierId,
        identifier: user?.email,
        userId: user?.clerkUserId || "",
        isClient: user?.role === Role.CLIENT ? true : false,
      }),
    onSuccess(data) {
      toast.success(`${data.username} removed successfully`);
      onClose();
      router.refresh();
    },
    onError() {
      toast.error("Something went wrong");
      onClose();
    },
  });

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black">
        <DialogHeader className="px-6 py-2 flex flex-col items-center">
          <Image
            alt="logo"
            src={user?.imageUrl || "/logo.png"}
            height={100}
            width={100}
            className="h-20 w-20 rounded-full"
          />
          <DialogTitle className="text-xl text-center font-medium">
            <h1 className="text-lg">
              Are you sure to delete{" "}
              <span className="text-primary-blue">@{user?.username}</span>
            </h1>
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-center items-center gap-5">
          <Button
            onClick={onClose}
            className="bg-secondary-1/95 hover:bg-secondary-1"
            size={"xl"}>
            Cancel
          </Button>
          <Button
            disabled={isPending}
            onClick={() => removeUserMutation()}
            size={"xl"}
            variant={"delete"}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
