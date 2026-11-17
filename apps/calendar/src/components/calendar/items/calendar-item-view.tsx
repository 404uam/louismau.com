"use client";

import { CalendarEventView } from "@/components/calendar/items/calendar-event-view";
import type { CalendarItemLayout } from "@/components/calendar/items/calendar-item-popover";
import { CalendarTaskView } from "@/components/calendar/items/calendar-task-view";
import type { CalendarItem } from "@/types/calendar-item";

export function CalendarItemView({
  item,
  layout = "row",
}: {
  item: CalendarItem;
  layout?: CalendarItemLayout;
}) {
  return item.type === "event" ? (
    <CalendarEventView event={item} layout={layout} />
  ) : (
    <CalendarTaskView task={item} layout={layout} />
  );
}
