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
        isUser ? "justify-end" : "justify-start",
      )}
    >
      <div
        className={cn(
          "max-w-[85%] flex gap-3",
          isUser ? "flex-row-reverse" : "",
        )}
      >
        <div
          className={cn(
            "w-8 h-8 shrink-0 rounded-lg flex items-center justify-center text-xs font-black tracking-tighter uppercase shadow-md transition-colors",
            isUser
              ? "bg-black/10 dark:bg-white/10 text-black dark:text-white"
              : "bg-(--gym-blue) text-white dark:text-black",
          )}
        >
          {isUser ? "ME" : "BRO"}
        </div>
        <div
          className={cn(
            "px-5 py-3 rounded-2xl text-sm leading-relaxed relative overflow-hidden transition-colors",
            isUser
              ? "bg-(--gym-blue) text-white dark:text-black font-bold shadow-lg"
              : "bg-white dark:bg-[#181818] border border-black/5 dark:border-white/5 text-black/90 dark:text-white/90 shadow-xl gym-markdown",
          )}
        >
          {!isUser && (
            <div className="absolute inset-0 bg-linear-to-b from-black/5 dark:from-white/5 to-transparent pointer-events-none transition-colors" />
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
      <div className="w-8 h-8 rounded-lg bg-(--gym-blue) flex items-center justify-center text-white dark:text-black text-xs font-black tracking-tighter uppercase shadow-md transition-colors">
        GB
      </div>
      <div className="bg-white dark:bg-[#181818] px-5 py-4 rounded-2xl flex gap-1 border border-black/5 dark:border-white/5 shadow-xl transition-colors">
        <div className="typing-dot" />
        <div className="typing-dot" />
        <div className="typing-dot" />
      </div>
    </div>
  );
}
