import { getCurrentUser } from "@/actions/queries/getCurrentUser";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/db";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import UserChatCard from "./UserChatCard";
import ChatSearch from "./ChatSearch";

export default async function ChatsSidebar() {
  const currentUser = await getCurrentUser();

  const data = await db.user.findUnique({
    where: {
      id: currentUser?.id,
    },
    include: {
      projects: {
        /*where: {
          messages: messages.length > 0
        },*/
        select: {
          id: true,
          title: true,
          imageUrl: true,
        },
      },
      chats: {
        /*where: {
          messages: messages.length > 0
        },*/
        include: {
          users: {
            where: {
              NOT: {
                id: currentUser?.id,
              },
            },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              username: true,
              imageUrl: true,
            },
          },
        },
      },
    },
  });

  const allProjects = await db.project.findMany(); //bad way to do it, gonna change it later

  if (!data || !allProjects) {
    return <p>something went wrong</p>;
  }

  const { projects, chats } = data;

  return (
    <div className="flex flex-col p-2">
      <ChatSearch
        chats={chats}
        projects={data.role == "MANAGER" ? allProjects : projects}
      />
    </div>
  );
}
