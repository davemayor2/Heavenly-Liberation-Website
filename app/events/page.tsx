import { client } from "@/lib/sanity";
import { EVENTS_QUERY, type SanityEvent } from "@/lib/queries";
import EventsPageClient from "./PageClient";

export default async function EventsPage() {
  let events: SanityEvent[] = [];

  if (client) {
    try {
      events = await client.fetch<SanityEvent[]>(EVENTS_QUERY);
    } catch {
      // Fetch failed — PageClient will show fallback data
    }
  }

  return <EventsPageClient events={events} />;
}
