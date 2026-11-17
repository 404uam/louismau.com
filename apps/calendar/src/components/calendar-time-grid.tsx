"use client";

import { type CSSProperties, useLayoutEffect, useRef } from "react";

const hours = Array.from({ length: 25 }, (_, hour) => hour);

function hourLabel(hour: number) {
  return `${hour % 12 || 12} ${hour % 24 < 12 ? "AM" : "PM"}`;
}

function initialHour() {
  const now = new Date();
  return Math.max(0, now.getHours() + now.getMinutes() / 60 - 4);
}

export function CalendarTimeGrid({
  days,
  now,
  scrollReset,
  label,
}: {
  days: { date: Date; key: string }[];
  now: Date;
  scrollReset: number;
  label: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLElement>(null);
  const hourHeight = useRef(0);
  const topHour = useRef(0);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const scroller = scrollRef.current;
    if (!root || !scroller) return;

    topHour.current = initialHour();
    function measure() {
      if (!root || !scroller || scroller.clientHeight === 0) return;
      const height = scroller.clientHeight / 8;
      const target = topHour.current;
      hourHeight.current = height;
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
      scroller.scrollTop = initialHour() * hourHeight.current;
      topHour.current = scroller.scrollTop / hourHeight.current;
    }
  }, [scrollReset]);

  const currentHour = now.getHours() + now.getMinutes() / 60;

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
        {days.map(({ date, key }) => (
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
          </div>
        ))}
      </div>
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
          {days.map(({ date, key }) => (
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
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
