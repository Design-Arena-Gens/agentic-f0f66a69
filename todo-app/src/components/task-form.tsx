import { FormEvent, useState } from "react";
import { Task, TaskPriority } from "@/lib/types";

type TaskFormProps = {
  onSubmit: (task: Task) => void;
};

const defaultTask = {
  title: "",
  notes: "",
  dueDate: "",
  priority: "medium" as TaskPriority,
};

export function TaskForm({ onSubmit }: TaskFormProps) {
  const [form, setForm] = useState(defaultTask);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.title.trim()) return;
    const now = new Date().toISOString();

    const task: Task = {
      id: crypto.randomUUID(),
      title: form.title.trim(),
      notes: form.notes.trim(),
      dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
      priority: form.priority,
      completed: false,
      createdAt: now,
      completedAt: null,
    };

    onSubmit(task);
    setForm(defaultTask);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
    >
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        Add a task
      </h2>
      <div className="mt-4 flex flex-col gap-4">
        <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Task title
          <input
            type="text"
            value={form.title}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, title: event.target.value }))
            }
            placeholder="Finish quarterly planning"
            className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-base font-normal text-zinc-900 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-600 dark:focus:ring-zinc-700"
            required
          />
        </label>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Due date
            <input
              type="date"
              value={form.dueDate}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, dueDate: event.target.value }))
              }
              className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-base font-normal text-zinc-900 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-600 dark:focus:ring-zinc-700"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Priority
            <select
              value={form.priority}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  priority: event.target.value as TaskPriority,
                }))
              }
              className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-base font-normal text-zinc-900 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-600 dark:focus:ring-zinc-700"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
        </div>
        <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Notes
          <textarea
            value={form.notes}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, notes: event.target.value }))
            }
            placeholder="Add any context or checklist items…"
            className="min-h-[96px] rounded-xl border border-zinc-200 bg-white px-4 py-2 text-base font-normal text-zinc-900 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-600 dark:focus:ring-zinc-700"
          />
        </label>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}
