"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

export default function ProjectCard({ project }: any) {
  const params = useParams();

  return (
    <div
      className={`flex p-2 rounded-xl items-center gap-x-2 hover:bg-gray-sub-100 ${
        params.projectId == project.id && "bg-gray-200"
      }`}
    >
      <Image
        alt="logo"
        src={project.imageUrl || "/avatar.png"}
        height={"200"}
        width={"200"}
        className="h-12 w-12 rounded-xl"
      />
      <h1 className="text-sm font-semibold">{project.title}</h1>
    </div>
  );
}
