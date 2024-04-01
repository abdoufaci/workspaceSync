"use client";

import { useModal } from "@/hooks/use-modal-store";
import { CircleFadingPlus } from "lucide-react";

export default function ProjectsPageHeader() {
  const { onOpen } = useModal();

  return (
    <div className="flex items-center gap-x-4">
      <h1 className="text-4xl font-semibold text-[#191919]">Projects</h1>
      <CircleFadingPlus
        role="button"
        color="#1778ff"
        strokeWidth={1.25}
        style={{
          backgroundColor: "#E7F1F8",
        }}
        className="rounded-full"
        onClick={() => onOpen("addProject")}
      />
    </div>
  );
}
