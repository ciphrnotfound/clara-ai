"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Send,
  Sparkles,
  ArrowLeft,
  Mic,
  MicOff,
  MoreVertical,
} from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";


function Starfield() {
  const stars = useMemo(
    () =>
      Array.from({ length: 160 }, (_, i) => ({
        id: i,
        size: Math.random() > 0.85 ? 2 : 1,
        opacity: 0.08 + Math.random() * 0.35,
        x: Math.random() * 100,
        y: Math.random() * 100,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, black 75%)",
        }}
      >
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              width: s.size,
              height: s.size,
              left: `${s.x}%`,
              top: `${s.y}%`,
              opacity: s.opacity,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Typing Indicator ───
function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full flex items-center justify-center border border-white/10 flex-shrink-0">
          <Sparkles className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="bg-white/[0.03] border border-white/10 px-5 py-3 rounded-2xl rounded-tl-sm">
          <div className="flex gap-1.5">
            {[0, 0.1, 0.2].map((delay, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-zinc-500 rounded-full"
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string; timestamp: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [user, setUser] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  const isEmpty = messages.length === 0;

  // Load user and chat history
  useEffect(() => {
    async function loadData() {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (!authUser) {
        router.push("/signin");
        return;
      }

      setUser(authUser);

      // Load chat history
      const { data: messagesData } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true })
        .limit(50);

      if (messagesData) {
        setMessages(
          messagesData.map((m) => ({
            role: m.role as "user" | "assistant",
            content: m.content,
            timestamp: new Date(m.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          }))
        );
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [input]);

  // Speech recognition
  useEffect(() => {
    if (typeof window === "undefined") return;
    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SR) return;

    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
      setTimeout(() => handleSend(transcript), 400);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;

    return () => {
      try { recognition.stop(); } catch { }
    };
  }, []);

  const toggleVoice = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const handleSend = async (overrideText?: string) => {
    const text = overrideText || input.trim();
    if (!text || !user) return;

    const ts = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setInput("");
    const userMessage = { role: "user" as const, content: text, timestamp: ts };
    setMessages((prev) => [...prev, userMessage]);
    
    // Save user message to database
    await supabase.from("messages").insert({
      role: "user",
      content: text,
    });

    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      const responseTs = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      setIsTyping(false);

      const assistantMessage = {
        role: "assistant" as const,
        content: data.response || "I received your message but couldn't process it.",
        timestamp: responseTs,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Save assistant message to database
      await supabase.from("messages").insert({
        role: "assistant",
        content: assistantMessage.content,
      });

      // Create activity
      await supabase.from("activities").insert({
        type: "system",
        action: `Chat: ${text.substring(0, 50)}${text.length > 50 ? "..." : ""}`,
        icon: "💬",
        color: "blue",
      });
    } catch {
      setIsTyping(false);
      const errorMessage = {
        role: "assistant" as const,
        content: "Sorry, I'm having trouble connecting. Please check your connection.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const suggestions = [
    "Check my schedule for today",
    "Triage my emails",
    "Research: AI agent trends 2025",
    "Help me plan my week",
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative">
      <Starfield />

      {/* ─── Top Nav ─── */}
      <nav className="border-b border-white/5 bg-black/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <ArrowLeft className="w-4 h-4 text-zinc-500 hover:text-white transition-colors" />
              </button>
            </Link>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full flex items-center justify-center border border-white/10 relative">
                <Bot className="w-4 h-4 text-white" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-black" />
              </div>
              <div>
                <p className="text-sm font-medium text-white leading-none">Clara</p>
                <p className="text-[11px] text-zinc-600">Online</p>
              </div>
            </div>
          </div>

          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <MoreVertical className="w-4 h-4 text-zinc-500" />
          </button>
        </div>
      </nav>

      {/* ─── Main Content ─── */}
      <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full relative z-10">
        {isEmpty ? (
          /* ═══ PROMPT MODE (EMPTY STATE) ═══ */
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-xl space-y-6 text-center"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-white/[0.04] border border-white/10 rounded-2xl flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6 text-white/80" />
              </div>

              {/* Header */}
              <div className="space-y-2">
                <h2 className="text-xl font-medium text-white">
                  What can Clara help with?
                </h2>
                <p className="text-sm text-zinc-600">
                  Ask me anything — schedule meetings, triage emails, research topics, or just chat.
                </p>
              </div>

              {/* Input */}
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask Clara anything..."
                  rows={3}
                  className="w-full pl-4 pr-24 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-zinc-700 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/10 resize-none text-sm transition-all"
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
                  <button
                    onClick={toggleVoice}
                    className={`p-2 rounded-lg transition-all ${
                      isListening
                        ? "bg-red-500/10 text-red-400 border border-red-500/20"
                        : "text-zinc-600 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {isListening ? (
                      <MicOff className="w-4 h-4" />
                    ) : (
                      <Mic className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim()}
                    className={`p-2 rounded-lg transition-all ${
                      input.trim()
                        ? "bg-white/10 text-white hover:bg-white/20"
                        : "bg-white/5 text-zinc-600 cursor-not-allowed"
                    }`}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Suggestion Pills */}
              <div className="flex flex-wrap gap-2 justify-center">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(s)}
                    className="px-3 py-1.5 rounded-full border border-white/10 text-xs text-zinc-500 hover:text-white hover:border-white/20 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          /* ═══ CHAT MODE ═══ */
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-8">
              <div className="space-y-5">
                <AnimatePresence>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                        }`}
                    >
                      <div
                        className={`flex gap-3 max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"
                          }`}
                      >
                        {msg.role === "assistant" && (
                          <div className="w-8 h-8 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full flex items-center justify-center border border-white/10 flex-shrink-0">
                            <Sparkles className="w-4 h-4 text-emerald-400" />
                          </div>
                        )}
                        <div className="flex flex-col gap-1">
                          <div
                            className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                                ? "bg-white text-black rounded-tr-sm shadow-lg"
                                : "bg-white/[0.04] border border-white/10 text-zinc-200 rounded-tl-sm"
                              }`}
                          >
                            {msg.content}
                          </div>
                          <span
                            className={`text-[10px] text-zinc-700 px-1 ${msg.role === "user" ? "text-right" : "text-left"
                              }`}
                          >
                            {msg.timestamp}
                          </span>
                        </div>
                        {msg.role === "user" && (
                          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center border border-white/10 flex-shrink-0">
                            <span className="text-[10px] font-medium">You</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Chat Input Bar */}
            <div className="border-t border-white/5 bg-black/60 backdrop-blur-md p-4">
              <div className="flex items-end gap-2">
                <div className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl focus-within:border-white/20 transition-all">
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Message Clara..."
                    rows={1}
                    className="w-full bg-transparent px-4 py-3 text-sm text-white focus:outline-none resize-none placeholder:text-zinc-700"
                    style={{ minHeight: "44px", maxHeight: "120px" }}
                  />
                </div>

                <button
                  onClick={toggleVoice}
                  className={`p-2.5 rounded-lg transition-all relative ${
                    isListening
                      ? "bg-red-500/10 text-red-400 border border-red-500/20"
                      : "hover:bg-white/5 text-zinc-500 hover:text-zinc-400"
                  }`}
                >
                  {isListening ? (
                    <>
                      <MicOff className="w-4 h-4" />
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    </>
                  ) : (
                    <Mic className="w-4 h-4" />
                  )}
                </button>

                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className={`p-2.5 rounded-lg transition-all ${
                    input.trim()
                      ? "bg-white/10 text-white hover:bg-white/20"
                      : "bg-white/5 text-zinc-600 cursor-not-allowed"
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-zinc-700 mt-2 text-center">
                Enter to send · Shift+Enter for new line
                {isListening && (
                  <span className="text-red-400 ml-2">🎤 Listening...</span>
                )}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
