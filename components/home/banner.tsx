import Image from "next/image";
import { Button } from "../ui/button";
import { SignUpButton } from "@clerk/nextjs";

function Banner() {
  return (
    <div>
      <div className="flex items-center justify-center py-8 text-[#404040]">
        <div className="text-5xl font-bold w-[850px] flex flex-wrap justify-center items-center gap-3 mx-auto">
          <h1>The most effective technique to</h1>
          <div className="bg-blue-200 px-2 py-1 pb-3 rounded-md border text-[#1E78FF] relative">
            manage
            <Image
              src="/cursor.png"
              height={18}
              width={18}
              alt="cursor"
              className="absolute -bottom-4 right-3"
            />
            <div className="w-full h-full absolute top-0 left-0 rounded-md block"></div>
          </div>
          <h1>your team</h1>
        </div>
      </div>
      <p className="text-[#404040] text-center text-sm w-[550px] mx-auto">
        we're revolutionizing the way teams collaborate and manage projects. Our
        intuitive platform combines powerful project management tools
      </p>
      <div className="flex items-center justify-center mt-7">
        <Button className="rounded-md text-xl font-light bg-gradient-to-r from-[#2684FF] via-[#41BDF2] to-[#299EB8] text-white w-48 h-11 shadow-lg">
          <SignUpButton>Get Started</SignUpButton>
        </Button>
      </div>
    </div>
  );
}

export default Banner;
