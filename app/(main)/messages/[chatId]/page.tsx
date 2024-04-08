import { db } from "@/lib/db";

export default async function page({ params }: { params: { chatId: string } }) {
  return <div>chat: {params.chatId}</div>;
}
