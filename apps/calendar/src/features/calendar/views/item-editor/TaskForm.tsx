"use client";

import { type SubmitEvent, useState } from "react";
import { DateTimePicker } from "@/components/ui/DateTimePicker";
import { Field, FieldError, FieldLabel } from "@/components/ui/Field";
import {
  type TaskFormErrors,
  toLocalInputValue,
  validateTaskDraft,
} from "@/features/calendar/controllers/calendarItemForm";
import type { Task } from "@/features/calendar/models/CalendarItem";
import {
  buildTask,
  type CommonCalendarItemDraft,
  type TaskDraft,
} from "@/features/calendar/models/CalendarItemFactory";
import {
  CalendarItemFormLayout,
  DetailFields,
  TitleField,
} from "@/features/calendar/views/item-editor/CalendarItemFormFields";

export function TaskForm({
  common,
  onCommonChange,
  onCreate,
  isSubmitting,
  creationError,
}: {
  common: CommonCalendarItemDraft;
  onCommonChange: (values: Partial<CommonCalendarItemDraft>) => void;
  onCreate: (task: Task) => Promise<void>;
  isSubmitting: boolean;
  creationError?: string;
}) {
  const [startAt, setStartAt] = useState(() => toLocalInputValue(new Date()));
  const [dueAt, setDueAt] = useState("");
  const [errors, setErrors] = useState<TaskFormErrors>({});

  async function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const values: TaskDraft = { ...common, startAt, dueAt };
    const nextErrors = validateTaskDraft(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    await onCreate(buildTask(values));
  }

  return (
    <CalendarItemFormLayout
      onSubmit={submit}
      isSubmitting={isSubmitting}
      creationError={creationError}
    >
      <TitleField
        value={common.title}
        error={errors.title}
        onChange={(title) => onCommonChange({ title })}
      />

      <Field>
        <FieldLabel htmlFor="item-start">Start</FieldLabel>
        <DateTimePicker
          id="item-start"
          value={startAt}
          onChange={setStartAt}
          ariaInvalid={Boolean(errors.startAt)}
          ariaLabel="Start"
        />
        <FieldError>{errors.startAt}</FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor="item-due">Due (optional)</FieldLabel>
        <DateTimePicker
          id="item-due"
          value={dueAt}
          onChange={setDueAt}
          ariaLabel="Due"
        />
      </Field>

      <DetailFields values={common} onChange={onCommonChange} />
    </CalendarItemFormLayout>
  );
}
