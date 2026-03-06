"use client";

import { motion } from "framer-motion";
import { 
  Bot, 
  Mail, 
  Calendar, 
  DollarSign, 
  Target, 
  BookOpen,
  TrendingUp,
  Cloud,
  Zap,
  ArrowLeft,
  Play,
  Pause,
  Settings,
  Activity,
  Clock,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

export default function AgentsPage() {
  const agents = [
    {
      name: "Email Triage",
      icon: Mail,
      description: "Automatically categorize and prioritize your emails",
      status: "active",
      tasksToday: 23,
      tasksTotal: 1247,
      successRate: 96,
      avgTime: "2.3s",
      color: "blue"
    },
    {
      name: "Smart Scheduling",
      icon: Calendar,
      description: "Intelligent calendar management and meeting coordination",
      status: "active",
      tasksToday: 8,
      tasksTotal: 456,
      successRate: 94,
      avgTime: "1.8s",
      color: "purple"
    },
    {
      name: "Expense Tracking",
      icon: DollarSign,
      description: "Automatic expense categorization and reporting",
      status: "active",
      tasksToday: 5,
      tasksTotal: 892,
      successRate: 98,
      avgTime: "1.2s",
      color: "green"
    },
    {
      name: "Goal Setting",
      icon: Target,
      description: "Track and manage your personal and professional goals",
      status: "idle",
      tasksToday: 0,
      tasksTotal: 234,
      successRate: 92,
      avgTime: "3.1s",
      color: "red"
    },
    {
      name: "Study Mode",
      icon: BookOpen,
      description: "Optimize learning with spaced repetition and schedules",
      status: "idle",
      tasksToday: 0,
      tasksTotal: 567,
      successRate: 95,
      avgTime: "2.7s",
      color: "yellow"
    },
    {
      name: "Habit Building",
      icon: TrendingUp,
      description: "Build lasting habits with intelligent reminders",
      status: "active",
      tasksToday: 3,
      tasksTotal: 1089,
      successRate: 91,
      avgTime: "1.5s",
      color: "emerald"
    },
    {
      name: "Weather Updates",
      icon: Cloud,
      description: "Contextual weather information for your schedule",
      status: "active",
      tasksToday: 12,
      tasksTotal: 3421,
      successRate: 99,
      avgTime: "0.8s",
      color: "cyan"
    },
    {
      name: "Task Management",
      icon: Zap,
      description: "Smart task prioritization and deadline management",
      status: "active",
      tasksToday: 15,
      tasksTotal: 2156,
      successRate: 93,
      avgTime: "2.1s",
      color: "orange"
    }
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
          <h1 className="text-3xl font-normal text-white mb-2">Your Agents</h1>
          <p className="text-zinc-500">Manage and monitor all your AI agents.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Agents", value: "8", icon: Bot },
            { label: "Active Now", value: "6", icon: Activity },
            { label: "Tasks Today", value: "66", icon: CheckCircle2 },
            { label: "Avg Response", value: "1.9s", icon: Clock }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900/30 border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="w-5 h-5 text-zinc-400" />
              </div>
              <p className="text-2xl font-normal text-white mb-1">{stat.value}</p>
              <p className="text-sm text-zinc-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Agents Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {agents.map((agent, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-zinc-900/30 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-${agent.color}-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <agent.icon className={`w-6 h-6 text-${agent.color}-400`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-normal text-white mb-1">{agent.name}</h3>
                    <p className="text-xs text-zinc-500">{agent.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      agent.status === "active" ? "bg-emerald-400" : "bg-zinc-600"
                    }`}
                  />
                  <span className="text-xs text-zinc-500 capitalize">{agent.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Today</p>
                  <p className="text-lg font-normal text-white">{agent.tasksToday}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Total</p>
                  <p className="text-lg font-normal text-white">{agent.tasksTotal}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Success</p>
                  <p className="text-lg font-normal text-white">{agent.successRate}%</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Avg Time</p>
                  <p className="text-lg font-normal text-white">{agent.avgTime}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex-1 h-10 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm">
                  {agent.status === "active" ? (
                    <>
                      <Pause className="w-4 h-4" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Start
                    </>
                  )}
                </button>
                <button className="h-10 px-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
