export type Role = "user" | "assistant";

export interface Message {
  id: string;
  role: Role;
  content: string;
}

export interface QuickPrompt {
  icon: React.ReactNode;
  label: string;
  category: string;
}
