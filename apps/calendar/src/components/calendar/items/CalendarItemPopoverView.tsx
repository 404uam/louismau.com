"use client";

import { type ReactNode, useState } from "react";
import { Dialog, DialogTrigger, Heading, Popover } from "react-aria-components";
import { Button } from "@/components/ui/Button";
import { calendarItemHandler } from "@/lib/Db";
import type { CalendarItem } from "@/types/CalendarItem";

export type CalendarItemLayout = "row" | "block";

export function CalendarItemPopover({
  item,
  layout,
  variant,
  accessibleLabel,
  typeLabel,
  renderDetails,
  children,
}: {
  item: CalendarItem;
  layout: CalendarItemLayout;
  variant: "calendar-event" | "calendar-task";
  accessibleLabel: string;
  typeLabel: string;
  renderDetails: () => ReactNode;
  children: ReactNode;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletionError, setDeletionError] = useState<string>();

  return (
    <DialogTrigger>
      <Button
        variant={variant}
        size={layout === "block" ? "calendar-block" : "calendar-row"}
        aria-label={accessibleLabel}
      >
        {children}
      </Button>
      <Popover className="calendar-popover">
        <Dialog className="calendar-popover-content">
          {({ close }) => (
            <>
              <Heading slot="title" className="calendar-popover-title">
                {item.title}
              </Heading>
              <p>{typeLabel}</p>
              {renderDetails()}
              {item.description ? <p>{item.description}</p> : null}
              {item.location ? <p>{item.location}</p> : null}
              {deletionError ? (
                <p role="alert" className="text-sm text-destructive">
                  {deletionError}
                </p>
              ) : null}
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  isDisabled={isDeleting}
                  onPress={async () => {
                    if (await submitDeletion()) close();
                  }}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  isDisabled={isDeleting}
                  onPress={close}
                >
                  Close
                </Button>
              </div>
            </>
          )}
        </Dialog>
      </Popover>
    </DialogTrigger>
  );

  async function submitDeletion() {
    if (isDeleting) return false;

    setIsDeleting(true);
    setDeletionError(undefined);
    try {
      await calendarItemHandler.handleDeletion(item.id);
      return true;
    } catch (error) {
      console.error("Could not delete calendar item:", error);
      setDeletionError(
        "The item could not be deleted. Please check your storage settings and try again.",
      );
      return false;
    } finally {
      setIsDeleting(false);
    }
  }
}
