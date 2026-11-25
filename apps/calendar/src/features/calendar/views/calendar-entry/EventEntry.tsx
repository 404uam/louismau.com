"use client";

import type { Event } from "@/features/calendar/models/CalendarItem";
import {
  type CalendarEntryLayout,
  CalendarEntryPopover,
} from "@/features/calendar/views/calendar-entry/CalendarEntryPopover";

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

export function EventEntry({
  event,
  layout,
  onDelete,
}: {
  event: Event;
  layout: CalendarEntryLayout;
  onDelete: (id: string) => Promise<void>;
}) {
  const timeLabel = event.allDay ? "All day" : eventTime(event, event.startAt);

  return (
    <CalendarEntryPopover
      item={event}
      layout={layout}
      variant="calendar-event"
      accessibleLabel={[event.title, "Event", timeLabel]
        .filter(Boolean)
        .join(", ")}
      typeLabel="Event"
      onDelete={onDelete}
      renderDetails={() => {
        const startDate = eventDate(event, event.startAt);
        const endDate = eventDate(event, event.endAt);
        return (
          <p>
            {event.allDay
              ? `All day · ${startDate}${startDate === endDate ? "" : ` – ${endDate}`}`
              : `${startDate}, ${eventTime(event, event.startAt)} – ${endDate}, ${eventTime(event, event.endAt)}`}
          </p>
        );
      }}
    >
      {layout === "row" ? (
        <span className="calendar-item-time">{timeLabel}</span>
      ) : null}
      <span className="calendar-item-title">{event.title}</span>
      {layout === "block" ? (
        <span className="calendar-item-time">
          {eventTime(event, event.startAt)} – {eventTime(event, event.endAt)}
        </span>
      ) : null}
    </CalendarEntryPopover>
  );
}
