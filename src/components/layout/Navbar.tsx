"use client";

import Link from "next/link";
import { useState } from "react";
import { Bot, Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-md h-16">
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

                <div className="flex items-center gap-12">
                    {/* Brand - Pure White Logo - Normal Weight */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                            <Bot className="w-4 h-4 text-black" />
                        </div>
                        <span className="font-medium text-lg tracking-tight text-white">Clara</span>
                    </Link>

                    {/* Desktop Links - Gray to White hover */}
                    <div className="hidden md:flex items-center gap-6">
                        {["Products", "Solutions", "Docs", "Pricing"].map((item) => (
                            <Link
                                key={item}
                                href={`/${item.toLowerCase()}`}
                                className="text-sm text-zinc-400 hover:text-white transition-colors font-normal"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        href="/signin"
                        className="text-sm font-normal text-zinc-400 hover:text-white transition-colors"
                    >
                        Log in
                    </Link>
                    <Link
                        href="/signup"
                        className="px-4 py-1.5 rounded bg-white text-black font-medium text-sm hover:bg-zinc-200 transition-colors"
                    >
                        Start Deploying
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-zinc-400 hover:text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black border-b border-white/5 overflow-hidden"
                    >
                        <div className="p-6 space-y-4">
                            {["Products", "Solutions", "Docs", "Pricing"].map((item) => (
                                <Link
                                    key={item}
                                    href={`/${item.toLowerCase()}`}
                                    className="block text-zinc-400 hover:text-white font-normal"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                                <Link href="/signin" className="block text-zinc-400 hover:text-white py-2 font-normal">
                                    Log in
                                </Link>
                                <Link href="/signup" className="block text-center px-4 py-2 bg-white text-black font-medium rounded">
                                    Start Deploying
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
