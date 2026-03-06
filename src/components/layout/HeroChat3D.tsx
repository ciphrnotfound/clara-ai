"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Send, Bot, Sparkles, Command } from "lucide-react";

export function HeroChat3D() {
    const [input, setInput] = useState("");
    const [focused, setFocused] = useState(false);

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        // Calculate rotation based on cursor position relative to center
        // Max rotation 5 degrees (subtle, heavy feel)
        x.set((clientY - centerY) / 150);
        y.set((clientX - centerX) / 150);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const rotateX = useTransform(mouseX, (val) => -val); // Invert for natural feel
    const rotateY = useTransform(mouseY, (val) => val);

    return (
        <div
            className="w-full h-full min-h-[600px] flex items-center justify-center perspective-1000 py-20"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                style={{ rotateX, rotateY }}
                className="relative w-full max-w-2xl preserve-3d"
            >
                {/* Floating Elements / Decorators in 3D Space */}
                <motion.div
                    className="absolute -top-12 -left-12 w-24 h-24 bg-zinc-800/30 rounded-2xl backdrop-blur-md flex items-center justify-center border border-white/5 z-0"
                    style={{ translateZ: 40 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Bot className="w-10 h-10 text-zinc-500" />
                </motion.div>

                <motion.div
                    className="absolute -bottom-8 -right-8 w-20 h-20 bg-zinc-800/30 rounded-full backdrop-blur-md flex items-center justify-center border border-white/5 z-20"
                    style={{ translateZ: 60 }}
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                    <Sparkles className="w-8 h-8 text-white/50" />
                </motion.div>

                {/* Main Chat Interface Card */}
                <div
                    className="relative bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black/80 z-10"
                    style={{ transform: "translateZ(20px)" }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse" />
                            <span className="text-sm font-medium tracking-wide text-zinc-300 font-mono">CLARA_OS v2</span>
                        </div>
                        <div className="text-[10px] text-zinc-600 font-mono flex items-center gap-2">
                            <span>CONNECTED</span>
                            <div className="flex gap-1">
                                <div className="w-1 h-1 bg-zinc-600 rounded-full"></div>
                                <div className="w-1 h-1 bg-zinc-600 rounded-full"></div>
                                <div className="w-1 h-1 bg-zinc-600 rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="h-[400px] flex flex-col justify-end p-8 space-y-6">
                        {/* Mock Messages for Aesthetic */}
                        <div className="flex justify-start">
                            <div className="bg-zinc-900/80 border border-white/5 px-6 py-4 rounded-2xl rounded-bl-none max-w-[80%]">
                                <p className="text-zinc-300 text-sm leading-relaxed">
                                    I've analyzed your schedule. You have 3 open slots today. Shall I block them for deep work?
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <div className="bg-white text-black px-6 py-4 rounded-2xl rounded-br-none max-w-[80%] shadow-lg shadow-white/5">
                                <p className="font-medium text-sm">Yes, block them. And order lunch for 1pm.</p>
                            </div>
                        </div>

                        <div className="flex justify-start">
                            <div className="bg-zinc-900/80 border border-white/5 px-6 py-4 rounded-2xl rounded-bl-none max-w-[80%] flex items-center gap-3">
                                <div className="w-4 h-4 border-2 border-zinc-500 border-t-white rounded-full animate-spin"></div>
                                <p className="text-zinc-400 text-sm italic">Allocating time blocks...</p>
                            </div>
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-black/40 border-t border-white/5">
                        <div
                            className={`relative transition-all duration-300 rounded-2xl ${focused ? 'ring-1 ring-white/20 bg-zinc-900' : 'bg-zinc-900/50'}`}
                        >
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onFocus={() => setFocused(true)}
                                onBlur={() => setFocused(false)}
                                placeholder="Command interaction..."
                                className="w-full bg-transparent border-none px-5 py-5 pr-14 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-0"
                            />
                            <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white text-white hover:text-black rounded-xl transition-all">
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex justify-between items-center mt-3 px-2">
                            <span className="text-[10px] text-zinc-600 font-mono flex items-center gap-1">
                                <Command className="w-3 h-3" /> K to focus helps
                            </span>
                            <span className="text-[10px] text-zinc-700 font-mono">P-HIVE-RT-4</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
