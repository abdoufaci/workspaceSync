import OpenModalButton from "@/components/OpenModalButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/db";
import { UserButton, clerkClient, currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses[0].emailAddress;
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user?.activated) {
    redirect("/onboarding");
  }

  const allowlistIdentifiers =
    await clerkClient.allowlistIdentifiers.getAllowlistIdentifierList();

  const invitations = await clerkClient.invitations.getInvitationList();

  const addEmployee = async (formData: any) => {
    "use server";

    const email = formData.get("email");

    await db.user.create({
      data: {
        email: email,
        role: "employee",
      },
    });

    await clerkClient.allowlistIdentifiers.createAllowlistIdentifier({
      identifier: email,
      notify: true,
    });

    revalidatePath("/");
  };

  const addClient = async (formData: any) => {
    "use server";

    const email = formData.get("email");

    await db.user.create({
      data: {
        email: email,
        role: "client",
      },
    });

    await clerkClient.allowlistIdentifiers.createAllowlistIdentifier({
      identifier: email,
      notify: true,
    });

    revalidatePath("/");
  };

  return (
    <div className="m-2 pl-10">
      <div className="flex gap-x-4 items-center">
        <UserButton afterSignOutUrl="/sign-in" />
        <Link href="/onboarding">
          <Button>Edit Profile Infos</Button>
        </Link>
        <OpenModalButton />
      </div>
      {user?.role === "manager" && (
        <div>
          <form action={addEmployee} className="flex flex-col gap-y-2 py-2">
            <Input name="email"></Input>
            <Button className="w-32">invite employee</Button>
          </form>
          <form action={addClient} className="flex flex-col gap-y-2 py-2">
            <Input name="email"></Input>
            <Button className="w-32">invite client</Button>
          </form>
          <div className="flex justify-around">
            <div className="flex flex-col items-center gap-y-2">
              <h1 className="text-2xl font-bold">Allowed Users List</h1>
              {allowlistIdentifiers.map((allowListIdentifier) => (
                <div
                  key={allowListIdentifier.id}
                  className="flex gap-x-2 items-center py-2"
                >
                  {allowListIdentifier.identifier}

                  {allowListIdentifier.identifier === email ? (
                    <Badge className="p-2 bg-blue-700 hover:bg-blue-700 text-base">
                      Manager
                    </Badge>
                  ) : (
                    <form
                      action={async () => {
                        "use server";

                        const user = await db.user.findFirst({
                          where: {
                            email: allowListIdentifier.identifier,
                          },
                        });

                        if (user?.clerkUserId) {
                          await clerkClient.users.deleteUser(user?.clerkUserId);
                        }

                        await db.user.delete({
                          where: {
                            email: allowListIdentifier.identifier,
                          },
                        });

                        await clerkClient.allowlistIdentifiers.deleteAllowlistIdentifier(
                          allowListIdentifier.id
                        );

                        revalidatePath("/");
                      }}
                    >
                      <Button variant="destructive">Remove User</Button>
                    </form>
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center gap-y-2">
              <h1 className="text-2xl font-bold">Invitations List</h1>
              {invitations.map((invitation) => (
                <div
                  key={invitation.id}
                  className="flex gap-x-2 items-center py-2"
                >
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
      )}
    </div>
  );
}
