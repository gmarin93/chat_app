import { ReactNode } from "react";

export interface SidebarListItemProps {
    avatar: ReactNode;
    title: string;
    subtitle?: string;
    meta?: string;
    isActive?: boolean;
    onClick?: () => void;
}

const SidebarListItem = ({ avatar, title, subtitle, meta, isActive, onClick }: SidebarListItemProps) => {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-left
                ${isActive ? "bg-[#2a3942]" : "hover:bg-[#202c33]"}
            `}
        >
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-[#2a3942] flex-shrink-0 flex items-center justify-center text-xl select-none">
                {avatar}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 border-b border-[#2a3942] pb-3">
                <div className="flex justify-between items-baseline gap-2">
                    <span className="text-white text-sm font-medium truncate">{title}</span>
                    {meta && (
                        <span className="text-gray-500 text-xs flex-shrink-0">{meta}</span>
                    )}
                </div>
                {subtitle && (
                    <p className="text-gray-500 text-xs truncate mt-0.5">{subtitle}</p>
                )}
            </div>
        </button>
    );
};

export default SidebarListItem;
