import { getCurrentUser } from "@/actions/queries/getCurrentUser";
import { getUserChats } from "@/actions/queries/getUserChats";
import ChatDisplayAndSearch from "./ChatDisplayAndSearch";

export default async function ChatsSidebar() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <p>could not fetch currentUser</p>;
  }

  const data = await getUserChats({
    userId: currentUser.id,
    userRole: currentUser.role,
  });

  return (
    <div className="flex flex-col p-1">
      <ChatDisplayAndSearch
        currentUser={currentUser}
        chats={data?.chats}
        projects={data?.projects}
      />
    </div>
  );
}
