import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";

async function Page() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      messages page
    </div>
  );
}

export default Page;
