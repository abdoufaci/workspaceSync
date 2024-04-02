import { ProfileInfosForm } from "@/components/forms/ProfileInfosForm";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";

async function Page() {
  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses[0].emailAddress;
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  return (
    <div className="bg-[#F3F6F8] h-screen w-full relative overflow-hidden">
      <div className="flex items-center justify-center h-28 -space-x-2">
        <Image
          alt="logo"
          src="/logo.svg"
          height={"200"}
          width={"200"}
          className="h-20 w-20"
        />
        <h1 className="text-secondary-1 text-2xl font-semibold">
          WorkSpaceSync
        </h1>
      </div>
      <div className="h-[calc(100vh-112px)] w-full flex flex-col items-center justify-center">
        <div className=" w-[80%] md:w-[50%] lg:w-[30%] h-[80%] mx-auto rounded-lg bg-white p-5 space-y-12 relative">
          <h1 className="text-center text-secondary-1 text-lg w-80 mx-auto">
            Please feel free to write your personal informations
          </h1>
          <ProfileInfosForm user={user} />
        </div>
      </div>
    </div>
  );
}

export default Page;
