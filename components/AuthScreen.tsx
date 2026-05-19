"use client";

import { motion } from "framer-motion";
import { CheckSquare, Loader2, Shield, Sparkles, Zap } from "lucide-react";
import { useState } from "react";

type AuthMode = "signin" | "signup";

type AuthScreenProps = {
  onGoogleAuth: () => Promise<void>;
  error: string;
  onDismissError: () => void;
};

function GoogleLogo() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

export function AuthScreen({
  onGoogleAuth,
  error,
  onDismissError,
}: AuthScreenProps) {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [submitting, setSubmitting] = useState(false);
  const isSignIn = mode === "signin";

  const handleGoogle = async () => {
    try {
      setSubmitting(true);
      onDismissError();
      await onGoogleAuth();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div className="auth-gradient pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl auth-float"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-violet-400/25 blur-3xl auth-float-delayed"
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="rounded-3xl border border-white/40 bg-white/60 p-8 shadow-2xl shadow-slate-300/30 backdrop-blur-2xl dark:border-slate-700/50 dark:bg-slate-900/50 dark:shadow-slate-950/50 sm:p-10">
          <div className="flex flex-col items-center text-center">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 3 }}
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-lg shadow-blue-500/30"
            >
              <CheckSquare className="h-7 w-7" strokeWidth={2.5} />
            </motion.div>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Taskflow
            </p>
          </div>

          <div className="mt-8 flex rounded-2xl bg-slate-100/80 p-1 dark:bg-slate-800/80">
            {(["signin", "signup"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  onDismissError();
                }}
                className={`relative flex-1 rounded-xl py-2.5 text-sm font-semibold transition ${
                  mode === m
                    ? "text-white"
                    : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
                }`}
              >
                {mode === m && (
                  <motion.span
                    layoutId="auth-tab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 shadow-md"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {m === "signin" ? "Sign in" : "Sign up"}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-8 text-center">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {isSignIn ? "Welcome back" : "Get started free"}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {isSignIn
                ? "Sign in with Google to open your task workspace."
                : "Create an account instantly with Google — no password needed."}
            </p>
          </div>

          {error ? (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-center text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-300"
              role="alert"
            >
              {error}
            </motion.p>
          ) : null}

          <motion.button
            type="button"
            onClick={handleGoogle}
            disabled={submitting}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-5 py-3.5 text-[15px] font-semibold text-slate-800 shadow-lg shadow-slate-200/50 transition disabled:opacity-60 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:shadow-slate-950/50"
          >
            {submitting ? (
              <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
            ) : (
              <GoogleLogo />
            )}
            {submitting
              ? "Connecting…"
              : isSignIn
                ? "Continue with Google"
                : "Sign up with Google"}
          </motion.button>

          <div className="mt-8 grid grid-cols-3 gap-2 border-t border-slate-200/80 pt-6 dark:border-slate-700/80">
            {[
              { icon: Zap, label: "Fast" },
              { icon: Shield, label: "Secure" },
              { icon: Sparkles, label: "Simple" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1.5 rounded-xl py-2 text-slate-500 dark:text-slate-400"
              >
                <Icon className="h-4 w-4 text-blue-500" />
                <span className="text-[10px] font-semibold uppercase tracking-wider">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          {isSignIn ? "New to Taskflow? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setMode(isSignIn ? "signup" : "signin")}
            className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            {isSignIn ? "Create account" : "Sign in"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
