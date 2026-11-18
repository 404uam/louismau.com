"use client";

import { AnimateIcon } from "@animate-ui/react/icons";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { CalendarPlus } from "@/components/animate-ui/icons/CalendarPlus";
import { Button } from "@/components/ui/Button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/ToggleGroup";
import {
  type CalendarView,
  viewRules,
  views,
} from "@/lib/calendar/CalendarView";

export function CalendarToolbar({
  view,
  rangeLabel,
  isDisabled,
  onChangeView,
  onToday,
  onNavigate,
  onNew,
}: {
  view: CalendarView;
  rangeLabel: string | undefined;
  isDisabled: boolean;
  onChangeView: (view: CalendarView) => void;
  onToday: () => void;
  onNavigate: (offset: number) => void;
  onNew: () => void;
}) {
  const { heading, navigationUnit } = viewRules[view];

  return (
    <div className="calendar-toolbar">
      <div>
        <p className="section-label">{heading} VIEW</p>
        <h1 aria-live="polite">{rangeLabel ?? "Calendar"}</h1>
      </div>
      <div className="calendar-controls">
        <AnimateIcon animateOnHover animateOnTap className="inline-flex">
          <Button size="lg" onPress={onNew}>
            <CalendarPlus aria-hidden="true" />
            New Item
          </Button>
        </AnimateIcon>
        <ToggleGroup
          aria-label="Calendar view"
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={[view]}
          onSelectionChange={(keys) => {
            const next = views.find((value) => keys.has(value));
            if (next) onChangeView(next);
          }}
          variant="outline"
          size="lg"
          spacing={0}
          isDisabled={isDisabled}
        >
          {views.map((value) => (
            <ToggleGroupItem key={value} id={value}>
              {viewRules[value].label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <Button variant="outline" size="lg" onPress={onToday}>
          Today
        </Button>
        <div className="month-controls">
          <span title={`Previous ${navigationUnit}`}>
            <Button
              variant="outline"
              size="icon-lg"
              aria-label={`Previous ${navigationUnit}`}
              isDisabled={isDisabled}
              onPress={() => onNavigate(-1)}
            >
              <RiArrowLeftSLine aria-hidden="true" />
            </Button>
          </span>
          <span title={`Next ${navigationUnit}`}>
            <Button
              variant="outline"
              size="icon-lg"
              aria-label={`Next ${navigationUnit}`}
              isDisabled={isDisabled}
              onPress={() => onNavigate(1)}
            >
              <RiArrowRightSLine aria-hidden="true" />
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
}
