"use client";

import { motion } from "framer-motion";
import { Mail, Calendar, DollarSign, Target, BookOpen, TrendingUp, Cloud, Zap, Shield, Globe, Cpu, Box } from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      icon: Mail,
      title: "Email Triage",
      description: "Automatically categorize, prioritize, and draft responses to your emails. Clara learns your communication style and handles routine correspondence."
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Intelligent calendar management that finds optimal meeting times, handles rescheduling, and respects your focus time preferences."
    },
    {
      icon: DollarSign,
      title: "Expense Tracking",
      description: "Automatic expense categorization and reporting. Snap receipts, track spending, and generate reports effortlessly."
    },
    {
      icon: Target,
      title: "Goal Setting",
      description: "Set and track personal and professional goals. Clara provides reminders, progress updates, and actionable insights."
    },
    {
      icon: BookOpen,
      title: "Study Mode",
      description: "Optimize your learning with spaced repetition, study schedules, and progress tracking across multiple subjects."
    },
    {
      icon: TrendingUp,
      title: "Habit Building",
      description: "Build lasting habits with intelligent reminders, streak tracking, and behavioral insights powered by AI."
    },
    {
      icon: Cloud,
      title: "Weather Updates",
      description: "Contextual weather information integrated into your daily briefing and calendar events."
    },
    {
      icon: Zap,
      title: "Task Management",
      description: "Smart task prioritization that adapts to your schedule, energy levels, and deadlines."
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "End-to-end encryption and isolated execution. Your data never leaves your control."
    },
    {
      icon: Globe,
      title: "Global Edge Network",
      description: "Deploy agents to 35+ regions with sub-50ms latency. Fast, reliable, everywhere."
    },
    {
      icon: Cpu,
      title: "Custom Workflows",
      description: "Build complex automation workflows with our intuitive HiveLang DSL. No coding required."
    },
    {
      icon: Box,
      title: "Integrations",
      description: "Connect with Gmail, Google Calendar, Slack, Notion, and 50+ other tools you already use."
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
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-normal tracking-tight text-white mb-6">
              Everything you need<br />
              <span className="text-zinc-500">in one assistant.</span>
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
              Clara combines 12 specialized agents to handle every aspect of your workflow. From email to expenses, habits to scheduling.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-zinc-900/30 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-colors group"
              >
                <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6 border border-white/10 group-hover:bg-white/10 transition-colors">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-normal text-white mb-3">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed font-light">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-normal text-white mb-4">Ready to transform your workflow?</h2>
            <p className="text-zinc-400 mb-8 font-light">
              Start using Clara today and reclaim your time.
            </p>
            <button className="h-12 px-6 bg-white text-black font-normal hover:bg-zinc-200 transition-colors text-sm rounded-lg">
              Get Started
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
