"use client";

import { type ComponentType, useState } from "react";
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

type ItemTypeConfig = {
  label: string;
  title: string;
  Form: ComponentType<{
    common: CommonFormValues;
    onCommonChange: (values: Partial<CommonFormValues>) => void;
    onCreate: (item: CalendarItem) => void;
  }>;
};

const itemTypes = {
  event: {
    label: "Event",
    title: "New event",
    Form: CreateEventForm,
  },
  task: {
    label: "Task",
    title: "New task",
    Form: CreateTaskForm,
  },
} satisfies Record<ItemType, ItemTypeConfig>;

function isItemType(value: unknown): value is ItemType {
  return typeof value === "string" && value in itemTypes;
}

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
  const { title, Form } = itemTypes[type];

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
        <SheetTitle>{title}</SheetTitle>
        <ToggleGroup
          aria-label="Item type"
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={[type]}
          onSelectionChange={(keys) => {
            const next = Array.from(keys).find(isItemType);
            if (next) setType(next);
          }}
          variant="outline"
          size="lg"
          spacing={0}
          className="mt-2"
        >
          {Object.entries(itemTypes).map(([value, config]) => (
            <ToggleGroupItem key={value} id={value}>
              {config.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </SheetHeader>

      <Form common={common} onCommonChange={updateCommon} onCreate={create} />
    </>
  );
}
