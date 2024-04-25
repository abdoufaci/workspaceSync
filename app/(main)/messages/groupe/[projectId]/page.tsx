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
        <div className="w-full p-3 flex gap-x-4 border-b justify-between items-center">
          <div className="flex gap-x-4 items-center">
            <Image
              alt="logo"
              src={project.imageUrl || "/avatar.png"}
              height={"200"}
              width={"200"}
              className="h-16 w-16 rounded-xl"
            />
            <h1 className="text-2xl font-semibold">{project.title}</h1>
          </div>
          <div>
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
              <ChatInput userId={currentUser?.id} projectId={project.id} />
            </div>
          </>
        )}
      </div>
      <div className="h-full w-1/3 border-l p-4 flex flex-col gap-y-2">
        <div>
          <h1 className="text-xl font-semibold">Team Leader</h1>
          <Link href={`/messages/${project.teamLeader.id}`}>
            <div
              className={`flex p-3 rounded-xl gap-y-2 items-center gap-x-2 hover:bg-gray-sub-100
          }`}
            >
              <Image
                alt="logo"
                src={project.teamLeader.imageUrl || "/avatar.png"}
                height={"200"}
                width={"200"}
                className="h-16 w-16 rounded-full"
              />
              <h1 className="text-xl font-semibold">
                {project.teamLeader.firstName}
              </h1>
            </div>
          </Link>
        </div>
        <div>
          <h1 className="text-xl font-semibold">Team Members</h1>
          {project.assignedTo.map((employee) => (
            <Link key={employee.id} href={`/messages/${employee.id}`}>
              <div
                className={`flex p-3 rounded-xl gap-y-2 items-center gap-x-2 hover:bg-gray-sub-100
              }`}
              >
                <Image
                  alt="logo"
                  src={employee.imageUrl || "/avatar.png"}
                  height={"200"}
                  width={"200"}
                  className="h-16 w-16 rounded-full"
                />
                <h1 className="text-xl font-semibold">{employee.firstName}</h1>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
