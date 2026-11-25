"use client";

import type { Task } from "@/features/calendar/models/CalendarItem";
import {
  type CalendarEntryLayout,
  CalendarEntryPopover,
} from "@/features/calendar/views/calendar-entry/CalendarEntryPopover";
import { cn } from "@/lib/Utils";

export function TaskEntry({
  task,
  layout,
  onDelete,
}: {
  task: Task;
  layout: CalendarEntryLayout;
  onDelete: (id: string) => Promise<void>;
}) {
  const completed = Boolean(task.completedAt);

  return (
    <CalendarEntryPopover
      item={task}
      layout={layout}
      variant="calendar-task"
      accessibleLabel={[task.title, "Task", completed ? "Completed" : undefined]
        .filter(Boolean)
        .join(", ")}
      typeLabel={completed ? "Completed task" : "Task"}
      onDelete={onDelete}
      renderDetails={() => (
        <p>
          Starts{" "}
          {task.startAt.toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>
      )}
    >
      <span className="calendar-task-dot" aria-hidden="true" />
      <span className={cn("calendar-item-title", completed && "line-through")}>
        {task.title}
      </span>
    </CalendarEntryPopover>
  );
}
