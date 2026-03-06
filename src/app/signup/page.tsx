"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Lock, User, Github, Chrome } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";

export default function SignUpPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    try {
      setOauthLoading(provider);
      setError("");

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
      setOauthLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Starfield Background */}
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

      <div className="max-w-md mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-normal text-white mb-3 tracking-tight">Create your account</h1>
          <p className="text-zinc-500 font-light">Start deploying agents in seconds.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-zinc-900/30 border border-white/10 rounded-2xl p-8 backdrop-blur-md"
        >
          {/* OAuth Buttons */}
          <div className="space-y-3 mb-8">
            <button 
              onClick={() => handleOAuthSignIn("google")}
              disabled={oauthLoading !== null}
              className="w-full h-12 bg-white text-black font-normal hover:bg-zinc-200 transition-colors text-sm flex items-center justify-center gap-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Chrome className="w-5 h-5" />
              {oauthLoading === "google" ? "Connecting..." : "Continue with Google"}
            </button>
            <button 
              onClick={() => handleOAuthSignIn("github")}
              disabled={oauthLoading !== null}
              className="w-full h-12 bg-white/5 border border-white/10 text-white font-normal hover:bg-white/10 transition-colors text-sm flex items-center justify-center gap-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Github className="w-5 h-5" />
              {oauthLoading === "github" ? "Connecting..." : "Continue with GitHub"}
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-zinc-900/30 text-zinc-500">Or continue with email</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={async (e) => {
            e.preventDefault();
            setError("");
            setLoading(true);

            try {
              const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, fullName: name }),
              });

              const data = await res.json();

              if (!res.ok) {
                throw new Error(data.error || "Failed to sign up");
              }

              router.push("/dashboard");
            } catch (err: any) {
              setError(err.message);
            } finally {
              setLoading(false);
            }
          }} className="space-y-5">
            <div>
              <label className="block text-sm text-zinc-400 mb-2 font-normal">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full h-12 bg-black/50 border border-white/10 rounded-lg pl-12 pr-4 text-sm text-white focus:outline-none focus:border-white/20 transition-colors font-normal placeholder:text-zinc-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2 font-normal">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full h-12 bg-black/50 border border-white/10 rounded-lg pl-12 pr-4 text-sm text-white focus:outline-none focus:border-white/20 transition-colors font-normal placeholder:text-zinc-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2 font-normal">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 bg-black/50 border border-white/10 rounded-lg pl-12 pr-4 text-sm text-white focus:outline-none focus:border-white/20 transition-colors font-normal placeholder:text-zinc-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-white text-black font-normal hover:bg-zinc-200 transition-colors text-sm flex items-center justify-center gap-2 rounded-lg mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <p className="text-center text-sm text-zinc-500 mt-6">
            Already have an account?{" "}
            <Link href="/signin" className="text-white hover:underline font-normal">
              Sign in
            </Link>
          </p>
        </motion.div>

        <p className="text-center text-xs text-zinc-600 mt-6">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="text-zinc-500 hover:text-white transition-colors">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-zinc-500 hover:text-white transition-colors">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
