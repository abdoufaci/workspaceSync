import { currentUser } from "@clerk/nextjs";
import { getProjectById } from "@/actions/queries/getProjectById";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import EditProjectBtn from "../components/EditProjectBtn";
import ChatVideoButton from "../../messages/components/ChatVideoButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import GroupeMessages from "../../messages/components/GroupeMessages";
import ChatInput from "../../messages/components/ChatInput";
import { getCurrentUser } from "@/actions/queries/getCurrentUser";
import MediaRoom from "@/components/media-room";

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: { video: boolean };
  params: { projectId: string };
}) {
  const currentUser = await getCurrentUser();
  const project = await getProjectById({
    id: params.projectId,
    withClient: true,
  });

  let items = project.assignedTo.map((employee, idx) => ({
    id: idx,
    name: employee.username || "workspaceSync employee",
    image: employee.imageUrl || "/avatar.png",
    designation: employee.employeeRole || "Chikoour",
  }));

  let completed = 0;

  project.steps.map((step) => step.completed && completed++);

  return (
    <div className="flex justify-around h-[calc(100vh-81px)] w-full p-6 py-4 bg-gray-sub-100">
      <div className="flex flex-col gap-y-4 px-2 py-4 bg-white rounded-xl w-[42%]">
        {currentUser?.role != "CLIENT" && <EditProjectBtn project={project} />}
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-y-4 px-6">
            <div className="flex items-center gap-x-2 justify-between">
              <div className="flex items-center gap-x-3">
                <Image
                  alt="project image"
                  src={project.imageUrl || "/avatar.png"}
                  height={100}
                  width={100}
                  className="h-24 w-24 rounded-xl object-cover"
                />
                <div className="flex flex-col gap-y-2">
                  {project.to && (
                    <p className="text-sm">
                      {formatDistanceToNow(new Date(project.to))} left
                    </p>
                  )}
                  <h1 className="font-semibold text-3xl">{project.title}</h1>
                </div>
              </div>
              <Badge
                variant={
                  project.stat === "inProgress" ? "pending" : project.stat
                }>
                {project.stat}
              </Badge>
            </div>
            <p className="text-sm leading-tight">{project.description}</p>
            <div>
              <p className="text-primary-blue">
                {project.stat === "completed"
                  ? 100
                  : project.stat === "notStarted"
                  ? 0
                  : Math.round((completed / project.steps.length) * 100)}
                %
              </p>
              <Progress
                value={
                  project.stat === "completed"
                    ? 100
                    : project.stat === "notStarted"
                    ? 0
                    : (completed / project.steps.length) * 100
                }
                className="h-[10px]"
              />
            </div>
            <div className="ml-1 flex items-center gap-2">
              <AnimatedTooltip items={items} />
            </div>
            <Separator />
            <div className="flex gap-x-2">
              {project.steps.map((step, index) => (
                <div key={step.title} className="w-full">
                  <div className="flex">
                    <h1 className="font-semibold text-lg">
                      STEP {index + 1} :
                    </h1>
                    <h1 className="text-lg">{step.title}</h1>
                  </div>
                  <Progress
                    className="h-[30px] rounded-lg"
                    value={step.completed ? 100 : 0}
                  />
                </div>
              ))}
            </div>
            <p className="pt-2">{project.projectDetails}</p>
          </div>
        </ScrollArea>
      </div>
      <div className="flex flex-col px-4 py-2 bg-white rounded-xl w-[54%]">
        <div className="w-full pb-2 px-2 flex border-b justify-between items-center">
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
            <div className="px-6 pt-2">
              <ChatInput
                userId={currentUser?.id}
                projectId={project.id}
                withClient={true}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
