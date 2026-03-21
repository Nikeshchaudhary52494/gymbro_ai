import { Trophy, ChevronRight } from "lucide-react";
import { QuickPrompt } from "@/types/chat";

interface EmptyStateProps {
  prompts: QuickPrompt[];
  onPromptClick: (label: string) => void;
}

export function EmptyState({ prompts, onPromptClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80%] text-center message-appear">
      <div className="relative mb-6 group cursor-default">
        <Trophy size={72} className="text-[var(--gym-blue)] opacity-90 drop-shadow-2xl transition-transform group-hover:scale-110 duration-500" />
        <div className="absolute inset-0 blur-3xl bg-[var(--gym-blue)]/30 group-hover:bg-[var(--gym-blue)]/50 transition-colors duration-500" />
      </div>
      
      <h2 className="gym-heading text-5xl md:text-7xl mb-4 italic text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
        NO PAIN <br /> <span className="text-[var(--gym-blue)] bg-none! drop-shadow-md">NO GAIN</span>
      </h2>
      
      <p className="text-white/40 max-w-sm mb-12 text-sm font-bold uppercase tracking-widest leading-relaxed">
        The ultimate AI spotter for your workouts, nutrition, and mental grit.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
        {prompts.map((p) => (
          <button
            key={p.label}
            onClick={() => onPromptClick(p.label)}
            className="flex items-center justify-between group p-4 bg-[#121212]/80 backdrop-blur-sm border border-white/5 rounded-xl hover:border-[var(--gym-blue)]/50 transition-all hover:bg-[#181818] shadow-lg hover:shadow-[var(--gym-blue)]/10"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[var(--gym-blue)] group-hover:bg-[var(--gym-blue)]/10 group-hover:scale-110 transition-all">
                {p.icon}
              </div>
              <span className="text-sm font-black uppercase tracking-tight text-white/70 group-hover:text-white transition-colors text-left max-w-[150px] sm:max-w-none truncate sm:overflow-visible">
                {p.label}
              </span>
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-white/5 transition-colors">
              <ChevronRight
                size={16}
                className="text-white/20 group-hover:text-[var(--gym-blue)] transition-colors"
                strokeWidth={3}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
