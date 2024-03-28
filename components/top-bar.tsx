import { UserButton, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import OpenModalButton from "./OpenModalButton";

export default async function Topbar() {
  return (
    <div className="flex gap-x-4 items-center h-[80px] border-b flex-row-reverse pr-2">
      <UserButton afterSignOutUrl="/" />
      <Link href="/onboarding">
        <Button>Edit Profile Infos</Button>
      </Link>
      <OpenModalButton modalName={"taskStatus"} />
      top-bar
    </div>
  );
}
