"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTABanner() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".cta-content",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative py-28 overflow-hidden">
      {/* Background */}
      <Image
        src="/CTAIMG.png"
        alt="CTA Background"
        fill
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#191262]/92 via-[#191262]/80 to-[#191262]/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0a3d]/40 to-[#0d0a3d]/60" />

      {/* Decorative shapes */}
      <div className="absolute top-8 right-8 w-64 h-64 rounded-full border border-[#FFBF00]/10 pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-40 h-40 rounded-full border border-[#FF0700]/15 pointer-events-none" />

      <div className="cta-content relative z-10 max-w-3xl mx-auto px-4 text-center">
        <span className="text-[#FFBF00] text-xs font-semibold tracking-[0.3em] uppercase block mb-4">
          A New Life Awaits You
        </span>
        <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Ready to Begin Your{" "}
          <span className="text-[#FFBF00]">Spiritual Journey?</span>
        </h2>
        <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          Whether you are searching for the first time or returning home — we
          believe this is your moment. Come, and discover all that God has
          prepared for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/about"
            className="bg-[#FF0700] hover:bg-[#cc0500] text-white font-bold px-10 py-4 tracking-wider transition-all duration-200 hover:scale-105 shadow-xl shadow-red-900/40"
          >
            I&apos;M NEW HERE
          </Link>
          <Link
            href="/give"
            className="border-2 border-[#FFBF00] text-[#FFBF00] hover:bg-[#FFBF00] hover:text-[#191262] font-bold px-10 py-4 tracking-wider transition-all duration-200"
          >
            GIVE ONLINE
          </Link>
        </div>
      </div>
    </section>
  );
}
