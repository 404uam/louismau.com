"use client";

import {
  type CalendarItemLayout,
  CalendarItemPopover,
} from "@/components/calendar/items/CalendarItemPopover";
import { cn } from "@/lib/Utils";
import type { Task } from "@/types/CalendarItem";

export function CalendarTaskView({
  task,
  layout,
}: {
  task: Task;
  layout: CalendarItemLayout;
}) {
  const completed = Boolean(task.completedAt);

  return (
    <CalendarItemPopover
      item={task}
      layout={layout}
      variant="calendar-task"
      accessibleLabel={[task.title, "Task", completed ? "Completed" : undefined]
        .filter(Boolean)
        .join(", ")}
      typeLabel={completed ? "Completed task" : "Task"}
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
    </CalendarItemPopover>
  );
}
