import { redirect } from "next/navigation";

async function Page() {
  redirect("/messages");
}

export default Page;
