import type { SanityEvent } from "@/lib/queries";

/** Google Calendar `dates` param: UTC `YYYYMMDDTHHmmssZ`. */
function formatGCalUtc(d: Date): string {
  return d.toISOString().replace(/-|:|\.\d{3}/g, "");
}

/**
 * Opens Google Calendar “create event” with title, time window, description, and location.
 * Uses the event’s ISO `date` as start; end defaults to 2 hours later if parsing fails.
 */
export function googleCalendarUrlForEvent(event: SanityEvent): string {
  const start = new Date(event.date);
  if (Number.isNaN(start.getTime())) {
    return "https://calendar.google.com/calendar";
  }
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  const dates = `${formatGCalUtc(start)}/${formatGCalUtc(end)}`;

  const detailsParts = [event.description, event.time ? `Time: ${event.time}` : null].filter(
    (x): x is string => Boolean(x)
  );
  const details = detailsParts.join("\n\n");

  const params = new URLSearchParams({ action: "TEMPLATE", text: event.title, dates });
  if (details) params.set("details", details);
  if (event.location) params.set("location", event.location);

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
