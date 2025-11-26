import { Task } from "@/lib/types";
import { TaskItem } from "./task-item";

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
};

export function TaskList({ tasks, onToggle, onDelete, onUpdate }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-zinc-300 p-12 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
        <p className="text-base font-semibold text-zinc-600 dark:text-zinc-300">
          You're all caught up!
        </p>
        <p>Add a new task to get started.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}
