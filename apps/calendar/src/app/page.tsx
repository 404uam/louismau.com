"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/Spinner";

const CalendarApp = dynamic(() =>
  import("@/features/calendar/CalendarApp").then(
    (module) => module.CalendarApp,
  ),
);

export default function Home() {
  const [storageStatus, setStorageStatus] = useState<
    "checking" | "ready" | "unavailable"
  >("checking");

  useEffect(() => {
    let active = true;

    async function checkStorage() {
      try {
        if (!window.indexedDB) {
          throw new Error("IndexedDB is not available");
        }

        const { calendarDatabase } = await import(
          "@/features/calendar/repository/CalendarDatabase"
        );
        await calendarDatabase.open();
        if (active) setStorageStatus("ready");
      } catch (error) {
        console.error("Could not open the calendar database:", error);
        if (active) setStorageStatus("unavailable");
      }
    }

    void checkStorage();
    return () => {
      active = false;
    };
  }, []);

  if (storageStatus === "checking") {
    return (
      <main
        aria-busy="true"
        className="flex min-h-svh items-center justify-center gap-3 p-6"
      >
        <Spinner aria-hidden="true" className="size-5 text-muted-foreground" />
        <p role="status">Checking calendar storage...</p>
      </main>
    );
  }

  if (storageStatus === "unavailable") {
    return (
      <main className="flex min-h-svh items-center justify-center p-6">
        <section role="alert" className="flex max-w-md flex-col gap-3">
          <h1 className="text-xl font-semibold">Calendar cannot start</h1>
          <p>
            Calendar requires IndexedDB, but storage is unavailable or could not
            be opened. Please close the application or browser tab, check your
            browser or device storage settings, and try again.
          </p>
        </section>
      </main>
    );
  }

  return <CalendarApp />;
}
