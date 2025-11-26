import { Task } from "@/lib/types";

export type FilterValue = "all" | "active" | "completed";
export type SortValue = "created" | "due" | "priority";

type TaskFiltersProps = {
  filter: FilterValue;
  sort: SortValue;
  showCompletedFirst: boolean;
  onFilterChange: (filter: FilterValue) => void;
  onSortChange: (sort: SortValue) => void;
  onToggleCompletedOrder: () => void;
  tasks: Task[];
  onClearCompleted: () => void;
};

const tabStyles =
  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition";

export function TaskFilters({
  filter,
  sort,
  showCompletedFirst,
  onFilterChange,
  onSortChange,
  onToggleCompletedOrder,
  tasks,
  onClearCompleted,
}: TaskFiltersProps) {
  const activeCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.length - activeCount;

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Your tasks
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {activeCount} open · {completedCount} completed
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["all", "active", "completed"] as FilterValue[]).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => onFilterChange(value)}
              className={`${tabStyles} ${
                filter === value
                  ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                  : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
              }`}
            >
              {value === "all"
                ? "All"
                : value === "active"
                  ? "Active"
                  : "Completed"}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Sort by
            <select
              value={sort}
              onChange={(event) => onSortChange(event.target.value as SortValue)}
              className="ml-2 rounded-xl border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-800 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:ring-zinc-700"
            >
              <option value="created">Recently added</option>
              <option value="due">Due date</option>
              <option value="priority">Priority</option>
            </select>
          </label>
          <button
            type="button"
            onClick={onToggleCompletedOrder}
            className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
          >
            {showCompletedFirst ? "Show completed last" : "Show completed first"}
          </button>
        </div>
        <button
          type="button"
          onClick={onClearCompleted}
          disabled={completedCount === 0}
          className="inline-flex items-center justify-center rounded-full border border-transparent bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-500 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-500"
        >
          Clear completed
        </button>
      </div>
    </section>
  );
}
