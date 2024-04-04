import { Project } from "@prisma/client";
import { Badge } from "../ui/badge";

interface MemberStatusProps {
  projects?: Project[];
  isActivated?: boolean;
}

function MemberStatus({ projects, isActivated }: MemberStatusProps) {
  const isWorking = projects?.filter(
    (project) => project.stat === "inProgress"
  ).length;

  return (
    <Badge
      variant={`${
        isActivated ? (isWorking ? "working" : "paused") : "pending"
      }`}>
      {isActivated ? (isWorking ? "Working" : "Paused") : "Pending"}
    </Badge>
  );
}

export default MemberStatus;
