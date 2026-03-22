import { Trophy, ChevronRight } from "lucide-react";
import { QuickPrompt } from "@/types/chat";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface EmptyStateProps {
  prompts: QuickPrompt[];
  onPromptClick: (label: string) => void;
}

export function EmptyState({ prompts, onPromptClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80%] text-center message-appear">
      <div className="mb-6 flex justify-center">
        <Image
          src="/nopain_nogain.png"
          alt="No Pain No Gain"
          width={500}
          height={300}
          className="w-70 md:w-100 h-auto object-contain drop-shadow-2xl"
          priority
        />
      </div>
      <p className="text-black/40 dark:text-white/40 max-w-sm mb-12 text-sm font-bold uppercase tracking-widest leading-relaxed transition-colors">
        The ultimate AI spotter for your workouts, nutrition, and mental grit.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
        {prompts.map((p) => (
          <Button
            key={p.label}
            variant="outline"
            onClick={() => onPromptClick(p.label)}
            className="flex h-auto w-full items-center justify-between group p-4 bg-zinc-100/80 dark:bg-gym-card/80 backdrop-blur-sm border-black/5 dark:border-white/5 rounded-xl hover:border-(--gym-blue)/50transition-all hover:bg-zinc-200 dark:hover:bg-[#181818] shadow-lg hover:shadow-(--gym-blue)/10"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 shrink-0 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-(--gym-blue) group-hover:bg-(--gym-blue)/10 group-hover:scale-110 transition-all">
                {p.icon}
              </div>
              <span className="text-sm font-black uppercase tracking-tight text-black/70 group-hover:text-black dark:text-white/70 dark:group-hover:text-white transition-colors text-left truncate">
                {p.label}
              </span>
            </div>
            <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors">
              <ChevronRight
                size={16}
                className="text-black/20 group-hover:text-(--gym-blue) dark:text-white/20 dark:group-hover:text-(--gym-blue) transition-colors"
                strokeWidth={3}
              />
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
