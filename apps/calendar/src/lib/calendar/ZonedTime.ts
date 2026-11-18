const DAY_MS = 24 * 60 * 60 * 1000;

export function getViewerTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function getOffsetMs(utcMs: number, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).formatToParts(new Date(utcMs));
  const value = (type: string) =>
    Number(parts.find((part) => part.type === type)?.value);
  const asUtc = Date.UTC(
    value("year"),
    value("month") - 1,
    value("day"),
    value("hour"),
    value("minute"),
    value("second"),
  );
  return asUtc - Math.floor(utcMs / 1000) * 1000;
}

/**
 * Converts a wall-clock time (YYYY-MM-DDTHH:mm) in `timeZone` to an instant.
 * A nonexistent time is shifted forward by the size of the gap and a repeated
 * time resolves to the later instant.
 */
export function zonedLocalToDate(local: string, timeZone: string): Date {
  const wallMs = Date.parse(`${local}:00Z`);
  const offsetBefore = getOffsetMs(wallMs - DAY_MS, timeZone);
  const offsetAfter = getOffsetMs(wallMs + DAY_MS, timeZone);
  const candidates = [offsetBefore, offsetAfter]
    .map((offset) => wallMs - offset)
    .filter((instant) => {
      const offset = getOffsetMs(instant, timeZone);
      return instant + offset === wallMs;
    });

  if (candidates.length === 0) return new Date(wallMs - offsetBefore);
  return new Date(Math.max(...candidates));
}
