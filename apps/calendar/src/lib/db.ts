import { Dexie, type Table } from "dexie";
import type { CalendarItem } from "../types/calendar-item";

const db = new Dexie("CalendarDatabase") as Dexie & {
  calendarItems: Table<CalendarItem, string>;
};

db.version(2).stores({
  events: null,
  tasks: null,
  calendarItems: "id, type, startAt",
});

export type { CalendarItem, Event, Task } from "../types/calendar-item";
export { db };
