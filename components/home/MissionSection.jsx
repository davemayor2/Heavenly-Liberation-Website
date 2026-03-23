"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const missionItems = [
  {
    title: "Liberation",
    description:
      "Bringing deliverance and spiritual freedom through the power of God's Word.",
  },
  {
    title: "Transformation",
    description:
      "Raising transformed lives through discipleship and biblical teaching.",
  },
  {
    title: "Impact",
    description:
      "Extending God's love to our community through outreach and service.",
  },
];

export default function MissionSection() {
  const sectionRef = useRef(null);
  const sidebarRef = useRef(null);
  const titleRef   = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // 1) Red sidebar slides in from the left
      gsap.fromTo(
        sidebarRef.current,
        { x: "-100%", opacity: 0 },
        {
          x: "0%",
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // 2) Vertical title fades in and slides "up" (along its rotated axis = translateX in DOM)
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          delay: 0.25,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // 3) Content blocks stagger in from the right
      gsap.fromTo(
        ".mission-block",
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="w-full flex overflow-hidden"
      style={{ minHeight: "360px" }}
    >
      {/* ── Red Sidebar ─────────────────────────────────── */}
      <div
        ref={sidebarRef}
        className="flex-shrink-0 w-[22%] max-w-[220px] bg-[#FF0000] flex items-center justify-center"
        style={{ opacity: 0 }}
      >
        <span
          ref={titleRef}
          className="font-serif text-white select-none whitespace-nowrap"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            letterSpacing: "0.05em",
            opacity: 0,
          }}
        >
          Our Mission
        </span>
      </div>

      {/* ── Navy Content Area ───────────────────────────── */}
      <div className="flex-1 bg-[#191262] flex items-center px-12 md:px-20 xl:px-28 py-14">
        <div className="w-full max-w-3xl">
          {missionItems.map((item, idx) => (
            <div key={item.title}>
              {/* Block */}
              <div className="mission-block py-8" style={{ opacity: 0 }}>
                <h3 className="font-serif text-white text-xl md:text-2xl mb-3">
                  {item.title}
                </h3>
                <p className="font-sans text-white/70 text-sm md:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Divider — not after the last item */}
              {idx < missionItems.length - 1 && (
                <div className="border-t border-white/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
