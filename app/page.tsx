import { UserButton } from "@clerk/nextjs";
import { getTest } from "../lib/getTets";

export default async function Home() {
  return (
    <main className="">
      <UserButton />
    </main>
  );
}
