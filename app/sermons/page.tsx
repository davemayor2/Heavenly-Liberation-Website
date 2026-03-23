"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlayCircle } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────
   SERMON DATA
───────────────────────────────────────────────────────────────── */
const sermons = [
  {
    id: 1,
    title: "The Power of Prayer",
    preacher: "Samson N. Nzekwe",
    date: "2nd January, 2026",
    image: "/sermonsimg.png",
    youtubeUrl: "https://www.youtube.com/@HeavenlyLiberationGlobalAssembly",
  },
  {
    id: 2,
    title: "The Power of Leadership",
    preacher: "Samson N. Nzekwe",
    date: "9th January, 2026",
    image: "/sermonsImg2.png",
    youtubeUrl: "https://www.youtube.com/@HeavenlyLiberationGlobalAssembly",
  },
  {
    id: 3,
    title: "Faith That Overcomes",
    preacher: "Samson N. Nzekwe",
    date: "16th January, 2026",
    image: "/image6.png",
    youtubeUrl: "https://www.youtube.com/@HeavenlyLiberationGlobalAssembly",
  },
  {
    id: 4,
    title: "Living in God's Purpose",
    preacher: "Samson N. Nzekwe",
    date: "20th January, 2026",
    image: "/about1.png",
    youtubeUrl: "https://www.youtube.com/@HeavenlyLiberationGlobalAssembly",
  },
  {
    id: 5,
    title: "The Power of Redemption",
    preacher: "Samson N. Nzekwe",
    date: "3rd February, 2026",
    image: "/image7.png",
    youtubeUrl: "https://www.youtube.com/@HeavenlyLiberationGlobalAssembly",
  },
  {
    id: 6,
    title: "Walking in the Spirit",
    preacher: "Samson N. Nzekwe",
    date: "27th January, 2026",
    image: "/about2.png",
    youtubeUrl: "https://www.youtube.com/@HeavenlyLiberationGlobalAssembly",
  },
];

/* ─────────────────────────────────────────────────────────────────
   SERMON CARD
───────────────────────────────────────────────────────────────── */
function SermonCard({ sermon }: { sermon: (typeof sermons)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const playRef = useRef<HTMLDivElement>(null);

  const q = (selector: string) =>
    cardRef.current?.querySelector<HTMLElement>(selector) ?? null;

  const handleMouseEnter = useCallback(() => {
    gsap.to(cardRef.current, {
      y: -6,
      boxShadow: "0 24px 56px rgba(0,0,0,0.18)",
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(playRef.current, {
      scale: 1.15,
      opacity: 1,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
    const thumb = q(".sm-thumbnail");
    if (thumb) gsap.to(thumb, { scale: 1.07, duration: 0.5, ease: "power2.out" });
  }, []);

  const handleMouseLeave = useCallback(() => {
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
      duration: 0.3,
      ease: "power2.inOut",
    });
    gsap.to(playRef.current, {
      scale: 1,
      opacity: 0.9,
      duration: 0.3,
    });
    const thumb = q(".sm-thumbnail");
    if (thumb) gsap.to(thumb, { scale: 1, duration: 0.5, ease: "power2.inOut" });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="bg-white overflow-hidden rounded-none border border-gray-100 cursor-pointer group flex flex-col"
      style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}
    >
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden rounded-none flex-shrink-0">
        <Image
          src={sermon.image}
          alt={sermon.title}
          fill
          className="sm-thumbnail object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-black/10" />

        {/* Red circular play button */}
        <div
          ref={playRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: 0.9 }}
        >
          <div className="w-14 h-14 rounded-full bg-[#FF0700] flex items-center justify-center shadow-lg shadow-red-900/40">
            <PlayCircle size={28} className="text-white fill-white" />
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-sans text-gray-900 font-bold text-base leading-snug mb-1 group-hover:text-[#FF0700] transition-colors duration-200">
          {sermon.title}
        </h3>
        <p className="font-sans text-gray-400 text-xs mb-1">
          By {sermon.preacher}
        </p>
        <p className="font-sans text-gray-400 text-xs mb-4">{sermon.date}</p>

        {/* Watch Sermon button — full width, dark navy */}
        <a
          href={sermon.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto block w-full text-center bg-[#191262] hover:bg-[#0d0a3d] text-white font-bold text-xs uppercase tracking-widest py-3 transition-colors duration-200"
        >
          Watch Sermon
        </a>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────────── */
export default function SermonsPage() {
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
        ".sl-hero-content",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.35 }
      );

      // ── Intro section: text from left, image from right ────────────
      gsap.fromTo(
        ".sl-intro-text",
        { x: -45, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".sl-intro-text",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        ".sl-intro-img",
        { x: 45, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".sl-intro-img",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── Library heading fade-up ────────────────────────────────────
      gsap.fromTo(
        ".sl-heading",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".sl-heading",
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── Divider: star pops in → spins → lines grow ─────────────────
      const divTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".sl-divider-row",
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
      divTl.fromTo(
        ".sl-divider-star",
        { opacity: 0, scale: 0.75, rotation: -10 },
        { opacity: 1, scale: 1, rotation: -10, duration: 0.35, ease: "power3.out" },
        0
      );
      divTl.to(
        ".sl-divider-star",
        { rotation: 350, duration: 0.75, ease: "power2.inOut" },
        ">"
      );
      divTl.fromTo(
        ".sl-divider-line",
        { scaleX: 0.04, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.65, ease: "power3.out", stagger: 0.06 },
        ">"
      );

      // ── Sermon cards stagger up ────────────────────────────────────
      gsap.fromTo(
        ".sl-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".sl-grid",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── Stay Connected CTA ─────────────────────────────────────────
      gsap.fromTo(
        ".sl-cta",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".sl-cta",
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
        <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
          <Image
            src="/open-holy-bible-candle-old-oak-wooden-table.jpg"
            alt="Open bible"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Dark navy overlay */}
          <div className="absolute inset-0 bg-[#0d0a3d]/80" />

          <div className="sl-hero-content relative z-10 text-center px-4 max-w-3xl mx-auto">
            <span className="font-sans text-[#FFBF00] text-xs font-semibold tracking-[0.35em] uppercase block mb-5">
              The Word of God
            </span>
            <h1 className="font-serif text-white text-4xl sm:text-5xl md:text-6xl leading-tight mb-6">
              Sermons &amp; Messages
            </h1>
            <p className="font-sans text-white/75 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
              Be inspired and strengthened by the Word of God through powerful
              teachings and life-transforming messages from Heavenly Liberation
              Global Assembly.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            2. FAITH THROUGH THE WORD
            Light-blue bg, text left, image bleeds to right screen edge
        ══════════════════════════════════════════════════════════════ */}
        <section className="bg-[#E8F0FE] overflow-hidden">
          {/* Full-width flex row — NO outer container so right image can bleed */}
          <div className="flex flex-col lg:flex-row items-stretch">

            {/* ── Text panel ──────────────────────────────────────────── */}
            {/* Left padding mirrors the site's max-w-7xl container offset */}
            <div
              className="
                sl-intro-text
                flex flex-col justify-center
                py-10 px-6 sm:px-10
                lg:py-12 lg:pr-16
                lg:w-[66%]
              "
              style={{
                paddingLeft: "clamp(1.5rem, calc((100vw - 80rem) / 2 + 2rem), 8rem)",
              }}
            >
              <h2 className="font-serif text-black text-3xl md:text-4xl xl:text-5xl leading-tight mb-6">
                Faith Through the Word
              </h2>
              <p className="font-sans text-gray-700 text-base leading-relaxed mb-4 max-w-lg">
                At Heavenly Liberation Global Assembly, the Word of God is
                central to everything we do. Our sermons are focused on biblical
                truth, spiritual growth, and practical guidance for victorious
                Christian living.
              </p>
              <p className="font-sans text-gray-600 text-base leading-relaxed max-w-lg">
                Whether you are joining us from home or revisiting a message
                that impacted your life, we pray these teachings will strengthen
                your faith and help you walk in the freedom and purpose that God
                has prepared for you.
              </p>
            </div>

            {/* ── Image panel — anchored to bottom, bleeds to screen edge ── */}
            <div className="sl-intro-img relative w-full h-48 lg:w-[34%] lg:h-auto flex-shrink-0 bg-[#E8F0FE]">
              <Image
                src="/sermonsImg2.png"
                alt="Bible and cross"
                fill
                className="object-contain object-bottom"
                sizes="(max-width: 1024px) 100vw, 34vw"
              />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            3. SERMON LIBRARY
        ══════════════════════════════════════════════════════════════ */}
        <section className="bg-white py-24 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Heading */}
            <div className="text-center mb-16">
              <div className="sl-heading opacity-0">
                <span className="font-sans text-gray-500 text-xs font-semibold tracking-[0.3em] uppercase block mb-3">
                  Watch &amp; Listen
                </span>
                <h2 className="font-serif text-black text-3xl md:text-5xl leading-tight">
                  Sermon Library
                </h2>
              </div>

              {/* Animated divider */}
              <div className="sl-divider-row mt-6 flex items-center justify-center gap-6">
                <div className="h-0.5 w-56 bg-[#FF0700] origin-center sl-divider-line opacity-0 scale-x-0" />
                <div className="flex items-center justify-center">
                  <div className="sl-divider-star origin-center opacity-0">
                    <Image
                      src="/polarstar.png"
                      alt=""
                      width={20}
                      height={20}
                      className="w-5 h-5 object-contain"
                    />
                  </div>
                </div>
                <div className="h-0.5 w-56 bg-[#FF0700] origin-center sl-divider-line opacity-0 scale-x-0" />
              </div>

              <p className="sl-heading font-sans text-gray-500 text-base max-w-xl mx-auto leading-relaxed mt-5 opacity-0">
                Explore past messages and grow deeper in your faith.
              </p>
            </div>

            {/* Cards grid */}
            <div className="sl-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sermons.map((s) => (
                <div key={s.id} className="sl-card">
                  <SermonCard sermon={s} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            4. STAY CONNECTED
        ══════════════════════════════════════════════════════════════ */}
        <section className="relative py-36 flex items-center justify-center overflow-hidden">
          <Image
            src="/eventsImg.png"
            alt="Congregation gathered"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#0d0a3d]/85" />

          <div className="sl-cta relative z-10 text-center px-4 max-w-2xl mx-auto">
            <span className="font-sans text-[#FFBF00]/70 text-xs font-semibold tracking-[0.35em] uppercase block mb-5">
              Never Miss a Message
            </span>
            <h2 className="font-serif text-[#FFBF00] text-4xl md:text-6xl leading-tight mb-6">
              Stay Connected
            </h2>
            <p className="font-sans text-white/70 text-base md:text-lg leading-relaxed mb-10 max-w-lg mx-auto">
              Don&apos;t miss future messages and church updates. Stay connected
              with us through our services and online platforms.
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
