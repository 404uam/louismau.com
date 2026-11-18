import { Dexie, type Table } from "dexie";
import type { CalendarItem } from "../types/CalendarItem";
import { CalendarItemHandler } from "./CalendarItemHandler";

const db = new Dexie("CalendarDatabase") as Dexie & {
  calendarItems: Table<CalendarItem, string>;
};

db.version(2).stores({
  events: null,
  tasks: null,
  calendarItems: "id, type, startAt",
});

const calendarItemHandler = new CalendarItemHandler(db.calendarItems);

export type { CalendarItem, Event, Task } from "../types/CalendarItem";
export { calendarItemHandler, db };
