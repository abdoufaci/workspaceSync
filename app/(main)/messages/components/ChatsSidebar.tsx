import { getCurrentUser } from "@/actions/queries/getCurrentUser";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import UserChatCard from "./UserChatCard";

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

  if (!data) {
    return <p>something went wrong</p>;
  }

  const { projects, chats } = data;

  return (
    <div className="flex flex-col p-2">
      <Input
        className="bg-gray-sub-100 mb-2 h-12 p-4"
        placeholder="doesn't work yet..."
      />
      {projects.map((project) => (
        <Link key={project.id} href={`/messages/groupe/${project.id}`}>
          <ProjectCard project={project} />
        </Link>
      ))}
      {chats.map((chat) => (
        <Link key={chat.users[0].id} href={`/messages/${chat.users[0].id}`}>
          <UserChatCard otherUser={chat.users[0]} />
        </Link>
      ))}
    </div>
  );
}
