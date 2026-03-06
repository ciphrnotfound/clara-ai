"use client";

import { motion } from "framer-motion";
import { Check, DollarSign, ArrowRight } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for trying out Clara",
      features: [
        "Up to 100 tasks per month",
        "Email triage",
        "Basic calendar management",
        "Community support",
        "1 active agent"
      ],
      cta: "Get Started",
      highlighted: false
    },
    {
      name: "Pro",
      price: "$10",
      description: "For professionals who want more",
      features: [
        "Unlimited tasks",
        "All 12 specialized agents",
        "Advanced automation",
        "Priority support",
        "Custom workflows",
        "API access",
        "Team collaboration"
      ],
      cta: "Start Free Trial",
      highlighted: true,
      badge: "Early Access Pricing"
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For teams and organizations",
      features: [
        "Everything in Pro",
        "Dedicated infrastructure",
        "SSO & advanced security",
        "Custom integrations",
        "SLA guarantee",
        "Dedicated support",
        "Training & onboarding"
      ],
      cta: "Contact Sales",
      highlighted: false
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
              <DollarSign className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-normal tracking-tight text-white mb-6">
              Simple, transparent<br />
              <span className="text-zinc-500">pricing.</span>
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
              Start for free, upgrade when you need more. No hidden fees, cancel anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-zinc-900/30 border rounded-2xl p-8 ${
                  plan.highlighted
                    ? "border-white/20 ring-1 ring-white/10"
                    : "border-white/10"
                } hover:border-white/20 transition-colors relative`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-white text-black text-xs font-normal rounded-full">
                      {plan.badge || "Most Popular"}
                    </span>
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-normal text-white mb-2">{plan.name}</h3>
                  <p className="text-zinc-500 text-sm font-light mb-6">{plan.description}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-normal text-white">{plan.price}</span>
                    {plan.price !== "Custom" && (
                      <span className="text-zinc-500 text-sm">/month</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-zinc-400 text-sm">
                      <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                      <span className="font-light">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full h-12 rounded-lg text-sm font-normal transition-colors flex items-center justify-center gap-2 ${
                    plan.highlighted
                      ? "bg-white text-black hover:bg-zinc-200"
                      : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-normal text-white mb-4">Frequently asked questions</h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                q: "Can I change plans later?",
                a: "Yes, you can upgrade or downgrade at any time. Changes take effect immediately."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, PayPal, and wire transfers for Enterprise plans."
              },
              {
                q: "Is there a free trial?",
                a: "Yes, Pro plans come with a 14-day free trial. No credit card required."
              },
              {
                q: "What happens if I exceed my task limit?",
                a: "On the Free plan, tasks will queue until next month. We'll notify you before this happens."
              }
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-zinc-900/30 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors"
              >
                <h3 className="text-lg font-normal text-white mb-2">{faq.q}</h3>
                <p className="text-zinc-400 font-light">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
