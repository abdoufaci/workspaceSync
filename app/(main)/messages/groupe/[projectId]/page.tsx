import { getCurrentUser } from "@/actions/queries/getCurrentUser";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/lib/db";
import Image from "next/image";
import ChatInput from "../../components/ChatInput";
import Link from "next/link";
import { File } from "lucide-react";

export default async function page({
  params,
}: {
  params: { projectId: string };
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
        <div className="w-full p-3 flex gap-x-4 border-b items-center">
          <Image
            alt="logo"
            src={project.imageUrl || "/avatar.png"}
            height={"200"}
            width={"200"}
            className="h-16 w-16 rounded-xl"
          />
          <h1 className="text-2xl font-semibold">{project.title}</h1>
        </div>
        <ScrollArea className="flex-1">
          <div className="flex flex-col">
            {project.messages.map((message) => (
              <div
                key={message.id}
                className={`flex px-4 py-2 gap-x-2 hover:bg-gray-200 ${
                  currentUser?.id == message.fromId &&
                  "self-end flex-row-reverse"
                }`}
              >
                <Image
                  alt="logo"
                  src={message.from.imageUrl || "/avatar.png"}
                  height={"200"}
                  width={"200"}
                  className="h-12 w-12 rounded-xl"
                />
                <div className="flex flex-col gap-y-1">
                  <h1
                    className={`font-semibold ${
                      currentUser?.id == message.fromId && "self-end"
                    }`}
                  >
                    {message.from.firstName}
                  </h1>
                  <div className="bg-blue-400 font-light rounded-2xl px-4 py-2">
                    {message.contents.map((content: any) => (
                      <div
                        className="flex max-w-[300px] items-center m-[2px] rounded-md"
                        key={content.id}
                      >
                        {content.type == "image" ? (
                          <Image
                            alt="media image"
                            src={content.content}
                            width={1000}
                            height={1000}
                            className="rounded-md object-fill"
                          />
                        ) : content.type == "video" ? (
                          <video
                            width="320"
                            height="240"
                            controls
                            preload="none"
                          >
                            <source src={content.content} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : content.type == "pdf" ? (
                          <Link
                            target="_blank"
                            href={content.content}
                            className="flex justify-center items-center w-full px-2 gap-x-1 h-[70px] bg-[#c61a0e] text-[#eee3e4] rounded-xl"
                          >
                            <File />
                            {content.name}
                          </Link>
                        ) : content.type == "audio" ? (
                          <audio controls src={content.content}></audio>
                        ) : (
                          <div className="text-lg text-white">
                            {content.content}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="px-6 pb-4 pt-2">
          <ChatInput userId={currentUser?.id} projectId={project.id} />
        </div>
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
                className="h-16 w-16 rounded-xl"
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
                  className="h-16 w-16 rounded-xl"
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
