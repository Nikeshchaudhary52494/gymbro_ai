import { RotateCcw, Dumbbell } from "lucide-react";

interface ChatHeaderProps {
  hasMessages: boolean;
  onReset: () => void;
}

export function ChatHeader({ hasMessages, onReset }: ChatHeaderProps) {
  return (
    <header className="relative z-20 flex-shrink-0 h-16 border-b border-white/5 bg-black/60 backdrop-blur-xl px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[var(--gym-blue)] rounded-lg flex items-center justify-center blue-glow overflow-hidden relative">
          <div className="absolute inset-0 bg-white/20 mix-blend-overlay"></div>
          <Dumbbell
            size={22}
            className="text-black stroke-[2.5px] -rotate-12 relative z-10"
          />
        </div>
        <div>
          <h1 className="gym-heading text-2xl font-black leading-none tracking-tight">
            GYMBRO <span className="text-[var(--gym-blue)]">AI</span>
          </h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-[gym-pulse_2s_infinite]" />
            <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-white/40">
              Status: Beast Mode
            </span>
          </div>
        </div>
      </div>

      {hasMessages && (
        <button
          onClick={onReset}
          title="Reset Routine"
          className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-[var(--gym-blue)] active:scale-95 flex items-center gap-2"
        >
          <RotateCcw size={18} />
          <span className="text-xs font-bold uppercase hidden sm:inline-block">Hard Reset</span>
        </button>
      )}
    </header>
  );
}
