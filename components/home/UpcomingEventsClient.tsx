"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import type { SanityEvent } from "@/lib/queries";
import { formatSanityDate } from "@/lib/sanity";

gsap.registerPlugin(ScrollTrigger);

export default function UpcomingEventsClient({ events }: { events: SanityEvent[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".ue-heading",
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: ".ue-heading", start: "top 88%", toggleActions: "play none none none" },
        }
      );

      const divTl = gsap.timeline({
        scrollTrigger: { trigger: ".ue-divider-row", start: "top 88%", toggleActions: "play none none none" },
      });
      divTl.fromTo(
        ".ue-divider-star",
        { opacity: 0, scale: 0.75, rotation: -10 },
        { opacity: 1, scale: 1, rotation: -10, duration: 0.35, ease: "power3.out" },
        0
      );
      divTl.to(".ue-divider-star", { rotation: 350, duration: 0.75, ease: "power2.inOut" }, ">");
      divTl.fromTo(
        ".ue-divider-line",
        { scaleX: 0.04, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.65, ease: "power3.out", stagger: 0.06 },
        ">"
      );

      gsap.fromTo(
        ".event-card",
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: ".events-container", start: "top 80%", toggleActions: "play none none none" },
        }
      );
    },
    { scope: sectionRef }
  );

  if (events.length === 0) {
    return (
      <section ref={sectionRef} className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-sans text-gray-400">
            No upcoming events at the moment — check back soon!
          </p>
        </div>
      </section>
    );
  }

  const [featured, ...rest] = events;
  const featuredImg = featured.image ?? "/eventsImg.png";
  const featuredDate = formatSanityDate(featured.date);

  return (
    <section ref={sectionRef} className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Heading ──────────────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <div className="ue-heading opacity-0">
            <span className="font-sans text-gray-500 text-xs font-semibold tracking-[0.3em] uppercase block mb-3">
              Mark Your Calendar
            </span>
            <h2 className="font-serif text-black text-3xl md:text-5xl leading-tight">
              Upcoming Events
            </h2>
          </div>

          <div className="ue-divider-row mt-6 flex items-center justify-center gap-6">
            <div className="h-0.5 w-56 bg-[#FF0700] origin-center ue-divider-line opacity-0 scale-x-0" />
            <div className="flex items-center justify-center">
              <div className="ue-divider-star origin-center opacity-0">
                <Image src="/polarstar.png" alt="divider star" width={20} height={20} className="w-5 h-5 object-contain" />
              </div>
            </div>
            <div className="h-0.5 w-56 bg-[#FF0700] origin-center ue-divider-line opacity-0 scale-x-0" />
          </div>

          <p className="ue-heading font-sans text-gray-500 text-base max-w-xl mx-auto leading-relaxed mt-5 opacity-0">
            Come and be part of something extraordinary. Every gathering is an
            opportunity to encounter God.
          </p>
        </div>

        {/* ── Events Layout ─────────────────────────────────────────────── */}
        <div className="events-container grid lg:grid-cols-3 gap-6">

          {/* Featured Event */}
          <div className="event-card lg:col-span-2">
            <div className="relative overflow-hidden h-full min-h-[400px] group cursor-pointer">
              <Image
                src={featuredImg}
                alt={featured.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized={featuredImg.startsWith("https://")}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a3d]/95 via-[#0d0a3d]/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                {featured.tag && (
                  <span className="inline-block bg-[#FF0700] text-white text-xs font-bold px-3 py-1 tracking-wide mb-4">
                    {featured.tag}
                  </span>
                )}
                <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-3">
                  {featured.title}
                </h3>
                {featured.description && (
                  <p className="text-white/70 text-sm leading-relaxed mb-5 max-w-lg">
                    {featured.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-[#FFBF00] text-sm">
                    <Calendar size={14} />
                    <span>
                      {featuredDate}
                      {featured.time ? ` · ${featured.time}` : ""}
                    </span>
                  </div>
                  {featured.location && (
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <MapPin size={14} />
                      <span>{featured.location}</span>
                    </div>
                  )}
                </div>
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 bg-[#FF0700] hover:bg-[#cc0500] text-white font-bold text-sm px-6 py-3 tracking-wider transition-all duration-200 hover:scale-105"
                >
                  Register Now <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Smaller Events */}
          <div className="event-card flex flex-col gap-5">
            {rest.slice(0, 2).map((event) => {
              const imgSrc = event.image ?? "/image3.png";
              return (
                <div
                  key={event._id}
                  className="bg-[#191262] border border-[#191262]/10 overflow-hidden flex gap-4 p-4 hover:border-[#FF0700]/60 transition-colors duration-300 cursor-pointer group"
                >
                  <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden">
                    <Image
                      src={imgSrc}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-400"
                      unoptimized={imgSrc.startsWith("https://")}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    {event.tag && (
                      <span className="text-[#FFBF00] text-[10px] font-bold tracking-widest uppercase">
                        {event.tag}
                      </span>
                    )}
                    <h4 className="text-white font-bold text-sm leading-tight mt-1 mb-2 group-hover:text-[#FFBF00] transition-colors duration-200">
                      {event.title}
                    </h4>
                    <div className="flex items-center gap-1.5 text-white/50 text-xs">
                      <Calendar size={10} />
                      <span>{formatSanityDate(event.date)}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-1.5 text-white/40 text-xs mt-1">
                        <MapPin size={10} />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            <Link
              href="/events"
              className="mt-auto text-center border border-gray-300 hover:border-[#FF0700] text-gray-600 hover:text-[#FF0700] py-3 text-sm font-semibold tracking-wide transition-all duration-200"
            >
              View All Events →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
