import type { Table } from "dexie";
import type { CalendarItem } from "@/types/CalendarItem";

export class CalendarItemHandler {
  constructor(private readonly table: Table<CalendarItem, string>) {}

  readonly handleCreation = async (item: CalendarItem) => {
    await this.table.add(item);
  };

  readonly handleDeletion = async (id: string) => {
    await this.table.delete(id);
  };
}
