"use client";

import { motion } from "framer-motion";
import { Calendar, Plus, Flag } from "lucide-react";
import type { FormEvent } from "react";
import type { TaskPriority } from "@/lib/types";
import { PRIORITY_OPTIONS } from "@/lib/types";

type TaskFormProps = {
  title: string;
  dueDate: string;
  priority: TaskPriority;
  saving: boolean;
  onTitleChange: (v: string) => void;
  onDueDateChange: (v: string) => void;
  onPriorityChange: (p: TaskPriority) => void;
  onSubmit: (e: FormEvent) => void;
};

export function TaskForm({
  title,
  dueDate,
  priority,
  saving,
  onTitleChange,
  onDueDateChange,
  onPriorityChange,
  onSubmit,
}: TaskFormProps) {
  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      onSubmit={onSubmit}
      className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm shadow-slate-200/50 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-slate-950/50 sm:p-6"
    >
      <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
        Add a new task
      </label>

      <div className="mt-4 space-y-3">
        <div className="relative">
          <input
            type="text"
            placeholder="What do you need to get done?"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-slate-900 shadow-inner shadow-slate-100/50 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800/80 dark:text-white dark:shadow-none dark:focus:bg-slate-800"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="relative sm:col-span-1">
            <Calendar className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => onDueDateChange(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-3 pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300"
              aria-label="Due date"
            />
          </div>

          <div className="relative sm:col-span-1">
            <Flag className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              value={priority}
              onChange={(e) =>
                onPriorityChange(e.target.value as TaskPriority)
              }
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/80 py-3 pl-10 pr-8 text-sm font-medium capitalize text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300"
              aria-label="Priority"
            >
              {PRIORITY_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  {p} priority
                </option>
              ))}
            </select>
          </div>

          <motion.button
            type="submit"
            disabled={saving || !title.trim()}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition disabled:cursor-not-allowed disabled:opacity-50 sm:col-span-1"
          >
            {saving ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <Plus className="h-4 w-4" strokeWidth={2.5} />
            )}
            {saving ? "Adding…" : "Add task"}
          </motion.button>
        </div>
      </div>
    </motion.form>
  );
}
