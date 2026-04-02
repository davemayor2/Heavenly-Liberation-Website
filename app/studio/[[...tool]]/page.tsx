"use client";

/**
 * Sanity Studio embedded at /studio
 * Sign in at https://www.sanity.io to manage content.
 */

import dynamic from "next/dynamic";
import config from "@/sanity.config";

const Studio = dynamic(() => import("sanity").then((m) => m.Studio), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen items-center justify-center bg-[#101010]">
      <span className="text-white/50 text-sm font-sans">Loading Studio…</span>
    </div>
  ),
});

export default function StudioPage() {
  return (
    <div style={{ height: "100vh" }}>
      <Studio config={config} />
    </div>
  );
}
