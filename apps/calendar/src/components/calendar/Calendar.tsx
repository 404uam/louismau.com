"use client";

import { useLiveQuery } from "dexie-react-hooks";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { CalendarMonthView } from "@/components/calendar/CalendarMonthView";
import { CalendarTimeGrid } from "@/components/calendar/CalendarTimeGrid";
import { CalendarToolbar } from "@/components/calendar/CalendarToolbar";
import { projectCalendarItems } from "@/lib/calendar/CalendarProjection";
import {
  advanceViewDate,
  anchorViewDate,
  type CalendarView,
  formatViewLabel,
  getViewDays,
  viewRules,
} from "@/lib/calendar/CalendarView";
import { db } from "@/lib/Db";
import { cn } from "@/lib/Utils";
import type { CalendarItem } from "@/types/CalendarItem";

const emptyItems: CalendarItem[] = [];
const CalendarItemSheet = dynamic(() =>
  import("@/components/calendar/items/CreateCalendarForm").then(
    (module) => module.CalendarItemSheet,
  ),
);

export function Calendar() {
  const [today, setToday] = useState<Date | null>(null);
  const [anchorDate, setAnchorDate] = useState<Date | null>(null);
  const [view, setView] = useState<CalendarView>("month");
  const [scrollReset, setScrollReset] = useState(0);
  const [isCreating, setIsCreating] = useState(false);
  const [hasActivatedCreationSheet, setHasActivatedCreationSheet] =
    useState(false);
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

  async function handleCreation(item: CalendarItem) {
    await db.calendarItems.add(item);
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
  const rangeLabel = anchorDate
    ? formatViewLabel(view, anchorDate, days)
    : undefined;

  return (
    <main
      className={cn(
        "calendar-app",
        rules.layout === "time" && "calendar-app-time",
      )}
    >
      <section className="calendar-content" aria-label="Calendar">
        <CalendarToolbar
          view={view}
          rangeLabel={rangeLabel}
          isDisabled={!anchorDate}
          onChangeView={changeView}
          onToday={goToToday}
          onNavigate={navigate}
          onNew={() => {
            setHasActivatedCreationSheet(true);
            setIsCreating(true);
          }}
        />

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
          />
        ) : (
          <CalendarMonthView
            days={projectedDays}
            today={today}
            anchorDate={anchorDate}
          />
        )}
      </section>
      {hasActivatedCreationSheet && (
        <CalendarItemSheet
          isOpen={isCreating}
          onOpenChange={setIsCreating}
          onCreate={handleCreation}
        />
      )}
    </main>
  );
}
