"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  CircleDashed,
  LayoutList,
  Loader2,
  TrendingUp,
} from "lucide-react";
import type { User } from "firebase/auth";
import type { FormEvent } from "react";
import { Navbar } from "@/components/Navbar";
import { StatsCard } from "@/components/StatsCard";
import { TaskForm } from "@/components/TaskForm";
import { FilterBar } from "@/components/FilterBar";
import { TaskCard } from "@/components/TaskCard";
import { EmptyState } from "@/components/EmptyState";
import type { Task, TaskPriority, TaskStatus, StatusFilter } from "@/lib/types";

type DashboardProps = {
  user: User;
  tasks: Task[];
  displayedTasks: Task[];
  stats: {
    total: number;
    planned: number;
    inProgress: number;
    complete: number;
  };
  filterCounts: Record<StatusFilter, number>;
  filter: StatusFilter;
  search: string;
  sortBy: "newest" | "due";
  tasksLoading: boolean;
  taskTitle: string;
  dueDate: string;
  priority: TaskPriority;
  saving: boolean;
  editingTaskId: string | null;
  editingValue: string;
  onFilterChange: (f: StatusFilter) => void;
  onSearchChange: (q: string) => void;
  onSortChange: (s: "newest" | "due") => void;
  onTitleChange: (v: string) => void;
  onDueDateChange: (v: string) => void;
  onPriorityChange: (p: TaskPriority) => void;
  onSubmit: (e: FormEvent) => void;
  onEditingValueChange: (v: string) => void;
  onStartEdit: (task: Task) => void;
  onCancelEdit: () => void;
  onSaveEdit: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDelete: (id: string, title: string) => void;
};

export function Dashboard({
  user,
  tasks,
  displayedTasks,
  stats,
  filterCounts,
  filter,
  search,
  sortBy,
  tasksLoading,
  taskTitle,
  dueDate,
  priority,
  saving,
  editingTaskId,
  editingValue,
  onFilterChange,
  onSearchChange,
  onSortChange,
  onTitleChange,
  onDueDateChange,
  onPriorityChange,
  onSubmit,
  onEditingValueChange,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onStatusChange,
  onDelete,
}: DashboardProps) {
  const completion =
    stats.total > 0 ? Math.round((stats.complete / stats.total) * 100) : 0;

  return (
    <div className="min-h-screen">
      <div
        className="dashboard-bg pointer-events-none fixed inset-0"
        aria-hidden
      />

      <Navbar user={user} />

      <main className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Dashboard
          </h2>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Manage your tasks and track progress in one place.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <StatsCard
            label="Total Tasks"
            value={stats.total}
            icon={LayoutList}
            iconClassName="text-violet-500"
            delay={0}
          />
          <StatsCard
            label="Planned"
            value={stats.planned}
            icon={CircleDashed}
            iconClassName="text-slate-500"
            delay={0.05}
          />
          <StatsCard
            label="In Progress"
            value={stats.inProgress}
            icon={TrendingUp}
            iconClassName="text-blue-500"
            delay={0.1}
          />
          <StatsCard
            label="Complete"
            value={stats.complete}
            icon={CheckCircle2}
            iconClassName="text-emerald-500"
            delay={0.15}
          />
        </div>

        {stats.total > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"
          >
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-medium text-slate-600 dark:text-slate-400">
                Overall completion
              </span>
              <span className="font-semibold tabular-nums text-slate-900 dark:text-white">
                {completion}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completion}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-600"
              />
            </div>
          </motion.div>
        )}

        <div className="mt-8">
          <TaskForm
            title={taskTitle}
            dueDate={dueDate}
            priority={priority}
            saving={saving}
            onTitleChange={onTitleChange}
            onDueDateChange={onDueDateChange}
            onPriorityChange={onPriorityChange}
            onSubmit={onSubmit}
          />
        </div>

        <div className="mt-8">
          <FilterBar
            filter={filter}
            onFilterChange={onFilterChange}
            counts={filterCounts}
            search={search}
            onSearchChange={onSearchChange}
            sortBy={sortBy}
            onSortChange={onSortChange}
          />
        </div>

        <div className="mt-6 space-y-3">
          {tasksLoading ? (
            <div className="flex flex-col items-center gap-3 py-16">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <p className="text-sm text-slate-500">Loading tasks…</p>
            </div>
          ) : displayedTasks.length === 0 ? (
            <EmptyState
              hasTasks={tasks.length > 0}
              filter={filter}
              search={search}
            />
          ) : (
            <AnimatePresence mode="popLayout">
              {displayedTasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  editing={editingTaskId === task.id}
                  editingValue={editingValue}
                  onEditingValueChange={onEditingValueChange}
                  onStartEdit={() => onStartEdit(task)}
                  onCancelEdit={onCancelEdit}
                  onSaveEdit={() => onSaveEdit(task.id)}
                  onStatusChange={(status) => onStatusChange(task.id, status)}
                  onDelete={() => onDelete(task.id, task.title)}
                />
              ))}
            </AnimatePresence>
          )}
        </div>
      </main>
    </div>
  );
}
