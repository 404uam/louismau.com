import type { Table } from "dexie";
import type { CalendarItem } from "@/features/calendar/models/CalendarItem";
import { calendarDatabase } from "@/features/calendar/repository/CalendarDatabase";

export class CalendarItemRepository {
  constructor(private readonly table: Table<CalendarItem, string>) {}

  readonly list = async () => this.table.toArray();

  readonly create = async (item: CalendarItem) => {
    await this.table.add(item);
  };

  readonly delete = async (id: string) => {
    await this.table.delete(id);
  };
}

export const calendarItemRepository = new CalendarItemRepository(
  calendarDatabase.calendarItems,
);
