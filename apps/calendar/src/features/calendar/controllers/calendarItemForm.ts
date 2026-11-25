import type {
  CommonCalendarItemDraft,
  EventDraft,
  TaskDraft,
} from "@/features/calendar/models/CalendarItemFactory";

export type EventFormErrors = Partial<
  Record<"title" | "startAt" | "endAt", string>
>;
export type TaskFormErrors = Partial<Record<"title" | "startAt", string>>;

export function createCommonDraft(): CommonCalendarItemDraft {
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

export function validateEventDraft(values: EventDraft): EventFormErrors {
  const errors: EventFormErrors = {};
  if (!values.title.trim()) errors.title = "Enter a title.";
  if (!values.startAt) errors.startAt = "Enter a start.";
  if (!values.endAt) errors.endAt = "Enter an end.";
  else if (values.startAt && values.endAt < values.startAt)
    errors.endAt = "The end must not be before the start.";
  return errors;
}

export function validateTaskDraft(values: TaskDraft): TaskFormErrors {
  const errors: TaskFormErrors = {};
  if (!values.title.trim()) errors.title = "Enter a title.";
  if (!values.startAt) errors.startAt = "Enter a start.";
  return errors;
}
