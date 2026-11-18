"use client";

import { CalendarDate } from "@internationalized/date";
import {
  RiArrowDownSLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiCalendarLine,
  RiTimeLine,
} from "@remixicon/react";
import { cn } from "cn";
import { useState } from "react";
import {
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarHeading,
  Dialog,
  DialogTrigger,
  Popover,
} from "react-aria-components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function toCalendarDate(value: string) {
  const date = value.split("T")[0];
  const [year, month, day] = date.split("-").map(Number);
  return year && month && day ? new CalendarDate(year, month, day) : undefined;
}

function formatDate(value: string) {
  const date = toCalendarDate(value);
  if (!date) return undefined;

  return new Date(date.year, date.month - 1, date.day).toLocaleDateString(
    undefined,
    { day: "2-digit", month: "short", year: "numeric" },
  );
}

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
  const [isOpen, setIsOpen] = useState(false);
  const selectedDate = toCalendarDate(value);
  const time = value.includes("T") ? value.slice(11, 16) : "";
  const displayDate = formatDate(value);

  function selectDate(date: CalendarDate | null) {
    if (!date) return;
    onChange(
      includeTime ? `${date.toString()}T${time || "00:00"}` : date.toString(),
    );
    setIsOpen(false);
  }

  return (
    <div
      className={cn("grid w-full gap-2", includeTime && "grid-cols-[1fr_7rem]")}
    >
      <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
        <Button
          id={id}
          type="button"
          variant="outline"
          aria-label={ariaLabel ? `${ariaLabel} date` : undefined}
          aria-invalid={ariaInvalid}
          className={cn(
            "h-9 w-full justify-between rounded-xl px-3 text-xs font-normal shadow-xs",
            displayDate ? "text-foreground" : "text-muted-foreground",
          )}
        >
          <span className="flex min-w-0 items-center gap-2 truncate">
            <RiCalendarLine
              aria-hidden="true"
              className="size-3.5 shrink-0 text-primary-foreground/80"
            />
            <span className="truncate">{displayDate ?? placeholder}</span>
          </span>
          <RiArrowDownSLine
            aria-hidden="true"
            className="size-3.5 text-muted-foreground"
          />
        </Button>
        <Popover
          placement="bottom start"
          offset={8}
          className="isolate z-50 rounded-xl border border-border/60 bg-popover text-popover-foreground shadow-lg outline-none data-entering:animate-in data-entering:fade-in-0 data-entering:zoom-in-95 data-exiting:animate-out data-exiting:fade-out-0 data-exiting:zoom-out-95"
        >
          <Dialog
            aria-label={ariaLabel ? `${ariaLabel} calendar` : "Choose a date"}
            className="p-2 outline-none"
          >
            <Calendar
              value={selectedDate ?? null}
              minValue={toCalendarDate(minDate ?? "")}
              onChange={selectDate}
              className="w-64"
            >
              <header className="mb-1 flex h-8 items-center justify-between">
                <Button
                  slot="previous"
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Previous month"
                >
                  <RiArrowLeftSLine aria-hidden="true" />
                </Button>
                <CalendarHeading className="text-xs font-semibold" />
                <Button
                  slot="next"
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Next month"
                >
                  <RiArrowRightSLine aria-hidden="true" />
                </Button>
              </header>
              <CalendarGrid className="w-full border-separate border-spacing-0.5">
                {(date) => (
                  <CalendarCell
                    date={date}
                    className={cn(
                      "flex size-8 items-center justify-center rounded-lg text-xs outline-none",
                      "transition-colors data-hovered:bg-accent data-hovered:text-accent-foreground",
                      "data-selected:bg-primary data-selected:font-semibold data-selected:text-primary-foreground",
                      "data-today:font-semibold data-today:not-data-selected:ring-1 data-today:not-data-selected:ring-primary",
                      "data-focused:ring-2 data-focused:ring-ring/50",
                      "data-outside-month:invisible data-disabled:pointer-events-none data-disabled:opacity-30",
                    )}
                  >
                    {({ formattedDate }) => formattedDate}
                  </CalendarCell>
                )}
              </CalendarGrid>
            </Calendar>
          </Dialog>
        </Popover>
      </DialogTrigger>

      {includeTime ? (
        <div className="relative">
          <RiTimeLine
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-2.5 z-10 size-3.5 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="time"
            aria-label={ariaLabel ? `${ariaLabel} time` : undefined}
            aria-invalid={ariaInvalid}
            disabled={!selectedDate}
            value={time}
            onChange={(event) => {
              if (!selectedDate) return;
              onChange(`${selectedDate.toString()}T${event.target.value}`);
            }}
            className="h-9 rounded-xl pr-2 pl-8 text-xs shadow-xs"
          />
        </div>
      ) : null}
    </div>
  );
}
