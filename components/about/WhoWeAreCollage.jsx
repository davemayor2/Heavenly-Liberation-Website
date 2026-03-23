"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * WhoWeAreCollage
 *
 * Desktop layout (≥ lg):
 *   ┌─────────────────────────────────────────┐
 *   │  [Image A – purple worship]  z-10       │
 *   │  (portrait, top-left)                   │
 *   │                   ┌─ RED OUTLINE ─ z-5  │
 *   │                   │ (only top-right     │
 *   │               ┌───┼────────────────┐    │
 *   │               │   │[Image B – warm]│z-20│
 *   │               │   │ (bottom-right) │    │
 *   └───────────────┴───┴────────────────┘────┘
 *
 * Mobile (< lg): simple vertical stack, gap between images.
 */
export default function WhoWeAreCollage() {
  const wrapRef = useRef(null);

  useGSAP(
    () => {
      // Image A slides in from the left
      gsap.fromTo(
        ".collage-img-a",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      // Image B slides in from the right/bottom, slight delay
      gsap.fromTo(
        ".collage-img-b",
        { x: 50, y: 30, opacity: 0 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.85,
          delay: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      // Red accent fades in last
      gsap.fromTo(
        ".collage-accent",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          delay: 0.45,
          ease: "power2.out",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: wrapRef }
  );

  return (
    /**
     * OUTER WRAPPER
     * ─ Mobile  : flex column, images stack naturally
     * ─ Desktop : relative block with a fixed height; children use
     *             absolute positioning to create the overlap effect.
     *   pb/pr padding gives overflow room so images don't clip.
     */
    <div
      ref={wrapRef}
      className="
        relative w-full
        flex flex-col gap-6
        lg:block lg:h-[560px]
      "
    >

      {/* ── IMAGE A  (purple / indoor worship) ── */}
      {/* Mobile  : full-width, natural aspect ratio                      */}
      {/* Desktop : absolute top-left, portrait ~3:4, takes ~62% width    */}
      <div
        className="
          collage-img-a
          relative overflow-hidden shadow-2xl shadow-black/20
          w-full aspect-[3/4]
          lg:absolute lg:top-0 lg:left-0 lg:w-[62%] lg:h-[84%] lg:aspect-auto
          z-10
        "
      >
        <Image
          src="/whoweare1.png"
          alt="Congregation in worship"
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 45vw"
        />
      </div>

      {/* ── RED OUTLINE ACCENT ── */}
      {/* Sits BEHIND both images (z-5). Only its top-right corner is      */}
      {/* visible — the left part hides behind A, the bottom behind B.     */}
      {/* Hidden on mobile (not meaningful in a stacked layout).           */}
      <div
        className="collage-accent hidden lg:block lg:absolute z-[5] border-2 border-[#FF0700]/65 bg-transparent"
        style={{
          /* Positioned so it bridges the gap between A's right edge and B */
          top: "13%",
          right: "3%",
          width: "35%",
          height: "40%",
        }}
      />

      {/* ── IMAGE B  (warm amber / crowd with raised hands) ── */}
      {/* Mobile  : full-width, natural aspect ratio                       */}
      {/* Desktop : absolute bottom-right, overlaps A's bottom-right ~45%  */}
      <div
        className="
          collage-img-b
          relative overflow-hidden shadow-2xl shadow-black/25
          w-full aspect-[4/3]
          lg:absolute lg:bottom-0 lg:right-0 lg:w-[56%] lg:h-[60%] lg:aspect-auto
          z-20
        "
      >
        <Image
          src="/whoweare2.png"
          alt="Worshippers with raised hands"
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 40vw"
        />
      </div>

    </div>
  );
}
