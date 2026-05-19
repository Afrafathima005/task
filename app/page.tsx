"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import type { User } from "firebase/auth";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { ref, push, onValue, update, remove } from "firebase/database";
import { auth, db } from "@/firebase/config";
import { AuthScreen } from "@/components/AuthScreen";
import { Dashboard } from "@/components/Dashboard";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useToast } from "@/components/providers/ToastProvider";
import {
  STATUS_FILTERS,
  type StatusFilter,
  type Task,
  type TaskPriority,
  type TaskStatus,
} from "@/lib/types";
import { isOverdue } from "@/lib/task-utils";

export default function Home() {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<StatusFilter>("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "due">("newest");
  const [authLoading, setAuthLoading] = useState(true);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [authError, setAuthError] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState("");

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!user) {
      setTasks([]);
      return;
    }

    setTasksLoading(true);
    const tasksRef = ref(db, "tasks");

    return onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setTasks([]);
        setTasksLoading(false);
        return;
      }

      const loaded = Object.keys(data)
        .map((key) => ({ id: key, ...data[key] }))
        .filter((t: Task) => t.userId === user.uid) as Task[];

      setTasks(loaded);
      setTasksLoading(false);
    });
  }, [user]);

  const stats = useMemo(() => {
    const planned = tasks.filter((t) => t.status === "Planned").length;
    const inProgress = tasks.filter((t) => t.status === "In Progress").length;
    const complete = tasks.filter((t) => t.status === "Complete").length;
    return {
      total: tasks.length,
      planned,
      inProgress,
      complete,
      overdue: tasks.filter((t) => isOverdue(t.dueDate, t.status)).length,
    };
  }, [tasks]);

  const filterCounts = useMemo(() => {
    const counts = {} as Record<StatusFilter, number>;
    for (const f of STATUS_FILTERS) {
      counts[f] =
        f === "All" ? tasks.length : tasks.filter((t) => t.status === f).length;
    }
    return counts;
  }, [tasks]);

  const displayedTasks = useMemo(() => {
    let result =
      filter === "All" ? tasks : tasks.filter((t) => t.status === filter);

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((t) => t.title.toLowerCase().includes(q));
    }

    return [...result].sort((a, b) => {
      if (sortBy === "due") {
        if (!a.dueDate && !b.dueDate)
          return (b.createdAt ?? 0) - (a.createdAt ?? 0);
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      }
      return (b.createdAt ?? 0) - (a.createdAt ?? 0);
    });
  }, [tasks, filter, search, sortBy]);

  const login = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setAuthError("");
      toast("Welcome back!");
    } catch {
      setAuthError("Unable to sign in. Please try again.");
    }
  };

  const addTask = async (e: FormEvent) => {
    e.preventDefault();
    if (!task.trim() || !user) return;

    try {
      setSaving(true);
      const newTask: Record<string, string | number> = {
        title: task.trim(),
        status: "Planned",
        userId: user.uid,
        priority,
        createdAt: Date.now(),
      };
      if (dueDate) newTask.dueDate = dueDate;

      await push(ref(db, "tasks"), newTask);
      setTask("");
      setDueDate("");
      setPriority("medium");
      toast("Task created successfully");
    } catch {
      toast("Unable to add task", "error");
    } finally {
      setSaving(false);
    }
  };

  const updateStatus = async (id: string, status: TaskStatus) => {
    try {
      await update(ref(db, `tasks/${id}`), { status });
    } catch {
      toast("Unable to update status", "error");
    }
  };

  const deleteTask = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    try {
      await remove(ref(db, `tasks/${id}`));
      toast("Task deleted");
    } catch {
      toast("Unable to delete task", "error");
    }
  };

  const startEdit = (t: Task) => {
    setEditingTaskId(t.id);
    setEditingValue(t.title);
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditingValue("");
  };

  const saveEdit = async (id: string) => {
    if (!editingValue.trim()) return;
    try {
      await update(ref(db, `tasks/${id}`), {
        title: editingValue.trim(),
      });
      cancelEdit();
      toast("Task updated");
    } catch {
      toast("Unable to save changes", "error");
    }
  };

  if (authLoading) return <LoadingScreen />;

  if (!user) {
    return (
      <AuthScreen
        onGoogleAuth={login}
        error={authError}
        onDismissError={() => setAuthError("")}
      />
    );
  }

  return (
    <Dashboard
      user={user}
      tasks={tasks}
      displayedTasks={displayedTasks}
      stats={stats}
      filterCounts={filterCounts}
      filter={filter}
      search={search}
      sortBy={sortBy}
      tasksLoading={tasksLoading}
      taskTitle={task}
      dueDate={dueDate}
      priority={priority}
      saving={saving}
      editingTaskId={editingTaskId}
      editingValue={editingValue}
      onFilterChange={setFilter}
      onSearchChange={setSearch}
      onSortChange={setSortBy}
      onTitleChange={setTask}
      onDueDateChange={setDueDate}
      onPriorityChange={setPriority}
      onSubmit={addTask}
      onEditingValueChange={setEditingValue}
      onStartEdit={startEdit}
      onCancelEdit={cancelEdit}
      onSaveEdit={saveEdit}
      onStatusChange={updateStatus}
      onDelete={deleteTask}
    />
  );
}
