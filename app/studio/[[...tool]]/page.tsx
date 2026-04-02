"use client";

/**
 * Sanity Studio at /studio.
 * Config is loaded only when NEXT_PUBLIC_SANITY_PROJECT_ID is set (e.g. on Vercel),
 * otherwise defineConfig would receive no projectId and the app would crash.
 */

import dynamic from "next/dynamic";

function MissingSanityEnv() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#101010] px-6 text-center font-sans">
      <h1 className="mb-4 text-xl font-semibold text-white">Sanity Studio is not configured</h1>
      <p className="mb-4 max-w-lg text-sm leading-relaxed text-white/65">
        The Studio needs your Sanity project ID in the environment. In{" "}
        <strong className="text-white">Vercel</strong> → your project →{" "}
        <strong className="text-white">Settings → Environment Variables</strong>, add:
      </p>
      <ul className="mb-6 max-w-md list-inside list-disc text-left text-sm text-white/80">
        <li>
          <code className="text-[#FFBF00]">NEXT_PUBLIC_SANITY_PROJECT_ID</code> — from{" "}
          <a
            href="https://www.sanity.io/manage"
            className="text-[#3b82f6] underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            sanity.io/manage
          </a>
        </li>
        <li>
          <code className="text-[#FFBF00]">NEXT_PUBLIC_SANITY_DATASET</code> — usually{" "}
          <code className="text-white/90">production</code>
        </li>
      </ul>
      <p className="mb-2 max-w-md text-xs text-white/45">
        <code className="text-white/70">NEXT_PUBLIC_*</code> variables are baked in at{" "}
        <strong className="text-white/70">build time</strong>. After saving env vars, trigger a{" "}
        <strong className="text-white/70">new deployment</strong>.
      </p>
    </div>
  );
}

const StudioRoot = dynamic(
  () =>
    Promise.all([import("sanity"), import("@/sanity.config")]).then(([sanityMod, configMod]) => {
      const Studio = sanityMod.Studio;
      const config = configMod.default;
      return function StudioLoaded() {
        return (
          <div style={{ height: "100vh" }}>
            <Studio config={config} />
          </div>
        );
      };
    }),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen items-center justify-center bg-[#101010]">
        <span className="font-sans text-sm text-white/50">Loading Studio…</span>
      </div>
    ),
  }
);

export default function StudioPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
  if (!projectId) {
    return <MissingSanityEnv />;
  }
  return <StudioRoot />;
}
