import { LayoutGrid, ListChecks, MessageSquare, Users } from "lucide-react";

export const sidebarcontent = [
  {
    title: "Dashboard",
    icon: <LayoutGrid className="h-4 w-4 " />,
    label: "/dashboard",
  },
  {
    title: "My Projects",
    icon: <ListChecks className="h-4 w-4 " />,
    label: "/my-projects",
  },
  {
    title: "Messages",
    icon: <MessageSquare className="h-4 w-4 " />,
    label: "/messages",
  },
  {
    title: "Members",
    icon: <Users className="h-4 w-4 " />,
    label: "/members",
  },
];
