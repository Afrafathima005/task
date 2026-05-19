import type { TaskPriority, TaskStatus } from "./types";

export function formatDueDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatCreatedTime(ts?: number) {
  if (!ts) return "Just now";
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(ts).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export function isOverdue(
  dueDate: string | undefined,
  status: TaskStatus
) {
  if (!dueDate || status === "Complete") return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate + "T00:00:00");
  return due < today;
}

export const STATUS_CONFIG: Record<
  TaskStatus,
  { label: string; badge: string; dot: string }
> = {
  Planned: {
    label: "Planned",
    badge:
      "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
    dot: "bg-slate-400",
  },
  "In Progress": {
    label: "In Progress",
    badge:
      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800",
    dot: "bg-blue-500",
  },
  Complete: {
    label: "Complete",
    badge:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
    dot: "bg-emerald-500",
  },
};

export const PRIORITY_CONFIG: Record<
  TaskPriority,
  { label: string; color: string; ring: string }
> = {
  low: {
    label: "Low",
    color: "text-slate-500",
    ring: "ring-slate-300 dark:ring-slate-600",
  },
  medium: {
    label: "Medium",
    color: "text-amber-600 dark:text-amber-400",
    ring: "ring-amber-400/60",
  },
  high: {
    label: "High",
    color: "text-rose-600 dark:text-rose-400",
    ring: "ring-rose-400/60",
  },
};
