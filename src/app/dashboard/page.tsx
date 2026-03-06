"use client";

import { motion } from "framer-motion";
import { 
  Bot, 
  Mail, 
  Calendar, 
  DollarSign, 
  Target, 
  TrendingUp,
  Settings,
  Bell,
  Search,
  Plus,
  Activity,
  Clock,
  CheckCircle2,
  AlertCircle,
  LogOut,
  User
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";

export default function DashboardPage() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [stats, setStats] = useState({
    tasksCompleted: 0,
    totalMessages: 0,
    totalActivities: 0,
    completionRate: 0
  });

  useEffect(() => {
    async function loadData() {
      try {
        // Get user
        const { data: { user: authUser } } = await supabase.auth.getUser();
        
        if (!authUser) {
          router.push("/signin");
          return;
        }

        setUser(authUser);

        // Get profile
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", authUser.id)
          .single();

        setProfile(profileData);

        // Get recent activities
        const { data: activitiesData } = await supabase
          .from("activities")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5);

        setActivities(activitiesData || []);

        // Get stats
        // Count completed tasks
        const { count: completedTasks } = await supabase
          .from("tasks")
          .select("*", { count: "exact", head: true })
          .eq("status", "completed");

        // Count total tasks
        const { count: totalTasks } = await supabase
          .from("tasks")
          .select("*", { count: "exact", head: true });

        // Count messages
        const { count: messageCount } = await supabase
          .from("messages")
          .select("*", { count: "exact", head: true });

        // Count activities
        const { count: activityCount } = await supabase
          .from("activities")
          .select("*", { count: "exact", head: true });

        // Calculate completion rate
        const rate = totalTasks && totalTasks > 0 
          ? Math.round((completedTasks || 0) / totalTasks * 100) 
          : 0;

        setStats({
          tasksCompleted: completedTasks || 0,
          totalMessages: messageCount || 0,
          totalActivities: activityCount || 0,
          completionRate: rate
        });

      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showUserMenu]);

  const handleSignOut = async () => {
    await fetch("/api/auth/signout", { method: "POST" });
    router.push("/signin");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-zinc-500">Loading...</div>
      </div>
    );
  }
  
  const statsData = [
    { 
      label: "Tasks Completed", 
      value: stats.tasksCompleted.toString(), 
      change: stats.tasksCompleted > 0 ? `${stats.tasksCompleted} done` : "Get started", 
      icon: CheckCircle2, 
      color: "emerald" 
    },
    { 
      label: "Messages Sent", 
      value: stats.totalMessages.toString(), 
      change: stats.totalMessages > 0 ? "Keep chatting" : "Say hello", 
      icon: Mail, 
      color: "blue" 
    },
    { 
      label: "Activities Logged", 
      value: stats.totalActivities.toString(), 
      change: stats.totalActivities > 0 ? "Tracking" : "Start now", 
      icon: Activity, 
      color: "purple" 
    },
    { 
      label: "Completion Rate", 
      value: `${stats.completionRate}%`, 
      change: stats.completionRate > 0 ? "Great work!" : "Add tasks", 
      icon: TrendingUp, 
      color: "green" 
    }
  ];

  const recentActivity = activities.length > 0 
    ? activities.map(a => ({
        task: a.type.charAt(0).toUpperCase() + a.type.slice(1),
        action: a.action,
        time: new Date(a.created_at).toLocaleString(),
        status: "success"
      }))
    : [
        { task: "Welcome", action: "Your activity feed will appear here", time: "Just now", status: "success" }
      ];

  const capabilities = [
    { name: "Email Management", icon: Mail, status: "active", tasks: 23, description: "Auto-sorting and prioritizing" },
    { name: "Calendar", icon: Calendar, status: "active", tasks: 8, description: "Smart scheduling" },
    { name: "Expenses", icon: DollarSign, status: "active", tasks: 5, description: "Tracking & categorizing" },
    { name: "Goals", icon: Target, status: "idle", tasks: 0, description: "Progress tracking" },
    { name: "Habits", icon: TrendingUp, status: "active", tasks: 3, description: "Building routines" },
    { name: "Tasks", icon: Activity, status: "active", tasks: 12, description: "Smart prioritization" }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Navigation */}
      <nav className="border-b border-white/5 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                <Bot className="w-4 h-4 text-black" />
              </div>
              <span className="font-medium text-lg">Clara</span>
            </Link>
            <div className="hidden md:flex items-center gap-1">
              <Link href="/dashboard">
                <button
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    pathname === "/dashboard"
                      ? "bg-white/10 text-white"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Overview
                </button>
              </Link>
              <Link href="/dashboard/chat">
                <button className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    pathname === "/dashboard/chat"
                      ? "bg-white/10 text-white"
                      : "text-zinc-400 hover:text-white"
                  }`}>
                  Chat
                </button>
              </Link>
              <Link href="/dashboard/calendar">
                <button className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    pathname === "/dashboard/calendar"
                      ? "bg-white/10 text-white"
                      : "text-zinc-400 hover:text-white"
                  }`}>
                  Calendar
                </button>
              </Link>
              <Link href="/dashboard/agents">
                <button className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    pathname === "/dashboard/agents"
                      ? "bg-white/10 text-white"
                      : "text-zinc-400 hover:text-white"
                  }`}>
                  Capabilities
                </button>
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search..."
                className="w-64 h-9 bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 text-sm text-white focus:outline-none focus:border-white/20 transition-colors placeholder:text-zinc-600"
              />
            </div>
            <button className="relative p-2 hover:bg-white/5 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-zinc-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-400 rounded-full" />
            </button>
            <Link href="/dashboard/settings">
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-zinc-400" />
              </button>
            </Link>
            <div className="relative user-menu-container">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center border border-white/10 hover:bg-white/20 transition-colors"
              >
                <span className="text-sm font-medium">
                  {profile?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase() || "U"}
                </span>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-white/10 rounded-lg shadow-xl overflow-hidden z-50">
                  <div className="p-3 border-b border-white/10">
                    <p className="text-sm font-medium text-white truncate">
                      {profile?.full_name || "User"}
                    </p>
                    <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
                  </div>
                  <div className="py-1">
                    <Link href="/dashboard/settings">
                      <button className="w-full px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 transition-colors flex items-center gap-3">
                        <User className="w-4 h-4" />
                        Profile Settings
                      </button>
                    </Link>
                    <button 
                      onClick={handleSignOut}
                      className="w-full px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-3"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-normal text-white mb-2">
            Welcome back, {profile?.full_name || user?.email?.split("@")[0] || "there"}
          </h1>
          <p className="text-zinc-500">Here's what I've been working on for you today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, i) => {
            const colorClasses = {
              emerald: "bg-emerald-500/10 text-emerald-400",
              blue: "bg-blue-500/10 text-blue-400",
              purple: "bg-purple-500/10 text-purple-400",
              green: "bg-green-500/10 text-green-400"
            };
            
            return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900/30 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className="text-xs text-emerald-400 font-medium">{stat.change}</span>
              </div>
              <p className="text-2xl font-normal text-white mb-1">{stat.value}</p>
              <p className="text-sm text-zinc-500">{stat.label}</p>
            </motion.div>
          )})}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Active Capabilities */}
          <div className="lg:col-span-2">
            <div className="bg-zinc-900/30 border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-normal text-white">What I Can Do</h2>
                <button className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Customize
                </button>
              </div>
              <div className="space-y-3">
                {capabilities.map((capability, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between p-4 bg-black/30 border border-white/5 rounded-lg hover:border-white/10 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-white/10 transition-colors">
                        <capability.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-normal text-white">{capability.name}</p>
                        <p className="text-xs text-zinc-500">{capability.description} • {capability.tasks} today</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          capability.status === "active" ? "bg-emerald-400" : "bg-zinc-600"
                        }`}
                      />
                      <span className="text-xs text-zinc-500 capitalize">{capability.status}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900/30 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-normal text-white mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="pb-4 border-b border-white/5 last:border-0 last:pb-0"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          activity.status === "success" ? "bg-emerald-400" : "bg-yellow-400"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm text-white font-normal mb-1">{activity.task}</p>
                        <p className="text-xs text-zinc-500 mb-1">{activity.action}</p>
                        <p className="text-xs text-zinc-600">{activity.time}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-zinc-900/30 border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-normal text-white mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { label: "Chat with Clara", icon: Plus, href: "/dashboard/chat" },
              { label: "View Calendar", icon: Activity, href: "/dashboard/calendar" },
              { label: "Preferences", icon: Settings, href: "/dashboard/settings" },
              { label: "Get Help", icon: AlertCircle, href: "#" }
            ].map((action, i) => (
              <Link key={i} href={action.href}>
                <button className="w-full p-4 bg-black/30 border border-white/5 rounded-lg hover:border-white/10 transition-colors text-left group">
                  <action.icon className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors mb-2" />
                  <p className="text-sm text-zinc-400 group-hover:text-white transition-colors">
                    {action.label}
                  </p>
                </button>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
