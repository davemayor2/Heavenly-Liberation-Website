import { client } from "@/lib/sanity";
import { SERMONS_QUERY, type SanitySermon } from "@/lib/queries";
import SermonsPageClient from "./PageClient";

export default async function SermonsPage() {
  let sermons: SanitySermon[] = [];

  try {
    sermons = await client.fetch<SanitySermon[]>(SERMONS_QUERY);
  } catch {
    // Sanity not configured yet — PageClient will show fallback data
  }

  return <SermonsPageClient sermons={sermons} />;
}
