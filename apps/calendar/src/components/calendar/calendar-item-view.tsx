"use client";

import { Dialog, DialogTrigger, Heading, Popover } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CalendarItem, Event, Task } from "@/types/calendar-item";

function eventTime(event: Event, date: Date): string {
  const timeZone = event.timeZone ?? event.creationTimeZone;
  const viewerTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const showTimeZone =
    timeZone !== viewerTimeZone ||
    event.startAt.getTimezoneOffset() !== event.endAt.getTimezoneOffset();
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone,
    ...(showTimeZone && { timeZoneName: "short" }),
  }).format(date);
}

function eventDate(event: Event, date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeZone: event.timeZone ?? event.creationTimeZone,
  }).format(date);
}

export function CalendarItemView({
  item,
  layout = "row",
}: {
  item: CalendarItem;
  layout?: "row" | "block";
}) {
  function renderEvent(event: Event) {
    const timeLabel = event.allDay
      ? "All day"
      : eventTime(event, event.startAt);

    return {
      variant: "calendar-event" as const,
      accessibleLabel: [event.title, "Event", timeLabel]
        .filter(Boolean)
        .join(", "),
      typeLabel: "Event",
      content: (
        <>
          {layout === "row" ? (
            <span className="calendar-item-time">{timeLabel}</span>
          ) : null}
          <span className="calendar-item-title">{event.title}</span>
          {layout === "block" ? (
            <span className="calendar-item-time">
              {eventTime(event, event.startAt)} –{" "}
              {eventTime(event, event.endAt)}
            </span>
          ) : null}
        </>
      ),
      details: () => {
        const startDate = eventDate(event, event.startAt);
        const endDate = eventDate(event, event.endAt);
        return (
          <p>
            {event.allDay
              ? `All day · ${startDate}${startDate === endDate ? "" : ` – ${endDate}`}`
              : `${startDate}, ${eventTime(event, event.startAt)} – ${endDate}, ${eventTime(event, event.endAt)}`}
          </p>
        );
      },
    };
  }

  function renderTask(task: Task) {
    const completed = Boolean(task.completedAt);
    return {
      variant: "calendar-task" as const,
      accessibleLabel: [task.title, "Task", completed ? "Completed" : undefined]
        .filter(Boolean)
        .join(", "),
      typeLabel: completed ? "Completed task" : "Task",
      content: (
        <>
          <span className="calendar-task-dot" aria-hidden="true" />
          <span
            className={cn("calendar-item-title", completed && "line-through")}
          >
            {task.title}
          </span>
        </>
      ),
      details: () => (
        <p>
          Starts{" "}
          {task.startAt.toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>
      ),
    };
  }

  const { variant, accessibleLabel, typeLabel, content, details } =
    item.type === "event" ? renderEvent(item) : renderTask(item);

  return (
    <DialogTrigger>
      <Button
        variant={variant}
        size={layout === "block" ? "calendar-block" : "calendar-row"}
        aria-label={accessibleLabel}
      >
        {content}
      </Button>
      <Popover className="calendar-popover">
        <Dialog className="calendar-popover-content">
          {({ close }) => (
            <>
              <Heading slot="title" className="calendar-popover-title">
                {item.title}
              </Heading>
              <p>{typeLabel}</p>
              {details()}
              {item.description ? <p>{item.description}</p> : null}
              {item.location ? <p>{item.location}</p> : null}
              <Button variant="outline" size="sm" onPress={close}>
                Close
              </Button>
            </>
          )}
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
