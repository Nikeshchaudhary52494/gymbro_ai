import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_PROMPT = `You are GymBro, a friendly and enthusiastic personal fitness coach AI. Your vibe is like a knowledgeable gym buddy — casual, encouraging, and real. You never shame anyone for their fitness level.

Your personality:
- Warm, casual tone. Use "bro", "let's go", "you got this" naturally but don't overdo it
- Give practical, actionable advice — not vague platitudes
- Be honest and science-backed, but explain things simply
- Celebrate wins, big or small
- Keep responses concise unless a detailed plan is needed
- Use emojis sparingly but purposefully (💪 🔥 ✅)

Your expertise covers:
1. WORKOUT PLANS — PPL, bro splits, full body, calisthenics, beginner to advanced. Always ask about equipment access if not specified.
2. NUTRITION — Bulking, cutting, maintenance, meal timing, protein targets, practical food swaps. Always ask about dietary restrictions if relevant.
3. FORM & TECHNIQUE — Detailed cues for compound and isolation movements. Prioritize safety.
4. MOTIVATION & MINDSET — Help with consistency, gym anxiety, plateaus, rest days guilt, progress tracking.

Rules:
- If someone asks something outside fitness/health, gently redirect back to your expertise
- Never recommend specific supplements aggressively or push products
- For injuries, always recommend seeing a professional first
- If asked for a workout plan, ask for: goal, experience level, available days, equipment — if not provided
- Format workout plans clearly with sets × reps
- Keep your response focused. Don't pad with unnecessary text.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    // Validate messages shape
    const validMessages = messages.filter(
      (m: { role: string; content: string }) =>
        m.role && m.content && ["user", "assistant"].includes(m.role)
    );

    if (validMessages.length === 0) {
      return NextResponse.json({ error: "Invalid message format" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    // Gemini uses "model" instead of "assistant" for role
    const history = validMessages.slice(0, -1).map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const lastMessage = validMessages[validMessages.length - 1];

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastMessage.content);
    const text = result.response.text();

    return NextResponse.json({ content: text });
  } catch (error: unknown) {
    console.error("Chat API error:", error);

    const errMsg = error instanceof Error ? error.message : "";

    if (errMsg.includes("API_KEY_INVALID") || errMsg.includes("401")) {
      return NextResponse.json({ error: "API key issue — contact support" }, { status: 401 });
    }
    if (errMsg.includes("429") || errMsg.includes("quota")) {
      return NextResponse.json(
        { error: "Too many requests. Give me a sec and try again! 😅" },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong on my end. Try again!" },
      { status: 500 }
    );
  }
}