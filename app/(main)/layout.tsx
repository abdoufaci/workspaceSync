import SideBar from "@/components/side-bar";
import Topbar from "@/components/top-bar";
import { ModalProvider } from "@/providers/modal-provider";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full w-full flex">
      <ModalProvider />
      <SideBar />
      <div className="w-full">
        <Topbar />
        {children}
      </div>
    </main>
  );
};

export default MainLayout;
