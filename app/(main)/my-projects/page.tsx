import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import ProjectsPageHeader from "./components/ProjectsPageHeader";
import { getProjects } from "@/actions/queries/getProjects";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function Page() {
  const projects = await getProjects();

  return (
    <div className="h-[calc(100vh-81px)] w-full p-6 bg-gray-sub-100">
      <ProjectsPageHeader />
      <div className="flex gap-x-4 gap-y-6 flex-wrap mt-4">
        {projects.map((project) => (
          <Link key={project.id} href={`my-projects/${project.id}`}>
            <div className="flex flex-col gap-y-4 px-6 py-10 bg-white rounded-xl w-[32.3%]">
              <div className="flex items-center gap-x-2 justify-between">
                <div className="flex items-center gap-x-2">
                  <Image
                    alt="project image"
                    src={project.imageUrl || "/avatar.png"}
                    height={100}
                    width={100}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                  <h1 className="font-bold text-2xl">{project.title}</h1>
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
              <Progress
                value={
                  project.stat === "completed"
                    ? 100
                    : project.stat === "notStarted"
                    ? 0
                    : 50
                }
                className="h-[10px]"
              />
              <div className="ml-1 flex items-center gap-2">
                {project.assignedTo.slice(0, 4).map((employee, index) => (
                  <Image
                    key={index}
                    src={employee.imageUrl || "/avatar.png"}
                    alt={`user_${index}`}
                    width={24}
                    height={24}
                    className={`${
                      index !== 0 && "-ml-4"
                    } rounded-full object-cover`}
                  />
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
