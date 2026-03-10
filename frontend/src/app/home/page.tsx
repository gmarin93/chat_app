import RoomList from "@/components/room/RoomList";
import ChatWindow from "@/components/chat/ChatWindow";

const HomePage = () => {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-[#111b21]">
            <aside className="w-[380px] min-w-[320px] flex-shrink-0 flex flex-col border-r border-[#2a3942]">
                <RoomList />
            </aside>

            <main className="flex flex-1 flex-col overflow-hidden">
                <ChatWindow />
            </main>
        </div>
    );
};

export default HomePage;