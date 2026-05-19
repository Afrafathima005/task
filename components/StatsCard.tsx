"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type StatsCardProps = {
  label: string;
  value: number;
  icon: LucideIcon;
  iconClassName?: string;
  delay?: number;
};

export function StatsCard({
  label,
  value,
  icon: Icon,
  iconClassName = "text-blue-500",
  delay = 0,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      className="group rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm shadow-slate-200/50 backdrop-blur-sm transition hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-slate-950/50 dark:hover:border-slate-700"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {label}
          </p>
          <p className="mt-2 text-3xl font-bold tabular-nums tracking-tight text-slate-900 dark:text-white">
            {value}
          </p>
        </div>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 transition group-hover:scale-105 dark:bg-slate-800 ${iconClassName}`}
        >
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
      </div>
    </motion.div>
  );
}
