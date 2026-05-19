export type TaskStatus = "Planned" | "In Progress" | "Complete";

export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  userId: string;
  priority?: TaskPriority;
  dueDate?: string;
  createdAt?: number;
};

export const STATUS_FILTERS = [
  "All",
  "Planned",
  "In Progress",
  "Complete",
] as const;

export type StatusFilter = (typeof STATUS_FILTERS)[number];

export const STATUS_OPTIONS: TaskStatus[] = [
  "Planned",
  "In Progress",
  "Complete",
];

export const PRIORITY_OPTIONS: TaskPriority[] = ["low", "medium", "high"];
