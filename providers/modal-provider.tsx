"use client";

import { useEffect, useState } from "react";

import { TaskStatusModal } from "@/components/modals/TaskStatusModal";
import { InviteModal } from "@/components/modals/InviteModal";
import { RemoveMemberModal } from "@/components/modals/remove-member-modal";
import { ProjectModal } from "@/components/modals/ProjectModal";
import { EditMemberModal } from "@/components/modals/edit-member-modal";
import { AddTask } from "@/components/modals/add-task";
import { EditTask } from "@/components/modals/edit-task";
import { AddLabelModal } from "@/components/modals/add-label";
import { FileMessageModal } from "@/components/modals/FileMessageModal";
/*import { InviteModal } from "@/components/modals/invite-modal";
import { CreateServerModal } from "@/components/modals/create-server-modal";
import { MembersModal } from "@/components/modals/members-modal";
import { CreateChannelModal } from "@/components/modals/create-channel-modal";
import { LeaveServerModal } from "@/components/modals/leave-server-modal";
import { DeleteServerModal } from "@/components/modals/delete-server-modal";
import { DeleteChannelModal } from "@/components/modals/delete-channel-modal";
import { EditChannelModal } from "@/components/modals/edit-channel-modal";
import { MessageFileModal } from "@/components/modals/message-file-modal";
import { DeleteMessageModal } from "@/components/modals/delete-message-modal";*/

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  // if a hydrations error happens uncomment this

  return (
    <>
      <TaskStatusModal />
      <InviteModal />
      <RemoveMemberModal />
      <ProjectModal />
      <EditMemberModal />
      <AddTask />
      <EditTask />
      <AddLabelModal />
      <FileMessageModal />
    </>
  );
};
