"use client";

import { type SubmitEvent, useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/Checkbox";
import { DateTimePicker } from "@/components/ui/DateTimePicker";
import { Field, FieldError, FieldLabel } from "@/components/ui/Field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  type EventFormErrors,
  validateEventDraft,
} from "@/features/calendar/controllers/calendarItemForm";
import type { Event } from "@/features/calendar/models/CalendarItem";
import {
  buildEvent,
  type CommonCalendarItemDraft,
  type EventDraft,
} from "@/features/calendar/models/CalendarItemFactory";
import { getViewerTimeZone } from "@/features/calendar/models/ZonedTime";
import {
  CalendarItemFormLayout,
  DetailFields,
  TitleField,
} from "@/features/calendar/views/item-editor/CalendarItemFormFields";

const CREATION_TIMEZONE = "creation";

export function EventForm({
  common,
  onCommonChange,
  onCreate,
  isSubmitting,
  creationError,
}: {
  common: CommonCalendarItemDraft;
  onCommonChange: (values: Partial<CommonCalendarItemDraft>) => void;
  onCreate: (event: Event) => Promise<void>;
  isSubmitting: boolean;
  creationError?: string;
}) {
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [allDay, setAllDay] = useState(false);
  const [timeZone, setTimeZone] = useState<string | undefined>();
  const [errors, setErrors] = useState<EventFormErrors>({});
  const viewerTimeZone = useMemo(() => getViewerTimeZone(), []);
  const timeZones = useMemo(() => Intl.supportedValuesOf("timeZone"), []);

  function changeAllDay(next: boolean) {
    setAllDay(next);
    setStartAt((current) =>
      next ? current.slice(0, 10) : current && `${current}T00:00`,
    );
    setEndAt((current) =>
      next ? current.slice(0, 10) : current && `${current}T23:59`,
    );
  }

  async function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const values: EventDraft = {
      ...common,
      startAt,
      endAt,
      allDay,
      timeZone,
    };
    const nextErrors = validateEventDraft(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    await onCreate(buildEvent(values));
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

      <Field orientation="horizontal">
        <Checkbox
          aria-label="All-day"
          isSelected={allDay}
          onChange={changeAllDay}
        />
        <span aria-hidden="true" className="text-xs/relaxed font-medium">
          All-day
        </span>
      </Field>

      <Field>
        <FieldLabel htmlFor="item-start">Starts</FieldLabel>
        <DateTimePicker
          id="item-start"
          value={startAt}
          onChange={setStartAt}
          includeTime={!allDay}
          ariaInvalid={Boolean(errors.startAt)}
          ariaLabel="Starts"
        />
        <FieldError>{errors.startAt}</FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor="item-end">Ends</FieldLabel>
        <DateTimePicker
          id="item-end"
          value={endAt}
          onChange={setEndAt}
          includeTime={!allDay}
          minDate={startAt}
          ariaInvalid={Boolean(errors.endAt)}
          ariaLabel="Ends"
        />
        <FieldError>{errors.endAt}</FieldError>
      </Field>

      <Field>
        <FieldLabel>Timezone</FieldLabel>
        <Select
          aria-label="Timezone"
          className="w-full"
          value={timeZone ?? CREATION_TIMEZONE}
          onChange={(key) =>
            setTimeZone(key === CREATION_TIMEZONE ? undefined : String(key))
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem id={CREATION_TIMEZONE}>
              {`Your timezone (${viewerTimeZone})`}
            </SelectItem>
            {timeZones.map((zone) => (
              <SelectItem key={zone} id={zone}>
                {zone}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <DetailFields values={common} onChange={onCommonChange} />
    </CalendarItemFormLayout>
  );
}
