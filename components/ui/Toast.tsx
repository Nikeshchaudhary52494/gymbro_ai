import { AlertTriangle, X } from "lucide-react";
import { useEffect, useState } from "react";

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: "error" | "warning" | "success";
}

let toastCount = 0;

// Minimal global state hook for toasts
export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const toast = (message: Omit<ToastMessage, "id">) => {
    const id = (++toastCount).toString();
    setToasts((prev) => [...prev, { ...message, id }]);
    
    // Auto remove after 5s
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, toast, removeToast };
}

export function ToastContainer({ toasts, removeToast }: { toasts: ToastMessage[], removeToast: (id: string) => void }) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-full max-w-md px-4 pointer-events-none">
      {toasts.map((t) => (
        <div 
          key={t.id} 
          className="pointer-events-auto flex items-start gap-3 bg-[#181818] border border-red-500/50 p-4 rounded-xl shadow-[0_10px_30px_rgba(239,68,68,0.2)] message-appear"
        >
          <div className="text-red-500 mt-0.5 animate-pulse">
            <AlertTriangle size={20} />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-red-50">{t.title}</h4>
            {t.description && (
              <p className="text-xs text-red-200/70 mt-1 font-medium leading-relaxed">{t.description}</p>
            )}
          </div>
          <button 
            onClick={() => removeToast(t.id)}
            className="text-white/40 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
