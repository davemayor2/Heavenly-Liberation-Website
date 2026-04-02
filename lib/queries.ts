/* ─────────────────────────────────────────────────────────────────
   SHARED TYPES
───────────────────────────────────────────────────────────────── */
export type SanityEvent = {
  _id: string;
  title: string;
  date: string;       // ISO datetime
  time: string | null;
  location: string | null;
  description: string | null;
  image: string | null;
  tag: string | null;
  featured: boolean;
};

export type SanitySermon = {
  _id: string;
  title: string;
  preacher: string | null;
  date: string | null; // ISO date
  youtubeUrl: string | null;
  image: string | null;
  category: string | null;
  scripture: string | null;
  duration: string | null;
};

/* ─────────────────────────────────────────────────────────────────
   GROQ QUERIES
───────────────────────────────────────────────────────────────── */

/** All events, sorted soonest first */
export const EVENTS_QUERY = `*[_type == "event"] | order(date asc) {
  _id,
  title,
  date,
  time,
  location,
  description,
  "image": image.asset->url,
  tag,
  featured
}`;

/** Upcoming events only (date in the future), limited to 3 for homepage */
export const UPCOMING_EVENTS_QUERY = `*[_type == "event"] | order(date asc) [0...3] {
  _id,
  title,
  date,
  time,
  location,
  description,
  "image": image.asset->url,
  tag,
  featured
}`;

/** All sermons, latest first */
export const SERMONS_QUERY = `*[_type == "sermon"] | order(date desc) {
  _id,
  title,
  preacher,
  date,
  youtubeUrl,
  "image": image.asset->url,
  category,
  scripture,
  duration
}`;

/** Latest 4 sermons for homepage */
export const LATEST_SERMONS_QUERY = `*[_type == "sermon"] | order(date desc) [0...4] {
  _id,
  title,
  preacher,
  date,
  youtubeUrl,
  "image": image.asset->url,
  category,
  scripture,
  duration
}`;
