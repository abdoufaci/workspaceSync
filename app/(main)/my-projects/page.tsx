import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import ProjectsPageHeader from "./components/ProjectsPageHeader";
import { getProjects } from "@/actions/queries/getProjects";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default async function Page() {
  const projects = await getProjects();

  return (
    <div className="h-[calc(100vh-81px)] w-full p-5 bg-gray-sub-100">
      <ProjectsPageHeader />
      <div className="flex gap-2 flex-wrap mt-2">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col gap-y-2 p-6 pb-4 bg-white rounded-lg w-[32.82%]"
          >
            <div className="flex items-center gap-x-2">
              <Image
                alt="project image"
                src={project.imageUrl || "/avatar.png"}
                height={100}
                width={100}
                className="h-10 w-10 rounded-md object-cover"
              />
              <div>{project.title}</div>
              <Badge>{project.stat}</Badge>
            </div>
            {project.description}
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
            <div className="ml-1 mt-3 flex items-center gap-2">
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
        ))}
      </div>
    </div>
  );
}
