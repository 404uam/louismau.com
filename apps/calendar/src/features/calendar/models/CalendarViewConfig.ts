export type CalendarView = (typeof views)[number];

type ViewRules = {
  anchor: "month" | "week" | "day";
  navigation: { unit: "month" | "day"; amount: number };
  range: { start: "week" | "anchor"; length: number };
  layout: "month" | "time";
  heading: string;
  label: string;
  navigationUnit: string;
};

export const views = ["month", "week", "3-day", "day"] as const;

export const viewRules = {
  month: {
    anchor: "month",
    navigation: { unit: "month", amount: 1 },
    range: { start: "week", length: 42 },
    layout: "month",
    heading: "MONTHLY",
    label: "Month",
    navigationUnit: "month",
  },
  week: {
    anchor: "week",
    navigation: { unit: "day", amount: 7 },
    range: { start: "anchor", length: 7 },
    layout: "time",
    heading: "WEEK",
    label: "Week",
    navigationUnit: "week",
  },
  "3-day": {
    anchor: "day",
    navigation: { unit: "day", amount: 3 },
    range: { start: "anchor", length: 3 },
    layout: "time",
    heading: "3-DAY",
    label: "3-day",
    navigationUnit: "3 days",
  },
  day: {
    anchor: "day",
    navigation: { unit: "day", amount: 1 },
    range: { start: "anchor", length: 1 },
    layout: "time",
    heading: "DAY",
    label: "Day",
    navigationUnit: "day",
  },
} satisfies Record<CalendarView, ViewRules>;

function startOfWeek(date: Date): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - date.getDay(),
  );
}

export function anchorViewDate(view: CalendarView, date: Date): Date {
  const { anchor } = viewRules[view];
  switch (anchor) {
    case "month":
      return new Date(date.getFullYear(), date.getMonth(), 1);
    case "week":
      return startOfWeek(date);
    case "day":
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
}

export function advanceViewDate(
  view: CalendarView,
  date: Date,
  offset: number,
): Date {
  const { unit, amount } = viewRules[view].navigation;
  switch (unit) {
    case "month":
      return new Date(date.getFullYear(), date.getMonth() + offset * amount, 1);
    case "day":
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + offset * amount,
      );
  }
}

export function getViewDays(view: CalendarView, anchorDate: Date): Date[] {
  const { start, length } = viewRules[view].range;
  let firstDay: Date;
  switch (start) {
    case "week":
      firstDay = startOfWeek(anchorDate);
      break;
    case "anchor":
      firstDay = anchorDate;
      break;
  }
  return Array.from(
    { length },
    (_, index) =>
      new Date(
        firstDay.getFullYear(),
        firstDay.getMonth(),
        firstDay.getDate() + index,
      ),
  );
}

export function formatViewLabel(
  view: CalendarView,
  anchorDate: Date,
  days: Date[],
): string {
  switch (viewRules[view].layout) {
    case "month":
      return anchorDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    case "time":
      return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).formatRange(days[0], days[days.length - 1]);
  }
}
