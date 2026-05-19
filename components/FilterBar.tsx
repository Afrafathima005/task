"use client";

import { motion } from "framer-motion";
import { ArrowDownAZ, Search } from "lucide-react";
import { STATUS_FILTERS, type StatusFilter } from "@/lib/types";

type FilterBarProps = {
  filter: StatusFilter;
  onFilterChange: (f: StatusFilter) => void;
  counts: Record<StatusFilter, number>;
  search: string;
  onSearchChange: (q: string) => void;
  sortBy: "newest" | "due";
  onSortChange: (s: "newest" | "due") => void;
};

export function FilterBar({
  filter,
  onFilterChange,
  counts,
  search,
  onSearchChange,
  sortBy,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((item) => {
          const active = filter === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => onFilterChange(item)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
                active
                  ? "text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-800"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-violet-600 shadow-md shadow-blue-500/25"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {item}
                <span
                  className={`tabular-nums text-xs ${active ? "text-white/80" : "text-slate-400"}`}
                >
                  {counts[item]}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search tasks…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white sm:w-56"
          />
        </div>
        <div className="relative flex items-center">
          <ArrowDownAZ className="pointer-events-none absolute left-3 h-4 w-4 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) =>
              onSortChange(e.target.value as "newest" | "due")
            }
            className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-8 text-sm text-slate-700 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            aria-label="Sort tasks"
          >
            <option value="newest">Newest first</option>
            <option value="due">Due date</option>
          </select>
        </div>
      </div>
    </div>
  );
}
