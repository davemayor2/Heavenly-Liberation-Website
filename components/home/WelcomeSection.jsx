"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WelcomeSection() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const paragraph1Lines = [
    "Heavenly Liberation Global Assembly is a Christ-centered church",
    "committed to raising believers who walk in spiritual freedom, purpose,",
    "and victory. We are a family of faith dedicated to worship, prayer, sound",
    "teaching, and impactful community outreach.",
  ];

  const paragraph2Lines = [
    "Whether you are new to the faith or seeking a deeper relationship with",
    "God, there is a place for you here.",
  ];

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // ── 1. HEADING ────────────────────────────────────────────────────────
      // Fires when the heading block itself enters the viewport.
      gsap.fromTo(
        ".welcome-heading",
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.65, ease: "power3.out",
          scrollTrigger: {
            trigger: ".welcome-heading",
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── 2. DIVIDER ────────────────────────────────────────────────────────
      // Own timeline, triggered by the divider row entering the viewport.
      const divTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".welcome-divider-row",
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      // a) Star pops in
      divTl.fromTo(
        ".welcome-divider-star",
        { opacity: 0, scale: 0.75, rotation: -10 },
        { opacity: 1, scale: 1, rotation: -10, duration: 0.35, ease: "power3.out" },
        0
      );
      // b) Star spins one full turn
      divTl.to(
        ".welcome-divider-star",
        { rotation: 350, duration: 0.75, ease: "power2.inOut" },
        ">"
      );
      // c) Both lines elongate from center outward (left line from right→left, right line from left→right)
      divTl.fromTo(
        ".welcome-divider-line",
        { scaleX: 0.04, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.65, ease: "power3.out", stagger: 0.06 },
        ">"
      );

      // ── 3. GRID ITEMS (center → outward) ─────────────────────────────────
      const items = gsap.utils.toArray(section.querySelectorAll(".welcome-grid-item"));
      const grid = gridRef.current;
      const gridRect = grid ? grid.getBoundingClientRect() : section.getBoundingClientRect();
      const cx = gridRect.left + gridRect.width / 2;
      const cy = gridRect.top + gridRect.height / 2;
      const sorted = items.slice().sort((a, b) => {
        const ra = a.getBoundingClientRect();
        const rb = b.getBoundingClientRect();
        const da = Math.pow(ra.left + ra.width / 2 - cx, 2) + Math.pow(ra.top + ra.height / 2 - cy, 2);
        const db = Math.pow(rb.left + rb.width / 2 - cx, 2) + Math.pow(rb.top + rb.height / 2 - cy, 2);
        return da - db;
      });

      gsap.fromTo(
        sorted,
        { opacity: 0, y: 18, scale: 0.98 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.08, ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── 4. PARAGRAPHS ─────────────────────────────────────────────────────
      gsap.fromTo(
        ".welcome-paragraph",
        { opacity: 0, y: 14 },
        {
          opacity: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.12,
          scrollTrigger: {
            trigger: ".welcome-paragraph",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── 5. LOGO (last, slight scale-up) ──────────────────────────────────
      gsap.fromTo(
        ".welcome-logo",
        { opacity: 0, scale: 0.94 },
        {
          opacity: 1, scale: 1, duration: 0.6, ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="w-full bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top header block */}
        <div className="text-center">
          <div className="welcome-heading opacity-0">
            <h2 className="font-serif text-3xl md:text-4xl text-black leading-tight">
              Welcome to
            </h2>
            <h2 className="font-serif text-3xl md:text-4xl text-black leading-tight mt-1">
              Heavenly Liberation Global Assembly
            </h2>
          </div>

          {/* Divider with centered star */}
          <div className="welcome-divider-row mt-6 flex items-center justify-center gap-6">
            <div className="h-0.5 w-56 bg-[#FF0700] origin-center welcome-divider-line opacity-0 scale-x-0" />
            <div className="flex items-center justify-center">
              <div className="welcome-divider-star origin-center opacity-0">
                <Image
                  src="/polarstar.png"
                  alt="divider star"
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                />
              </div>
            </div>
            <div className="h-0.5 w-56 bg-[#FF0700] origin-center welcome-divider-line opacity-0 scale-x-0" />
          </div>
        </div>

        {/* Main layout */}
        <div className="mt-12 flex flex-col lg:flex-row gap-12 items-start">
          {/* Masonry grid (left) */}
          <div className="relative w-full lg:w-[560px]">
            <div className="welcome-logo absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none opacity-0">
              <div className="relative w-28 h-28">
                <Image
                  src="/logo-removebg-preview.png"
                  alt="Heavenly Liberation logo"
                  fill
                  className="object-cover rounded-full"
                  priority
                />
              </div>
            </div>

            <div ref={gridRef} className="grid grid-cols-2 gap-4 relative">
              {/* Box 1 – top-left: top-right + bottom-left rounded */}
              <div
                className="welcome-grid-item relative overflow-hidden h-52 w-full opacity-0"
                style={{ borderRadius: "0 30px 0 30px" }}
              >
                <Image src="/about1.png" alt="Congregation" fill className="object-cover" />
              </div>

              {/* Box 2 – top-right: top-left + bottom-right rounded */}
              <div
                className="welcome-grid-item relative overflow-hidden h-52 w-full opacity-0"
                style={{ borderRadius: "30px 0 30px 0" }}
              >
                <Image src="/about2.png" alt="Congregation" fill className="object-cover" />
              </div>

              {/* Box 3 – bottom-left: top-left + bottom-right rounded (same as box 2) */}
              <div
                className="welcome-grid-item relative overflow-hidden h-52 w-full opacity-0"
                style={{ borderRadius: "30px 0 30px 0" }}
              >
                <Image src="/about3.png" alt="Congregation" fill className="object-cover" />
              </div>

              {/* Box 4 – bottom-right: top-right + bottom-left rounded (same as box 1) */}
              <div
                className="welcome-grid-item relative overflow-hidden h-52 w-full opacity-0"
                style={{ borderRadius: "0 30px 0 30px" }}
              >
                <Image src="/about4.png" alt="Congregation" fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* Content text block (right) */}
          <div className="flex-1 w-full lg:max-w-xl">
            <p className="welcome-paragraph text-gray-700 font-sans text-sm md:text-[14px] leading-relaxed opacity-0">
              {paragraph1Lines.map((line, idx) => (
                <span key={idx}>
                  {line}
                  {idx < paragraph1Lines.length - 1 ? <br /> : null}
                </span>
              ))}
            </p>
            <p className="welcome-paragraph mt-4 text-gray-700 font-sans text-sm md:text-[14px] leading-relaxed opacity-0">
              {paragraph2Lines.map((line, idx) => (
                <span key={idx}>
                  {line}
                  {idx < paragraph2Lines.length - 1 ? <br /> : null}
                </span>
              ))}
            </p>
            <p className="welcome-paragraph mt-4 text-gray-700 font-sans text-sm md:text-[14px] leading-relaxed opacity-0">
              {paragraph1Lines.map((line, idx) => (
                <span key={idx}>
                  {line}
                  {idx < paragraph1Lines.length - 1 ? <br /> : null}
                </span>
              ))}
            </p>

            <div className="mt-8">
              <Link
                href="/about"
                className="inline-flex items-center justify-center bg-[#FF0700] hover:bg-[#cc0500] text-white px-8 py-3 text-xs md:text-sm font-bold tracking-wide transition-colors duration-200"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

