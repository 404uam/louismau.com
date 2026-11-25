"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useMemo, useState } from "react";
import type { CalendarItem } from "@/features/calendar/models/CalendarItem";
import {
  advanceViewDate,
  anchorViewDate,
  type CalendarView,
  formatViewLabel,
  getViewDays,
  viewRules,
} from "@/features/calendar/models/CalendarViewConfig";
import { calendarItemRepository } from "@/features/calendar/repository/CalendarItemRepository";
import { projectCalendarDays } from "@/features/calendar/view-models/calendarDays";

const emptyItems: CalendarItem[] = [];

export function useCalendarController() {
  const [today, setToday] = useState<Date | null>(null);
  const [anchorDate, setAnchorDate] = useState<Date | null>(null);
  const [view, setView] = useState<CalendarView>("month");
  const [scrollReset, setScrollReset] = useState(0);
  const [isCreating, setIsCreating] = useState(false);
  const [hasActivatedEditor, setHasActivatedEditor] = useState(false);
  const query = useLiveQuery(async () => {
    try {
      return {
        status: "ready" as const,
        items: await calendarItemRepository.list(),
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

  function openEditor() {
    setHasActivatedEditor(true);
    setIsCreating(true);
  }

  const rules = viewRules[view];
  const days = useMemo(
    () => (anchorDate ? getViewDays(view, anchorDate) : []),
    [view, anchorDate],
  );
  const items = query?.status === "ready" ? query.items : emptyItems;
  const projectedDays = useMemo(
    () => projectCalendarDays(items, days),
    [items, days],
  );
  const rangeLabel = anchorDate
    ? formatViewLabel(view, anchorDate, days)
    : undefined;

  return {
    view,
    today,
    anchorDate,
    projectedDays,
    rangeLabel,
    layout: rules.layout,
    scrollReset,
    isCreating,
    hasActivatedEditor,
    queryStatus: query?.status ?? "loading",
    hasRecurringItems: items.some((item) => item.recurrence),
    navigate,
    goToToday,
    changeView,
    openEditor,
    setIsCreating,
    createItem: calendarItemRepository.create,
    deleteItem: calendarItemRepository.delete,
  };
}
