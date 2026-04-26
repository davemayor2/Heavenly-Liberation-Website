"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────
   REUSABLE ANIMATED DIVIDER
───────────────────────────────────────────────────────────────── */
function AnimatedDivider({
  starClass,
  lineClass,
  rowClass,
}: {
  starClass: string;
  lineClass: string;
  rowClass: string;
}) {
  return (
    <div className={`${rowClass} mt-5 flex items-center justify-center gap-6`}>
      <div className={`h-0.5 w-40 bg-[#FF0700] origin-center ${lineClass} opacity-0 scale-x-0`} />
      <div className={`${starClass} origin-center opacity-0`}>
        <Image
          src="/polarstar.png"
          alt=""
          width={20}
          height={20}
          className="w-5 h-5 object-contain"
        />
      </div>
      <div className={`h-0.5 w-40 bg-[#FF0700] origin-center ${lineClass} opacity-0 scale-x-0`} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   DIVIDER GSAP HELPER  (returns a timeline, caller sets trigger)
───────────────────────────────────────────────────────────────── */
function buildDividerTimeline(starSel: string, lineSel: string) {
  const tl = gsap.timeline();
  tl.fromTo(
    starSel,
    { opacity: 0, scale: 0.75, rotation: -10 },
    { opacity: 1, scale: 1, rotation: -10, duration: 0.35, ease: "power3.out" },
    0
  );
  tl.to(starSel, { rotation: 350, duration: 0.75, ease: "power2.inOut" }, ">");
  tl.fromTo(
    lineSel,
    { scaleX: 0.04, opacity: 0 },
    { scaleX: 1, opacity: 1, duration: 0.65, ease: "power3.out", stagger: 0.06 },
    ">"
  );
  return tl;
}

/* ─────────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────────── */
export default function GivingPage() {
  const mainRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      /* ── Page fade-in ───────────────────────────────────────── */
      gsap.fromTo(
        mainRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.55, ease: "power2.out" }
      );

      /* ── Hero content slides up ─────────────────────────────── */
      gsap.fromTo(
        ".gv-hero-content",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.35 }
      );

      /* ══ SECTION 2 ══════════════════════════════════════════════
         Biblical Foundation
      ══════════════════════════════════════════════════════════ */
      gsap.fromTo(
        ".gv-heading",
        { y: 28, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".gv-heading", start: "top 85%", toggleActions: "play none none none" },
        }
      );

      ScrollTrigger.create({
        trigger: ".gv-divider-row",
        start: "top 85%",
        toggleActions: "play none none none",
        onEnter: () => buildDividerTimeline(".gv-divider-star", ".gv-divider-line").play(),
      });

      gsap.fromTo(
        ".gv-quote",
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".gv-quote", start: "top 85%", toggleActions: "play none none none" },
        }
      );

      gsap.fromTo(
        ".gv-body",
        { y: 18, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: ".gv-body", start: "top 88%", toggleActions: "play none none none" },
        }
      );

      /* ══ SECTION 3 ══════════════════════════════════════════════
         2 Ways
      ══════════════════════════════════════════════════════════ */
      gsap.fromTo(
        ".gv-ways-heading",
        { y: 28, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".gv-ways-heading", start: "top 85%", toggleActions: "play none none none" },
        }
      );

      ScrollTrigger.create({
        trigger: ".gv-ways-divider-row",
        start: "top 85%",
        toggleActions: "play none none none",
        onEnter: () => buildDividerTimeline(".gv-ways-divider-star", ".gv-ways-divider-line").play(),
      });

      /* Cards slide in from opposite sides */
      gsap.fromTo(
        ".gv-way-card-left",
        { x: -35, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: ".gv-ways-grid", start: "top 82%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(
        ".gv-way-card-right",
        { x: 35, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: ".gv-ways-grid", start: "top 82%", toggleActions: "play none none none" },
        }
      );

      /* ══ SECTION 4 ══════════════════════════════════════════════
         What Your Giving Supports
      ══════════════════════════════════════════════════════════ */
      gsap.fromTo(
        ".gv-support-heading",
        { y: 28, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".gv-support-heading", start: "top 85%", toggleActions: "play none none none" },
        }
      );

      ScrollTrigger.create({
        trigger: ".gv-support-divider-row",
        start: "top 85%",
        toggleActions: "play none none none",
        onEnter: () => buildDividerTimeline(".gv-support-divider-star", ".gv-support-divider-line").play(),
      });

      gsap.fromTo(
        ".gv-support-item",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.75, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: ".gv-support-grid", start: "top 82%", toggleActions: "play none none none" },
        }
      );

      /* ══ SECTION 5 — CTA ════════════════════════════════════════ */
      gsap.fromTo(
        ".gv-cta",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".gv-cta", start: "top 80%", toggleActions: "play none none none" },
        }
      );
    },
    { scope: mainRef }
  );

  return (
    <>
      <Navbar />

      <main ref={mainRef}>

        {/* ══════════════════════════════════════════════════════════
            1. HERO
        ══════════════════════════════════════════════════════════ */}
        <section className="relative h-[88vh] min-h-[600px] flex items-center justify-center overflow-hidden">
          <Image
            src="/givingImg.png"
            alt="Giving is an act of worship"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-[#0d0a3d]/75" />

          <div className="gv-hero-content relative z-10 text-center px-4 max-w-3xl mx-auto">
            <span className="font-sans text-[#FFBF00] text-xs font-semibold tracking-[0.35em] uppercase block mb-5">
              Give Generously
            </span>
            <h1 className="font-serif text-white text-4xl sm:text-5xl md:text-6xl leading-tight mb-6">
              Giving is an Act of Worship
            </h1>
            <p className="font-sans text-white/75 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Giving is one of the highest forms of love, gratitude, and dedication
              to God. Through your generosity, Heavenly Liberation Global Assembly
              is able to continue its mission of sharing the Gospel, supporting our
              community, and expanding the work of our Lord in this nation.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            2. BIBLICAL FOUNDATION FOR GIVING
        ══════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">

            <div className="gv-heading opacity-0">
              <h2 className="font-serif text-black text-3xl md:text-4xl leading-tight">
                Biblical Foundation for Giving
              </h2>
            </div>

            <AnimatedDivider
              rowClass="gv-divider-row"
              starClass="gv-divider-star"
              lineClass="gv-divider-line"
            />

            {/* Quote */}
            <blockquote className="gv-quote opacity-0 mt-10 max-w-2xl mx-auto">
              <p className="font-sans text-gray-700 text-lg italic leading-relaxed">
                &ldquo;Give, and it will be given to you. A good measure, pressed
                down, shaken together and running over, will be poured into your
                lap.&rdquo;
              </p>
              <footer className="font-sans text-[#FF0700] font-semibold text-sm mt-3">
                — Luke 6:38
              </footer>
            </blockquote>

            {/* Body */}
            <p className="gv-body opacity-0 font-sans text-gray-500 text-base leading-relaxed mt-6 max-w-xl mx-auto">
              The Bible teaches that giving is a blessing both to the giver and to
              the work of God&apos;s Kingdom. Your seed makes a difference.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            3. 2 WAYS YOU CAN GIVE
        ══════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">

            {/* Heading */}
            <div className="text-center mb-14">
              <div className="gv-ways-heading opacity-0">
                <h2 className="font-serif text-black text-3xl md:text-4xl leading-tight">
                  2 Ways You Can Give
                </h2>
              </div>
              <AnimatedDivider
                rowClass="gv-ways-divider-row"
                starClass="gv-ways-divider-star"
                lineClass="gv-ways-divider-line"
              />
            </div>

            {/* Cards */}
            <div className="gv-ways-grid grid sm:grid-cols-2 gap-8">

              {/* Card 1 — Bank Transfer */}
              <div
                className="gv-way-card-left bg-white border border-gray-100 rounded-none shadow-sm overflow-hidden opacity-0"
              >
                <div className="relative h-52 w-full overflow-hidden rounded-none">
                  <Image
                    src="/banktansferImg.png"
                    alt="Bank transfer"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-sans font-bold text-gray-900 text-lg mb-4">
                    Bank Transfer
                  </h3>
                  <div className="space-y-2 font-sans text-gray-600 text-sm leading-relaxed">
                    <p>
                      <span className="font-semibold text-gray-700">Account Name:</span>{" "}
                      Heavenly Liberation Global Assembly
                    </p>
                    <p>
                      <span className="font-semibold text-gray-700">Bank:</span>{" "}
                      First Bank
                    </p>
                    <p>
                      <span className="font-semibold text-gray-700">Account Number:</span>{" "}
                      2031873549
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 — In-Person Giving */}
              <div
                className="gv-way-card-right bg-white border border-gray-100 rounded-none shadow-sm overflow-hidden opacity-0"
              >
                <div className="relative h-52 w-full overflow-hidden rounded-none">
                  <Image
                    src="/Offering.png"
                    alt="In-person offering"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-sans font-bold text-gray-900 text-lg mb-4">
                    In-Person Giving
                  </h3>
                  <p className="font-sans text-gray-600 text-sm mb-5">
                    We are delighted to receive worship offerings during our services.
                  </p>
                  <p className="font-sans font-semibold text-gray-700 text-sm mb-2">
                    Service Times:
                  </p>
                  <div className="space-y-1 font-sans text-gray-600 text-sm leading-relaxed">
                    <p>Sunday &ndash; 2:00 PM – 6:00 PM (Main Worship Service)</p>
                    <p>Tuesday &ndash; 9:00 AM – 1:00 AM (Liberation Service)</p>
                    <p>2nd Friday &ndash; 10:00 PM – 5:00 AM (Holy Ghost Liberation Night)</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            4. WHAT YOUR GIVING SUPPORTS
        ══════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">

            {/* Heading */}
            <div className="text-center mb-14">
              <div className="gv-support-heading opacity-0">
                <h2 className="font-serif text-black text-3xl md:text-4xl leading-tight">
                  What Your Giving Supports
                </h2>
              </div>
              <AnimatedDivider
                rowClass="gv-support-divider-row"
                starClass="gv-support-divider-star"
                lineClass="gv-support-divider-line"
              />
            </div>

            {/* Feature items */}
            <div className="gv-support-grid grid sm:grid-cols-3 gap-8 text-center">

              {/* Ministry Work */}
              <div className="gv-support-item opacity-0">
                <div className="w-14 h-14 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center">
                  <Image
                    src="/mdi_church-outline.svg"
                    alt="Ministry Work"
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain [filter:invert(20%)_sepia(100%)_saturate(700%)_hue-rotate(335deg)]"
                  />
                </div>
                <h3 className="font-sans font-bold text-gray-900 text-base mb-2">
                  Ministry Work
                </h3>
                <p className="font-sans text-gray-500 text-sm leading-relaxed">
                  Supports church programs and spiritual outreach programs that
                  strengthen the body of Christ.
                </p>
              </div>

              {/* Community Outreach */}
              <div className="gv-support-item opacity-0">
                <div className="w-14 h-14 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center">
                  <Image
                    src="/boxicons_community.svg"
                    alt="Community Outreach"
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain [filter:invert(20%)_sepia(100%)_saturate(700%)_hue-rotate(335deg)]"
                  />
                </div>
                <h3 className="font-sans font-bold text-gray-900 text-base mb-2">
                  Community Outreach
                </h3>
                <p className="font-sans text-gray-500 text-sm leading-relaxed">
                  Reaching people across our community through love, kindness, and
                  the practical gospel of Christ.
                </p>
              </div>

              {/* Church Growth */}
              <div className="gv-support-item opacity-0">
                <div className="w-14 h-14 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center">
                  <Image
                    src="/garden_growth-chart-fill-16.svg"
                    alt="Church Growth"
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain [filter:invert(20%)_sepia(100%)_saturate(700%)_hue-rotate(335deg)]"
                  />
                </div>
                <h3 className="font-sans font-bold text-gray-900 text-base mb-2">
                  Church Growth
                </h3>
                <p className="font-sans text-gray-500 text-sm leading-relaxed">
                  Increasing the church&apos;s reach through missions, new grounds,
                  and expanding ministry areas.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            5. STAY CONNECTED — CTA
        ══════════════════════════════════════════════════════════ */}
        <section className="relative py-36 flex items-center justify-center overflow-hidden">
          <Image
            src="/herosection1.png"
            alt="Congregation gathered"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#0d0a3d]/80" />

          <div className="gv-cta relative z-10 text-center px-4 max-w-2xl mx-auto">
            <span className="font-sans text-[#FFBF00]/70 text-xs font-semibold tracking-[0.35em] uppercase block mb-5">
              Get Involved
            </span>
            <h2 className="font-serif text-[#FFBF00] text-4xl md:text-6xl leading-tight mb-6">
              Stay Connected
            </h2>
            <p className="font-sans text-white/70 text-base md:text-lg leading-relaxed mb-10 max-w-lg mx-auto">
              God has future messages and church updates. Stay connected with us
              through our social media and mailing forms.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-[#FF0700] hover:bg-[#cc0500] text-white font-bold px-12 py-4 tracking-widest uppercase text-sm transition-all duration-200 hover:scale-105 shadow-xl shadow-red-900/40"
            >
              Join Us This Sunday
            </Link>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            6. FOOTER
        ══════════════════════════════════════════════════════════ */}
        <Footer />

      </main>
    </>
  );
}
