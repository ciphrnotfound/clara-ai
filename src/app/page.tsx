"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Globe, Shield, Zap, Box, Cpu, ChevronRight, Send, Sparkles, Bot } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-black selection:bg-white selection:text-black font-normal">

      {/* 
        HERO SECTION: Starry Night Sky
      */}
      <section className="relative pt-32 pb-24 px-6 border-b border-white/5 min-h-screen flex items-center overflow-hidden">
        {/* Pure black background */}
        <div className="absolute inset-0 bg-black" />

        {/* Vercel-style static stars */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 0%, black 70%)' }}>
          {[...Array(200)].map((_, i) => {
            const size = Math.random() > 0.85 ? 2 : 1;
            const opacity = 0.1 + Math.random() * 0.4;
            return (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: size,
                  height: size,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: opacity,
                }}
              />
            );
          })}
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs text-zinc-400">Powered by Bothive</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-normal tracking-tight text-white mb-6"
          >
            Your co-pilot for<br />
            <span className="text-zinc-500">navigating life.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-zinc-500 max-w-xl mx-auto mb-8 leading-relaxed"
          >
            Life feels like space—vast and unknown. Clara is your personal astronaut, helping you navigate through the chaos and making every day more bearable.
          </motion.p>

          {/* Infinite Marquee Carousel */}
          <div className="relative w-full max-w-3xl mx-auto mb-10 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />
            <motion.div
              className="flex gap-4 whitespace-nowrap"
              animate={{ x: [0, -600] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {['Email Triage', 'Smart Scheduling', 'Expense Tracking', 'Goal Setting', 'Study Mode', 'Habit Building', 'Weather Updates', 'Task Management', 'Email Triage', 'Smart Scheduling', 'Expense Tracking', 'Goal Setting'].map((item, i) => (
                <span
                  key={`${item}-${i}`}
                  className="px-4 py-2 bg-white/5 border border-white/10 text-sm text-zinc-400 flex-shrink-0"
                >
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <button className="h-10 px-5 bg-white text-black font-normal hover:bg-zinc-200 transition-colors text-sm flex items-center gap-2">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="h-10 px-5 border border-white/10 hover:bg-white/5 text-zinc-400 hover:text-white transition-colors text-sm">
              Documentation
            </button>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </section>

      {/* 
        REVIEWS / TESTIMONIALS SECTION
      */}
      <section className="py-24 px-6 bg-black border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-4">Testimonials</p>
            <h2 className="text-3xl font-normal text-white">Loved by teams everywhere.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "Clara has completely transformed how I manage my inbox. I save at least 2 hours every day.",
                author: "Sarah Chen",
                role: "Product Manager at Stripe",
              },
              {
                quote: "The habit tracking and goal setting features keep me accountable. It's like having a personal coach.",
                author: "Marcus Johnson",
                role: "Founder, TechStart",
              },
              {
                quote: "Finally, an AI assistant that actually understands context. The expense tracking alone is worth it.",
                author: "Emily Rodriguez",
                role: "Freelance Designer",
              },
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-zinc-900/30 border border-white/5 hover:border-white/10 transition-colors"
              >
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">"{review.quote}"</p>
                <div>
                  <p className="text-white text-sm font-normal">{review.author}</p>
                  <p className="text-zinc-500 text-xs">{review.role}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats row */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
            {[
              { value: "10k+", label: "Active Users" },
              { value: "2M+", label: "Tasks Completed" },
              { value: "4.9", label: "Average Rating" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-3xl font-normal text-white">{stat.value}</p>
                <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 
        CONTENT SECTION 1: Features Bento Grid
      */}
      <section className="py-24 px-6 border-b border-white/5 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-normal text-white mb-4 tracking-tight">Automate your life.</h2>
            <p className="text-zinc-400 max-w-lg mx-auto font-light">Clara is your personal AI assistant that handles daily tasks so you can focus on what matters.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Large Card */}
            <div className="md:col-span-2 relative h-[300px] rounded-xl border border-white/10 bg-zinc-900/20 overflow-hidden group">
              <div className="absolute inset-0 bg-grid-small-white opacity-20" />
              <div className="relative z-10 p-8">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-normal text-white mb-2">Intelligent Automation</h3>
                <p className="text-zinc-400 text-sm max-w-sm font-light">
                  Clara learns your preferences and automatically handles routine tasks. Email sorting, meeting scheduling, and expense tracking—all done for you.
                </p>
              </div>
              {/* Abstract Visual */}
              <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-t from-white/5 to-transparent skew-x-12 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Small Card */}
            <div className="relative h-[300px] rounded-xl border border-white/10 bg-zinc-900/20 overflow-hidden p-8 group">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-normal text-white mb-2">Your Data, Your Control</h3>
              <p className="text-zinc-400 text-sm font-light">
                End-to-end encryption keeps your personal information secure. Clara works for you, not the other way around.
              </p>
            </div>

            {/* Small Card */}
            <div className="relative h-[300px] rounded-xl border border-white/10 bg-zinc-900/20 overflow-hidden p-8 group">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-normal text-white mb-2">Works Everywhere</h3>
              <p className="text-zinc-400 text-sm font-light">
                Access Clara from any device. Your assistant is always available, whether you're on desktop, mobile, or web.
              </p>
            </div>

            {/* Large Card */}
            <div className="md:col-span-2 relative h-[300px] rounded-xl border border-white/10 bg-zinc-900/20 overflow-hidden p-8 group">
              <div className="flex gap-12 h-full items-center">
                <div className="flex-1">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                    <Cpu className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-normal text-white mb-2">Natural Conversations</h3>
                  <p className="text-zinc-400 text-sm font-light">
                    Just talk to Clara like you would a human assistant. No complex commands or setup required.
                  </p>
                </div>
                {/* Code snippet visual */}
                <div className="flex-1 bg-black border border-white/10 rounded-lg p-4 font-mono text-xs text-zinc-500 hidden md:block opacity-70 group-hover:opacity-100 transition-opacity">
                  <span className="text-emerald-400">"Clara, schedule a meeting with Sarah"</span><br /><br />
                  <span className="text-zinc-400">✓ Found 3 available slots</span><br />
                  <span className="text-zinc-400">✓ Sent calendar invite</span><br />
                  <span className="text-zinc-400">✓ Added to your schedule</span><br /><br />
                  <span className="text-blue-400">Done! Meeting scheduled for tomorrow at 2pm.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        CONTENT SECTION 2: Code / Technical Deep Dive
      */}
      <section className="py-24 px-6 bg-zinc-900/20 border-b border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="text-xs font-mono text-zinc-500 mb-4 uppercase tracking-widest font-normal">Simple to Use</div>
            <h2 className="text-3xl font-normal text-white mb-6">Just ask Clara.</h2>
            <p className="text-zinc-400 leading-relaxed mb-8 font-light">
              No complicated setup or training required. Clara understands natural language and gets smarter the more you use it. Your personal AI assistant that actually feels personal.
            </p>

            <ul className="space-y-4">
              {["Natural language understanding", "Learns your preferences", "Works across all your apps", "Available 24/7"].map(item => (
                <li key={item} className="flex items-center gap-3 text-zinc-300 text-sm font-normal">
                  <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center">
                    <Box className="w-2 h-2 text-white" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <button className="mt-8 text-white text-sm font-normal flex items-center gap-2 hover:gap-3 transition-all">
              Learn More <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 w-full">
            <div className="rounded-xl border border-white/10 bg-black shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-zinc-900/50">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                </div>
                <div className="text-xs text-zinc-500 font-mono ml-2">clara-chat</div>
              </div>
              <div className="p-6 font-mono text-sm">
                <div className="text-zinc-500 select-none mb-4">$ Hey Clara, what's on my schedule today?</div>
                <div className="text-zinc-300">
                  <span className="text-emerald-400">Clara:</span> You have 3 meetings today:<br /><br />
                  <span className="text-blue-400">9:00 AM</span> - Team standup<br />
                  <span className="text-blue-400">2:00 PM</span> - Client call with Acme Corp<br />
                  <span className="text-blue-400">4:30 PM</span> - 1-on-1 with Sarah<br /><br />
                  <span className="text-zinc-500">You also have 12 unread emails and 5 pending tasks.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        INTERACTIVE CHAT SECTION
      */}
      <ChatSection />

    </div>
  );
}

import ChatWidget from "@/components/ChatWidget";

function ChatSection() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', text: string }[]>([
    { role: 'assistant', text: "Hello. I am Clara. How can I help you optimize your workflow today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // SERVER-SIDE PROXY MODE
  // Calls the local /api/chat route to keep keys secret

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      // Call the secure Next.js API route
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });

      const response = await res.json();

      setIsTyping(false);

      if (response.response) {
        setMessages(prev => [...prev, { role: 'assistant', text: response.response }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', text: "I received your message, but the Swarm is currently recalibrating (Backend Response Empty)." }]);
      }

    } catch (error) {
      console.error(error);
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'assistant', text: "Connection Error: Ensure BotHive is running at localhost:3000." }]);
    }
  }

  return (
    <section className="py-32 px-6 border-t border-white/5 bg-black relative overflow-hidden">

      {/* Background glow for this section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-3xl font-normal text-white mb-4">Talk to Clara.</h2>
          <p className="text-zinc-500 font-light">Experience the next generation of interaction.</p>
        </div>

        <div className="bg-zinc-900/30 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
          {/* Chat Window */}
          <div className="h-[400px] p-6 overflow-y-auto flex flex-col gap-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm font-normal leading-relaxed 
                                    ${msg.role === 'user'
                    ? 'bg-white text-black rounded-tr-sm'
                    : 'bg-white/5 text-zinc-300 border border-white/5 rounded-tl-sm'
                  }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center h-[42px]">
                  <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-75" />
                  <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-150" />
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-white/5 bg-white/[0.01]">
            <div className="relative">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Ask Clara anything..."
                className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-white/20 transition-colors font-normal placeholder:text-zinc-600"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-white text-black rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50"
                disabled={!input.trim()}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
