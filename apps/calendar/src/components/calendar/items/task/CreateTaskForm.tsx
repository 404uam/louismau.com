"use client";

import { type SubmitEvent, useState } from "react";
import {
  CreateFormLayout,
  DetailFields,
  TitleField,
} from "@/components/calendar/items/CreateFormFields";
import { DateTimePicker } from "@/components/ui/DateTimePicker";
import { Field, FieldError, FieldLabel } from "@/components/ui/Field";
import {
  buildTask,
  type CommonFormValues,
  type TaskFormErrors,
  type TaskFormValues,
  toLocalInputValue,
  validateTaskForm,
} from "@/lib/calendar/BuildCalendarItem";
import type { Task } from "@/types/CalendarItem";

export function CreateTaskForm({
  common,
  onCommonChange,
  onCreate,
  isSubmitting,
  creationError,
}: {
  common: CommonFormValues;
  onCommonChange: (values: Partial<CommonFormValues>) => void;
  onCreate: (task: Task) => Promise<void>;
  isSubmitting: boolean;
  creationError?: string;
}) {
  const [startAt, setStartAt] = useState(() => toLocalInputValue(new Date()));
  const [dueAt, setDueAt] = useState("");
  const [errors, setErrors] = useState<TaskFormErrors>({});

  async function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const values: TaskFormValues = { ...common, startAt, dueAt };
    const nextErrors = validateTaskForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    await onCreate(buildTask(values));
  }

  return (
    <CreateFormLayout
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
    </CreateFormLayout>
  );
}
