import { client } from "@/lib/sanity";
import { LATEST_SERMONS_QUERY, type SanitySermon } from "@/lib/queries";
import LatestSermonsClient from "./LatestSermonsClient";

/* ─────────────────────────────────────────────────────────────────
   FALLBACK – used when Sanity is not yet configured or returns
   an empty dataset, so the homepage never shows a blank section.
───────────────────────────────────────────────────────────────── */
const FALLBACK_SERMONS: SanitySermon[] = [
  {
    _id: "fallback-1",
    title: "Walking in Divine Authority",
    preacher: "Evang. Samson N. Nzekwe",
    date: "2026-03-09",
    duration: "58 mins",
    scripture: "Luke 10:19",
    image: "/sermonsimg.png",
    category: "Faith & Authority",
    youtubeUrl: "https://www.youtube.com/@HeavenlyLiberationGlobalAssembly",
  },
  {
    _id: "fallback-2",
    title: "The Power of Persistent Prayer",
    preacher: "Evang. Samson N. Nzekwe",
    date: "2026-03-02",
    duration: "52 mins",
    scripture: "Luke 18:1-8",
    image: "/sermonsImg2.png",
    category: "Prayer",
    youtubeUrl: "https://www.youtube.com/@HeavenlyLiberationGlobalAssembly",
  },
  {
    _id: "fallback-3",
    title: "Rooted in the Word of God",
    preacher: "Evang. Samson N. Nzekwe",
    date: "2026-02-23",
    duration: "45 mins",
    scripture: "Psalm 1:1-3",
    image: "/image6.png",
    category: "Scripture",
    youtubeUrl: "https://www.youtube.com/@HeavenlyLiberationGlobalAssembly",
  },
  {
    _id: "fallback-4",
    title: "Healing Is Yours",
    preacher: "Evang. Samson N. Nzekwe",
    date: "2026-02-16",
    duration: "61 mins",
    scripture: "Isaiah 53:5",
    image: "/image7.png",
    category: "Healing",
    youtubeUrl: "https://www.youtube.com/@HeavenlyLiberationGlobalAssembly",
  },
];

export default async function LatestSermons() {
  let sermons: SanitySermon[] = [];

  try {
    sermons = await client.fetch<SanitySermon[]>(LATEST_SERMONS_QUERY);
  } catch {
    // Sanity not configured yet — fallback data is used below
  }

  const displaySermons = sermons.length > 0 ? sermons : FALLBACK_SERMONS;

  return <LatestSermonsClient sermons={displaySermons} />;
}
