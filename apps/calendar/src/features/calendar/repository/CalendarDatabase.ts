import { Dexie, type Table } from "dexie";
import type { CalendarItem } from "@/features/calendar/models/CalendarItem";

type CalendarDatabase = Dexie & {
  calendarItems: Table<CalendarItem, string>;
};

export const calendarDatabase = new Dexie(
  "CalendarDatabase",
) as CalendarDatabase;

calendarDatabase.version(2).stores({
  events: null,
  tasks: null,
  calendarItems: "id, type, startAt",
});
