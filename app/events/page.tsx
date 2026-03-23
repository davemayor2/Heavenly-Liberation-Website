"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Clock, MapPin } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────
   EVENT DATA
───────────────────────────────────────────────────────────────── */
const events = [
  {
    id: 1,
    title: "Night of Liberation Prayer",
    date: "June 6, 2026",
    time: "6:30 PM",
    location: "Church Auditorium",
    image: "/image3.png",
    description:
      "Join us for a powerful night of prayer and intercession as we seek God's face together as a church family.",
  },
  {
    id: 2,
    title: "Youth Empowerment Conference",
    date: "June 8, 2026",
    time: "10:00 PM",
    location: "Civic Event Hall",
    image: "/image4.png",
    description:
      "Inspiring young minds through powerful teachings, worship, and fellowship for the next generation of leaders.",
  },
  {
    id: 3,
    title: "Community Outreach Program",
    date: "June 9, 2026",
    time: "10:00 AM",
    location: "Church Auditorium",
    image: "/image5.png",
    description:
      "Serving our community through acts of love, kindness, and sharing the gospel of Christ across Lagos.",
  },
  {
    id: 4,
    title: "Night of Liberation Prayer",
    date: "June 10, 2026",
    time: "6:00 PM",
    location: "Location Coming Soon",
    image: "/about3.png",
    description:
      "A continued night of prayer, worship, and declarations for liberation and breakthrough in every area of life.",
  },
  {
    id: 5,
    title: "Youth Empowerment Conference",
    date: "June 19, 2026",
    time: "3:00 PM",
    location: "Civic Event Hall",
    image: "/about4.png",
    description:
      "Empowering the next generation with identity, purpose, and a passion for God through community and mentorship.",
  },
];

/* ─────────────────────────────────────────────────────────────────
   EVENT CARD
───────────────────────────────────────────────────────────────── */
function EventCard({ event }: { event: (typeof events)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const q = (selector: string) =>
    cardRef.current?.querySelector<HTMLElement>(selector) ?? null;

  const handleMouseEnter = useCallback(() => {
    gsap.to(cardRef.current, {
      y: -6,
      boxShadow: "0 20px 48px rgba(0,0,0,0.14)",
      duration: 0.3,
      ease: "power2.out",
    });
    const thumb = q(".ev-thumbnail");
    if (thumb) gsap.to(thumb, { scale: 1.06, duration: 0.5, ease: "power2.out" });
  }, []);

  const handleMouseLeave = useCallback(() => {
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
      duration: 0.3,
      ease: "power2.inOut",
    });
    const thumb = q(".ev-thumbnail");
    if (thumb) gsap.to(thumb, { scale: 1, duration: 0.5, ease: "power2.inOut" });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="bg-white border border-gray-100 overflow-hidden rounded-none cursor-pointer flex flex-col"
      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden rounded-none flex-shrink-0">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="ev-thumbnail object-cover object-center"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-sans font-bold text-gray-900 text-base leading-snug mb-3 group-hover:text-[#FF0700] transition-colors duration-200">
          {event.title}
        </h3>

        {/* Meta rows */}
        <div className="space-y-1.5 mb-3">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Calendar size={13} className="text-[#FF0700] shrink-0" />
            <span>Date: {event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Clock size={13} className="text-[#FF0700] shrink-0" />
            <span>Time: {event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <MapPin size={13} className="text-[#FF0700] shrink-0" />
            <span>Location: {event.location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="font-sans text-gray-400 text-sm leading-relaxed mt-auto">
          {event.description}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────────── */
export default function EventsPage() {
  const mainRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // ── Page fade-in ───────────────────────────────────────────────
      gsap.fromTo(
        mainRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.55, ease: "power2.out" }
      );

      // ── Hero content slides up ─────────────────────────────────────
      gsap.fromTo(
        ".ev-hero-content",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.35 }
      );

      // ── Section 2: heading from left, text from right ──────────────
      gsap.fromTo(
        ".ev-intro-heading",
        { x: -45, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ev-intro-heading",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        ".ev-intro-text",
        { x: 45, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ev-intro-text",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── Section 3: heading fade-up ─────────────────────────────────
      gsap.fromTo(
        ".ev-heading",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ev-heading",
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── Divider: star pops in → spins → lines grow ─────────────────
      const divTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".ev-divider-row",
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
      divTl.fromTo(
        ".ev-divider-star",
        { opacity: 0, scale: 0.75, rotation: -10 },
        { opacity: 1, scale: 1, rotation: -10, duration: 0.35, ease: "power3.out" },
        0
      );
      divTl.to(
        ".ev-divider-star",
        { rotation: 350, duration: 0.75, ease: "power2.inOut" },
        ">"
      );
      divTl.fromTo(
        ".ev-divider-line",
        { scaleX: 0.04, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.65, ease: "power3.out", stagger: 0.06 },
        ">"
      );

      // ── Event cards stagger up ─────────────────────────────────────
      gsap.fromTo(
        ".ev-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ev-grid",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── CTA section ────────────────────────────────────────────────
      gsap.fromTo(
        ".ev-cta",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ev-cta",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: mainRef }
  );

  return (
    <>
      <Navbar />

      <main ref={mainRef}>

        {/* ══════════════════════════════════════════════════════════════
            1. HERO
        ══════════════════════════════════════════════════════════════ */}
        <section className="relative h-[88vh] min-h-[600px] flex items-center justify-center overflow-hidden">
          <Image
            src="/eventsImg.png"
            alt="Church events and programs"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-[#0d0a3d]/80" />

          <div className="ev-hero-content relative z-10 text-center px-4 max-w-3xl mx-auto">
            <span className="font-sans text-[#FFBF00] text-xs font-semibold tracking-[0.35em] uppercase block mb-5">
              Gatherings &amp; Programs
            </span>
            <h1 className="font-serif text-white text-4xl sm:text-5xl md:text-6xl leading-tight mb-6">
              Church Events &amp; Programs
            </h1>
            <p className="font-sans text-white/75 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
              Stay connected with upcoming sermons, special programs, and community
              gatherings of Heavenly Liberation Global Assembly.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            2. BE PART OF OUR GATHERINGS
        ══════════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Left — heading */}
              <div className="ev-intro-heading">
                <h2 className="font-serif text-black text-3xl md:text-5xl leading-tight">
                  Be Part of Our<br />Gatherings
                </h2>
              </div>

              {/* Right — body text */}
              <div className="ev-intro-text">
                <p className="font-sans text-gray-600 text-base leading-relaxed mb-5">
                  At Heavenly Liberation Global Assembly, our events and programs
                  are designed with the belief that everyone should find meaningful
                  fellowship and experience the presence of God together.
                </p>
                <p className="font-sans text-gray-600 text-base leading-relaxed">
                  From special prayer meetings to conferences, outreach programs,
                  and fellowship gatherings, there are many opportunities for you
                  to join and be a part. We invite you to be part of the vibrant
                  life of our church.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            3. UPCOMING EVENTS
        ══════════════════════════════════════════════════════════════ */}
        <section className="bg-white py-24 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Heading block */}
            <div className="text-center mb-16">
              <div className="ev-heading opacity-0">
                <span className="font-sans text-gray-500 text-xs font-semibold tracking-[0.3em] uppercase block mb-3">
                  What&apos;s Coming Up
                </span>
                <h2 className="font-serif text-black text-3xl md:text-5xl leading-tight">
                  Upcoming Events
                </h2>
              </div>

              {/* Animated divider */}
              <div className="ev-divider-row mt-6 flex items-center justify-center gap-6">
                <div className="h-0.5 w-56 bg-[#FF0700] origin-center ev-divider-line opacity-0 scale-x-0" />
                <div className="flex items-center justify-center">
                  <div className="ev-divider-star origin-center opacity-0">
                    <Image
                      src="/polarstar.png"
                      alt=""
                      width={20}
                      height={20}
                      className="w-5 h-5 object-contain"
                    />
                  </div>
                </div>
                <div className="h-0.5 w-56 bg-[#FF0700] origin-center ev-divider-line opacity-0 scale-x-0" />
              </div>
            </div>

            {/* Cards grid — 5 cards; last row of 2 is centred via justify-center */}
            <div className="ev-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className={`ev-card${
                    /* Push the last 2 cards to the centre on lg screens */
                    event.id === 4 ? " lg:col-start-1" : ""
                  }`}
                >
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            4. JOIN US AT OUR NEXT EVENT — CTA
        ══════════════════════════════════════════════════════════════ */}
        <section className="relative py-36 flex items-center justify-center overflow-hidden">
          <Image
            src="/herosection1.png"
            alt="Congregation gathered"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#0d0a3d]/85" />

          <div className="ev-cta relative z-10 text-center px-4 max-w-2xl mx-auto">
            <span className="font-sans text-[#FFBF00]/70 text-xs font-semibold tracking-[0.35em] uppercase block mb-5">
              Don&apos;t Miss Out
            </span>
            <h2 className="font-serif text-[#FFBF00] text-4xl md:text-6xl leading-tight mb-6">
              Join Us at Our Next Event
            </h2>
            <p className="font-sans text-white/70 text-base md:text-lg leading-relaxed mb-10 max-w-lg mx-auto">
              We would love to see you at one of our upcoming events. Come and
              experience a life-changing encounter, powerful teaching, and a
              welcoming community.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-[#FF0700] hover:bg-[#cc0500] text-white font-bold px-12 py-4 tracking-widest uppercase text-sm transition-all duration-200 hover:scale-105 shadow-xl shadow-red-900/40"
            >
              Join Us This Sunday
            </Link>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            5. FOOTER
        ══════════════════════════════════════════════════════════════ */}
        <Footer />

      </main>
    </>
  );
}
