"use client";

import type { ReactNode } from "react";
import { Dialog, DialogTrigger, Heading, Popover } from "react-aria-components";
import { Button } from "@/components/ui/Button";
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
              <Button variant="outline" size="sm" onPress={close}>
                Close
              </Button>
            </>
          )}
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
