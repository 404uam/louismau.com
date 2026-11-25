"use client";

import dynamic from "next/dynamic";
import { useCalendarController } from "@/features/calendar/controllers/useCalendarController";
import { CalendarToolbar } from "@/features/calendar/views/CalendarToolbar";
import { MonthView } from "@/features/calendar/views/MonthView";
import { TimeGridView } from "@/features/calendar/views/TimeGridView";
import { cn } from "@/lib/Utils";

const CalendarItemEditorSheet = dynamic(() =>
  import("@/features/calendar/views/item-editor/CalendarItemEditorSheet").then(
    (module) => module.CalendarItemEditorSheet,
  ),
);

export function CalendarApp() {
  const calendar = useCalendarController();

  return (
    <main
      className={cn(
        "calendar-app",
        calendar.layout === "time" && "calendar-app-time",
      )}
    >
      <section className="calendar-content" aria-label="Calendar">
        <CalendarToolbar
          view={calendar.view}
          rangeLabel={calendar.rangeLabel}
          isDisabled={!calendar.anchorDate}
          onChangeView={calendar.changeView}
          onToday={calendar.goToToday}
          onNavigate={calendar.navigate}
          onNew={calendar.openEditor}
        />

        {calendar.queryStatus === "loading" ? (
          <p role="status" className="calendar-notice">
            Loading calendar items...
          </p>
        ) : calendar.queryStatus === "error" ? (
          <p role="alert" className="calendar-notice">
            Calendar items could not be loaded. Please reload and try again.
          </p>
        ) : calendar.hasRecurringItems ? (
          <p role="status" className="calendar-notice">
            Recurring items are not shown yet.
          </p>
        ) : null}

        {calendar.layout === "time" && calendar.today ? (
          <TimeGridView
            days={calendar.projectedDays}
            now={calendar.today}
            scrollReset={calendar.scrollReset}
            label={calendar.rangeLabel ?? "Calendar"}
            onDelete={calendar.deleteItem}
          />
        ) : (
          <MonthView
            days={calendar.projectedDays}
            today={calendar.today}
            anchorDate={calendar.anchorDate}
            onDelete={calendar.deleteItem}
          />
        )}
      </section>
      {calendar.hasActivatedEditor && (
        <CalendarItemEditorSheet
          isOpen={calendar.isCreating}
          onOpenChange={calendar.setIsCreating}
          onCreate={calendar.createItem}
        />
      )}
    </main>
  );
}
