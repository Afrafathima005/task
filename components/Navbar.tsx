"use client";

import { motion } from "framer-motion";
import { CheckSquare, LogOut, Moon, Sun } from "lucide-react";
import type { User } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useToast } from "@/components/providers/ToastProvider";

type NavbarProps = {
  user: User;
};

export function Navbar({ user }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast("Signed out successfully");
    } catch {
      toast("Could not sign out", "error");
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/70 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-md shadow-blue-500/20">
            <CheckSquare className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold tracking-tight text-slate-900 dark:text-white sm:text-xl">
              Taskflow
            </h1>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
              Welcome,{" "}
              <span className="font-medium text-slate-700 dark:text-slate-200">
                {user.displayName?.split(" ")[0] ?? user.email}
              </span>
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </button>

          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt=""
              className="hidden h-10 w-10 rounded-xl border border-slate-200 object-cover sm:block dark:border-slate-700"
            />
          ) : null}

          <button
            type="button"
            onClick={handleSignOut}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-rose-900 dark:hover:bg-rose-950/50 dark:hover:text-rose-400"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
