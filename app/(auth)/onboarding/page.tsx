import { ProfileInfosForm } from "@/components/ProfileInfosForm";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";

async function Page() {
  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses[0].emailAddress;
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  return (
    <div>
      {!user?.activated && (
        <p>fill your profile infos, to activate your account.</p>
      )}
      <ProfileInfosForm user={user} clerkUserId={clerkUser?.id} />
    </div>
  );
}

export default Page;
