"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const phrases = [
  "Experience the Power of God's Liberation",
  "Join Us this Sunday",
];

function PhraseRow() {
  return (
    <div className="flex items-center shrink-0">
      {phrases.map((phrase, index) => (
        <div key={`${phrase}-${index}`} className="flex items-center shrink-0">
          <span className="px-10 md:px-14 py-4 text-sm md:text-xl font-semibold text-white whitespace-nowrap">
            {phrase}
          </span>
          <span className="px-5 md:px-7 text-white text-lg md:text-2xl leading-none">
            ●
          </span>
        </div>
      ))}
    </div>
  );
}

export default function InfiniTicker() {
  const tickerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !track.children.length) return;

    let tween;

    const start = () => {
      tween?.kill();

      const oneSetWidth =
        track.children?.[0]?.getBoundingClientRect().width ?? 0;
      if (!oneSetWidth) return;

      // Keep speed consistent across devices: duration = width / pxPerSecond
      const pxPerSecond = 60;
      const duration = Math.max(8, oneSetWidth / pxPerSecond);

      // With two identical rows, animating the whole track by xPercent:-50
      // makes the loop reset visually seamless.
      tween = gsap.to(track, {
        xPercent: -50,
        duration,
        ease: "none",
        repeat: -1,
        overwrite: "auto",
      });
    };

    start();
    window.addEventListener("resize", start);

    return () => {
      window.removeEventListener("resize", start);
      tween?.kill();
    };
  }, []);

  return (
    <section ref={tickerRef} className="bg-[#FFC107] border-y border-black/5">
      <div className="overflow-hidden">
        <div ref={trackRef} className="flex w-max items-center">
          {/* Duplicate the content stream to make the loop seamless */}
          <PhraseRow />
          <PhraseRow />
        </div>
      </div>
    </section>
  );
}
