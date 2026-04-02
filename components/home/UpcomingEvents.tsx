import { client } from "@/lib/sanity";
import { UPCOMING_EVENTS_QUERY, type SanityEvent } from "@/lib/queries";
import UpcomingEventsClient from "./UpcomingEventsClient";

/* ─────────────────────────────────────────────────────────────────
   FALLBACK – used when Sanity is not yet configured or returns
   an empty dataset, so the homepage never shows a blank section.
───────────────────────────────────────────────────────────────── */
const FALLBACK_EVENTS: SanityEvent[] = [
  {
    _id: "fallback-1",
    title: "Easter Sunday Celebration",
    date: "2026-04-20T08:00:00.000Z",
    time: "2:00 PM – 6:00 PM",
    location: "Main Sanctuary",
    description:
      "Join us for a powerful, spirit-filled Easter celebration as we commemorate the resurrection of our Lord Jesus Christ.",
    image: "/eventsImg.png",
    tag: "Special Service",
    featured: true,
  },
  {
    _id: "fallback-2",
    title: "Women's Empowerment Conference",
    date: "2026-04-26T09:00:00.000Z",
    time: "9:00 AM",
    location: "Conference Hall",
    description:
      "A two-day conference of empowerment, healing, and purpose for women in every season of life.",
    image: "/image3.png",
    tag: "Conference",
    featured: false,
  },
  {
    _id: "fallback-3",
    title: "Annual Youth Retreat",
    date: "2026-05-09T08:00:00.000Z",
    time: "All Day",
    location: "Lakeside Camp",
    description:
      "Three days of worship, mentorship, and community designed to ignite the faith of young adults.",
    image: "/image5.png",
    tag: "Youth",
    featured: false,
  },
];

export default async function UpcomingEvents() {
  let events: SanityEvent[] = [];

  if (client) {
    try {
      events = await client.fetch<SanityEvent[]>(UPCOMING_EVENTS_QUERY);
    } catch {
      // Fetch failed — fallback data is used below
    }
  }

  const displayEvents = events.length > 0 ? events : FALLBACK_EVENTS;

  return <UpcomingEventsClient events={displayEvents} />;
}
