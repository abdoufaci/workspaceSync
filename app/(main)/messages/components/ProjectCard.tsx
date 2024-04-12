"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

export default function ProjectCard({ project }: any) {
  const params = useParams();

  return (
    <div
      className={`flex p-3 rounded-xl gap-y-2 items-center gap-x-2 hover:bg-gray-sub-100 ${
        params.projectId == project.id && "bg-gray-200"
      }`}
    >
      <Image
        alt="logo"
        src={project.imageUrl || "/avatar.png"}
        height={"200"}
        width={"200"}
        className="h-16 w-16 rounded-xl"
      />
      <h1 className="text-xl font-semibold">{project.title}</h1>
    </div>
  );
}
