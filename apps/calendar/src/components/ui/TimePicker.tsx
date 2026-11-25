"use client";

import { RiTimeLine } from "@remixicon/react";
import { useState } from "react";
import { Dialog, DialogTrigger, Popover } from "react-aria-components";
import { Button } from "@/components/ui/Button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/InputGroup";

const timeOptions = Array.from({ length: 48 }, (_, index) => {
  const hour = Math.floor(index / 2);
  const minute = index % 2 === 0 ? "00" : "30";
  return {
    value: `${String(hour).padStart(2, "0")}:${minute}`,
    label: new Date(2000, 0, 1, hour, Number(minute)).toLocaleTimeString(
      undefined,
      { hour: "numeric", minute: "2-digit" },
    ),
  };
});

export function TimePicker({
  id,
  value,
  onChange,
  disabled,
  ariaInvalid,
  ariaLabel,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  ariaInvalid?: boolean;
  ariaLabel?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  function selectTime(nextTime: string) {
    onChange(nextTime);
    setIsOpen(false);
  }

  return (
    <InputGroup isDisabled={disabled} className="h-9 min-w-0 rounded-xl">
      <InputGroupInput
        id={id}
        type="time"
        aria-label={ariaLabel ? `${ariaLabel} time` : undefined}
        aria-invalid={ariaInvalid}
        disabled={disabled}
        value={value}
        step={60}
        onChange={(event) => selectTime(event.target.value)}
        className="h-full min-w-0 px-2 text-xs shadow-xs"
      />
      <InputGroupAddon align="inline-end">
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
          <InputGroupButton
            size="icon-sm"
            aria-label={
              ariaLabel
                ? `Choose ${ariaLabel.toLowerCase()} time`
                : "Choose time"
            }
            isDisabled={disabled}
          >
            <RiTimeLine aria-hidden="true" />
          </InputGroupButton>
          <Popover
            placement="bottom end"
            offset={8}
            className="isolate z-50 rounded-xl border border-border/60 bg-popover text-popover-foreground shadow-lg outline-none"
          >
            <Dialog
              aria-label={
                ariaLabel
                  ? `Choose ${ariaLabel.toLowerCase()} time`
                  : "Choose a time"
              }
              className="p-2 outline-none"
            >
              <div className="grid max-h-64 w-56 grid-cols-3 gap-1 overflow-y-auto">
                {timeOptions.map((option) => (
                  <Button
                    key={option.value}
                    type="button"
                    size="sm"
                    variant={value === option.value ? "secondary" : "ghost"}
                    onPress={() => selectTime(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </Dialog>
          </Popover>
        </DialogTrigger>
      </InputGroupAddon>
    </InputGroup>
  );
}
