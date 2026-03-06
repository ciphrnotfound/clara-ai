"use client";

import { motion } from "framer-motion";
import { Users, Target, Zap, Heart } from "lucide-react";

export default function AboutPage() {
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
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-normal tracking-tight text-white mb-6">
              Your co-pilot for<br />
              <span className="text-zinc-500">navigating life.</span>
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
              Life can feel like navigating the unknown. Clara is your personal astronaut—helping you chart your course through the chaos, making every day more manageable and meaningful.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-6 border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Our Mission",
                description: "To be your trusted co-pilot, helping you navigate the unknown and making life's journey more bearable."
              },
              {
                icon: Zap,
                title: "Our Vision",
                description: "A world where everyone has a personal astronaut guiding them through life's challenges with intelligence and care."
              },
              {
                icon: Users,
                title: "Our Values",
                description: "Privacy-first, human-centric design, and relentless focus on making your life easier, not more complicated."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-zinc-900/30 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-colors"
              >
                <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6 border border-white/10">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-normal text-white mb-3">{item.title}</h3>
                <p className="text-zinc-400 leading-relaxed font-light">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-6 bg-zinc-900/20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-normal text-white mb-8 tracking-tight">Our Story</h2>
            <div className="space-y-6 text-zinc-400 leading-relaxed font-light">
              <p>
                Life feels like navigating through space—vast, unknown, and sometimes overwhelming. Between managing emails, scheduling meetings, tracking expenses, and juggling countless tasks, it's easy to feel lost in the chaos.
              </p>
              <p>
                That's why we built Clara. Not just another productivity tool, but a true co-pilot—an astronaut who understands your journey, learns your patterns, and helps you navigate through the unknown with confidence.
              </p>
              <p>
                Clara is here to make your life more bearable. To handle the mundane so you can focus on what truly matters. To be the steady presence that helps you chart your course through whatever comes your way.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            {[
              { value: "2026", label: "Founded" },
              { value: "Growing", label: "Community" },
              { value: "∞", label: "Possibilities" },
              { value: "1", label: "Mission" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-4xl font-normal text-white mb-2">{stat.value}</p>
                <p className="text-sm text-zinc-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
