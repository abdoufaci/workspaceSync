import { getCurrentUser } from "@/actions/queries/getCurrentUser";
import OpenModalButton from "@/components/OpenModalButton";
import UserCard from "@/components/UserCard";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUser();

  if (user?.role !== "manager") {
    redirect("/dashbord");
  }

  const invitations = await clerkClient.invitations.getInvitationList();
  const allowlistIdentifiers =
    await clerkClient.allowlistIdentifiers.getAllowlistIdentifierList();

  return (
    <div className="m-2 pl-10">
      <OpenModalButton modalName={"inviteUser"} />
      <div className="flex justify-around">
        <div className="flex flex-col items-center gap-y-2">
          <h1 className="text-2xl font-bold">Allowed Users List</h1>
          {allowlistIdentifiers.map((allowListIdentifier) => (
            <UserCard
              key={allowListIdentifier.id}
              identifierId={allowListIdentifier.id}
              identifier={allowListIdentifier.identifier}
              email={user.email}
            />
          ))}
        </div>
        <Separator className="h-[400px]" orientation="vertical" />
        <div className="flex flex-col items-center gap-y-2">
          <h1 className="text-2xl font-bold">Invitations List</h1>
          {invitations.map((invitation) => (
            <div key={invitation.id} className="flex gap-x-2 items-center py-2">
              {invitation.emailAddress}
              {invitation.status === "accepted" ? (
                <Badge className="bg-green-600 hover:bg-green-600">
                  Accepted
                </Badge>
              ) : (
                <Badge>Pending</Badge>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
