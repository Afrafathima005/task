"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Pencil,
  Trash2,
  Flag,
} from "lucide-react";
import type { Task, TaskStatus } from "@/lib/types";
import { STATUS_OPTIONS } from "@/lib/types";
import {
  formatCreatedTime,
  formatDueDate,
  isOverdue,
  PRIORITY_CONFIG,
  STATUS_CONFIG,
} from "@/lib/task-utils";

type TaskCardProps = {
  task: Task;
  index: number;
  editing: boolean;
  editingValue: string;
  onEditingValueChange: (v: string) => void;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onSaveEdit: () => void;
  onStatusChange: (status: TaskStatus) => void;
  onDelete: () => void;
};

export function TaskCard({
  task,
  index,
  editing,
  editingValue,
  onEditingValueChange,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onStatusChange,
  onDelete,
}: TaskCardProps) {
  const statusStyle = STATUS_CONFIG[task.status];
  const priority = task.priority ?? "medium";
  const priorityStyle = PRIORITY_CONFIG[priority];
  const overdue = isOverdue(task.dueDate, task.status);
  const completed = task.status === "Complete";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/40 transition hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-slate-950/40 dark:hover:border-slate-700"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          {editing ? (
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={editingValue}
                onChange={(e) => onEditingValueChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSaveEdit();
                  if (e.key === "Escape") onCancelEdit();
                }}
                autoFocus
                className="flex-1 rounded-xl border border-blue-300 bg-slate-50 px-4 py-2.5 text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-blue-700 dark:bg-slate-800 dark:text-white"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onSaveEdit}
                  className="rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={onCancelEdit}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 dark:border-slate-700 dark:text-slate-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-start gap-3">
                <span
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 ${priorityStyle.ring} ${
                    priority === "high"
                      ? "bg-rose-500"
                      : priority === "medium"
                        ? "bg-amber-400"
                        : "bg-slate-300"
                  }`}
                  title={`${priorityStyle.label} priority`}
                />
                <div className="min-w-0">
                  <h2
                    className={`text-base font-semibold text-slate-900 dark:text-white sm:text-lg ${
                      completed ? "line-through text-slate-400 dark:text-slate-500" : ""
                    }`}
                  >
                    {task.title}
                  </h2>
                  <div className="mt-2.5 flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusStyle.badge}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
                      />
                      {task.status}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium ${priorityStyle.color}`}
                    >
                      <Flag className="h-3 w-3" />
                      {priorityStyle.label}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                      <Clock className="h-3 w-3" />
                      {formatCreatedTime(task.createdAt)}
                    </span>
                    {task.dueDate ? (
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-medium ${
                          overdue
                            ? "text-rose-600 dark:text-rose-400"
                            : "text-slate-500"
                        }`}
                      >
                        <Calendar className="h-3 w-3" />
                        {overdue ? "Overdue · " : ""}
                        {formatDueDate(task.dueDate)}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {!editing ? (
          <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
            <select
              value={task.status}
              onChange={(e) =>
                onStatusChange(e.target.value as TaskStatus)
              }
              className="cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              aria-label={`Status for ${task.title}`}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={onStartEdit}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 opacity-100 transition hover:bg-slate-50 hover:text-blue-600 dark:border-slate-700 dark:hover:bg-slate-800 sm:opacity-0 sm:group-hover:opacity-100"
              aria-label="Edit task"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 dark:border-slate-700 dark:hover:border-rose-900 dark:hover:bg-rose-950/50 dark:hover:text-rose-400"
              aria-label="Delete task"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}
