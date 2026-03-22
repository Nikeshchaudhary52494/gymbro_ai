import { RotateCcw, Dumbbell, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Image from "next/image";

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
    <header className="relative z-20 shrink-0 h-16 border-b border-black/5 dark:border-white/5 bg-white/60 dark:bg-black/60 backdrop-blur-xl px-6 flex items-center justify-between transition-colors">
      <div className="relative flex items-center gap-3 w-60 h-14 sm:h-60">
        <Image
          src="/logo.png"
          alt="GymBro AI Logo"
          fill
          className="object-contain drop-shadow-md py-1"
          priority
        />
      </div>
      <div className="flex items-center gap-2">
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full text-black/40 dark:text-white/40 hover:text-[--gym-blue] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
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
            className="hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors text-black/40 dark:text-white/40 hover:text-[--gym-blue] active:scale-95 flex items-center gap-2 h-9 px-3"
          >
            <RotateCcw size={18} />
            <span className="text-xs font-bold uppercase hidden sm:inline-block">
              Hard Reset
            </span>
          </Button>
        )}
      </div>
    </header>
  );
}
