"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { School, Lock, User, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Success redirect
        router.push("/admin");
        router.refresh();
      } else {
        setError(result.error || "Invalid username or password");
        setLoading(false);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradients for premium glassmorphic vibe */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-[100px] pointer-events-none animate-pulse-subtle" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full filter blur-[100px] pointer-events-none animate-pulse-subtle" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 text-center space-y-4">
        <div className="mx-auto h-16 w-16 bg-gradient-to-tr from-primary to-accent rounded-3xl flex items-center justify-center shadow-lg shadow-accent/20">
          <School className="h-9 w-9 text-white" />
        </div>
        <h2 className="text-3xl font-display font-extrabold text-white tracking-tight">
          Admin Portal Login
        </h2>
        <p className="text-sm text-slate-400">
          Joy E.M High School Administration System
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="bg-slate-900/60 backdrop-blur-xl py-8 px-4 border border-slate-800 shadow-2xl sm:rounded-3xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-4 bg-rose-950/40 border border-rose-900/50 rounded-2xl text-sm font-semibold text-rose-400 text-center">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-bold text-slate-300 mb-2"
              >
                Username
              </label>
              <div className="relative rounded-2xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <User className="h-5 w-5" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter administrator username"
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-white placeholder-slate-600 transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-slate-300 mb-2"
              >
                Password
              </label>
              <div className="relative rounded-2xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-white placeholder-slate-600 transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-md text-sm font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-primary to-accent hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-accent transition-all duration-300 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Access Dashboard"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500 leading-relaxed border-t border-slate-800/60 pt-6">
            Default credentials are set via the environment config. Verify your server configuration before proceeding.
          </div>
        </div>
      </div>
    </div>
  );
}
