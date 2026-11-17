"use client";

import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogTrigger, Heading, Popover } from "react-aria-components";
import { CalendarTimeGrid } from "@/components/calendar-time-grid";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  dateKey,
  projectCalendarItems,
} from "@/lib/calendar/calendar-projection";
import {
  advanceViewDate,
  anchorViewDate,
  type CalendarView,
  formatViewLabel,
  getViewDays,
  viewRules,
  views,
} from "@/lib/calendar/calendar-view";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import type { CalendarItem, Event, Task } from "@/types/calendar-item";

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const emptyItems: CalendarItem[] = [];
const monthItemLimit = 2;

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

export function Calendar() {
  const [today, setToday] = useState<Date | null>(null);
  const [anchorDate, setAnchorDate] = useState<Date | null>(null);
  const [view, setView] = useState<CalendarView>("month");
  const [scrollReset, setScrollReset] = useState(0);
  const query = useLiveQuery(async () => {
    try {
      return {
        status: "ready" as const,
        items: await db.calendarItems.toArray(),
      };
    } catch (error) {
      console.error("Could not load calendar items:", error);
      return { status: "error" as const };
    }
  }, []);

  useEffect(() => {
    const now = new Date();
    setToday(now);
    setAnchorDate(anchorViewDate("month", now));
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

  function navigate(offset: number) {
    setAnchorDate((current) =>
      current ? advanceViewDate(view, current, offset) : current,
    );
  }

  function goToToday() {
    const now = new Date();
    setToday(now);
    setAnchorDate(anchorViewDate(view, now));
    setScrollReset((current) => current + 1);
  }

  function changeView(next: CalendarView) {
    if (next === view) return;
    const now = new Date();
    setToday(now);
    setView(next);
    setAnchorDate(anchorViewDate(next, now));
  }

  const rules = viewRules[view];
  const days = useMemo(
    () => (anchorDate ? getViewDays(view, anchorDate) : []),
    [view, anchorDate],
  );
  const items = query?.status === "ready" ? query.items : emptyItems;
  const projectedDays = useMemo(
    () => projectCalendarItems(items, days),
    [items, days],
  );
  const monthLabel = anchorDate?.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const rangeLabel = anchorDate
    ? formatViewLabel(view, anchorDate, days)
    : undefined;
  const { navigationUnit } = rules;

  function renderItem(item: CalendarItem, layout: "row" | "block" = "row") {
    function renderEvent(event: Event) {
      const timeLabel = event.allDay
        ? "All day"
        : eventTime(event, event.startAt);

      return {
        variant: "calendar-event" as const,
        accessibleLabel: [event.title, "Event", timeLabel]
          .filter(Boolean)
          .join(", "),
        typeLabel: "Event",
        content: (
          <>
            {layout === "row" ? (
              <span className="calendar-item-time">{timeLabel}</span>
            ) : null}
            <span className="calendar-item-title">{event.title}</span>
            {layout === "block" ? (
              <span className="calendar-item-time">
                {eventTime(event, event.startAt)} –{" "}
                {eventTime(event, event.endAt)}
              </span>
            ) : null}
          </>
        ),
        details: (
          <p>
            {event.allDay
              ? `All day · ${eventDate(event, event.startAt)}${
                  eventDate(event, event.startAt) ===
                  eventDate(event, event.endAt)
                    ? ""
                    : ` – ${eventDate(event, event.endAt)}`
                }`
              : `${eventDate(event, event.startAt)}, ${eventTime(event, event.startAt)} – ${eventDate(event, event.endAt)}, ${eventTime(event, event.endAt)}`}
          </p>
        ),
      };
    }

    function renderTask(task: Task) {
      const completed = Boolean(task.completedAt);
      return {
        variant: "calendar-task" as const,
        accessibleLabel: [
          task.title,
          "Task",
          completed ? "Completed" : undefined,
        ]
          .filter(Boolean)
          .join(", "),
        typeLabel: completed ? "Completed task" : "Task",
        content: (
          <>
            <span className="calendar-task-dot" aria-hidden="true" />
            <span
              className={cn("calendar-item-title", completed && "line-through")}
            >
              {task.title}
            </span>
          </>
        ),
        details: (
          <p>
            Starts{" "}
            {task.startAt.toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        ),
      };
    }

    const { variant, accessibleLabel, typeLabel, content, details } =
      item.type === "event" ? renderEvent(item) : renderTask(item);

    return (
      <DialogTrigger key={item.id}>
        <Button
          variant={variant}
          size={layout === "block" ? "calendar-block" : "calendar-row"}
          aria-label={accessibleLabel}
        >
          {content}
        </Button>
        <Popover className="calendar-popover">
          <Dialog className="calendar-popover-content">
            {({ close }) => (
              <>
                <Heading slot="title" className="calendar-popover-title">
                  {item.title}
                </Heading>
                <p>{typeLabel}</p>
                {details}
                {item.description ? <p>{item.description}</p> : null}
                {item.location ? <p>{item.location}</p> : null}
                <Button variant="outline" size="sm" onPress={close}>
                  Close
                </Button>
              </>
            )}
          </Dialog>
        </Popover>
      </DialogTrigger>
    );
  }

  return (
    <main
      className={cn(
        "calendar-app",
        rules.layout === "time" && "calendar-app-time",
      )}
    >
      <section className="calendar-content" aria-label="Calendar">
        <div className="calendar-toolbar">
          <div>
            <p className="section-label">{rules.heading} VIEW</p>
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
              isDisabled={!anchorDate}
            >
              {views.map((value) => (
                <ToggleGroupItem key={value} id={value}>
                  {viewRules[value].label}
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
                  isDisabled={!anchorDate}
                  onPress={() => navigate(-1)}
                >
                  <RiArrowLeftSLine aria-hidden="true" />
                </Button>
              </span>
              <span title={`Next ${navigationUnit}`}>
                <Button
                  variant="outline"
                  size="icon-lg"
                  aria-label={`Next ${navigationUnit}`}
                  isDisabled={!anchorDate}
                  onPress={() => navigate(1)}
                >
                  <RiArrowRightSLine aria-hidden="true" />
                </Button>
              </span>
            </div>
          </div>
        </div>

        {!query ? (
          <p role="status" className="calendar-notice">
            Loading calendar items...
          </p>
        ) : query.status === "error" ? (
          <p role="alert" className="calendar-notice">
            Calendar items could not be loaded. Please reload and try again.
          </p>
        ) : items.some((item) => item.recurrence) ? (
          <p role="status" className="calendar-notice">
            Recurring items are not shown yet.
          </p>
        ) : null}

        {rules.layout === "time" && today ? (
          <CalendarTimeGrid
            days={projectedDays}
            now={today}
            scrollReset={scrollReset}
            label={rangeLabel ?? "Calendar"}
            renderItem={renderItem}
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
                  projectedDays.slice(week * 7, week * 7 + 7),
                )
                  .filter((week) => week.length > 0)
                  .map((week) => (
                    <tr key={week[0].key}>
                      {week.map(
                        ({ date, key, allDayEvents, timedEvents, tasks }) => {
                          const isToday = today && key === dateKey(today);
                          const dayItems = [
                            ...allDayEvents,
                            ...timedEvents,
                            ...tasks,
                          ];
                          const hiddenItems = dayItems.slice(monthItemLimit);
                          return (
                            <td
                              key={key}
                              className={
                                date.getMonth() !== anchorDate?.getMonth()
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
                              <div className="calendar-month-items">
                                {dayItems
                                  .slice(0, monthItemLimit)
                                  .map((item) => renderItem(item))}
                                {hiddenItems.length > 0 ? (
                                  <DialogTrigger>
                                    <Button
                                      variant="ghost"
                                      size="xs"
                                      className="calendar-more"
                                      aria-label={`${hiddenItems.length} more items for ${date.toLocaleDateString("en-US", { dateStyle: "full" })}`}
                                    >
                                      +{hiddenItems.length} more
                                    </Button>
                                    <Popover className="calendar-popover">
                                      <Dialog className="calendar-popover-content">
                                        {({ close }) => (
                                          <>
                                            <Heading
                                              slot="title"
                                              className="calendar-popover-title"
                                            >
                                              {date.toLocaleDateString(
                                                "en-US",
                                                { dateStyle: "full" },
                                              )}
                                            </Heading>
                                            {hiddenItems.map((item) =>
                                              renderItem(item),
                                            )}
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              onPress={close}
                                            >
                                              Close
                                            </Button>
                                          </>
                                        )}
                                      </Dialog>
                                    </Popover>
                                  </DialogTrigger>
                                ) : null}
                              </div>
                            </td>
                          );
                        },
                      )}
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
