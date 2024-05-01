import Banner from "@/components/home/banner";
import { HeroParallaxAni } from "@/components/home/hero-parallax";
import { Macbook } from "@/components/home/macbook";
import NavBar from "@/components/home/nav-bar";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
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
      if (user?.role === "CLIENT") {
        redirect("/my-projects");
      } else {
        redirect("/dashboard");
      }
    } else {
      redirect("/onboarding");
    }
  }

  return (
    <div className="w-full">
      <NavBar />
      <Banner />
      <div className="-mt-72 pointer-events-none">
        <Macbook />
      </div>
      <HeroParallaxAni />
    </div>
  );
}
