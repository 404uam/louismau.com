"use client";

import { CalendarEventView } from "@/components/calendar/items/CalendarEventView";
import type { CalendarItemLayout } from "@/components/calendar/items/CalendarItemPopover";
import { CalendarTaskView } from "@/components/calendar/items/CalendarTaskView";
import type { CalendarItem } from "@/types/CalendarItem";

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
