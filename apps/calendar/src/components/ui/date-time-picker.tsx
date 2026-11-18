"use client";

import { cn } from "cn";
import { DatePicker, toCalendarDate } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";

export function DateTimePicker({
  id,
  value,
  onChange,
  includeTime = true,
  placeholder = "Pick a date",
  ariaInvalid,
  ariaLabel,
  minDate,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  includeTime?: boolean;
  placeholder?: string;
  ariaInvalid?: boolean;
  ariaLabel?: string;
  minDate?: string;
}) {
  const selectedDate = toCalendarDate(value);
  const time = value.includes("T") ? value.slice(11, 16) : "";

  function selectDate(nextDate: string) {
    onChange(includeTime ? `${nextDate}T${time || "00:00"}` : nextDate);
  }

  function selectTime(nextTime: string) {
    if (!selectedDate) return;
    onChange(`${selectedDate.toString()}T${nextTime}`);
  }

  return (
    <div
      className={cn(
        "grid w-full gap-2",
        includeTime && "grid-cols-[minmax(0,1fr)_9.5rem]",
      )}
    >
      <DatePicker
        id={id}
        value={value}
        onChange={selectDate}
        placeholder={placeholder}
        ariaInvalid={ariaInvalid}
        ariaLabel={ariaLabel}
        minDate={minDate}
      />
      {includeTime ? (
        <TimePicker
          id={`${id}-time`}
          value={time}
          onChange={selectTime}
          disabled={!selectedDate}
          ariaInvalid={ariaInvalid}
          ariaLabel={ariaLabel}
        />
      ) : null}
    </div>
  );
}
