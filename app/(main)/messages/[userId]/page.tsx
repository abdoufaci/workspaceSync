import { db } from "@/lib/db";

export default async function page({ params }: { params: { userId: string } }) {
  return <div>chat with user: {params.userId}</div>;
}
