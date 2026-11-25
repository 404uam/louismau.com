"use client";

import { type ComponentType, useState } from "react";
import { Sheet, SheetHeader, SheetTitle } from "@/components/ui/Sheet";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/ToggleGroup";
import { createCommonDraft } from "@/features/calendar/controllers/calendarItemForm";
import type { CalendarItem } from "@/features/calendar/models/CalendarItem";
import type { CommonCalendarItemDraft } from "@/features/calendar/models/CalendarItemFactory";
import { EventForm } from "@/features/calendar/views/item-editor/EventForm";
import { TaskForm } from "@/features/calendar/views/item-editor/TaskForm";

type ItemType = CalendarItem["type"];

type ItemTypeConfig = {
  label: string;
  title: string;
  Form: ComponentType<{
    common: CommonCalendarItemDraft;
    onCommonChange: (values: Partial<CommonCalendarItemDraft>) => void;
    onCreate: (item: CalendarItem) => Promise<void>;
    isSubmitting: boolean;
    creationError?: string;
  }>;
};

const itemTypes = {
  event: {
    label: "Event",
    title: "New event",
    Form: EventForm,
  },
  task: {
    label: "Task",
    title: "New task",
    Form: TaskForm,
  },
} satisfies Record<ItemType, ItemTypeConfig>;

function isItemType(value: unknown): value is ItemType {
  return typeof value === "string" && value in itemTypes;
}

export function CalendarItemEditorSheet({
  isOpen,
  onOpenChange,
  onCreate,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onCreate: (item: CalendarItem) => Promise<void>;
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
  onCreate: (item: CalendarItem) => Promise<void>;
  onClose: () => void;
}) {
  const [type, setType] = useState<ItemType>("event");
  const [common, setCommon] =
    useState<CommonCalendarItemDraft>(createCommonDraft);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [creationError, setCreationError] = useState<string>();
  const { title, Form } = itemTypes[type];

  function updateCommon(values: Partial<CommonCalendarItemDraft>) {
    setCommon((current) => ({ ...current, ...values }));
  }

  async function submitCreation(item: CalendarItem) {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setCreationError(undefined);
    try {
      await onCreate(item);
      onClose();
    } catch (error) {
      console.error("Could not create calendar item:", error);
      setCreationError(
        "The item could not be created. Please check your storage settings and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
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

      <Form
        common={common}
        onCommonChange={updateCommon}
        onCreate={submitCreation}
        isSubmitting={isSubmitting}
        creationError={creationError}
      />
    </>
  );
}
