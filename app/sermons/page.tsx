import { client } from "@/lib/sanity";
import { SERMONS_QUERY, type SanitySermon } from "@/lib/queries";
import SermonsPageClient from "./PageClient";

export default async function SermonsPage() {
  let sermons: SanitySermon[] = [];

  if (client) {
    try {
      sermons = await client.fetch<SanitySermon[]>(SERMONS_QUERY);
    } catch {
      // Fetch failed — PageClient will show fallback data
    }
  }

  return <SermonsPageClient sermons={sermons} />;
}
