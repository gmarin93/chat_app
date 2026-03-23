import SideContent from "@/components/ui/SideContent";
import ChatWindow from "@/components/chat/ChatWindow";
import { ViewProvider } from "@/contexts/ViewContext";

const HomePage = () => {
  return (
    <ViewProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-[#111b21]">
        <aside className="w-[380px] min-w-[320px] flex-shrink-0 flex flex-col border-r border-[#2a3942]">
          <SideContent />
        </aside>

        <main className="flex flex-1 flex-col overflow-hidden">
          <ChatWindow />
        </main>
      </div>
    </ViewProvider>
  );
};

export default HomePage;