import { getCurrentUser } from "@/actions/queries/getCurrentUser";
import { MemberDetail } from "@/components/members/member-detail";
import MembersHeader from "@/components/members/members-header";
import MembersTable from "@/components/members/members-table";
import { clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface MembersPageProps {
  params?: {
    memberType: string;
  };
}

export default async function MembersPage({ params }: MembersPageProps) {
  const currentUser = await getCurrentUser();

  if (currentUser?.role != "MANAGER") {
    redirect("/");
  }

  const isClient = params?.memberType === "client";
  const allowlistIdentifiers =
    await clerkClient.allowlistIdentifiers.getAllowlistIdentifierList();

  const convertedAllowList = allowlistIdentifiers.map((allow) => ({
    id: allow.id,
    identifier: allow.identifier,
  }));

  return (
    <div className="h-[calc(100vh-81px)] flex items-center gap-x-5 w-full p-5 bg-gray-sub-100 relative">
      <div className="h-[95%] w-[80%] my-auto mx-auto bg-white rounded-[3.3px] p-4 relative">
        <MembersHeader isClient={isClient} />
        <MembersTable
          isClient={isClient}
          allowlistIdentifiers={convertedAllowList}
        />
      </div>
      <MemberDetail />
    </div>
  );
}
