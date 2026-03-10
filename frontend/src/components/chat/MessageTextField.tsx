import { InputProps } from "@/types/ui";

const MessageTextField = ({ value, onChange, onKeyDown }: InputProps) => {
    return (
        <div className="flex-1 bg-[#2a3942] rounded-lg px-4 py-2.5">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange?.(e)}
                onKeyDown={onKeyDown}
                placeholder="Type a message"
                className="w-full bg-transparent text-sm text-white placeholder-gray-500 outline-none"
            />
        </div>
    );
};

export default MessageTextField;
