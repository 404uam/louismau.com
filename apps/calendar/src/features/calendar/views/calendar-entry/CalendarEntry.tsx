"use client";

import type { CalendarItem } from "@/features/calendar/models/CalendarItem";
import type { CalendarEntryLayout } from "@/features/calendar/views/calendar-entry/CalendarEntryPopover";
import { EventEntry } from "@/features/calendar/views/calendar-entry/EventEntry";
import { TaskEntry } from "@/features/calendar/views/calendar-entry/TaskEntry";

export function CalendarEntry({
  item,
  layout = "row",
  onDelete,
}: {
  item: CalendarItem;
  layout?: CalendarEntryLayout;
  onDelete: (id: string) => Promise<void>;
}) {
  return item.type === "event" ? (
    <EventEntry event={item} layout={layout} onDelete={onDelete} />
  ) : (
    <TaskEntry task={item} layout={layout} onDelete={onDelete} />
  );
}
