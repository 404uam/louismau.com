import type { Event } from "@/features/calendar/models/CalendarItem";

function minutesSinceMidnight(date: Date) {
  return date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60;
}

export function layoutTimedEvents(
  events: Event[],
  day: Date,
  hourHeight: number,
) {
  const dayStart = day.getTime();
  const dayEnd = new Date(
    day.getFullYear(),
    day.getMonth(),
    day.getDate() + 1,
  ).getTime();
  const minimumMinutes = Math.min(1440, (20 / hourHeight) * 60);
  const segments = events
    .map((item) => {
      const start =
        item.startAt.getTime() <= dayStart
          ? 0
          : minutesSinceMidnight(item.startAt);
      const end =
        item.endAt.getTime() >= dayEnd
          ? 1440
          : minutesSinceMidnight(item.endAt);
      const top = Math.min(start, 1440 - minimumMinutes);
      const bottom = Math.min(1440, Math.max(end, top + minimumMinutes));
      return { item, top, bottom, column: 0 };
    })
    .toSorted((a, b) => a.top - b.top || b.bottom - a.bottom);

  const groups: {
    segments: typeof segments;
    laneEnds: number[];
    end: number;
  }[] = [];
  for (const segment of segments) {
    let group = groups[groups.length - 1];
    if (!group || segment.top >= group.end) {
      group = { segments: [], laneEnds: [], end: 0 };
      groups.push(group);
    }

    const availableLane = group.laneEnds.findIndex((end) => end <= segment.top);
    segment.column =
      availableLane === -1 ? group.laneEnds.length : availableLane;
    group.laneEnds[segment.column] = segment.bottom;
    group.end = Math.max(group.end, segment.bottom);
    group.segments.push(segment);
  }

  return groups.flatMap((group) =>
    group.segments.map((segment) => ({
      ...segment,
      columns: group.laneEnds.length,
    })),
  );
}
