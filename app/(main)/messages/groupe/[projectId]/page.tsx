import { getCurrentUser } from "@/actions/queries/getCurrentUser";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/lib/db";
import Image from "next/image";
import ChatInput from "../../components/ChatInput";
import Link from "next/link";
import { File } from "lucide-react";
import GroupeMessages from "../../components/GroupeMessages";
import MediaRoom from "@/components/media-room";
import ChatVideoButton from "../../components/ChatVideoButton";
import UserChatCard from "../../components/UserChatCard";

export default async function page({
  params,
  searchParams,
}: {
  params: { projectId: string };
  searchParams: { video: boolean };
}) {
  const currentUser = await getCurrentUser();

  const project = await db.project.findUnique({
    where: {
      id: params.projectId,
      //current User is part of assignedTo or teamLeader
    },
    include: {
      assignedTo: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          username: true,
          imageUrl: true,
        },
      },
      teamLeader: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          username: true,
          imageUrl: true,
        },
      },
      messages: {
        where: {
          withClient: false,
        },
        include: {
          from: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              username: true,
              imageUrl: true,
            },
          },
          contents: true,
        },
      },
    },
  });

  if (!project) return <p>something went wrong</p>;

  return (
    <div className="flex h-full">
      <div className="flex flex-col h-full w-2/3">
        <div className="w-full p-2 flex border-b justify-between items-center">
          <div className="flex gap-x-2 items-center">
            <Image
              alt="logo"
              src={project.imageUrl || "/avatar.png"}
              height={"200"}
              width={"200"}
              className="h-12 w-12 rounded-xl"
            />
            <h1 className="text-xl font-semibold">{project.title}</h1>
          </div>
          <div className="pr-2">
            <ChatVideoButton />
          </div>
        </div>
        {searchParams.video ? (
          <MediaRoom chatId={project.id} currentUser={currentUser}></MediaRoom>
        ) : (
          <>
            <ScrollArea className="flex-1">
              <GroupeMessages project={project} currentUser={currentUser} />
            </ScrollArea>
            <div className="px-6 pb-4 pt-2">
              <ChatInput
                userId={currentUser?.id}
                projectId={project.id}
                withClient={false}
              />
            </div>
          </>
        )}
      </div>
      <div className="h-full w-1/3 border-l p-4 flex flex-col gap-y-2">
        <div>
          <h1 className="text-lg font-semibold">Team Leader</h1>
          <Link href={`/messages/${project.teamLeader.id}`}>
            <UserChatCard otherUser={project.teamLeader} />
          </Link>
        </div>
        <div>
          <h1 className="text-lg font-semibold">Team Members</h1>
          {project.assignedTo.map((employee) => (
            <Link key={employee.id} href={`/messages/${employee.id}`}>
              <UserChatCard otherUser={employee} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
