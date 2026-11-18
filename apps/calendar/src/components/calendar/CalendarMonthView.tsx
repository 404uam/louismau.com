"use client";

import { Dialog, DialogTrigger, Heading, Popover } from "react-aria-components";
import { CalendarItemView } from "@/components/calendar/items/CalendarItemView";
import { Button } from "@/components/ui/Button";
import { type CalendarDay, dateKey } from "@/lib/calendar/CalendarProjection";

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const monthItemLimit = 2;

export function CalendarMonthView({
  days,
  today,
  anchorDate,
}: {
  days: CalendarDay[];
  today: Date | null;
  anchorDate: Date | null;
}) {
  const monthLabel = anchorDate?.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="calendar-table-wrap">
      <table className="calendar-table" aria-label={monthLabel ?? "Calendar"}>
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
              <tr key={week[0].key}>
                {week.map(({ date, key, allDayEvents, timedEvents, tasks }) => {
                  const isToday = today && key === dateKey(today);
                  const dayItems = [...allDayEvents, ...timedEvents, ...tasks];
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
                        {dayItems.slice(0, monthItemLimit).map((item) => (
                          <CalendarItemView key={item.id} item={item} />
                        ))}
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
                                      {date.toLocaleDateString("en-US", {
                                        dateStyle: "full",
                                      })}
                                    </Heading>
                                    {hiddenItems.map((item) => (
                                      <CalendarItemView
                                        key={item.id}
                                        item={item}
                                      />
                                    ))}
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
                })}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
