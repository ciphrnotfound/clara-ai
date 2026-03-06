"use client";

import { motion } from "framer-motion";
import { Package, Layers, Workflow, Terminal } from "lucide-react";

export default function ProductsPage() {
  const products = [
    {
      icon: Layers,
      name: "Clara Platform",
      description: "The core AI assistant platform. Deploy autonomous agents that handle your daily workflows with intelligence and precision.",
      features: ["12 specialized agents", "Natural language interface", "Cross-platform sync", "Real-time automation"]
    },
    {
      icon: Terminal,
      name: "Clara SDK",
      description: "Build custom agents and integrations with our developer-friendly SDK. Full TypeScript support and comprehensive documentation.",
      features: ["Type-safe API", "Event streaming", "Webhook support", "Local development tools"]
    },
    {
      icon: Workflow,
      name: "HiveLang",
      description: "Our domain-specific language for defining agent behaviors. Simple, declarative syntax that makes complex workflows easy.",
      features: ["Visual workflow builder", "Version control", "Testing framework", "Template library"]
    },
    {
      icon: Package,
      name: "Clara Enterprise",
      description: "Enterprise-grade infrastructure with dedicated support, custom SLAs, and advanced security features for large organizations.",
      features: ["SSO & SAML", "Dedicated infrastructure", "Custom integrations", "24/7 support"]
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
              <Package className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-normal tracking-tight text-white mb-6">
              Products built for<br />
              <span className="text-zinc-500">the future of work.</span>
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
              A complete suite of tools to build, deploy, and manage autonomous AI agents at any scale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto space-y-24">
          {products.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                  <product.icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-normal text-white mb-4">{product.name}</h2>
                <p className="text-zinc-400 leading-relaxed mb-6 font-light">
                  {product.description}
                </p>
                <ul className="space-y-3">
                  {product.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-zinc-400 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      <span className="font-light">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                <div className="bg-zinc-900/30 border border-white/10 rounded-2xl p-12 aspect-square flex items-center justify-center">
                  <product.icon className="w-32 h-32 text-white/20" />
                </div>
              </div>
            </motion.div>
          ))}
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
            <h2 className="text-3xl font-normal text-white mb-4">Start building today</h2>
            <p className="text-zinc-400 mb-8 font-light">
              Get started with Clara and see what autonomous agents can do for you.
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
