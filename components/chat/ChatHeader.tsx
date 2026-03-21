import { RotateCcw, Dumbbell, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

interface ChatHeaderProps {
  hasMessages: boolean;
  onReset: () => void;
}

export function ChatHeader({ hasMessages, onReset }: ChatHeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="relative z-20 flex-shrink-0 h-16 border-b border-black/5 dark:border-white/5 bg-white/60 dark:bg-black/60 backdrop-blur-xl px-6 flex items-center justify-between transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[var(--gym-blue)] rounded-lg flex items-center justify-center blue-glow overflow-hidden relative">
          <div className="absolute inset-0 bg-black/10 dark:bg-white/20 mix-blend-overlay"></div>
          <Dumbbell
            size={22}
            className="text-white dark:text-black stroke-[2.5px] -rotate-12 relative z-10"
          />
        </div>
        <div>
          <h1 className="gym-heading text-2xl font-black leading-none tracking-tight">
            GYMBRO <span className="text-[var(--gym-blue)]">AI</span>
          </h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-[gym-pulse_2s_infinite]" />
            <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-black/40 dark:text-white/40 transition-colors">
              Status: Beast Mode
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full text-black/40 dark:text-white/40 hover:text-[var(--gym-blue)] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
        )}
        {hasMessages && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            title="Reset Routine"
            className="hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors text-black/40 dark:text-white/40 hover:text-[var(--gym-blue)] active:scale-95 flex items-center gap-2 h-9 px-3"
          >
            <RotateCcw size={18} />
            <span className="text-xs font-bold uppercase hidden sm:inline-block">Hard Reset</span>
          </Button>
        )}
      </div>
    </header>
  );
}
