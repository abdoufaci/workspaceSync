import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";

async function Page() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-sub-100"></div>
  );
}

export default Page;
