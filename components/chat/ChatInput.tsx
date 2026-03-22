import { useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSubmit: (text?: string) => void;
  isLoading: boolean;
}

export function ChatInput({
  input,
  setInput,
  onSubmit,
  isLoading,
}: ChatInputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <footer className="relative z-20 p-6 bg-white/80 dark:bg-black/80 backdrop-blur-2xl border-t border-black/5 dark:border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.5)] transition-colors">
      <div className="max-w-3xl mx-auto relative flex flex-col">
        <div className="relative flex items-center group">
          <Textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your PR goal or ask for a split..."
            className="w-full bg-zinc-100 dark:bg-gym-card border-black/10 dark:border-white/10 rounded-xl py-4 pl-5 pr-16 text-sm focus-visible:ring-1 focus-visible:ring-(--gym-blue) transition-colors resize-none placeholder:text-black/30 dark:placeholder:text-white/20 font-medium shadow-inner min-h-14"
            disabled={isLoading}
          />
          <button
            onClick={() => onSubmit()}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 flex items-center justify-center transition-all active:scale-90 group-focus-within:drop-shadow-[0_0_15px_rgba(0,212,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110"
          >
            <Image
              src="/send-btn.png"
              alt="Send"
              width={48}
              height={40}
              className="w-20 h-20 object-contain"
            />
          </button>
        </div>
      </div>
      <p className="text-center text-[10px] uppercase tracking-[0.3em] font-black text-black/30 dark:text-white/20 mt-4 italic transition-colors">
        Forge your legacy
      </p>
    </footer>
  );
}
