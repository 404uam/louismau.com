"use client";

import type { ReactNode, SubmitEvent } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import type { CommonFormValues } from "@/lib/calendar/build-calendar-item";

export function CreateFormLayout({
  onSubmit,
  children,
}: {
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
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
      </div>
      <SheetFooter className="flex-row justify-end border-t">
        <SheetClose>Cancel</SheetClose>
        <Button type="submit">Create</Button>
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
  values: CommonFormValues;
  onChange: (values: Partial<CommonFormValues>) => void;
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
              ) as CommonFormValues["reminderMinutes"],
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
