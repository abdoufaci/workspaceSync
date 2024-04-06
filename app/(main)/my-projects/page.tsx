import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import ProjectsPageHeader from "./components/ProjectsPageHeader";
import { getProjects } from "@/actions/queries/getProjects";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { formatDistanceToNow } from "date-fns";

export default async function Page() {
  const projects = await getProjects();

  return (
    <div className="min-h-[calc(100vh-81px)] w-full p-6 bg-gray-sub-100">
      <ProjectsPageHeader />
      <div className="flex flex-row gap-x-4 gap-y-6 flex-wrap mt-4">
        {projects.length == 0 && "no projects found"}
        {projects.map((project) => {
          let items = project.assignedTo.map((employee, idx) => ({
            id: idx,
            name: employee.username || "workspaceSync employee",
            image: employee.imageUrl || "/avatar.png",
            designation: employee.employeeRole || "Chikoour",
          }));

          let completed = 0;

          project.steps.map((step) => step.completed && completed++);

          return (
            <Link
              key={project.id}
              href={`my-projects/${project.id}`}
              className="w-[32.3%]"
            >
              <div className="flex flex-col gap-y-4 px-6 py-10 bg-white rounded-xl w-full">
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
                    variant={
                      project.stat === "inProgress" ? "pending" : project.stat
                    }
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
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
