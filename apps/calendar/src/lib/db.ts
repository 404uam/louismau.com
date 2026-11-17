// db.ts
import { Dexie, type EntityTable } from "dexie";

interface Event {
  id: number;
  name: string;
  age: number;
}
interface Task {
  id: number;
  name: string;
  age: number;
}

const db = new Dexie("CalendarDatabase") as Dexie & {
  Event: EntityTable<
    Event,
    "id" // primary key "id" (for the typings only)
  >;
  Task: EntityTable<Task, "id">;
};

// Schema declaration:
db.version(1).stores({
  events: "++id, name, age", // primary key "id" (for the runtime!),
  tasks: "++id, name, age",
});

export type { Event, Task };
export { db };
