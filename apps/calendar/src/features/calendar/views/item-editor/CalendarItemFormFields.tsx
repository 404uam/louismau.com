"use client";

import type { ReactNode, SubmitEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field, FieldError, FieldLabel } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { SheetClose, SheetFooter } from "@/components/ui/Sheet";
import { Textarea } from "@/components/ui/Textarea";
import type { CommonCalendarItemDraft } from "@/features/calendar/models/CalendarItemFactory";

export function CalendarItemFormLayout({
  onSubmit,
  isSubmitting = false,
  creationError,
  children,
}: {
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
  isSubmitting?: boolean;
  creationError?: string;
  children: ReactNode;
}) {
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex min-h-0 flex-1 flex-col"
    >
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-6 pb-6">
        {children}
        {creationError && (
          <p role="alert" className="text-sm text-destructive">
            {creationError}
          </p>
        )}
      </div>
      <SheetFooter className="flex-row justify-end border-t">
        <SheetClose isDisabled={isSubmitting}>Cancel</SheetClose>
        <Button type="submit" isDisabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create"}
        </Button>
      </SheetFooter>
    </form>
  );
}

export function TitleField({
  value,
  error,
  onChange,
}: {
  value: string;
  error: string | undefined;
  onChange: (value: string) => void;
}) {
  return (
    <Field>
      <FieldLabel htmlFor="item-title">Title</FieldLabel>
      <Input
        id="item-title"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        autoFocus
      />
      <FieldError>{error}</FieldError>
    </Field>
  );
}

export function DetailFields({
  values,
  onChange,
}: {
  values: CommonCalendarItemDraft;
  onChange: (values: Partial<CommonCalendarItemDraft>) => void;
}) {
  return (
    <>
      <Field>
        <FieldLabel htmlFor="item-location">Location (optional)</FieldLabel>
        <Input
          id="item-location"
          value={values.location}
          onChange={(event) => onChange({ location: event.target.value })}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="item-description">
          Description (optional)
        </FieldLabel>
        <Textarea
          id="item-description"
          value={values.description}
          onChange={(event) => onChange({ description: event.target.value })}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="item-tags">
          Tags (optional, comma-separated)
        </FieldLabel>
        <Input
          id="item-tags"
          value={values.tags}
          onChange={(event) => onChange({ tags: event.target.value })}
        />
      </Field>

      <Field>
        <FieldLabel>Reminder</FieldLabel>
        <Select
          aria-label="Reminder"
          className="w-full"
          value={values.reminderMinutes}
          onChange={(key) =>
            onChange({
              reminderMinutes: String(
                key,
              ) as CommonCalendarItemDraft["reminderMinutes"],
            })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem id="none">None</SelectItem>
            <SelectItem id="5">5 minutes before start</SelectItem>
            <SelectItem id="10">10 minutes before start</SelectItem>
            <SelectItem id="30">30 minutes before start</SelectItem>
          </SelectContent>
        </Select>
      </Field>
    </>
  );
}
