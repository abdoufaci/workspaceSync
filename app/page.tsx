import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { SignInButton, SignUpButton, currentUser } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function Home() {
  const clerkUser = await currentUser();

  if (clerkUser) {
    const email = clerkUser?.emailAddresses[0].emailAddress;
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (user?.activated) {
      redirect("/dashboard");
    } else {
      redirect("/onboarding");
    }
  }

  return (
    <div className="flex gap-x-2 p-2">
      workSyncPro
      <Button>
        <SignInButton />
      </Button>
      <Button>
        <SignUpButton />
      </Button>
    </div>
  );
}
