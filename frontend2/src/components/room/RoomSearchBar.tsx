'use client';

interface RoomSearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

const RoomSearchBar = ({ value, onChange }: RoomSearchBarProps) => {
    return (
        <div className="px-3 py-2 bg-[#111b21]">
            <div className="flex items-center gap-2 bg-[#202c33] rounded-lg px-3 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Search or start new chat"
                    className="bg-transparent text-sm text-gray-300 placeholder-gray-500 outline-none w-full"
                />
            </div>
        </div>
    );
};

export default RoomSearchBar;
