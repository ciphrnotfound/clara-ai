"use client";

import { motion } from "framer-motion";
import { Building2, Users, TrendingUp, Star } from "lucide-react";

export default function CustomersPage() {
  const testimonials = [
    {
      quote: "Clara has transformed how our team manages client communications. We've reduced email response time by 60% and our team is happier than ever.",
      author: "Sarah Chen",
      role: "VP of Operations",
      company: "TechCorp",
      logo: "TC"
    },
    {
      quote: "The expense tracking alone has saved us thousands in accounting fees. Clara just gets it.",
      author: "Marcus Johnson",
      role: "CFO",
      company: "StartupXYZ",
      logo: "SX"
    },
    {
      quote: "We deployed Clara across our entire sales team. The automatic meeting scheduling and follow-ups have increased our close rate by 40%.",
      author: "Emily Rodriguez",
      role: "Head of Sales",
      company: "SalesForce Pro",
      logo: "SF"
    },
    {
      quote: "As a solo founder, Clara is like having a full-time executive assistant. I can finally focus on building product instead of managing my inbox.",
      author: "David Kim",
      role: "Founder & CEO",
      company: "InnovateLabs",
      logo: "IL"
    },
    {
      quote: "The privacy-first approach was crucial for us. Clara handles sensitive client data with the security we need.",
      author: "Jennifer Lee",
      role: "CTO",
      company: "SecureData Inc",
      logo: "SD"
    },
    {
      quote: "Clara's habit tracking has helped our team maintain work-life balance while hitting all our goals. It's been transformative.",
      author: "Alex Thompson",
      role: "Head of People",
      company: "WellnessCo",
      logo: "WC"
    }
  ];

  const stats = [
    { value: "500+", label: "Companies" },
    { value: "10,000+", label: "Active Users" },
    { value: "2M+", label: "Tasks Automated" },
    { value: "4.9/5", label: "Average Rating" }
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
              <Building2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-normal tracking-tight text-white mb-6">
              Trusted by teams<br />
              <span className="text-zinc-500">everywhere.</span>
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
              From startups to enterprises, teams use Clara to automate workflows and reclaim their time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            {stats.map((stat, i) => (
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

      {/* Testimonials Grid */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-normal text-white mb-4">What our customers say</h2>
            <p className="text-zinc-400 font-light">Real stories from real teams.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-zinc-900/30 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-colors"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-white text-white" />
                  ))}
                </div>
                <p className="text-zinc-300 leading-relaxed mb-6 font-light">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/10">
                    <span className="text-white text-sm font-normal">{testimonial.logo}</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-normal">{testimonial.author}</p>
                    <p className="text-zinc-500 text-xs">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
