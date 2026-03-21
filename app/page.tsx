"use client";

import { useState, useRef, useEffect } from "react";
import { Dumbbell, Flame, Target, Brain } from "lucide-react";

import { Message, QuickPrompt } from "@/types/chat";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatMessage, LoadingMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { EmptyState } from "@/components/chat/EmptyState";
import { ToastContainer, useToast } from "@/components/ui/Toast";

const QUICK_PROMPTS: QuickPrompt[] = [
  {
    icon: <Dumbbell size={18} strokeWidth={2.5} />,
    label: "5-Day Hypertrophy Split",
    category: "workout",
  },
  {
    icon: <Flame size={18} strokeWidth={2.5} />,
    label: "Meal plan for Lean Bulk",
    category: "nutrition",
  },
  { 
    icon: <Target size={18} strokeWidth={2.5} />, 
    label: "Fix my Squat Depth", 
    category: "form" 
  },
  {
    icon: <Brain size={18} strokeWidth={2.5} />,
    label: "Pre-workout motivation",
    category: "mindset",
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { toasts, toast, removeToast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async (text?: string) => {
    const content = (text || input).trim();
    if (!content || isLoading) return;

    setInput("");
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific status codes for proper gym-vibe error messaging
        if (response.status === 429) {
          throw new Error("API Limit Reached! Credits exhausted. Take a rest set and try again later.");
        } else if (response.status === 401) {
          throw new Error("API Key issue. Check your gym pass (supporter info)!");
        } else if (response.status === 500) {
          throw new Error("Server is dropping the weights! API not responding.");
        } else {
          throw new Error(data.error || "Something went wrong on the lift.");
        }
      }

      if (data.content) {
        const assistantMsg: Message = {
          id: crypto.randomUUID(),
          role: "assistant", // Using 'assistant' UI-side, the API mapped it to 'model' for Gemini internally
          content: data.content,
        };
        setMessages((prev) => [...prev, assistantMsg]);
      }
    } catch (error: any) {
      console.error("Chat Error:", error);
      
      // Determine if it's a network error (api not responding) or something else
      const isNetworkError = error.name === "TypeError" && error.message === "Failed to fetch";
      
      toast({
        title: "Workout Interrupted!",
        description: isNetworkError 
          ? "API is not responding! Check your connection or the server status."
          : error.message || "Failed to complete the set. Try again.",
      });
      
      // Remove the user's message if it failed, or keep it so they can retry?
      // Reverting the message so they don't lose context, but populate the input box again.
      setMessages((prev) => prev.slice(0, -1));
      setInput(content);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div suppressHydrationWarning className="flex flex-col h-screen bg-slate-50 dark:bg-[#080808] text-slate-900 dark:text-white overflow-hidden relative transition-colors duration-500">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Background Textures */}
      <div suppressHydrationWarning className="absolute inset-0 carbon-grid opacity-100 dark:opacity-30 pointer-events-none transition-opacity duration-500" />
      <div suppressHydrationWarning className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[80%] bg-blue-500/10 dark:bg-[#00d4ff]/5 blur-[120px] pointer-events-none transition-colors duration-500" />
      <div suppressHydrationWarning className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[50%] bg-gradient-to-t from-slate-50 dark:from-black/90 to-transparent pointer-events-none z-10 transition-colors duration-500" />

      {/* Header */}
      <ChatHeader hasMessages={messages.length > 0} onReset={() => setMessages([])} />

      {/* Main Content */}
      <main className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-6 scroll-smooth custom-scrollbar">
        <div className="max-w-3xl mx-auto h-full">
          {messages.length === 0 ? (
            <EmptyState prompts={QUICK_PROMPTS} onPromptClick={sendMessage} />
          ) : (
            <div className="space-y-8 pb-32">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {isLoading && <LoadingMessage />}
              <div ref={messagesEndRef} className="h-4" />
            </div>
          )}
        </div>
      </main>

      {/* Input Area (overlaying the main content slightly using absolute/fixed if we wanted, but sticking to flex is cleaner) */}
      <div className="absolute bottom-0 w-full z-20">
        <ChatInput 
          input={input} 
          setInput={setInput} 
          onSubmit={sendMessage} 
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
}
