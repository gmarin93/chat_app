const TypingIndicator = ({ typingUser }: { typingUser: string }) => {
    return (
        <div className="flex items-center justify-center gap-2 px-3 py-1">
            <div className="bg-[#202c33] rounded-lg px-3 py-2 flex items-center gap-1.5">
                <span className="text-gray-400 text-xs font-bold">{typingUser} is typing</span>
                <span className="flex gap-0.5">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                </span>
            </div>
        </div>
    );
}
 
export default TypingIndicator;