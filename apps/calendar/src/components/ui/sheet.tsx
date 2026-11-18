"use client";

import { RiCloseLine } from "@remixicon/react";
import { cn } from "cn";
import type * as React from "react";
import {
  Heading,
  ModalOverlay as ModalOverlayPrimitive,
  type ModalOverlayProps as ModalOverlayPrimitiveProps,
  Modal as ModalPrimitive,
  Dialog as SheetPrimitive,
  type DialogProps as SheetPrimitiveProps,
  DialogTrigger as SheetTriggerPrimitive,
  type DialogTriggerProps as SheetTriggerPrimitiveProps,
} from "react-aria-components";
import { Button } from "@/components/ui/button";

function SheetTrigger({ ...props }: SheetTriggerPrimitiveProps) {
  return <SheetTriggerPrimitive data-slot="sheet-trigger" {...props} />;
}

function SheetClose({
  className,
  variant = "outline",
  size = "default",
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      slot="close"
      data-slot="sheet-close"
      variant={variant}
      size={size}
      className={cn(className)}
      {...props}
    />
  );
}

function SheetOverlay({
  className,
  children,
  ...props
}: Omit<ModalOverlayPrimitiveProps, "className" | "children"> & {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <ModalOverlayPrimitive
      data-slot="sheet-overlay"
      isDismissable
      className={cn(
        "fixed inset-0 z-50 bg-black/50 transition-[opacity,filter] duration-200 ease-in-out data-entering:opacity-0 data-entering:backdrop-blur-none data-exiting:opacity-0 data-exiting:backdrop-blur-none supports-backdrop-filter:backdrop-blur-[4px]",
        className,
      )}
      {...props}
    >
      {children}
    </ModalOverlayPrimitive>
  );
}

function Sheet({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: Omit<ModalOverlayPrimitiveProps, "className" | "children"> &
  Pick<React.ComponentProps<typeof ModalPrimitive>, "isDismissable"> & {
    className?: string;
    children: React.ReactNode;
    side?: "top" | "right" | "bottom" | "left";
    showCloseButton?: boolean;
  }) {
  return (
    <SheetOverlay {...props}>
      <ModalPrimitive
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "fixed z-50 flex flex-col gap-4 bg-background bg-clip-padding text-foreground shadow-lg transition duration-300 ease-[cubic-bezier(.22,1,.36,1)] data-entering:opacity-0 data-exiting:opacity-0 data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-[350px] data-[side=bottom]:border-t data-[side=bottom]:data-entering:translate-y-full data-[side=bottom]:data-exiting:translate-y-full data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-full data-[side=left]:border-r data-[side=left]:data-entering:-translate-x-full data-[side=left]:data-exiting:-translate-x-full data-[side=left]:sm:w-[350px] data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-full data-[side=right]:border-l data-[side=right]:data-entering:translate-x-full data-[side=right]:data-exiting:translate-x-full data-[side=right]:sm:w-[350px] data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-[350px] data-[side=top]:border-b data-[side=top]:data-entering:-translate-y-full data-[side=top]:data-exiting:-translate-y-full",
          className,
        )}
      >
        <SheetPrimitive
          data-slot="sheet"
          className="[display:inherit] h-full max-h-[inherit] [flex-direction:inherit] [gap:inherit] outline-none"
        >
          {children}
          {showCloseButton && (
            <SheetClose
              variant="ghost"
              className="absolute top-4 right-4 rounded-xs opacity-70 hover:opacity-100"
              size="icon-xs"
            >
              <RiCloseLine aria-hidden="true" />
              <span className="sr-only">Close</span>
            </SheetClose>
          )}
        </SheetPrimitive>
      </ModalPrimitive>
    </SheetOverlay>
  );
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Sheet> & {
  side?: "top" | "right" | "bottom" | "left";
  showCloseButton?: boolean;
}) {
  return (
    <Sheet
      className={className}
      side={side}
      showCloseButton={showCloseButton}
      {...props}
    >
      {children}
    </Sheet>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

function SheetTitle({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Heading>, "slot">) {
  return (
    <Heading
      slot="title"
      data-slot="sheet-title"
      className={cn("font-semibold text-foreground", className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "slot">) {
  return (
    <div
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  type SheetPrimitiveProps,
  SheetTitle,
  SheetTrigger,
  type SheetTriggerPrimitiveProps,
};
