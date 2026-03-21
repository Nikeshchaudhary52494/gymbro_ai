import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex message-appear",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] flex gap-3",
          isUser ? "flex-row-reverse" : ""
        )}
      >
        <div
          className={cn(
            "w-8 h-8 flex-shrink-0 rounded-lg flex items-center justify-center text-xs font-black tracking-tighter uppercase shadow-md",
            isUser ? "bg-white/10 text-white" : "bg-[var(--gym-blue)] text-black"
          )}
        >
          {isUser ? "ME" : "GB"}
        </div>
        <div
          className={cn(
            "px-5 py-3 rounded-2xl text-sm leading-relaxed relative overflow-hidden",
            isUser
              ? "bg-[var(--gym-blue)] text-black font-bold shadow-lg"
              : "bg-[#181818] border border-white/5 text-white/90 shadow-xl gym-markdown"
          )}
        >
          {!isUser && (
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
          )}
          <div className="relative z-10">
            {isUser ? (
              <span className="whitespace-pre-wrap">{message.content}</span>
            ) : (
              <ReactMarkdown>{message.content}</ReactMarkdown>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function LoadingMessage() {
  return (
    <div className="flex gap-3 items-center message-appear">
      <div className="w-8 h-8 rounded-lg bg-[var(--gym-blue)] flex items-center justify-center text-black text-xs font-black tracking-tighter uppercase shadow-md">
        GB
      </div>
      <div className="bg-[#181818] px-5 py-4 rounded-2xl flex gap-1 border border-white/5 shadow-xl">
        <div className="typing-dot" />
        <div className="typing-dot" />
        <div className="typing-dot" />
      </div>
    </div>
  );
}
