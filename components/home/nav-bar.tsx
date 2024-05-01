import Image from "next/image";
import { Button } from "../ui/button";
import { SignInButton } from "@clerk/nextjs";

function NavBar() {
  return (
    <div className="w-[85%] mx-auto flex items-center justify-between pt-3">
      <div className="flex text-[#404040] w-full items-center gap-x-2">
        <Image alt="logo" src="/logo.svg" height={"35"} width={"35"} />
        <h1 className="font-semibold">WorkSpaceSync</h1>
      </div>
      <Button variant={"blue"} className="text-white rounded-full w-24 h-8">
        <SignInButton />
      </Button>
    </div>
  );
}

export default NavBar;
