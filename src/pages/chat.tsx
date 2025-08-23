// src/pages/Chat.tsx
import React, { useState, useEffect, useRef } from "react";
import { Send, Plus, MessageSquare, Trash2 } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

interface Message {
  text: string;
  sender: "user" | "bot";
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
}

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const model = genAI
  ? genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: `Your system prompt here`,
    })
  : null;

const Chat: React.FC = () => {
  const location = useLocation();

  // ✅ Just from state (since Home now only passes state)
  const initialQuestion = (location.state as any)?.initialQuestion || "";

  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeSession = sessions.find((s) => s.id === activeSessionId);

  const startNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
    };
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || !activeSessionId) return;

    setSessions((prev) =>
      prev.map((s) =>
        s.id === activeSessionId
          ? {
              ...s,
              title:
                s.messages.length === 0
                  ? text.split(" ").slice(0, 8).join(" ") +
                    (text.split(" ").length > 8 ? "…" : "")
                  : s.title,
              messages: [...s.messages, { text, sender: "user" }],
            }
          : s
      )
    );
    setInput("");
    setIsLoading(true);

    try {
      const chat = model?.startChat({
        generationConfig: { maxOutputTokens: 2000, temperature: 0.7 },
        history:
          activeSession?.messages.map((m) => ({
            role: m.sender === "user" ? "user" : "model",
            parts: [{ text: m.text }],
          })) || [],
      });

      const result = await chat?.sendMessage(text);
      const botText = result?.response?.text?.() ?? "";

      setSessions((prev) =>
        prev.map((s) =>
          s.id === activeSessionId
            ? {
                ...s,
                messages: [...s.messages, { text: botText, sender: "bot" }],
              }
            : s
        )
      );
    } catch (err: any) {
      setSessions((prev) =>
        prev.map((s) =>
          s.id === activeSessionId
            ? {
                ...s,
                messages: [
                  ...s.messages,
                  { text: `Error: ${err.message}`, sender: "bot" },
                ],
              }
            : s
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Step 1: If there's an initial question, start a chat & store it
  useEffect(() => {
    if (initialQuestion) {
      startNewChat();
      setPendingQuestion(initialQuestion);
    }
  }, [initialQuestion]);

  // Step 2: Once session is ready, send the pending question
  useEffect(() => {
    if (activeSessionId && pendingQuestion) {
      sendMessage(pendingQuestion);
      setPendingQuestion(null);
    }
  }, [activeSessionId, pendingQuestion]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sessions, isLoading]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#141110] via-[#2a1f1a] to-back text-white font-chakra">
      {/* Sidebar */}
      <div className="w-64 bg-[#1a1a1a]/90 border-r border-gray-800 flex flex-col">
        <div className="p-4">
          <button
            onClick={startNewChat}
            className="w-full flex items-center gap-2 px-4 py-2 bg-accent rounded-lg hover:opacity-90 transition"
          >
            <Plus className="w-5 h-5" />
            New Chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-2 space-y-1">
          {sessions.map((s) => (
            <div
              key={s.id}
              className={cn(
                "flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-800/70",
                activeSessionId === s.id && "bg-gray-800"
              )}
              onClick={() => setActiveSessionId(s.id)}
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-gray-400" />
                <span className="truncate max-w-[150px]">{s.title}</span>
              </div>
              <Trash2
                className="w-4 h-4 text-gray-500 hover:text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  setSessions((prev) => prev.filter((x) => x.id !== s.id));
                  if (activeSessionId === s.id) setActiveSessionId(null);
                }}
              />
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-800 text-sm text-gray-500">
          Agent Hunter v1.0
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col flex-1 relative scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <div className="p-6 flex items-center space-x-4">
          <img
            src="/assets/hunter_icon.png"
            alt="Agent Hunter Logo"
            className="w-6 h-6"
          />
          <p className="text-2xl font-bold">
            AGENT <span className="text-accent">HUNTER</span>
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 relative z-10 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {activeSession?.messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex w-full",
                msg.sender === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "prose prose-invert max-w-3xl rounded-2xl px-4 py-3 text-base leading-relaxed shadow-sm",
                  msg.sender === "user"
                    ? "bg-accent text-white rounded-br-none"
                    : "bg-gray-800/80 text-gray-100 rounded-bl-none"
                )}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-800/50 text-gray-400 rounded-2xl px-4 py-3 text-sm animate-pulse">
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        {activeSessionId && (
          <div className="p-4 relative z-10">
            <div className="flex items-center gap-3 max-w-4xl mx-auto">
              <input
                type="text"
                placeholder="Message Agent Hunter..."
                className="flex-1 bg-transparent border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-accent transition"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              />
              <button
                onClick={() => sendMessage(input)}
                className="p-3 bg-accent rounded-xl hover:opacity-90 transition"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Agent Hunter may produce inaccurate responses. Verify important
              info.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
