"use client";

import { motion } from "framer-motion";
import { ClipboardList, Search } from "lucide-react";

type EmptyStateProps = {
  hasTasks: boolean;
  filter: string;
  search: string;
};

export function EmptyState({ hasTasks, filter, search }: EmptyStateProps) {
  const Icon = hasTasks ? Search : ClipboardList;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center rounded-2xl border border-dashed border-slate-200 bg-white/50 px-6 py-20 text-center dark:border-slate-700 dark:bg-slate-900/30"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-950/40 dark:to-violet-950/40">
        <Icon className="h-8 w-8 text-blue-500" strokeWidth={1.5} />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
        {hasTasks ? "No matching tasks" : "No tasks yet"}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
        {hasTasks
          ? `Try a different filter or clear your search.`
          : "Create your first task using the form above to get started."}
        {search ? ` Searching for "${search}".` : ""}
        {hasTasks && filter !== "All" ? ` Filter: ${filter}.` : ""}
      </p>
    </motion.div>
  );
}
