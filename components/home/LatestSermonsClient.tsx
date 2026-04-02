"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, BookOpen, Youtube } from "lucide-react";
import type { SanitySermon } from "@/lib/queries";
import { formatSanityDate } from "@/lib/sanity";

gsap.registerPlugin(ScrollTrigger);

function SermonCard({ sermon }: { sermon: SanitySermon }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const ytBadgeRef = useRef<HTMLDivElement>(null);

  const q = (selector: string) =>
    cardRef.current?.querySelector<HTMLElement>(selector) ?? null;

  const handleMouseEnter = useCallback(() => {
    gsap.to(cardRef.current, {
      scale: 1.04,
      boxShadow: "0 28px 64px rgba(255, 7, 0, 0.25)",
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(ytBadgeRef.current, { scale: 1.2, opacity: 1, duration: 0.3, ease: "back.out(1.7)" });
    const thumb = q(".sermon-thumbnail");
    if (thumb) gsap.to(thumb, { scale: 1.08, duration: 0.5, ease: "power2.out" });
  }, []);

  const handleMouseLeave = useCallback(() => {
    gsap.to(cardRef.current, {
      scale: 1,
      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
      duration: 0.3,
      ease: "power2.inOut",
    });
    gsap.to(ytBadgeRef.current, { scale: 1, opacity: 0.9, duration: 0.3 });
    const thumb = q(".sermon-thumbnail");
    if (thumb) gsap.to(thumb, { scale: 1, duration: 0.5, ease: "power2.inOut" });
  }, []);

  const imgSrc = sermon.image ?? "/sermonsimg.png";
  const ytUrl = sermon.youtubeUrl ?? "https://www.youtube.com/@HeavenlyLiberationGlobalAssembly";

  return (
    <a
      ref={cardRef}
      href={ytUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="bg-[#191262] overflow-hidden cursor-pointer group rounded-none block"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden rounded-none">
        <Image
          src={imgSrc}
          alt={sermon.title}
          fill
          className="sermon-thumbnail object-cover"
          unoptimized={imgSrc.startsWith("https://")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/25" />

        {sermon.category && (
          <div className="absolute top-3 left-3 bg-[#FF0700] text-white text-xs font-bold px-2.5 py-1 tracking-wide">
            {sermon.category}
          </div>
        )}

        {sermon.duration && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 text-white/80 text-xs px-2 py-1 backdrop-blur-sm">
            <Clock size={10} />
            <span>{sermon.duration}</span>
          </div>
        )}

        <div
          ref={ytBadgeRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: 0.9 }}
        >
          <div
            className="flex items-center gap-2 bg-[#FF0000] px-4 py-2 shadow-xl shadow-black/50"
            style={{ borderRadius: "6px" }}
          >
            <Youtube size={22} className="text-white fill-white" />
            <span className="text-white text-xs font-bold tracking-widest uppercase">YouTube</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5">
        <h3 className="text-white font-bold text-base leading-tight mb-2 group-hover:text-[#FFBF00] transition-colors duration-200">
          {sermon.title}
        </h3>
        {sermon.preacher && (
          <p className="text-white/50 text-xs mb-3">{sermon.preacher}</p>
        )}

        <div className="flex items-center justify-between">
          {sermon.scripture ? (
            <div className="flex items-center gap-1.5 text-[#FFBF00]/80 text-xs">
              <BookOpen size={12} />
              <span className="font-medium">{sermon.scripture}</span>
            </div>
          ) : (
            <span />
          )}
          <span className="text-white/35 text-xs">{formatSanityDate(sermon.date)}</span>
        </div>
      </div>
    </a>
  );
}

export default function LatestSermonsClient({ sermons }: { sermons: SanitySermon[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".sermons-heading",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".sermon-card",
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ".sermons-grid", start: "top 80%" },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-[#0d0a3d] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sermons-heading flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4">
          <div>
            <span className="text-[#FFBF00] text-xs font-semibold tracking-[0.3em] uppercase block mb-3">
              Feed Your Spirit
            </span>
            <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight">
              Latest <span className="text-[#FF0700]">Sermons</span>
            </h2>
          </div>
          <Link
            href="/sermons"
            className="flex-shrink-0 border border-white/20 hover:border-[#FF0700] text-white/80 hover:text-[#FF0700] px-6 py-2.5 text-sm font-semibold tracking-wider transition-all duration-200"
          >
            View All Sermons →
          </Link>
        </div>

        {sermons.length === 0 ? (
          <p className="text-white/40 font-sans text-center py-8">
            No sermons uploaded yet — check back soon!
          </p>
        ) : (
          <div className="sermons-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sermons.map((s) => (
              <div key={s._id} className="sermon-card">
                <SermonCard sermon={s} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
