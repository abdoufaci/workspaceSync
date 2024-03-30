//import { Channel, ChannelType, Server } from "@prisma/client";
import { Role } from "@prisma/client";
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
  | "addProject"
  | "editProject"
  | "inviteUser";

/*interface ModalData {
  server?: Server;
  channel?: Channel;
  channelType?: ChannelType;
  apiUrl?: string;
  query?: Record<string, any>;
}*/

interface ModalData {
  role?: Role;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
