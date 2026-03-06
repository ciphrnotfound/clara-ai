"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
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
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-normal tracking-tight text-white mb-6">
              Privacy Policy
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
              <h2 className="text-2xl font-normal text-white mb-4">Introduction</h2>
              <p>
                At Clara (Bothive Inc.), we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-normal text-white mb-4">Information We Collect</h2>
              <p className="mb-4">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Account information (name, email, password)</li>
                <li>Profile information and preferences</li>
                <li>Content you create or upload through our service</li>
                <li>Communications with us</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-normal text-white mb-4">How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Protect against fraudulent or illegal activity</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-normal text-white mb-4">Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information. All data is encrypted in transit and at rest. We use industry-standard security protocols and regularly audit our systems.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-normal text-white mb-4">Data Retention</h2>
              <p>
                We retain your information for as long as your account is active or as needed to provide you services. You can request deletion of your data at any time through your account settings.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-normal text-white mb-4">Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Export your data</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-normal text-white mb-4">Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at privacy@clara.ai
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
