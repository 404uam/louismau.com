"use client";

import {
  type CSSProperties,
  type ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { CalendarDay } from "@/lib/calendar/calendar-projection";
import type { CalendarItem, Event } from "@/types/calendar-item";

const hours = Array.from({ length: 25 }, (_, hour) => hour);

function hourLabel(hour: number) {
  return `${hour % 12 || 12} ${hour % 24 < 12 ? "AM" : "PM"}`;
}

function initialHour(now: Date) {
  return Math.max(0, now.getHours() + now.getMinutes() / 60 - 4);
}

function minutesSinceMidnight(date: Date) {
  return date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60;
}

function layoutEvents(events: Event[], day: Date, hourHeight: number) {
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

export function CalendarTimeGrid({
  days,
  now,
  scrollReset,
  label,
  renderItem,
}: {
  days: CalendarDay[];
  now: Date;
  scrollReset: number;
  label: string;
  renderItem: (item: CalendarItem, layout?: "row" | "block") => ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLElement>(null);
  const hourHeight = useRef(0);
  const topHour = useRef(0);
  const nowRef = useRef(now);
  const [measuredHourHeight, setMeasuredHourHeight] = useState(64);

  useLayoutEffect(() => {
    nowRef.current = now;
  }, [now]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const scroller = scrollRef.current;
    if (!root || !scroller) return;

    topHour.current = initialHour(nowRef.current);
    function measure() {
      if (!root || !scroller || scroller.clientHeight === 0) return;
      const height = scroller.clientHeight / 8;
      const target = topHour.current;
      hourHeight.current = height;
      setMeasuredHourHeight(height);
      root.style.setProperty("--hour-height", `${height}px`);
      root.style.setProperty(
        "--scrollbar-width",
        `${scroller.offsetWidth - scroller.clientWidth}px`,
      );
      scroller.scrollTop = target * height;
      topHour.current = scroller.scrollTop / height;
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(scroller);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    // Only Today explicitly resets an already mounted time grid.
    void scrollReset;
    const scroller = scrollRef.current;
    if (scroller && hourHeight.current) {
      scroller.scrollTop = initialHour(nowRef.current) * hourHeight.current;
      topHour.current = scroller.scrollTop / hourHeight.current;
    }
  }, [scrollReset]);

  const currentHour = now.getHours() + now.getMinutes() / 60;
  const hasTimeChange = days.some(({ date, timedEvents }) => {
    const start = date.getTime();
    const end = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1,
    ).getTime();
    return timedEvents.some((item) => {
      const eventStart = new Date(Math.max(start, item.startAt.getTime()));
      const eventEnd = new Date(Math.min(end - 1, item.endAt.getTime()));
      return eventStart.getTimezoneOffset() !== eventEnd.getTimezoneOffset();
    });
  });

  return (
    <div
      ref={rootRef}
      className="calendar-time-grid"
      style={{ "--day-count": days.length } as CSSProperties}
    >
      <div className="calendar-time-headers">
        <span className="calendar-time-zone" aria-hidden="true">
          Time
        </span>
        {days.map(({ date, key, allDayEvents, tasks }) => (
          <div className="calendar-time-day-header" key={key}>
            <span aria-hidden="true">
              {date.toLocaleDateString("en-US", { weekday: "short" })}
            </span>
            <time
              dateTime={key}
              aria-current={
                date.toDateString() === now.toDateString() ? "date" : undefined
              }
            >
              <span aria-hidden="true">{date.getDate()}</span>
              <span className="sr-only">
                {date.toLocaleDateString("en-US", { dateStyle: "full" })}
              </span>
            </time>
            {allDayEvents.length || tasks.length ? (
              <div className="calendar-header-items">
                {allDayEvents.map((item) => renderItem(item))}
                {tasks.map((item) => renderItem(item))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
      {hasTimeChange ? (
        <p role="status" className="calendar-time-notice">
          Events spanning a clock change may not match their duration on the
          grid. Open an event to see its times.
        </p>
      ) : null}
      <section
        ref={scrollRef}
        className="calendar-time-scroll"
        aria-label={`${label}, hourly calendar. Scroll to explore midnight through midnight.`}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: The scroll region needs keyboard focus for native keyboard scrolling.
        tabIndex={0}
        onScroll={(event) => {
          if (hourHeight.current)
            topHour.current =
              event.currentTarget.scrollTop / hourHeight.current;
        }}
      >
        <div className="calendar-time-body">
          <div className="calendar-time-gutter">
            {hours.map((hour) => (
              <span
                key={hour}
                className="calendar-hour-label"
                style={{ top: `${(hour / 24) * 100}%` }}
              >
                {hourLabel(hour)}
              </span>
            ))}
          </div>
          {days.map(({ date, key, timedEvents }) => (
            <section
              key={key}
              className="calendar-time-day"
              aria-label={`${date.toLocaleDateString("en-US", { dateStyle: "full" })}, midnight to midnight`}
            >
              {date.toDateString() === now.toDateString() ? (
                <div
                  className="calendar-current-time"
                  style={{ top: `${(currentHour / 24) * 100}%` }}
                  role="img"
                  aria-label={`Current time ${now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`}
                />
              ) : null}
              {layoutEvents(timedEvents, date, measuredHourHeight).map(
                ({ item, top, bottom, column, columns }) => (
                  <div
                    className="calendar-timed-event"
                    key={item.id}
                    style={{
                      top: `${(top / 1440) * 100}%`,
                      height: `${((bottom - top) / 1440) * 100}%`,
                      left: `calc(${(column / columns) * 100}% + 2px)`,
                      width: `calc(${100 / columns}% - 4px)`,
                    }}
                  >
                    {renderItem(item, "block")}
                  </div>
                ),
              )}
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
