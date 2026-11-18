import type { Event, RelativeReminder, Task } from "@/types/CalendarItem";
import { getViewerTimeZone, zonedLocalToDate } from "./ZonedTime";

export interface CommonFormValues {
  title: string;
  description: string;
  location: string;
  tags: string;
  reminderMinutes: "none" | "5" | "10" | "30";
}

// Local date-time values use YYYY-MM-DDTHH:mm; all-day events use YYYY-MM-DD.
export interface EventFormValues extends CommonFormValues {
  startAt: string;
  endAt: string;
  allDay: boolean;
  timeZone: string | undefined;
}

export interface TaskFormValues extends CommonFormValues {
  startAt: string;
  dueAt: string;
}

export type EventFormErrors = Partial<
  Record<"title" | "startAt" | "endAt", string>
>;
export type TaskFormErrors = Partial<Record<"title" | "startAt", string>>;

export function createCommonValues(): CommonFormValues {
  return {
    title: "",
    description: "",
    location: "",
    tags: "",
    reminderMinutes: "none",
  };
}

export function toLocalInputValue(date: Date) {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function validateEventForm(values: EventFormValues): EventFormErrors {
  const errors: EventFormErrors = {};
  if (!values.title.trim()) errors.title = "Enter a title.";
  if (!values.startAt) errors.startAt = "Enter a start.";
  if (!values.endAt) errors.endAt = "Enter an end.";
  else if (values.startAt && values.endAt < values.startAt)
    errors.endAt = "The end must not be before the start.";
  return errors;
}

export function validateTaskForm(values: TaskFormValues): TaskFormErrors {
  const errors: TaskFormErrors = {};
  if (!values.title.trim()) errors.title = "Enter a title.";
  if (!values.startAt) errors.startAt = "Enter a start.";
  return errors;
}

function buildSharedFields(values: CommonFormValues, creationTimeZone: string) {
  const tags = values.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  const description = values.description.trim();
  const location = values.location.trim();
  const reminder: RelativeReminder | undefined =
    values.reminderMinutes === "none"
      ? undefined
      : {
          anchor: "start",
          offsetMinutesBefore: Number(values.reminderMinutes) as 5 | 10 | 30,
        };

  return {
    id: crypto.randomUUID(),
    title: values.title.trim(),
    createdAt: new Date(),
    creationTimeZone,
    ...(description && { description }),
    ...(location && { location }),
    ...(tags.length > 0 && { tags }),
    ...(reminder && { reminder }),
  };
}

export function buildTask(values: TaskFormValues): Task {
  return {
    ...buildSharedFields(values, getViewerTimeZone()),
    type: "task",
    startAt: new Date(values.startAt),
    ...(values.dueAt && { dueAt: new Date(values.dueAt) }),
  };
}

export function buildEvent(values: EventFormValues): Event {
  const creationTimeZone = getViewerTimeZone();
  const zone = values.timeZone ?? creationTimeZone;
  const start = values.allDay ? `${values.startAt}T00:00` : values.startAt;
  const end = values.allDay ? `${values.endAt}T23:59` : values.endAt;

  return {
    ...buildSharedFields(values, creationTimeZone),
    type: "event",
    startAt: zonedLocalToDate(start, zone),
    endAt: zonedLocalToDate(end, zone),
    allDay: values.allDay,
    ...(values.timeZone && { timeZone: values.timeZone }),
  };
}
