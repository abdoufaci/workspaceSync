import { Separator } from "@/components/ui/separator";
import ChatsSidebar from "./components/ChatsSidebar";

const MessagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-[calc(100vh-81px)] w-full]">
      <div className="flex flex-col w-1/5 h-full">
        <div className="w-full p-1 text-center">
          <h1 className="text-xl font-semibold">Chats</h1>
        </div>
        <div className="flex justify-center">
          <Separator className="w-[30%] bg-gray-300" />
        </div>
        <ChatsSidebar />
      </div>
      <div className="w-4/5 border-l">{children}</div>
    </div>
  );
};

export default MessagesLayout;
