import { client } from "@/lib/sanity";
import { EVENTS_QUERY, type SanityEvent } from "@/lib/queries";
import EventsPageClient from "./PageClient";

export default async function EventsPage() {
  let events: SanityEvent[] = [];

  try {
    events = await client.fetch<SanityEvent[]>(EVENTS_QUERY);
  } catch {
    // Sanity not configured yet — PageClient will show fallback data
  }

  return <EventsPageClient events={events} />;
}
