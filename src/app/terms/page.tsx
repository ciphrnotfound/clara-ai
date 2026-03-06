"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function TermsPage() {
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
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-normal tracking-tight text-white mb-6">
              Terms of Service
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
              Last updated: March 5, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12 text-zinc-400 leading-relaxed font-light"
          >
            <div>
              <h2 className="text-2xl font-normal text-white mb-4">Agreement to Terms</h2>
              <p>
                By accessing or using Clara's services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-normal text-white mb-4">Use License</h2>
              <p className="mb-4">
                We grant you a limited, non-exclusive, non-transferable license to use Clara for your personal or internal business purposes, subject to these terms.
              </p>
              <p className="mb-4">You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Modify or copy the service materials</li>
                <li>Use the service for any commercial purpose without authorization</li>
                <li>Attempt to reverse engineer any software</li>
                <li>Remove any copyright or proprietary notations</li>
                <li>Transfer the service to another person</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-normal text-white mb-4">User Accounts</h2>
              <p>
                You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-normal text-white mb-4">Acceptable Use</h2>
              <p className="mb-4">You agree not to use Clara to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Violate any laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit harmful or malicious code</li>
                <li>Harass, abuse, or harm others</li>
                <li>Collect user information without consent</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-normal text-white mb-4">Service Availability</h2>
              <p>
                We strive to provide reliable service but do not guarantee uninterrupted access. We may modify, suspend, or discontinue any part of the service at any time.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-normal text-white mb-4">Limitation of Liability</h2>
              <p>
                Clara and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-normal text-white mb-4">Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-normal text-white mb-4">Contact Information</h2>
              <p>
                For questions about these Terms of Service, please contact us at legal@clara.ai
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
