"use client";

import { RiCheckLine } from "@remixicon/react";
import { cn } from "cn";
import {
  CheckboxButton,
  type CheckboxButtonProps,
  CheckboxField,
  type CheckboxFieldProps,
  composeRenderProps,
} from "react-aria-components";

type CheckboxProps = Omit<CheckboxFieldProps, "children" | "className"> &
  Pick<
    CheckboxButtonProps,
    "children" | "className" | "onHoverStart" | "onHoverEnd" | "onHoverChange"
  >;

function Checkbox({
  className,
  children,
  onHoverStart,
  onHoverEnd,
  onHoverChange,
  ...props
}: CheckboxProps) {
  return (
    <CheckboxField {...props}>
      <CheckboxButton
        data-slot="checkbox"
        className={cn("peer checkbox-control", className)}
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
        onHoverChange={onHoverChange}
      >
        {composeRenderProps(
          children,
          (children, { isSelected, isIndeterminate }) => (
            <>
              <span
                data-slot="checkbox-indicator"
                className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
              >
                {(isSelected || isIndeterminate) && <RiCheckLine />}
              </span>
              {children}
            </>
          ),
        )}
      </CheckboxButton>
    </CheckboxField>
  );
}

export { Checkbox };
