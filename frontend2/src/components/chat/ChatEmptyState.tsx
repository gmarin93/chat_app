const ChatEmptyState = () => {
    return (
        <div className="flex flex-1 flex-col items-center justify-center h-full bg-[#222e35]">
            <div className="flex flex-col items-center gap-4 text-center px-8">
                <div className="w-20 h-20 rounded-full bg-[#2a3942] flex items-center justify-center text-4xl select-none">
                    💬
                </div>
                <h2 className="text-white text-2xl font-light">Open a chat</h2>
                <p className="text-gray-500 text-sm max-w-xs">
                    Select a room from the sidebar to start chatting
                </p>
            </div>
        </div>
    );
};

export default ChatEmptyState;
