import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";

export default async function Page({
  params,
}: {
  params: { projectId: string };
}) {
  return (
    <div className="h-[calc(100vh-81px)] w-full p-6 bg-gray-sub-100">
      project with id : {params.projectId} page
    </div>
  );
}
