import { Send } from "lucide-react";
import { useRef, useEffect } from "react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSubmit: (text?: string) => void;
  isLoading: boolean;
}

export function ChatInput({ input, setInput, onSubmit, isLoading }: ChatInputProps) {
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
    <footer className="relative z-20 p-6 bg-black/80 backdrop-blur-2xl border-t border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      <div className="max-w-3xl mx-auto relative flex flex-col">
        <div className="relative flex items-center group">
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your PR goal or ask for a split..."
            className="w-full bg-[#121212] border border-white/10 rounded-xl py-4 pl-5 pr-16 text-sm focus:outline-none focus:border-[var(--gym-blue)] transition-all resize-none placeholder:text-white/20 font-medium shadow-inner"
            disabled={isLoading}
          />
          <button
            onClick={() => onSubmit()}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 w-12 h-10 bg-[var(--gym-blue)] hover:bg-[#33deff] text-black rounded-lg flex items-center justify-center transition-all active:scale-90 disabled:opacity-50 disabled:grayscale group-focus-within:shadow-[0_0_15px_rgba(0, 212, 255, 0.4)]"
          >
            <Send size={20} className="stroke-[2.5px] ml-1" />
          </button>
        </div>
      </div>
      <p className="text-center text-[10px] uppercase tracking-[0.3em] font-black text-white/20 mt-4 italic">
        Forge your legacy
      </p>
    </footer>
  );
}
