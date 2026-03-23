"use client";

import { useState } from "react";
import { SidebarListProps } from "@/types/ui";


const SidebarList = <T,>({
    items,
    renderItem,
    keyExtractor,
    header,
    searchPlaceholder = "Search",
    filterKey,
    emptyMessage = "Nothing here yet",
    emptySearchMessage = "No results match your search",
}: SidebarListProps<T>) => {
    const [search, setSearch] = useState("");

    const filtered = items.filter((item) =>
        filterKey(item).toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full bg-[#111b21]">
            {/* Header slot */}
            {header}

            {/* Search bar */}
            <div className="px-3 py-2 bg-[#111b21]">
                <div className="flex items-center gap-2 bg-[#202c33] rounded-lg px-3 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={searchPlaceholder}
                        className="bg-transparent text-sm text-gray-300 placeholder-gray-500 outline-none w-full"
                    />
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
                {filtered.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center mt-8 px-4">
                        {search ? emptySearchMessage : emptyMessage}
                    </p>
                ) : (
                    filtered.map((item) => (
                        <div key={keyExtractor(item)}>
                            {renderItem(item)}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SidebarList;
