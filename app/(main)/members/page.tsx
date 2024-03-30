import MembersHeader from "@/components/members/members-header";
import MembersTable from "@/components/members/members-table";

interface MembersPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function MembersPage({ searchParams }: MembersPageProps) {
  const isClient = searchParams?.client === "true";

  return (
    <div className="h-[calc(100vh-81px)] w-full pt-5 bg-gray-sub-100 relative">
      <div className="h-[95%] w-[80%] my-auto mx-auto bg-white rounded-[3.3px] p-4">
        <MembersHeader isClient={isClient} />
        <MembersTable />
      </div>
    </div>
  );
}
