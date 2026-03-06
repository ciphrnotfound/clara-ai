"use client";

import { motion } from "framer-motion";

interface PlaceholderProps {
    title: string;
    description: string;
}

export function MultiPagePlaceholder({ title, description }: PlaceholderProps) {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 relative overflow-hidden bg-slate-950">
            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950" />
                <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] opacity-40 mix-blend-screen" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 text-center max-w-2xl"
            >
                <div className="w-16 h-1px bg-gradient-to-r from-transparent via-violet-500 to-transparent mx-auto mb-8 opacity-50" />
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
                    {title}
                </h1>
                <p className="text-xl text-slate-400 mb-10 leading-relaxed">
                    {description}
                </p>
                <div className="p-4 border border-violet-500/10 rounded-2xl bg-slate-900/50 backdrop-blur-sm inline-flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></div>
                    <span className="text-sm font-mono text-slate-500">Currently under construction.</span>
                </div>
            </motion.div>
        </div>
    );
}
