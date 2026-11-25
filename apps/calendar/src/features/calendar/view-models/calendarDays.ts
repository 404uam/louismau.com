import type {
  CalendarItem,
  Event,
  Task,
} from "@/features/calendar/models/CalendarItem";

export interface CalendarDay {
  date: Date;
  key: string;
  allDayEvents: Event[];
  timedEvents: Event[];
  tasks: Task[];
}

export function dateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function projectCalendarDays(
  items: CalendarItem[],
  days: Date[],
): CalendarDay[] {
  const orderedItems = items
    .filter((item) => !item.recurrence)
    .toSorted((a, b) => a.startAt.getTime() - b.startAt.getTime());

  return days.map((date) => {
    const start = date.getTime();
    const end = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1,
    ).getTime();
    const day: CalendarDay = {
      date,
      key: dateKey(date),
      allDayEvents: [],
      timedEvents: [],
      tasks: [],
    };

    for (const item of orderedItems) {
      const itemStart = item.startAt.getTime();
      if (item.type === "task") {
        if (itemStart >= start && itemStart < end) day.tasks.push(item);
      } else if (itemStart < end && item.endAt.getTime() >= start) {
        if (item.allDay) day.allDayEvents.push(item);
        else day.timedEvents.push(item);
      }
    }

    return day;
  });
}
