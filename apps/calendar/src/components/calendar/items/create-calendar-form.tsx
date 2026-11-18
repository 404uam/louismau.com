"use client";

import { useState } from "react";
import { CreateEventForm } from "@/components/calendar/items/event/create-event-form";
import { CreateTaskForm } from "@/components/calendar/items/task/create-task-form";
import { Sheet, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  type CommonFormValues,
  createCommonValues,
} from "@/lib/calendar/build-calendar-item";
import type { CalendarItem } from "@/types/calendar-item";

type ItemType = CalendarItem["type"];

const itemTypes: readonly ItemType[] = ["event", "task"];

export function CalendarItemSheet({
  isOpen,
  onOpenChange,
  onCreate,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onCreate?: (item: CalendarItem) => void;
}) {
  return (
    <Sheet isOpen={isOpen} onOpenChange={onOpenChange}>
      {isOpen && (
        <CalendarItemForm
          onCreate={onCreate}
          onClose={() => onOpenChange(false)}
        />
      )}
    </Sheet>
  );
}

function CalendarItemForm({
  onCreate,
  onClose,
}: {
  onCreate?: (item: CalendarItem) => void;
  onClose: () => void;
}) {
  const [type, setType] = useState<ItemType>("event");
  const [common, setCommon] = useState<CommonFormValues>(createCommonValues);

  function updateCommon(values: Partial<CommonFormValues>) {
    setCommon((current) => ({ ...current, ...values }));
  }

  function create(item: CalendarItem) {
    onCreate?.(item);
    onClose();
  }

  return (
    <>
      <SheetHeader>
        <SheetTitle>New {type}</SheetTitle>
        <ToggleGroup
          aria-label="Item type"
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={[type]}
          onSelectionChange={(keys) => {
            const next = itemTypes.find((value) => keys.has(value));
            if (next) setType(next);
          }}
          variant="outline"
          size="lg"
          spacing={0}
          className="mt-2"
        >
          <ToggleGroupItem id="event">Event</ToggleGroupItem>
          <ToggleGroupItem id="task">Task</ToggleGroupItem>
        </ToggleGroup>
      </SheetHeader>

      {type === "event" ? (
        <CreateEventForm
          common={common}
          onCommonChange={updateCommon}
          onCreate={create}
        />
      ) : (
        <CreateTaskForm
          common={common}
          onCommonChange={updateCommon}
          onCreate={create}
        />
      )}
    </>
  );
}
