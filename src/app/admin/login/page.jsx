"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  School,
  Lock,
  User,
  Loader2,
  RefreshCw,
  ShieldCheck,
  KeyRound,
  Mail,
  CheckCircle2,
  Eye,
  EyeOff,
  X,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  // Form Fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canvasRef = useRef(null);

  // Reset Password Modal States
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetMode, setResetMode] = useState("otp"); // 'otp' or 'question'
  const [resetStep, setResetStep] = useState(1); // 1: Request, 2: Verify & Enter New Password
  const [resetUsername, setResetUsername] = useState("admin");

  // OTP Fields
  const [resetOtp, setResetOtp] = useState("");

  // Security Question Fields
  const [securityQuestionText, setSecurityQuestionText] = useState("what is adminId");
  const [securityAnswer, setSecurityAnswer] = useState("");

  // Password Fields
  const [resetNewPassword, setResetNewPassword] = useState("");
  const [resetConfirmPassword, setResetConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");
  const [maskedEmail, setMaskedEmail] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  // Generate random alphanumeric captcha string
  const generateRandomCaptcha = useCallback(() => {
    const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // removed ambiguous chars 0,1,I,O
    let code = "";
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }, []);

  // Draw visual stylized security canvas for Captcha
  const drawCaptchaCanvas = useCallback((code) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, "#0f172a");
    bgGrad.addColorStop(1, "#1e293b");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Random security noise lines
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgba(${Math.floor(Math.random() * 150 + 100)}, ${Math.floor(
        Math.random() * 150 + 100
      )}, 255, 0.35)`;
      ctx.lineWidth = Math.random() * 2 + 1;
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.bezierCurveTo(
        Math.random() * width,
        Math.random() * height,
        Math.random() * width,
        Math.random() * height,
        Math.random() * width,
        Math.random() * height
      );
      ctx.stroke();
    }

    // Random noise dots
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.4})`;
      ctx.beginPath();
      ctx.arc(
        Math.random() * width,
        Math.random() * height,
        Math.random() * 1.5,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // Draw characters with random angles & colors
    const charSpacing = width / (code.length + 1);
    ctx.textBaseline = "middle";

    const colors = ["#38bdf8", "#818cf8", "#34d399", "#fbbf24", "#f472b6", "#60a5fa"];

    for (let i = 0; i < code.length; i++) {
      const char = code[i];
      const x = charSpacing * (i + 0.85);
      const y = height / 2 + (Math.random() * 6 - 3);
      const angle = (Math.random() * 30 - 15) * (Math.PI / 180);

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.font = "bold 24px monospace";
      ctx.fillStyle = colors[i % colors.length];
      ctx.shadowColor = "rgba(0,0,0,0.8)";
      ctx.shadowBlur = 4;
      ctx.fillText(char, -8, 0);
      ctx.restore();
    }
  }, []);

  const refreshCaptcha = useCallback(() => {
    const newCode = generateRandomCaptcha();
    setCaptchaCode(newCode);
    setCaptchaInput("");
    setTimeout(() => drawCaptchaCanvas(newCode), 20);
  }, [generateRandomCaptcha, drawCaptchaCanvas]);

  useEffect(() => {
    refreshCaptcha();
  }, [refreshCaptcha]);

  // Resend Countdown Timer
  useEffect(() => {
    let interval = null;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Login Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 1. Verify Captcha
    if (!captchaInput.trim()) {
      setError("Please enter the security captcha code.");
      return;
    }

    if (captchaInput.trim().toUpperCase() !== captchaCode.toUpperCase()) {
      setError("Incorrect captcha code. A new code has been generated.");
      refreshCaptcha();
      return;
    }

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
        router.push("/admin");
        router.refresh();
      } else {
        setError(result.error || "Invalid username or password");
        refreshCaptcha();
        setLoading(false);
      }
    } catch (err) {
      setError("Connection error. Please verify your network and server status.");
      refreshCaptcha();
      setLoading(false);
    }
  };

  // OTP Flow: Send OTP
  const handleSendOtp = async () => {
    if (!resetUsername.trim()) {
      setResetError("Administrator username is required.");
      return;
    }

    setResetError("");
    setResetSuccess("");
    setResetLoading(true);

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: resetUsername.trim() }),
      });

      let data = null;
      try {
        data = await res.json();
      } catch (parseErr) {
        data = { error: `Server response status ${res.status}.` };
      }

      if (res.ok && data && data.success) {
        setMaskedEmail(data.maskedEmail || "joyschoolkkd@gmail.com");
        setResetStep(2);
        setResendTimer(60);
        setResetSuccess(
          data.message || "OTP has been dispatched to your school Gmail address."
        );
      } else {
        setResetError(
          (data && data.error) ||
            "Unable to send OTP. Please check your network or use the Security Question option."
        );
      }
    } catch (err) {
      setResetError("Network connection error. You can also use the Security Question option.");
    } finally {
      setResetLoading(false);
    }
  };

  // OTP Flow: Verify OTP and Reset
  const handleVerifyOtpAndReset = async (e) => {
    e.preventDefault();

    if (!resetOtp.trim() || resetOtp.trim().length !== 6) {
      setResetError("Please enter the 6-digit OTP code.");
      return;
    }

    if (!resetNewPassword || resetNewPassword.length < 6) {
      setResetError("New password must be at least 6 characters long.");
      return;
    }

    if (resetNewPassword !== resetConfirmPassword) {
      setResetError("New password and confirm password do not match.");
      return;
    }

    setResetError("");
    setResetSuccess("");
    setResetLoading(true);

    try {
      const res = await fetch("/api/auth/verify-otp-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: resetUsername.trim(),
          otp: resetOtp.trim(),
          newPassword: resetNewPassword,
        }),
      });

      let data = null;
      try {
        data = await res.json();
      } catch (parseErr) {
        data = { error: `Server error ${res.status}.` };
      }

      if (res.ok && data && data.success) {
        setResetSuccess("Password updated successfully! You can now log in.");
        setUsername(resetUsername.trim());
        setPassword("");
        refreshCaptcha();

        setTimeout(() => {
          setShowResetModal(false);
          setResetStep(1);
          setResetOtp("");
          setResetNewPassword("");
          setResetConfirmPassword("");
          setResetSuccess("");
          setResetError("");
        }, 2200);
      } else {
        setResetError((data && data.error) || "Invalid or expired OTP code.");
      }
    } catch (err) {
      setResetError("Network error. Please try again.");
    } finally {
      setResetLoading(false);
    }
  };

  // Question Flow: Fetch Question
  const handleFetchQuestion = async () => {
    if (!resetUsername.trim()) {
      setResetError("Administrator username is required.");
      return;
    }

    setResetError("");
    setResetSuccess("");
    setResetLoading(true);

    try {
      const res = await fetch("/api/auth/security-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: resetUsername.trim() }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setSecurityQuestionText(data.question || "what is adminId");
        setResetStep(2);
      } else {
        setResetError(data.error || "Failed to retrieve security question.");
      }
    } catch {
      setResetError("Network error while retrieving question.");
    } finally {
      setResetLoading(false);
    }
  };

  // Question Flow: Verify Answer & Reset
  const handleVerifyQuestionAndReset = async (e) => {
    e.preventDefault();

    if (!securityAnswer.trim()) {
      setResetError("Please answer the security question.");
      return;
    }

    if (!resetNewPassword || resetNewPassword.length < 6) {
      setResetError("New password must be at least 6 characters long.");
      return;
    }

    if (resetNewPassword !== resetConfirmPassword) {
      setResetError("New password and confirm password do not match.");
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
          username: resetUsername.trim(),
          answer: securityAnswer.trim(),
          newPassword: resetNewPassword,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setResetSuccess("Password has been reset successfully! You can now log in.");
        setUsername(resetUsername.trim());
        setPassword("");
        refreshCaptcha();

        setTimeout(() => {
          setShowResetModal(false);
          setResetStep(1);
          setSecurityAnswer("");
          setResetNewPassword("");
          setResetConfirmPassword("");
          setResetSuccess("");
          setResetError("");
        }, 2200);
      } else {
        setResetError(data.error || "Incorrect answer to security question.");
      }
    } catch {
      setResetError("Network error. Please try again.");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/25 rounded-full filter blur-[120px] pointer-events-none animate-pulse-subtle" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full filter blur-[120px] pointer-events-none animate-pulse-subtle" />

      {/* Header Branding */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 text-center space-y-4">
        <div className="mx-auto h-16 w-16 bg-gradient-to-tr from-primary to-accent rounded-3xl flex items-center justify-center shadow-lg shadow-accent/20 border border-white/10">
          <School className="h-9 w-9 text-white" />
        </div>
        <h2 className="text-3xl font-display font-black text-white tracking-tight">
          Admin Portal Login
        </h2>
        <p className="text-sm text-slate-400 font-medium">
          Joy E.M High School Administration System
        </p>
      </div>

      {/* Login Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="bg-slate-900/70 backdrop-blur-2xl py-8 px-5 sm:px-10 border border-slate-800/80 shadow-2xl rounded-3xl">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3.5 bg-rose-950/50 border border-rose-900/60 rounded-2xl text-xs font-bold text-rose-400 text-center animate-scale-up">
                {error}
              </div>
            )}

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2"
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
                  className="block w-full pl-11 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-white placeholder-slate-600 text-sm transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-xs font-extrabold uppercase tracking-wider text-slate-400"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setResetUsername(username.trim() || "admin");
                    setResetStep(1);
                    setResetError("");
                    setResetSuccess("");
                    setShowResetModal(true);
                  }}
                  className="text-xs font-bold text-accent hover:underline focus:outline-none"
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
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  className="block w-full pl-11 pr-11 py-3 bg-slate-950/80 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-white placeholder-slate-600 text-sm transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Security Captcha Section */}
            <div className="pt-1">
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  Security Verification
                </label>
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-accent focus:outline-none transition-colors"
                >
                  <RefreshCw className="h-3 w-3" />
                  Refresh Code
                </button>
              </div>

              <div className="grid grid-cols-12 gap-3 items-center">
                {/* Visual Canvas Badge */}
                <div className="col-span-5 relative rounded-xl overflow-hidden border border-slate-700/80 shadow-inner bg-slate-950">
                  <canvas
                    ref={canvasRef}
                    width={140}
                    height={46}
                    className="w-full h-11 block select-none pointer-events-none"
                  />
                </div>

                {/* Captcha Input */}
                <div className="col-span-7">
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    placeholder="Enter code"
                    className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-white placeholder-slate-600 text-sm font-mono tracking-widest uppercase transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Login Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-2xl shadow-lg text-sm font-black uppercase tracking-wider text-white bg-gradient-to-r from-primary to-accent hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-accent transition-all duration-300 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <span>Access Dashboard</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer Branding */}
          <div className="mt-6 text-center text-xs text-slate-500 leading-relaxed border-t border-slate-800/60 pt-6">
            JOY E.M HIGH SCHOOL • Authorized Personnel Portal
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Dual-Mode Reset Password Modal Dialog */}
      {/* ========================================================================= */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative overflow-hidden animate-scale-up">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full pointer-events-none" />

            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-accent/10 text-accent border border-accent/20">
                  <KeyRound className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    Reset Admin Password
                  </h3>
                  <p className="text-xs text-slate-400">
                    Administrator Credential Recovery
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowResetModal(false);
                  setResetStep(1);
                  setResetError("");
                  setResetSuccess("");
                }}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Recovery Mode Selector Tabs */}
            <div className="grid grid-cols-2 p-1 bg-slate-950 rounded-2xl border border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setResetMode("otp");
                  setResetStep(1);
                  setResetError("");
                  setResetSuccess("");
                }}
                className={`py-2 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  resetMode === "otp"
                    ? "bg-slate-800 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Mail className="h-3.5 w-3.5 text-accent" />
                <span>Gmail OTP</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setResetMode("question");
                  setResetStep(1);
                  setResetError("");
                  setResetSuccess("");
                }}
                className={`py-2 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  resetMode === "question"
                    ? "bg-slate-800 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <HelpCircle className="h-3.5 w-3.5 text-accent" />
                <span>Security Question</span>
              </button>
            </div>

            {/* Notifications */}
            {resetError && (
              <div className="p-3.5 bg-rose-950/50 border border-rose-900/60 rounded-xl text-xs font-bold text-rose-400">
                {resetError}
              </div>
            )}
            {resetSuccess && (
              <div className="p-3.5 bg-emerald-950/50 border border-emerald-900/60 rounded-xl text-xs font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>{resetSuccess}</span>
              </div>
            )}

            {/* ========================================================= */}
            {/* MODE 1: GMAIL OTP FLOW */}
            {/* ========================================================= */}
            {resetMode === "otp" && (
              <>
                {resetStep === 1 && (
                  <div className="space-y-4">
                    <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                        <Mail className="h-4 w-4 text-accent" />
                        <span>Registered Destination</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        A 6-digit OTP will be dispatched to{" "}
                        <strong className="text-white">joyschoolkkd@gmail.com</strong>.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        Admin Username
                      </label>
                      <input
                        type="text"
                        required
                        value={resetUsername}
                        onChange={(e) => setResetUsername(e.target.value)}
                        placeholder="e.g. admin"
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent text-white text-sm"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowResetModal(false)}
                        className="px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-bold text-slate-400 hover:bg-slate-800/60 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        disabled={resetLoading}
                        onClick={handleSendOtp}
                        className="px-5 py-2.5 rounded-xl bg-accent text-slate-950 font-extrabold text-xs flex items-center gap-2 hover:bg-accent-light transition-all shadow-md shadow-accent/20 disabled:opacity-50"
                      >
                        {resetLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <span>Send OTP to Gmail</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {resetStep === 2 && (
                  <form onSubmit={handleVerifyOtpAndReset} className="space-y-4">
                    <div className="p-3 bg-accent/10 border border-accent/20 rounded-xl text-xs text-accent font-medium">
                      OTP sent to <strong>{maskedEmail || "joyschoolkkd@gmail.com"}</strong>.
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        Enter 6-Digit OTP *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={resetOtp}
                        onChange={(e) => setResetOtp(e.target.value.replace(/\D/g, ""))}
                        placeholder="6-digit code (e.g. 849201)"
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent text-white font-mono text-lg tracking-widest text-center"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        New Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          required
                          value={resetNewPassword}
                          onChange={(e) => setResetNewPassword(e.target.value)}
                          placeholder="Minimum 6 characters"
                          className="w-full pl-4 pr-11 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent text-white text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        Confirm New Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          required
                          value={resetConfirmPassword}
                          onChange={(e) => setResetConfirmPassword(e.target.value)}
                          placeholder="Re-enter password"
                          className="w-full pl-4 pr-11 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent text-white text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                      <button
                        type="button"
                        disabled={resendTimer > 0 || resetLoading}
                        onClick={handleSendOtp}
                        className="text-xs font-semibold text-accent hover:underline disabled:text-slate-600 disabled:no-underline"
                      >
                        {resendTimer > 0
                          ? `Resend in ${resendTimer}s`
                          : "Resend OTP"}
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setResetStep(1)}
                          className="px-3.5 py-2 rounded-xl border border-slate-800 text-xs font-bold text-slate-400 hover:bg-slate-800/60 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={resetLoading}
                          className="px-4 py-2 rounded-xl bg-accent text-slate-950 font-extrabold text-xs flex items-center gap-1.5 hover:bg-accent-light transition-all shadow-md shadow-accent/20 disabled:opacity-50"
                        >
                          {resetLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "Update Password"
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </>
            )}

            {/* ========================================================= */}
            {/* MODE 2: SECURITY QUESTION FLOW */}
            {/* ========================================================= */}
            {resetMode === "question" && (
              <>
                {resetStep === 1 && (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Enter your admin username to verify your security question challenge.
                    </p>

                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        Admin Username
                      </label>
                      <input
                        type="text"
                        required
                        value={resetUsername}
                        onChange={(e) => setResetUsername(e.target.value)}
                        placeholder="e.g. admin"
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent text-white text-sm"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowResetModal(false)}
                        className="px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-bold text-slate-400 hover:bg-slate-800/60 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        disabled={resetLoading}
                        onClick={handleFetchQuestion}
                        className="px-5 py-2.5 rounded-xl bg-accent text-slate-950 font-extrabold text-xs flex items-center gap-2 hover:bg-accent-light transition-all shadow-md shadow-accent/20 disabled:opacity-50"
                      >
                        {resetLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <span>Continue</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {resetStep === 2 && (
                  <form onSubmit={handleVerifyQuestionAndReset} className="space-y-4">
                    <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl space-y-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-accent">
                        Security Question
                      </span>
                      <p className="text-sm font-semibold text-white">
                        {securityQuestionText}
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        Your Security Answer *
                      </label>
                      <input
                        type="text"
                        required
                        value={securityAnswer}
                        onChange={(e) => setSecurityAnswer(e.target.value)}
                        placeholder="Enter answer"
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        New Password *
                      </label>
                      <input
                        type="password"
                        required
                        value={resetNewPassword}
                        onChange={(e) => setResetNewPassword(e.target.value)}
                        placeholder="Minimum 6 characters"
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        Confirm New Password *
                      </label>
                      <input
                        type="password"
                        required
                        value={resetConfirmPassword}
                        onChange={(e) => setResetConfirmPassword(e.target.value)}
                        placeholder="Re-enter password"
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent text-white text-sm"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/80">
                      <button
                        type="button"
                        onClick={() => setResetStep(1)}
                        className="px-3.5 py-2 rounded-xl border border-slate-800 text-xs font-bold text-slate-400 hover:bg-slate-800/60 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={resetLoading}
                        className="px-4 py-2 rounded-xl bg-accent text-slate-950 font-extrabold text-xs flex items-center gap-1.5 hover:bg-accent-light transition-all shadow-md shadow-accent/20 disabled:opacity-50"
                      >
                        {resetLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Update Password"
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
