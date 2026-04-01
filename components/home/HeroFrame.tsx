"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────── */
const navLinks = [
  { label: "Home",    href: "/" },
  { label: "About",   href: "/about" },
  { label: "Sermons", href: "/sermons" },
  { label: "Events",  href: "/events" },
  { label: "Giving",  href: "/giving" },
];

const counsellingDays = [
  { day: "Mon / Wed / Fri", hours: "9:00 AM – 5:00 PM" },
  { day: "Sundays",         hours: "2:00 PM – 6:00 PM" },
];

/* ─────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────── */
export default function HeroFrame() {
  const pathname      = usePathname();
  const frameRef      = useRef<HTMLElement>(null);
  const navRef        = useRef<HTMLElement>(null);
  const serviceRef    = useRef<HTMLDivElement>(null);
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  /* ── Scroll: navbar bg transition ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── GSAP animations ── */
  useGSAP(
    () => {
      /* 1. Navbar slides in from top */
      gsap.fromTo(
        navRef.current,
        { y: -72, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: "power3.out", delay: 0.1 }
      );

      /* 2. Hero content: staggered fade-up */
      gsap.fromTo(
        ".hero-anim",
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.18,
          delay: 0.55,
        }
      );

      /* 3. Service info box: infinite float */
      gsap.to(serviceRef.current, {
        y: -10,
        duration: 2.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: frameRef }
  );

  return (
    <section
      ref={frameRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* ── BACKGROUND IMAGE ──────────────────────────── */}
      <Image
        src="/herosection1.png"
        alt="Worship service background"
        fill
        priority
        quality={90}
        className="object-cover object-center select-none pointer-events-none"
      />

      {/* ── DARK OVERLAY ~30 % ─────────────────────────── */}
      <div className="absolute inset-0 bg-black/35 pointer-events-none" />

      {/* ══════════════════════════════════════════════════
          NAVBAR  (fixed — stays visible after scroll)
      ══════════════════════════════════════════════════ */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 font-sans transition-all duration-500 ${
          scrolled
            ? "bg-[#050A0F]/95 backdrop-blur-md shadow-lg shadow-black/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo ────────────────────────────── */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <div className="relative h-11 w-11 rounded-full overflow-hidden ring-2 ring-white/25 shrink-0">
                <Image
                  src="/logo-removebg-preview.png"
                  alt="Heavenly Liberation Global Assembly"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col leading-[1.15]">
                <span className="font-sans text-white font-bold text-base uppercase tracking-tight whitespace-nowrap">
                  HEAVENLY LIBERATION
                </span>
                <span className="font-sans text-[#FF0700] font-bold text-base uppercase tracking-tight whitespace-nowrap">
                  GLOBAL ASSEMBLY
                </span>
              </div>
            </Link>

            {/* Desktop nav links ───────────────── */}
            <ul className="hidden lg:flex items-center gap-x-10 xl:gap-x-12">
              {navLinks.map(({ label, href }) => {
                const active = pathname === href;
                return (
                  <li key={label}>
                    <Link
                      href={href}
                      className={`font-sans text-sm uppercase tracking-widest transition-colors duration-200 ${
                        active
                          ? "text-white font-bold"
                          : "text-gray-400 font-normal hover:text-white"
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* CTA ─────────────────────────────── */}
            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center font-sans bg-[#FF0700] hover:bg-[#D90600] active:bg-[#BB0500] text-white font-bold text-sm uppercase tracking-widest px-7 py-3 transition-colors duration-150 shrink-0"
            >
              Contact Us
            </Link>

            {/* Mobile burger ───────────────────── */}
            <button
              className="lg:hidden text-white p-2 shrink-0"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 bg-[#050A0F]/98 border-t border-white/8 ${
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map(({ label, href }) => {
              const active = pathname === href;
              return (
                <li key={label}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`block font-sans text-sm uppercase tracking-widest py-3 transition-colors duration-200 ${
                      active ? "text-white font-bold" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
            <li className="mt-3">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="block font-sans bg-[#FF0700] hover:bg-[#D90600] text-white font-bold text-sm uppercase tracking-widest px-6 py-3 text-center transition-colors duration-200"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════
          HERO CONTENT  (fills remaining viewport height)
      ══════════════════════════════════════════════════ */}
      <div className="relative z-10 flex flex-col justify-center flex-1 pt-[72px] pb-44 px-8 sm:px-12 lg:px-20 xl:px-28">
        <div className="max-w-2xl">

          {/* Headline */}
          <h1 className="hero-anim font-serif text-white font-bold text-shadow leading-[1.1] text-[2.6rem] sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]">
            Experience the Power<br />
            of God&apos;s Liberation
          </h1>

          {/* Subtext */}
          <p className="hero-anim font-sans text-white/80 text-sm sm:text-base leading-relaxed mt-5 max-w-sm">
            A place of worship, transformation, and divine breakthrough in
            Satellite Town, Lagos.
          </p>

          {/* CTA Buttons */}
          <div className="hero-anim flex flex-wrap items-center gap-4 mt-9">
            <Link
              href="/about"
              className="font-sans bg-[#FF0700] hover:bg-[#D90600] active:bg-[#BB0500] text-white font-bold text-sm uppercase tracking-widest px-7 py-3.5 transition-colors duration-150"
            >
              Join Us This Sunday
            </Link>
            <Link
              href="/sermons"
              className="font-sans bg-black/50 hover:bg-black/70 border border-white/50 hover:border-white text-white font-semibold text-sm uppercase tracking-widest px-7 py-3.5 transition-all duration-150 backdrop-blur-sm"
            >
              Watch Sermons
            </Link>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          SERVICE INFO OVERLAY  (floating, bottom-left)
      ══════════════════════════════════════════════════ */}
      <div
        ref={serviceRef}
        className="absolute bottom-0 left-0 right-0 z-20"
      >
        <div className="border-t border-white/10">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 py-6">

              {/* ── Worship With Us ── */}
              <div className="shrink-0">
                <p className="font-sans text-[#FF0700] font-bold text-sm uppercase tracking-widest mb-1">
                  Worship With Us
                </p>
                <p className="font-sans text-white text-sm font-medium">
                  Sundays – 2:00 PM
                </p>
              </div>

              {/* Vertical divider */}
              <div className="hidden sm:block w-px self-stretch bg-white/25 mx-2" />

              {/* ── Counselling Days ── */}
              <div>
                <p className="font-sans text-[#FF0700] font-bold text-sm uppercase tracking-widest mb-1">
                  Counselling Days
                </p>
                <div className="flex flex-col gap-0.5">
                  {counsellingDays.map(({ day, hours }) => (
                    <p
                      key={day}
                      className="font-sans text-white text-sm"
                    >
                      {day} – {hours}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
