"use client";

import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

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

  useEffect(() => {
    const now = new Date();
    setToday(now);
    setMonth(new Date(now.getFullYear(), now.getMonth(), 1));
  }, []);

  function changeMonth(offset: number) {
    setMonth((current) =>
      current
        ? new Date(current.getFullYear(), current.getMonth() + offset, 1)
        : current,
    );
  }

  function goToToday() {
    const now = new Date();
    setToday(now);
    setMonth(new Date(now.getFullYear(), now.getMonth(), 1));
  }

  const days = month
    ? Array.from(
        { length: 35 },
        (_, index) =>
          new Date(
            month.getFullYear(),
            month.getMonth(),
            1 - month.getDay() + index,
          ),
      )
    : [];
  const monthLabel = month?.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <main className="calendar-app">
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            C
          </span>
          <span>Calendar</span>
        </div>
      </header>

      <section className="calendar-content" aria-label="Calendar">
        <div className="calendar-toolbar">
          <div>
            <p className="section-label">MONTHLY VIEW</p>
            <h1 aria-live="polite">{monthLabel ?? "Calendar"}</h1>
          </div>
          <div className="calendar-controls">
            <Button variant="outline" size="lg" onPress={goToToday}>
              Today
            </Button>
            <div className="month-controls">
              <span title="Previous month">
                <Button
                  variant="outline"
                  size="icon-lg"
                  aria-label="Previous month"
                  isDisabled={!month}
                  onPress={() => changeMonth(-1)}
                >
                  <RiArrowLeftSLine aria-hidden="true" />
                </Button>
              </span>
              <span title="Next month">
                <Button
                  variant="outline"
                  size="icon-lg"
                  aria-label="Next month"
                  isDisabled={!month}
                  onPress={() => changeMonth(1)}
                >
                  <RiArrowRightSLine aria-hidden="true" />
                </Button>
              </span>
            </div>
          </div>
        </div>

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
      </section>
    </main>
  );
}
