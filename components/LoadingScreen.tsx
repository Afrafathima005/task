"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export function LoadingScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/30">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 text-xl font-bold text-white shadow-lg shadow-blue-500/25"
      >
        ✓
      </motion.div>
      <Loader2 className="h-7 w-7 animate-spin text-blue-500" />
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
        Loading your workspace…
      </p>
    </div>
  );
}
