const RoomListHeader = () => {
    return (
        <div className="flex items-center justify-between px-4 py-3 bg-[#202c33]">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2a3942] flex items-center justify-center text-gray-400 text-lg select-none">
                    💬
                </div>
                <span className="text-white font-semibold text-base">Chats</span>
            </div>
            <button className="p-2 rounded-full hover:bg-[#2a3942] text-gray-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
            </button>
        </div>
    );
};

export default RoomListHeader;
