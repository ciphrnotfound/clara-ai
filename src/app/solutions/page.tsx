"use client";

import { motion } from "framer-motion";
import { Lightbulb, Users, Briefcase, GraduationCap, Building } from "lucide-react";

export default function SolutionsPage() {
  const solutions = [
    {
      icon: Users,
      title: "For Individuals",
      description: "Personal productivity assistant that learns your habits and automates your daily routine.",
      useCases: [
        "Email management and triage",
        "Calendar optimization",
        "Personal finance tracking",
        "Habit building and goal tracking"
      ]
    },
    {
      icon: Briefcase,
      title: "For Professionals",
      description: "Executive assistant capabilities for busy professionals who need to maximize their time.",
      useCases: [
        "Meeting scheduling and coordination",
        "Client communication management",
        "Expense reporting",
        "Task prioritization"
      ]
    },
    {
      icon: Building,
      title: "For Teams",
      description: "Collaborative workflows and shared agents that help teams work more efficiently together.",
      useCases: [
        "Team calendar management",
        "Shared inbox automation",
        "Project tracking",
        "Resource allocation"
      ]
    },
    {
      icon: GraduationCap,
      title: "For Students",
      description: "Study companion that helps you learn more effectively and stay organized.",
      useCases: [
        "Study schedule optimization",
        "Assignment tracking",
        "Research organization",
        "Learning progress analytics"
      ]
    }
  ];

  const industries = [
    "Technology & Software",
    "Financial Services",
    "Healthcare",
    "Legal",
    "Consulting",
    "Real Estate",
    "Education",
    "Marketing & Advertising"
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
              <Lightbulb className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-normal tracking-tight text-white mb-6">
              Solutions for every<br />
              <span className="text-zinc-500">workflow.</span>
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
              Whether you're an individual, team, or enterprise, Clara adapts to your unique needs and workflows.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24 px-6 border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {solutions.map((solution, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-zinc-900/30 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-colors"
              >
                <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6 border border-white/10">
                  <solution.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-normal text-white mb-3">{solution.title}</h3>
                <p className="text-zinc-400 leading-relaxed mb-6 font-light">
                  {solution.description}
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-zinc-500 font-normal mb-3">Common use cases:</p>
                  <ul className="space-y-2">
                    {solution.useCases.map((useCase, j) => (
                      <li key={j} className="flex items-center gap-3 text-zinc-400 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        <span className="font-light">{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-normal text-white mb-4">Trusted across industries</h2>
            <p className="text-zinc-400 font-light">
              Clara adapts to the unique needs of your industry.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-4">
            {industries.map((industry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-zinc-900/30 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors text-center"
              >
                <p className="text-zinc-300 font-normal text-sm">{industry}</p>
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
            <h2 className="text-3xl font-normal text-white mb-4">Ready to get started?</h2>
            <p className="text-zinc-400 mb-8 font-light">
              See how Clara can transform your workflow today.
            </p>
            <button className="h-12 px-6 bg-white text-black font-normal hover:bg-zinc-200 transition-colors text-sm rounded-lg">
              Start Free Trial
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
