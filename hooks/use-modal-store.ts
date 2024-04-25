//import { Channel, ChannelType, Server } from "@prisma/client";
import { Card, Project, Role, User } from "@prisma/client";
import { SetStateAction } from "react";
import { create } from "zustand";

export type ModalType =
  | "teamMembers"
  | "addTask"
  | "groupDetails"
  | "conversation"
  | "taskDetails"
  | "taskStatus"
  | "links"
  | "assignTo"
  | "projectModal"
  | "inviteUser"
  | "removeUser"
  | "editUser"
  | "editTask"
  | "addLabel"
  | "fileMessageModal";

interface ModalData {
  role?: Role;
  user?: User & {
    projects: Project[];
  };
  identifierId?: string;
  taskType?: string;
  project?: Project;
  teamLeader?: User;
  client?: User;
  task?: Card & {
    assignedTo: User[];
  } & {
    creator: {
      imageUrl: string | null;
      username: string | null;
    };
  };
  currentUserId?: string;
  userId?: string;
  projectId?: string;
  chatId?: string;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
  isSelectedMemberOpen: boolean;
  onOpenSelectedMember: (data?: ModalData) => void;
  onCloseSelectedMember: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  isSelectedMemberOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
  onOpenSelectedMember: (data = {}) =>
    set({ isSelectedMemberOpen: true, data }),
  onCloseSelectedMember: () => set({ isSelectedMemberOpen: false }),
}));
