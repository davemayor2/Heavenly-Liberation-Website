"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ChevronDown } from "lucide-react";

const serviceTimes = [
  { day: "Sunday",    time: "2:00 PM – 6:00 PM",   label: "Main Worship Service" },
  { day: "Tuesday",   time: "9:00 AM – 1:00 AM",   label: "Liberation Service" },
  { day: "2nd Friday", time: "10:00 PM – 5:00 AM", label: "Holy Ghost Liberation Night" },
];

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-badge",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.5 }
      )
        .fromTo(
          ".hero-title",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.3"
        )
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 },
          "-=0.4"
        );

      // Float animation for the service times overlay
      gsap.to(overlayRef.current, {
        y: -10,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Animate service items in
      gsap.fromTo(
        ".service-item",
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          delay: 1.4,
          ease: "power2.out",
        }
      );

      // Subtle Ken-Burns on the bg image
      gsap.to(".hero-bg-img", {
        scale: 1.06,
        duration: 12,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: heroRef }
  );

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/1.jpeg"
          alt="Worship Service"
          fill
          className="hero-bg-img object-cover object-center"
          priority
          quality={90}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#191262]/90 via-[#191262]/70 to-[#191262]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a3d]/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-32">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2 bg-[#FFBF00]/20 border border-[#FFBF00]/40 px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FFBF00] animate-pulse" />
            <span className="text-[#FFBF00] text-xs font-semibold tracking-widest uppercase">
              Welcome to God&apos;s House
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="hero-title text-shadow">
            <span className="block text-white text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              Heavenly
            </span>
            <span className="block text-[#FFBF00] text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              Liberation
            </span>
            <span className="block text-white/90 text-3xl sm:text-4xl lg:text-5xl font-light leading-tight mt-1 tracking-wide">
              Global Assembly
            </span>
          </h1>

          {/* Tagline */}
          <p className="hero-subtitle mt-6 text-white/80 text-lg sm:text-xl leading-relaxed max-w-lg font-light italic">
            &ldquo;Where Heaven Touches Earth — A Place of Healing, Restoration,
            and Purpose.&rdquo;
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              href="/about"
              className="hero-cta bg-[#FF0700] hover:bg-[#cc0500] text-white font-bold px-8 py-4 tracking-wider transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-red-900/40"
            >
              PLAN YOUR VISIT
            </Link>
            <Link
              href="/sermons"
              className="hero-cta border-2 border-white/60 hover:border-[#FFBF00] text-white hover:text-[#FFBF00] font-semibold px-8 py-4 tracking-wider transition-all duration-200 backdrop-blur-sm"
            >
              WATCH SERMONS
            </Link>
          </div>
        </div>

        {/* Service Times Floating Card */}
        <div
          ref={overlayRef}
          className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 hidden md:block"
        >
          <div className="bg-[#191262]/80 backdrop-blur-xl border border-white/15 p-6 w-72 shadow-2xl">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-8 bg-[#FF0700] rounded-full" />
              <h3 className="text-white font-bold text-base tracking-widest uppercase">
                Service Times
              </h3>
            </div>
            <div className="space-y-4">
              {serviceTimes.map((s) => (
                <div
                  key={s.day}
                  className="service-item flex items-start gap-3 pb-4 border-b border-white/10 last:border-b-0 last:pb-0"
                >
                  <div className="mt-0.5 w-2 h-2 rounded-full bg-[#FFBF00] flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-[#FFBF00] font-bold text-sm tracking-wide">
                      {s.day}
                    </p>
                    <p className="text-white font-semibold text-base">{s.time}</p>
                    <p className="text-white/50 text-xs mt-0.5">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/about"
              className="block mt-5 text-center text-xs text-[#FF0700] hover:text-[#FFBF00] font-semibold tracking-widest uppercase transition-colors duration-200"
            >
              Get Directions →
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={20} className="animate-bounce" />
      </div>
    </section>
  );
}
