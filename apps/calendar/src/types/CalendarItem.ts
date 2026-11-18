interface CalendarItemFields {
  id: string;
  title: string;
  createdAt: Date;
  startAt: Date;
  creationTimeZone: string;
  description?: string;
  location?: string;
  tags?: string[];
  recurrence?: Recurrence;
  reminder?: RelativeReminder;
}

export interface Recurrence {
  // Calendar dates are stored as YYYY-MM-DD, not as instants.
  startDate: string;
  pattern: unknown;
  endDate?: string;
}

export interface RelativeReminder {
  anchor: "start";
  offsetMinutesBefore: 5 | 10 | 30;
}

export interface Event extends CalendarItemFields {
  type: "event";
  endAt: Date;
  timeZone?: string;
  allDay: boolean;
}

export interface Task extends CalendarItemFields {
  type: "task";
  dueAt?: Date;
  completedAt?: Date;
}

export type CalendarItem = Event | Task;
