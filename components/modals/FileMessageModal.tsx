"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import FileMessageForm from "../forms/FileMessageForm";

export const FileMessageModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "fileMessageModal";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="text-black gap-y-0 w-[400px] p-4">
        <DialogHeader>
          <DialogTitle className="text-lg text-center font-semibold">
            File Message Modal
          </DialogTitle>
        </DialogHeader>
        <FileMessageForm
          userId={data.userId}
          projectId={data.projectId}
          chatId={data.chatId}
          withClient={data.withClient}
        />
      </DialogContent>
    </Dialog>
  );
};
