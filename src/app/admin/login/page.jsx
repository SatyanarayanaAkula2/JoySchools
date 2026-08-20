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

  // Security Question Reset States
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetStep, setResetStep] = useState(1);
  const [resetUsername, setResetUsername] = useState("admin");
  const [securityQuestionText, setSecurityQuestionText] = useState("");
  const [resetAnswer, setResetAnswer] = useState("");
  const [resetNewPassword, setResetNewPassword] = useState("");
  const [resetConfirmPassword, setResetConfirmPassword] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");

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

  const handleGetQuestion = async () => {
    if (!resetUsername.trim()) {
      setResetError("Username is required");
      return;
    }
    setResetError("");
    setResetSuccess("");
    setResetLoading(true);

    try {
      const res = await fetch("/api/auth/security-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: resetUsername }),
      });
      const data = await res.json();
      if (data.success) {
        setSecurityQuestionText(data.question || "What is your primary school name?");
        setResetStep(2);
      } else {
        setResetError(data.error || "Failed to retrieve security question.");
      }
    } catch (err) {
      setResetError("Network error. Please check connection.");
    } finally {
      setResetLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!resetAnswer.trim()) {
      setResetError("Answer is required");
      return;
    }
    if (!resetNewPassword) {
      setResetError("New password is required");
      return;
    }
    if (resetNewPassword.length < 6) {
      setResetError("New password must be at least 6 characters long");
      return;
    }
    if (resetNewPassword !== resetConfirmPassword) {
      setResetError("Passwords do not match");
      return;
    }

    setResetError("");
    setResetSuccess("");
    setResetLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: resetUsername,
          answer: resetAnswer,
          newPassword: resetNewPassword,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setResetSuccess("Password has been reset successfully! Closing window...");
        setTimeout(() => {
          setShowResetModal(false);
          setResetStep(1);
          setResetAnswer("");
          setResetNewPassword("");
          setResetConfirmPassword("");
          setResetSuccess("");
        }, 3000);
      } else {
        setResetError(data.error || "Reset failed. Incorrect answer to security question.");
      }
    } catch (err) {
      setResetError("Network error. Please try again.");
    } finally {
      setResetLoading(false);
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
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-bold text-slate-300"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setResetUsername(username || "admin");
                    setShowResetModal(true);
                  }}
                  className="text-xs font-semibold text-accent hover:underline focus:outline-none"
                >
                  Forgot Password?
                </button>
              </div>
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
            JOY E.M HIGH SCHOOL • Authorized Personnel Portal
          </div>
        </div>
      </div>

      {/* Forgot Password Security Question Modal Dialog */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-slate-850 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full pointer-events-none" />
            
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white font-display">Reset Admin Password</h3>
              <button
                type="button"
                onClick={() => {
                  setShowResetModal(false);
                  setResetStep(1);
                  setResetError("");
                  setResetSuccess("");
                  setResetAnswer("");
                  setResetNewPassword("");
                  setResetConfirmPassword("");
                }}
                className="text-slate-400 hover:text-white font-bold text-sm focus:outline-none p-1.5 rounded-lg hover:bg-slate-800/40"
              >
                ✕
              </button>
            </div>

            {resetError && (
              <div className="p-3.5 bg-rose-950/40 border border-rose-900/50 rounded-xl text-xs font-semibold text-rose-455 text-center">
                {resetError}
              </div>
            )}

            {resetSuccess && (
              <div className="p-3.5 bg-emerald-950/40 border border-emerald-900/50 rounded-xl text-xs font-semibold text-emerald-440 text-center">
                {resetSuccess}
              </div>
            )}

            {resetStep === 1 ? (
              <div className="space-y-4">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Enter your administrator username to load the security challenge question configured for this account.
                </p>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Username</label>
                  <input
                    type="text"
                    name="resetUsername"
                    autoComplete="off"
                    value={resetUsername}
                    onChange={(e) => setResetUsername(e.target.value)}
                    placeholder="e.g. admin"
                    className="block w-full px-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-white placeholder-slate-700 text-sm"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleGetQuestion}
                  disabled={resetLoading}
                  className="w-full flex justify-center py-3.5 px-4 rounded-2xl text-xs font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-primary to-accent hover:opacity-90 disabled:opacity-50 transition-all duration-200"
                >
                  {resetLoading ? <Loader2 className="h-4.5 w-4.5 animate-spin" /> : "Retrieve Security Question"}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Provide the correct answer to your security challenge question below to update your password.
                </p>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Security Question</label>
                  <div className="px-4 py-3 bg-slate-950/80 border border-slate-850 rounded-2xl text-accent font-semibold text-sm leading-relaxed">
                    {securityQuestionText}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Your Answer</label>
                  <input
                    type="text"
                    name="resetAnswer"
                    autoComplete="off"
                    value={resetAnswer}
                    onChange={(e) => setResetAnswer(e.target.value)}
                    placeholder="Enter security answer"
                    className="block w-full px-4 py-3.5 bg-slate-950 border border-slate-850 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-white placeholder-slate-700 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">New Password</label>
                  <input
                    type="password"
                    name="resetNewPassword"
                    autoComplete="new-password"
                    value={resetNewPassword}
                    onChange={(e) => setResetNewPassword(e.target.value)}
                    placeholder="Enter new password (min 6 chars)"
                    className="block w-full px-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-white placeholder-slate-700 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Confirm New Password</label>
                  <input
                    type="password"
                    name="resetConfirmPassword"
                    autoComplete="new-password"
                    value={resetConfirmPassword}
                    onChange={(e) => setResetConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="block w-full px-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-white placeholder-slate-700 text-sm"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setResetStep(1);
                      setResetError("");
                      setResetSuccess("");
                    }}
                    className="w-1/3 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-950 border border-slate-800 hover:text-white transition-all duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    disabled={resetLoading}
                    className="w-2/3 flex justify-center py-3.5 px-4 rounded-2xl text-xs font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-primary to-accent hover:opacity-90 disabled:opacity-50 transition-all duration-200"
                  >
                    {resetLoading ? <Loader2 className="h-4.5 w-4.5 animate-spin" /> : "Reset Password"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
