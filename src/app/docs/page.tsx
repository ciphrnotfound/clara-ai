"use client";

import { motion } from "framer-motion";
import { FileText, Book, Code, Zap, Shield, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DocsPage() {
  const sections = [
    {
      icon: Zap,
      title: "Getting Started",
      description: "Quick start guide to get up and running with Clara in minutes.",
      links: ["Installation", "Authentication", "First Agent", "Basic Concepts"]
    },
    {
      icon: Code,
      title: "API Reference",
      description: "Complete API documentation with examples and best practices.",
      links: ["REST API", "SDK Reference", "Webhooks", "Rate Limits"]
    },
    {
      icon: Book,
      title: "Guides",
      description: "In-depth tutorials and guides for common use cases.",
      links: ["Email Automation", "Calendar Integration", "Custom Workflows", "Advanced Features"]
    },
    {
      icon: Shield,
      title: "Security",
      description: "Learn about our security practices and compliance.",
      links: ["Data Privacy", "Encryption", "Compliance", "Best Practices"]
    },
    {
      icon: Globe,
      title: "Integrations",
      description: "Connect Clara with your favorite tools and services.",
      links: ["Gmail", "Google Calendar", "Slack", "Notion"]
    },
    {
      icon: FileText,
      title: "Resources",
      description: "Additional resources to help you succeed with Clara.",
      links: ["FAQ", "Troubleshooting", "Changelog", "Community"]
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
              <Book className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-normal tracking-tight text-white mb-6">
              Documentation
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
              Everything you need to build with Clara. Guides, API references, and examples.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 max-w-2xl mx-auto"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full h-14 bg-zinc-900/30 border border-white/10 rounded-xl pl-6 pr-4 text-sm text-white focus:outline-none focus:border-white/20 transition-colors font-normal placeholder:text-zinc-600 backdrop-blur-md"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-zinc-900/30 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-colors group"
              >
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 border border-white/10 group-hover:bg-white/10 transition-colors">
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-normal text-white mb-3">{section.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light">
                  {section.description}
                </p>
                <ul className="space-y-3">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <Link
                        href="#"
                        className="text-sm text-zinc-500 hover:text-white transition-colors flex items-center gap-2 group/link"
                      >
                        <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start CTA */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-normal text-white mb-4">Ready to get started?</h2>
            <p className="text-zinc-400 mb-8 font-light">
              Install the Clara SDK and deploy your first agent in under 5 minutes.
            </p>
            <div className="bg-black border border-white/10 rounded-xl p-6 max-w-2xl mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                </div>
                <div className="text-xs text-zinc-500 font-mono ml-2">terminal</div>
              </div>
              <code className="text-sm text-zinc-300 font-mono">
                $ npm install @bothive/sdk
              </code>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
