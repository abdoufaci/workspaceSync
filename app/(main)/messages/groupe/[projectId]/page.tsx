import { db } from "@/lib/db";

export default async function page({
  params,
}: {
  params: { projectId: string };
}) {
  return <div>groupe chat for project: {params.projectId}</div>;
}
