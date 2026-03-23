import { SidebarHeaderProps } from "@/types/ui";

const SidebarHeader = ({ title, avatar, subtitle, extra, actions = [] }: SidebarHeaderProps) => {
    return (
        <div className="flex items-center gap-3 px-4 py-3 bg-[#202c33] flex-shrink-0">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-[#2a3942] flex-shrink-0 flex items-center justify-center text-gray-400 text-lg select-none">
                {avatar}
            </div>

            {/* Title + optional subtitle */}
            <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">{title}</p>
                {subtitle && (
                    <p className="text-gray-400 text-xs truncate">{subtitle}</p>
                )}
            </div>

            {/* Optional extra content (e.g. typing indicator, dropdown) */}
            {extra && <div className="flex items-center">{extra}</div>}

            {/* Action icon buttons */}
            {actions.length > 0 && (
                <div className="flex items-center gap-2">
                    {actions.map((action) => (
                        <button
                            key={action.label}
                            onClick={() => action.onClick?.()}
                            aria-label={action.label}
                            className="p-2 rounded-full hover:bg-[#2a3942] text-gray-400 transition-colors"
                        >
                            {action.icon}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SidebarHeader;
