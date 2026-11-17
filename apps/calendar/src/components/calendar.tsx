"use client";

import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { useEffect, useState } from "react";
import { CalendarTimeGrid } from "@/components/calendar-time-grid";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

const views = ["month", "week", "3-day", "day"] as const;
type CalendarView = (typeof views)[number];

function viewAnchor(view: CalendarView, date: Date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    view === "month"
      ? 1
      : date.getDate() - (view === "week" ? date.getDay() : 0),
  );
}

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function dateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function Calendar() {
  const [today, setToday] = useState<Date | null>(null);
  const [month, setMonth] = useState<Date | null>(null);
  const [view, setView] = useState<CalendarView>("month");
  const [scrollReset, setScrollReset] = useState(0);

  useEffect(() => {
    const now = new Date();
    setToday(now);
    setMonth(new Date(now.getFullYear(), now.getMonth(), 1));
    const refreshClock = () => setToday(new Date());
    const interval = window.setInterval(refreshClock, 60_000);
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") refreshClock();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  function changeMonth(offset: number) {
    setMonth((current) =>
      current
        ? view === "month"
          ? new Date(current.getFullYear(), current.getMonth() + offset, 1)
          : new Date(
              current.getFullYear(),
              current.getMonth(),
              current.getDate() +
                offset * (view === "week" ? 7 : view === "3-day" ? 3 : 1),
            )
        : current,
    );
  }

  function goToToday() {
    const now = new Date();
    setToday(now);
    setMonth(viewAnchor(view, now));
    setScrollReset((current) => current + 1);
  }

  function changeView(next: CalendarView) {
    if (next === view) return;
    const now = new Date();
    setToday(now);
    setView(next);
    setMonth(viewAnchor(next, now));
  }

  const days = month
    ? Array.from(
        {
          length:
            view === "month"
              ? 35
              : view === "week"
                ? 7
                : view === "3-day"
                  ? 3
                  : 1,
        },
        (_, index) =>
          new Date(
            month.getFullYear(),
            month.getMonth(),
            (view === "month" ? 1 - month.getDay() : month.getDate()) + index,
          ),
      )
    : [];
  const monthLabel = month?.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const rangeLabel =
    view === "month"
      ? monthLabel
      : days.length
        ? new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }).formatRange(days[0], days[days.length - 1])
        : undefined;
  const navigationUnit = view === "3-day" ? "3 days" : view;

  return (
    <main
      className={cn("calendar-app", view !== "month" && "calendar-app-time")}
    >
      <section className="calendar-content" aria-label="Calendar">
        <div className="calendar-toolbar">
          <div>
            <p className="section-label">
              {view === "month" ? "MONTHLY" : view.toUpperCase()} VIEW
            </p>
            <h1 aria-live="polite">{rangeLabel ?? "Calendar"}</h1>
          </div>
          <div className="calendar-controls">
            <ToggleGroup
              aria-label="Calendar view"
              selectionMode="single"
              disallowEmptySelection
              selectedKeys={[view]}
              onSelectionChange={(keys) => {
                const next = views.find((value) => keys.has(value));
                if (next) changeView(next);
              }}
              variant="outline"
              size="lg"
              spacing={0}
              isDisabled={!month}
            >
              {views.map((value) => (
                <ToggleGroupItem key={value} id={value}>
                  {value === "3-day"
                    ? "3-day"
                    : value[0].toUpperCase() + value.slice(1)}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <Button variant="outline" size="lg" onPress={goToToday}>
              Today
            </Button>
            <div className="month-controls">
              <span title={`Previous ${navigationUnit}`}>
                <Button
                  variant="outline"
                  size="icon-lg"
                  aria-label={`Previous ${navigationUnit}`}
                  isDisabled={!month}
                  onPress={() => changeMonth(-1)}
                >
                  <RiArrowLeftSLine aria-hidden="true" />
                </Button>
              </span>
              <span title={`Next ${navigationUnit}`}>
                <Button
                  variant="outline"
                  size="icon-lg"
                  aria-label={`Next ${navigationUnit}`}
                  isDisabled={!month}
                  onPress={() => changeMonth(1)}
                >
                  <RiArrowRightSLine aria-hidden="true" />
                </Button>
              </span>
            </div>
          </div>
        </div>

        {view !== "month" && today ? (
          <CalendarTimeGrid
            days={days.map((date) => ({ date, key: dateKey(date) }))}
            now={today}
            scrollReset={scrollReset}
            label={rangeLabel ?? "Calendar"}
          />
        ) : (
          <div className="calendar-table-wrap">
            <table
              className="calendar-table"
              aria-label={monthLabel ?? "Calendar"}
            >
              <thead>
                <tr>
                  {weekdays.map((day) => (
                    <th key={day} scope="col">
                      <abbr title={day}>{day.slice(0, 3)}</abbr>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 6 }, (_, week) =>
                  days.slice(week * 7, week * 7 + 7),
                )
                  .filter((week) => week.length > 0)
                  .map((week) => (
                    <tr key={dateKey(week[0])}>
                      {week.map((date) => {
                        const key = dateKey(date);
                        const isToday = today && key === dateKey(today);
                        return (
                          <td
                            key={key}
                            className={
                              date.getMonth() !== month?.getMonth()
                                ? "outside-month"
                                : undefined
                            }
                          >
                            <time
                              dateTime={key}
                              title={date.toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                              aria-current={isToday ? "date" : undefined}
                            >
                              {date.getDate()}
                            </time>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
