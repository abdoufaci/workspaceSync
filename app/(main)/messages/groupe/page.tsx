import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";

async function Page() {
  return (
    <div className="flex items-center justify-center w-2/3">
      groupe messages page
    </div>
  );
}

export default Page;
