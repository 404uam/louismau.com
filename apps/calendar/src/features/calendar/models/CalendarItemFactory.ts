import type {
  Event,
  RelativeReminder,
  Task,
} from "@/features/calendar/models/CalendarItem";
import {
  getViewerTimeZone,
  zonedLocalToDate,
} from "@/features/calendar/models/ZonedTime";

export interface CommonCalendarItemDraft {
  title: string;
  description: string;
  location: string;
  tags: string;
  reminderMinutes: "none" | "5" | "10" | "30";
}

export interface EventDraft extends CommonCalendarItemDraft {
  startAt: string;
  endAt: string;
  allDay: boolean;
  timeZone: string | undefined;
}

export interface TaskDraft extends CommonCalendarItemDraft {
  startAt: string;
  dueAt: string;
}

function buildSharedFields(
  values: CommonCalendarItemDraft,
  creationTimeZone: string,
) {
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

export function buildTask(values: TaskDraft): Task {
  return {
    ...buildSharedFields(values, getViewerTimeZone()),
    type: "task",
    startAt: new Date(values.startAt),
    ...(values.dueAt && { dueAt: new Date(values.dueAt) }),
  };
}

export function buildEvent(values: EventDraft): Event {
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
