"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Clock,
  Sparkles,
  Bot,
  Terminal,
  Briefcase,
  Trash2,
} from "lucide-react";
import { useState, useMemo } from "react";

// ─── Types ───
interface Deadline {
  id: string;
  title: string;
  date: string; // ISO string
  priority: "low" | "medium" | "high";
}

// ─── Helpers ───
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// ─── Starfield ───
function Starfield() {
  const stars = useMemo(
    () =>
      Array.from({ length: 100 }, (_, i) => ({
        id: i,
        size: Math.random() > 0.9 ? 2 : 1,
        opacity: 0.04 + Math.random() * 0.15,
        x: Math.random() * 100,
        y: Math.random() * 100,
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            width: s.size,
            height: s.size,
            left: `${s.x}%`,
            top: `${s.y}%`,
            opacity: s.opacity,
          }}
        />
      ))}
    </div>
  );
}

// ─── Priority Config ───
const priorityStyles = {
  high: {
    badge: "bg-red-500/10 text-red-300 border-red-500/20",
    btn: "bg-red-500/20 border-red-500 text-red-400",
  },
  medium: {
    badge: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    btn: "bg-amber-500/20 border-amber-500 text-amber-400",
  },
  low: {
    badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    btn: "bg-emerald-500/20 border-emerald-500 text-emerald-400",
  },
};

export default function CalendarPage() {
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPriority, setNewPriority] = useState<"low" | "medium" | "high">("medium");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const calendarDays = useMemo(() => {
    const days: (Date | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    return days;
  }, [year, month, daysInMonth, firstDay]);

  const addDeadline = (d: Omit<Deadline, "id">) => {
    setDeadlines((prev) => [...prev, { ...d, id: crypto.randomUUID() }]);
  };

  const removeDeadline = (id: string) => {
    setDeadlines((prev) => prev.filter((d) => d.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !selectedDate) return;
    const d = new Date(selectedDate);
    d.setHours(12, 0, 0, 0);
    addDeadline({ title: newTitle, date: d.toISOString(), priority: newPriority });
    setNewTitle("");
    setIsModalOpen(false);
  };

  const upcomingDeadlines = deadlines
    .filter((d) => new Date(d.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const agents = [
    {
      role: "Developer",
      icon: Terminal,
      items: [
        { name: "Code Review Agent", desc: "Automated PR reviews" },
        { name: "Deploy Sentinel", desc: "Monitors deployments 24/7" },
      ],
    },
    {
      role: "Business",
      icon: Briefcase,
      items: [
        { name: "Follow-up Agent", desc: "Personalized client follow-ups" },
        { name: "Research Agent", desc: "Compiles market insights" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-zinc-100 relative">
      <Starfield />

      <div className="relative z-10 p-6 md:p-8 max-w-7xl mx-auto">
        {/* ─── Header ─── */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold flex items-center gap-3 mb-2 text-white">
              <CalendarIcon className="w-7 h-7 text-emerald-400" />
              Command Center
            </h1>
            <p className="text-zinc-500 max-w-lg text-sm">
              Sync your schedule and delegate tasks to Clara&apos;s autonomous agents.
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-colors text-sm font-medium text-zinc-400 hover:text-white">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg"
              className="w-5 h-5"
              alt="GCal"
            />
            Sync Google Calendar
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* ─── Main Calendar Grid ─── */}
          <div className="lg:col-span-3 flex flex-col bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden min-h-[560px]">
            {/* Calendar Header */}
            <div className="p-5 flex items-center justify-between border-b border-white/5">
              <h2 className="text-xl font-semibold text-white">
                {currentDate.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
                  className="p-2 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
                  className="p-2 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Day Names */}
            <div className="grid grid-cols-7 border-b border-white/5 bg-white/[0.01]">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="py-2.5 text-center text-[11px] font-semibold text-zinc-600 uppercase tracking-wider"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="flex-1 grid grid-cols-7 auto-rows-fr">
              {calendarDays.map((date, i) => {
                if (!date)
                  return (
                    <div
                      key={`empty-${i}`}
                      className="border-b border-r border-white/[0.03] bg-black/20"
                    />
                  );

                const dateStr = date.toISOString().split("T")[0];
                const daysDeadlines = deadlines.filter((d) =>
                  d.date.startsWith(dateStr)
                );
                const isToday =
                  new Date().toDateString() === date.toDateString();

                return (
                  <div
                    key={i}
                    onClick={() => {
                      setSelectedDate(date);
                      setIsModalOpen(true);
                    }}
                    className={cn(
                      "border-b border-r border-white/[0.03] p-2.5 relative cursor-pointer group transition-colors hover:bg-white/[0.02]",
                      isToday && "bg-emerald-500/[0.04]"
                    )}
                  >
                    <span
                      className={cn(
                        "text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full mb-1.5",
                        isToday
                          ? "bg-emerald-500 text-white"
                          : "text-zinc-500 group-hover:text-white"
                      )}
                    >
                      {date.getDate()}
                    </span>
                    <div className="space-y-0.5">
                      {daysDeadlines.slice(0, 2).map((dl) => (
                        <div
                          key={dl.id}
                          className={cn(
                            "px-1.5 py-0.5 rounded text-[9px] font-medium truncate border",
                            priorityStyles[dl.priority].badge
                          )}
                        >
                          {dl.title}
                        </div>
                      ))}
                      {daysDeadlines.length > 2 && (
                        <div className="text-[9px] text-zinc-600 pl-1">
                          +{daysDeadlines.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ─── Sidebar ─── */}
          <div className="space-y-5">
            {/* Focus Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-600/80 to-blue-600/80 text-white shadow-xl shadow-emerald-900/20">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-emerald-200 text-[10px] font-semibold uppercase tracking-wider mb-1">
                    Focus Mode
                  </div>
                  <div className="text-xl font-bold">This Week</div>
                </div>
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-md">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div className="space-y-2.5">
                <div className="flex justify-between text-xs opacity-80">
                  <span>Tasks</span>
                  <span>{deadlines.length}</span>
                </div>
                <div className="h-1.5 bg-black/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all"
                    style={{
                      width: `${Math.min(
                        100,
                        deadlines.length > 0
                          ? (deadlines.filter(
                            (d) => new Date(d.date) < new Date()
                          ).length /
                            deadlines.length) *
                          100
                          : 0
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            {upcomingDeadlines.length > 0 && (
              <div className="space-y-2.5">
                <h3 className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                  Upcoming
                </h3>
                {upcomingDeadlines.map((dl) => (
                  <div
                    key={dl.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/[0.02] group"
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-zinc-200 truncate">
                        {dl.title}
                      </div>
                      <div className="text-[10px] text-zinc-600">
                        {new Date(dl.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                    <button
                      onClick={() => removeDeadline(dl.id)}
                      className="p-1.5 text-zinc-700 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Agents */}
            <div className="space-y-3">
              <h3 className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                Available Agents
              </h3>
              {agents.map((cat) =>
                cat.items.map((agent) => (
                  <div
                    key={agent.name}
                    className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:border-emerald-500/20 cursor-pointer transition-all hover:bg-white/[0.04]"
                  >
                    <div className="p-2 rounded-lg bg-white/[0.04] text-zinc-500">
                      <cat.icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-zinc-200">
                        {agent.name}
                      </div>
                      <div className="text-[10px] text-zinc-600">
                        {agent.desc}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Add Deadline Modal ─── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-black border border-white/10 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-white">
                  New Deadline
                  <span className="block text-xs font-normal text-zinc-600 mt-1">
                    for{" "}
                    {selectedDate?.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-full text-zinc-500 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400">
                    Task Title
                  </label>
                  <input
                    autoFocus
                    type="text"
                    placeholder="e.g. Ship v2.0 to production"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-emerald-500/50 transition-colors placeholder:text-zinc-700"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400">
                    Priority
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["low", "medium", "high"] as const).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setNewPriority(p)}
                        className={cn(
                          "py-2 rounded-lg text-xs font-medium border transition-all capitalize",
                          newPriority === p
                            ? priorityStyles[p].btn
                            : "bg-white/[0.02] border-white/5 text-zinc-600 hover:bg-white/5"
                        )}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-colors shadow-lg"
                >
                  Create Deadline
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
