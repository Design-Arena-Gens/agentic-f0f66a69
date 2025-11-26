"use client";

import { useEffect, useMemo, useState } from "react";
import { Task } from "@/lib/types";
import { loadTasks, saveTasks } from "@/lib/storage";
import { TaskForm } from "@/components/task-form";
import { TaskFilters, FilterValue, SortValue } from "@/components/task-filters";
import { TaskList } from "@/components/task-list";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());
  const [filter, setFilter] = useState<FilterValue>("all");
  const [sort, setSort] = useState<SortValue>("created");
  const [showCompletedFirst, setShowCompletedFirst] = useState(false);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const base = tasks
      .filter((task) => {
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
      })
      .slice();

    base.sort((a, b) => {
      if (sort === "created") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }

      if (sort === "due") {
        const aDue = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
        const bDue = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;

        if (aDue === bDue) {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }

        return aDue - bDue;
      }

      const priorityScore = (task: Task) =>
        task.priority === "high" ? 3 : task.priority === "medium" ? 2 : 1;
      const diff = priorityScore(b) - priorityScore(a);
      if (diff === 0) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return diff;
    });

    if (showCompletedFirst) {
      base.sort((a, b) => Number(b.completed) - Number(a.completed));
    } else {
      base.sort((a, b) => Number(a.completed) - Number(b.completed));
    }

    return base;
  }, [tasks, filter, sort, showCompletedFirst]);

  const handleAddTask = (task: Task) => {
    setTasks((prev) => [task, ...prev]);
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: task.completed ? null : new Date().toISOString(),
            }
          : task,
      ),
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleUpdateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task)),
    );
  };

  const handleClearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 pb-16 pt-10 dark:from-[#050505] dark:via-black dark:to-zinc-950">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 md:px-10">
        <header className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-8 text-start shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Agentic Planner
            </p>
            <h1 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100 md:text-4xl">
              Plan your day with clarity
            </h1>
          </div>
          <p className="max-w-2xl text-sm text-zinc-600 dark:text-zinc-400 md:text-base">
            Capture tasks, assign priorities, and track progress effortlessly.
            Everything updates in real time and stays saved locally, so you can
            focus on shipping.
          </p>
        </header>

        <TaskForm onSubmit={handleAddTask} />

        <TaskFilters
          filter={filter}
          sort={sort}
          showCompletedFirst={showCompletedFirst}
          onFilterChange={setFilter}
          onSortChange={setSort}
          onToggleCompletedOrder={() =>
            setShowCompletedFirst((prev) => !prev)
          }
          tasks={tasks}
          onClearCompleted={handleClearCompleted}
        />

        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onUpdate={handleUpdateTask}
        />
      </div>
    </div>
  );
}
