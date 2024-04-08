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

export default async function Page({
  params,
}: {
  params: { projectId: string };
}) {
  const project = await getProjectById({ id: params.projectId });

  let items = project.assignedTo.map((employee, idx) => ({
    id: idx,
    name: employee.username || "workspaceSync employee",
    image: employee.imageUrl || "/avatar.png",
    designation: employee.employeeRole || "Chikoour",
  }));

  let completed = 0;

  project.steps.map((step) => step.completed && completed++);

  return (
    <div className="flex justify-center min-h-[calc(100vh-81px)] w-full p-6 bg-gray-sub-100">
      <div className="flex flex-col gap-y-8 px-6 py-10 bg-white rounded-xl w-[50%]">
        <EditProjectBtn project={project} />
        <div className="flex items-center gap-x-2 justify-between">
          <div className="flex items-center gap-x-3">
            <Image
              alt="project image"
              src={project.imageUrl || "/avatar.png"}
              height={100}
              width={100}
              className="h-24 w-24 rounded-xl object-cover"
            />
            <div>
              {project.to && (
                <p className="font-light text-sm">
                  {formatDistanceToNow(new Date(project.to))} left
                </p>
              )}
              <h1 className="font-bold text-3xl">{project.title}</h1>
            </div>
          </div>
          <Badge
            variant={project.stat === "inProgress" ? "pending" : project.stat}
          >
            {project.stat}
          </Badge>
        </div>
        <p className="text-sm font-extralight leading-tight">
          {project.description}
        </p>
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
                <h1 className="font-semibold text-lg">STEP {index + 1} :</h1>
                <h1 className="text-lg">{step.title}</h1>
              </div>
              <Progress
                className="h-[30px] rounded-lg"
                value={step.completed ? 100 : 0}
              />
            </div>
          ))}
        </div>
        <p>{project.projectDetails}</p>
      </div>
    </div>
  );
}
