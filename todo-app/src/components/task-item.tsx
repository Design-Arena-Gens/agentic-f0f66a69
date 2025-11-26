import { Task, TaskPriority } from "@/lib/types";
import { formatDistanceToNow, format } from "date-fns";

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
};

const priorityStyles: Record<TaskPriority, string> = {
  low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  high: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
};

export function TaskItem({ task, onToggle, onDelete, onUpdate }: TaskItemProps) {
  const dueDateLabel = task.dueDate
    ? format(new Date(task.dueDate), "PP")
    : "No due date";

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700">
      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          className={`mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border text-sm transition ${
            task.completed
              ? "border-zinc-800 bg-zinc-900 text-white dark:border-zinc-200 dark:bg-zinc-100 dark:text-zinc-900"
              : "border-zinc-300 text-transparent dark:border-zinc-600"
          }`}
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          ✓
        </button>
        <div className="flex-1">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <h3
              className={`text-lg font-semibold ${
                task.completed
                  ? "text-zinc-500 line-through dark:text-zinc-500"
                  : "text-zinc-900 dark:text-zinc-100"
              }`}
            >
              {task.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span
                className={`rounded-full px-3 py-1 font-medium ${priorityStyles[task.priority]}`}
              >
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}{" "}
                priority
              </span>
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
                {dueDateLabel}
              </span>
            </div>
          </div>
          {task.notes && (
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              {task.notes}
            </p>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-500">
            <span>
              Added {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
            </span>
            {task.completed && task.completedAt && (
              <span>
                Completed{" "}
                {format(new Date(task.completedAt), "PPpp")}
              </span>
            )}
            <button
              type="button"
              onClick={() =>
                onUpdate(task.id, {
                  dueDate: task.dueDate ? null : new Date().toISOString(),
                })
              }
              className="font-medium text-zinc-600 underline transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              {task.dueDate ? "Remove due date" : "Set due date to today"}
            </button>
            <button
              type="button"
              onClick={() => onDelete(task.id)}
              className="font-medium text-rose-600 transition hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
