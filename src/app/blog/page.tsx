"use client";

import { motion } from "framer-motion";
import { BookOpen, Calendar, ArrowRight, User } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  const posts = [
    {
      title: "Introducing Clara: Your AI Workflow Assistant",
      excerpt: "Today we're excited to announce Clara, a new kind of AI assistant designed to handle your daily workflows automatically.",
      date: "March 1, 2026",
      author: "Sarah Chen",
      category: "Product"
    },
    {
      title: "How We Built Clara's Email Triage System",
      excerpt: "A deep dive into the architecture and ML models powering Clara's intelligent email categorization and prioritization.",
      date: "February 28, 2026",
      author: "Marcus Johnson",
      category: "Engineering"
    },
    {
      title: "Privacy-First AI: Our Approach to Data Security",
      excerpt: "Learn how we built Clara with privacy at its core, ensuring your data never leaves your control.",
      date: "February 25, 2026",
      author: "Emily Rodriguez",
      category: "Security"
    },
    {
      title: "5 Ways Clara Can Transform Your Morning Routine",
      excerpt: "Discover how Clara's automation features can help you start each day with clarity and focus.",
      date: "February 20, 2026",
      author: "David Kim",
      category: "Productivity"
    },
    {
      title: "The Future of Autonomous Agents",
      excerpt: "Our vision for the next generation of AI assistants and how they'll reshape knowledge work.",
      date: "February 15, 2026",
      author: "Sarah Chen",
      category: "Vision"
    },
    {
      title: "Building HiveLang: A DSL for Agent Behaviors",
      excerpt: "Why we created a new domain-specific language for defining complex agent workflows.",
      date: "February 10, 2026",
      author: "Marcus Johnson",
      category: "Engineering"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 0%, black 70%)' }}>
          {[...Array(150)].map((_, i) => {
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

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/10">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-normal tracking-tight text-white mb-6">
              Blog
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
              Insights on AI, productivity, and the future of work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-zinc-900/30 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs text-zinc-500 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-zinc-600">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </div>
                </div>

                <h2 className="text-2xl font-normal text-white mb-3 group-hover:text-zinc-300 transition-colors">
                  {post.title}
                </h2>
                <p className="text-zinc-400 leading-relaxed mb-6 font-light">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-zinc-500">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                  <Link
                    href="#"
                    className="text-white text-sm flex items-center gap-2 group-hover:gap-3 transition-all"
                  >
                    Read more
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
