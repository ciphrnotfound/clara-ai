"use client";

import { motion } from "framer-motion";
import { 
  Bot, 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Key,
  Mail,
  Globe,
  Palette,
  ArrowLeft
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");

  const sections = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "api", label: "API Keys", icon: Key },
    { id: "preferences", label: "Preferences", icon: Palette }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Navigation */}
      <nav className="border-b border-white/5 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-zinc-400" />
              </button>
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                <Bot className="w-4 h-4 text-black" />
              </div>
              <span className="font-medium text-lg">Clara</span>
            </Link>
          </div>
          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center border border-white/10">
            <span className="text-sm font-medium">JD</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-normal text-white mb-2">Settings</h1>
          <p className="text-zinc-500">Manage your account and preferences.</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900/30 border border-white/10 rounded-xl p-4 sticky top-24">
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                      activeSection === section.id
                        ? "bg-white/10 text-white"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <section.icon className="w-4 h-4" />
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeSection === "profile" && <ProfileSection />}
            {activeSection === "notifications" && <NotificationsSection />}
            {activeSection === "security" && <SecuritySection />}
            {activeSection === "billing" && <BillingSection />}
            {activeSection === "api" && <APISection />}
            {activeSection === "preferences" && <PreferencesSection />}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900/30 border border-white/10 rounded-xl p-8"
    >
      <h2 className="text-2xl font-normal text-white mb-6">Profile Information</h2>
      
      <div className="space-y-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center border border-white/10">
            <span className="text-2xl font-medium">JD</span>
          </div>
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm hover:bg-white/10 transition-colors">
            Change Avatar
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-zinc-400 mb-2">First Name</label>
            <input
              type="text"
              defaultValue="John"
              className="w-full h-12 bg-black/50 border border-white/10 rounded-lg px-4 text-sm text-white focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Last Name</label>
            <input
              type="text"
              defaultValue="Doe"
              className="w-full h-12 bg-black/50 border border-white/10 rounded-lg px-4 text-sm text-white focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-2">Email</label>
          <input
            type="email"
            defaultValue="john@example.com"
            className="w-full h-12 bg-black/50 border border-white/10 rounded-lg px-4 text-sm text-white focus:outline-none focus:border-white/20 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-2">Bio</label>
          <textarea
            rows={4}
            defaultValue="Product designer and AI enthusiast."
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-white/20 transition-colors resize-none"
          />
        </div>

        <button className="px-6 py-3 bg-white text-black rounded-lg font-normal hover:bg-zinc-200 transition-colors">
          Save Changes
        </button>
      </div>
    </motion.div>
  );
}

function NotificationsSection() {
  const notifications = [
    { label: "Email notifications", description: "Receive email updates about your agents", enabled: true },
    { label: "Task completions", description: "Get notified when agents complete tasks", enabled: true },
    { label: "Weekly summary", description: "Receive a weekly summary of your activity", enabled: false },
    { label: "Agent errors", description: "Get alerted when agents encounter errors", enabled: true },
    { label: "Marketing emails", description: "Receive updates about new features", enabled: false }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900/30 border border-white/10 rounded-xl p-8"
    >
      <h2 className="text-2xl font-normal text-white mb-6">Notification Preferences</h2>
      
      <div className="space-y-6">
        {notifications.map((notif, i) => (
          <div key={i} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
            <div>
              <p className="text-sm font-normal text-white mb-1">{notif.label}</p>
              <p className="text-xs text-zinc-500">{notif.description}</p>
            </div>
            <button
              className={`relative w-12 h-6 rounded-full transition-colors ${
                notif.enabled ? "bg-emerald-500" : "bg-zinc-700"
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  notif.enabled ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function SecuritySection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-zinc-900/30 border border-white/10 rounded-xl p-8">
        <h2 className="text-2xl font-normal text-white mb-6">Change Password</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Current Password</label>
            <input
              type="password"
              className="w-full h-12 bg-black/50 border border-white/10 rounded-lg px-4 text-sm text-white focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-2">New Password</label>
            <input
              type="password"
              className="w-full h-12 bg-black/50 border border-white/10 rounded-lg px-4 text-sm text-white focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full h-12 bg-black/50 border border-white/10 rounded-lg px-4 text-sm text-white focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>
          <button className="px-6 py-3 bg-white text-black rounded-lg font-normal hover:bg-zinc-200 transition-colors">
            Update Password
          </button>
        </div>
      </div>

      <div className="bg-zinc-900/30 border border-white/10 rounded-xl p-8">
        <h2 className="text-2xl font-normal text-white mb-6">Two-Factor Authentication</h2>
        <p className="text-zinc-400 mb-6">Add an extra layer of security to your account.</p>
        <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg font-normal hover:bg-white/10 transition-colors">
          Enable 2FA
        </button>
      </div>
    </motion.div>
  );
}

function BillingSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-zinc-900/30 border border-white/10 rounded-xl p-8">
        <h2 className="text-2xl font-normal text-white mb-6">Current Plan</h2>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xl font-normal text-white mb-1">Pro Plan</p>
            <p className="text-sm text-zinc-500">$10/month • Early Access Pricing</p>
          </div>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full border border-emerald-500/20">
            Active
          </span>
        </div>
        <Link href="/pricing">
          <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg font-normal hover:bg-white/10 transition-colors">
            Change Plan
          </button>
        </Link>
      </div>

      <div className="bg-zinc-900/30 border border-white/10 rounded-xl p-8">
        <h2 className="text-2xl font-normal text-white mb-6">Payment Method</h2>
        <div className="flex items-center gap-4 p-4 bg-black/30 border border-white/5 rounded-lg mb-6">
          <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-normal text-white">•••• •••• •••• 4242</p>
            <p className="text-xs text-zinc-500">Expires 12/25</p>
          </div>
        </div>
        <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg font-normal hover:bg-white/10 transition-colors">
          Update Payment Method
        </button>
      </div>
    </motion.div>
  );
}

function APISection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900/30 border border-white/10 rounded-xl p-8"
    >
      <h2 className="text-2xl font-normal text-white mb-6">API Keys</h2>
      <p className="text-zinc-400 mb-6">Manage your API keys for programmatic access to Clara.</p>
      
      <div className="space-y-4 mb-6">
        <div className="p-4 bg-black/30 border border-white/5 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-normal text-white">Production Key</p>
            <span className="text-xs text-emerald-400">Active</span>
          </div>
          <code className="text-xs text-zinc-500 font-mono">sk_live_••••••••••••••••••••••••4a3b</code>
        </div>
      </div>

      <button className="px-6 py-3 bg-white text-black rounded-lg font-normal hover:bg-zinc-200 transition-colors">
        Generate New Key
      </button>
    </motion.div>
  );
}

function PreferencesSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900/30 border border-white/10 rounded-xl p-8"
    >
      <h2 className="text-2xl font-normal text-white mb-6">Preferences</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm text-zinc-400 mb-2">Language</label>
          <select className="w-full h-12 bg-black/50 border border-white/10 rounded-lg px-4 text-sm text-white focus:outline-none focus:border-white/20 transition-colors">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-2">Timezone</label>
          <select className="w-full h-12 bg-black/50 border border-white/10 rounded-lg px-4 text-sm text-white focus:outline-none focus:border-white/20 transition-colors">
            <option>UTC-8 (Pacific Time)</option>
            <option>UTC-5 (Eastern Time)</option>
            <option>UTC+0 (GMT)</option>
            <option>UTC+1 (CET)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-2">Theme</label>
          <select className="w-full h-12 bg-black/50 border border-white/10 rounded-lg px-4 text-sm text-white focus:outline-none focus:border-white/20 transition-colors">
            <option>Dark</option>
            <option>Light</option>
            <option>System</option>
          </select>
        </div>

        <button className="px-6 py-3 bg-white text-black rounded-lg font-normal hover:bg-zinc-200 transition-colors">
          Save Preferences
        </button>
      </div>
    </motion.div>
  );
}
