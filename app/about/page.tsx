"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import WhoWeAreCollage from "@/components/about/WhoWeAreCollage";
import IntroVideo from "@/components/home/IntroVideo";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const mainRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // ── Page fade-in ─────────────────────────────────────────────────
      gsap.fromTo(
        mainRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.55, ease: "power2.out" }
      );

      // ── Hero content slides up ────────────────────────────────────────
      gsap.fromTo(
        ".about-hero-content",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.35 }
      );

      // ── Who We Are: text block slides in ─────────────────────────────
      gsap.fromTo(
        ".who-text",
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".who-text",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── Church for Everyone: heading fade-up ─────────────────────────
      gsap.fromTo(
        ".cfe-heading",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cfe-heading",
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── Church for Everyone: star pops in → spins → lines grow ───────
      const cfeDivTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".cfe-divider-row",
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
      cfeDivTl.fromTo(
        ".cfe-divider-star",
        { opacity: 0, scale: 0.75, rotation: -10 },
        { opacity: 1, scale: 1, rotation: -10, duration: 0.35, ease: "power3.out" },
        0
      );
      cfeDivTl.to(
        ".cfe-divider-star",
        { rotation: 350, duration: 0.75, ease: "power2.inOut" },
        ">"
      );
      cfeDivTl.fromTo(
        ".cfe-divider-line",
        { scaleX: 0.04, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.65, ease: "power3.out", stagger: 0.06 },
        ">"
      );

      // ── Church for Everyone: body paragraphs fade-up ──────────────────
      gsap.fromTo(
        ".cfe-body",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cfe-body",
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── Leadership: image slides in from left ─────────────────────────
      gsap.fromTo(
        ".leadership-img",
        { x: -45, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".leadership-img",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── Leadership: bio paragraphs stagger in ────────────────────────
      gsap.fromTo(
        ".leadership-bio-para",
        { x: 35, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.13,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".leadership-bio",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── Join section ──────────────────────────────────────────────────
      gsap.fromTo(
        ".join-content",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".join-content",
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
            src="/3.jpeg"
            alt="About Heavenly Liberation Global Assembly"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Dark navy overlay */}
          <div className="absolute inset-0 bg-[#191262]/80" />

          <div className="about-hero-content relative z-10 text-center px-4 max-w-3xl mx-auto">
            <span className="font-sans text-[#FFBF00] text-xs font-semibold tracking-[0.35em] uppercase block mb-5">
              Our Story
            </span>
            <h1 className="font-serif text-white text-4xl sm:text-5xl md:text-6xl leading-tight mb-6">
              About Heavenly Liberation<br className="hidden sm:block" />
              Global Assembly
            </h1>
            <p className="font-sans text-white/75 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10">
              A Spirit-filled community rooted in faith, purpose, and the
              transforming power of God's Word — welcoming all who seek Him.
            </p>
            <Link
              href="/contact"
              className="bg-[#FF0700] hover:bg-[#cc0500] text-white font-bold px-10 py-4 tracking-widest uppercase text-sm transition-all duration-200 hover:scale-105 inline-block"
            >
              Get In Touch
            </Link>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            2. WHO WE ARE
        ══════════════════════════════════════════════════════════════ */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* ── Collage ──────────────────────────────────────────── */}
              <WhoWeAreCollage />

              {/* ── Text ─────────────────────────────────────────────── */}
              <div className="who-text">
                <span className="font-sans text-[#FF0700] text-xs font-semibold tracking-[0.35em] uppercase block mb-4">
                  Who We Are
                </span>
                <h2 className="font-serif text-black text-3xl md:text-5xl leading-tight mb-6">
                  A Church Built on<br />Faith &amp; Community
                </h2>
                <p className="font-sans text-gray-800 text-lg font-semibold leading-relaxed mb-4">
                  Heavenly Liberation Global Assembly is a Spirit-filled,
                  Word-centred church established to bring the transforming power
                  of God's Kingdom to every heart, home, and nation.
                </p>
                <p className="font-sans text-gray-500 text-base leading-relaxed mb-4">
                  Founded with a vision to liberate souls from darkness and
                  establish them in divine purpose, we have grown into a vibrant,
                  multi-generational family that worships together, prays together,
                  and serves together.
                </p>
                <p className="font-sans text-gray-500 text-base leading-relaxed mb-4">
                  Our ministries span children, youth, men, women, and
                  intercessors — each designed to equip believers to walk fully in
                  their God-given identity and calling.
                </p>
                <p className="font-sans text-gray-500 text-base leading-relaxed mb-10">
                  The ministry also undertakes{" "}
                  <strong className="text-gray-800">
                    Family &amp; Land Liberation Assignments
                  </strong>{" "}
                  across Nigeria and internationally — available on invitation
                  and prior booking only.
                </p>
                <Link
                  href="/sermons"
                  className="bg-[#FF0700] hover:bg-[#cc0500] text-white font-bold px-8 py-4 tracking-widest uppercase text-sm transition-all duration-200 hover:scale-105 inline-block"
                >
                  Join Us This Sunday
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            3. INTRO VIDEO
        ══════════════════════════════════════════════════════════════ */}
        <IntroVideo />

        {/* ══════════════════════════════════════════════════════════════
            4. A CHURCH FOR EVERYONE
        ══════════════════════════════════════════════════════════════ */}
        <section className="bg-[#E8F0FE] py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Heading */}
            <div className="cfe-heading opacity-0">
              <span className="font-sans text-gray-500 text-xs font-semibold tracking-[0.35em] uppercase block mb-4">
                Our Belief
              </span>
              <h2 className="font-serif text-[#191262] text-3xl md:text-5xl leading-tight mb-6">
                A Church for Everyone
              </h2>
            </div>

            {/* Animated divider — star spins, lines grow outward */}
            <div className="cfe-divider-row mt-2 flex items-center justify-center gap-6 mb-8">
              <div className="h-0.5 w-32 sm:w-44 bg-[#FF0700] origin-center cfe-divider-line opacity-0 scale-x-0" />
              <div className="flex items-center justify-center">
                <div className="cfe-divider-star origin-center opacity-0">
                  <Image
                    src="/polarstar.png"
                    alt=""
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain shrink-0"
                  />
                </div>
              </div>
              <div className="h-0.5 w-32 sm:w-44 bg-[#FF0700] origin-center cfe-divider-line opacity-0 scale-x-0" />
            </div>

            <p className="cfe-body font-sans text-gray-700 text-lg leading-relaxed mb-5 opacity-0">
              Regardless of your background, past, or present circumstances —
              there is a seat at the table for you at Heavenly Liberation Global
              Assembly.
            </p>
            <p className="cfe-body font-sans text-gray-500 text-base leading-relaxed opacity-0">
              We believe every person is uniquely created by God with a purpose.
              Our doors are open to families, singles, young adults, and seniors.
              We are committed to creating an atmosphere where people encounter
              the love, grace, and power of God in a genuine and transformative
              way — not just on Sundays, but every day of the week.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            4. OUR LEADERSHIP
        ══════════════════════════════════════════════════════════════ */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">

              {/* ── Pastor image + nameplate ─────────────────────────── */}
              <div className="leadership-img">
                <div className="relative overflow-hidden w-full aspect-[4/5] shadow-2xl shadow-black/15">
                  <Image
                    src="/11.jpeg"
                    alt="Evang. Samson N. Nzekwe"
                    fill
                    className="object-cover object-top"
                  />
                  {/* Bottom gradient for nameplate readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#191262]/70 via-transparent to-transparent" />
                </div>

                {/* Red accent border at bottom-left of image */}
                <div className="flex items-start gap-4 pt-5 pl-1 border-l-4 border-[#FF0700] ml-2 mt-5">
                  <div>
                    <h3 className="font-sans text-[#FF0700] text-xl font-bold tracking-wide leading-tight mb-1">
                      Evang. Samson N. Nzekwe
                    </h3>
                    <p className="font-sans text-gray-400 text-xs tracking-[0.25em] uppercase">
                      Founder &amp; Senior Pastor
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Bio ──────────────────────────────────────────────── */}
              <div className="leadership-bio pt-2 lg:pt-8">
                <span className="font-sans text-[#FF0700] text-xs font-semibold tracking-[0.35em] uppercase block mb-4">
                  Meet the Shepherd
                </span>
                <h2 className="font-serif text-black text-3xl md:text-5xl leading-tight mb-3">
                  Our Leadership
                </h2>

                {/* Thin red underline accent */}
                <div className="w-16 h-0.5 bg-[#FF0700] mb-8" />

                <div className="space-y-5">
                  <p className="leadership-bio-para font-sans text-gray-600 text-base leading-relaxed">
                    Evang. Samson N. Nzekwe is the visionary founder and Senior
                    Pastor of Heavenly Liberation Global Assembly. Called by God
                    from an early age, he has spent decades in active ministry —
                    leading souls to salvation and establishing believers in the
                    fullness of God's purpose.
                  </p>
                  <p className="leadership-bio-para font-sans text-gray-600 text-base leading-relaxed">
                    His ministry is marked by a deep passion for the Word of God,
                    fervent intercession, and a supernatural gift for healing and
                    deliverance. Under his leadership, the church has grown from a
                    small prayer group into a thriving, multi-ministry global
                    assembly touching lives across continents.
                  </p>
                  <p className="leadership-bio-para font-sans text-gray-600 text-base leading-relaxed">
                    Evang. Nzekwe's preaching is grounded in scripture, rich with
                    revelation, and practically applicable to everyday life. He
                    believes strongly in raising up the next generation of leaders
                    and equipping every member to fulfil their God-given calling.
                  </p>
                  <p className="leadership-bio-para font-sans text-gray-600 text-base leading-relaxed">
                    He is a devoted husband, father, and a servant leader who
                    leads with humility, love, and an unwavering commitment to the
                    Great Commission.
                  </p>
                </div>

                <Link
                  href="/sermons"
                  className="inline-flex items-center gap-2 border border-gray-300 hover:border-[#FF0700] text-gray-700 hover:text-[#FF0700] px-8 py-3 font-semibold text-sm tracking-wider transition-all duration-200 mt-10"
                >
                  Watch His Sermons →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            5. JOIN OUR CHURCH FAMILY
        ══════════════════════════════════════════════════════════════ */}
        <section className="relative py-36 flex items-center justify-center overflow-hidden">
          <Image
            src="/eventsImg.png"
            alt="Congregation gathered in worship"
            fill
            className="object-cover object-center"
          />
          {/* Deep navy overlay */}
          <div className="absolute inset-0 bg-[#0d0a3d]/88" />

          <div className="join-content relative z-10 text-center px-4 max-w-2xl mx-auto">
            <span className="font-sans text-[#FFBF00]/70 text-xs font-semibold tracking-[0.35em] uppercase block mb-5">
              You Belong Here
            </span>
            <h2 className="font-serif text-[#FFBF00] text-4xl md:text-6xl leading-tight mb-6">
              Join Our Church Family
            </h2>
            <p className="font-sans text-white/70 text-base md:text-lg leading-relaxed mb-10 max-w-lg mx-auto">
              You were not created to walk this journey alone. Come worship,
              grow, and belong with us at Heavenly Liberation Global Assembly.
            </p>
            <Link
              href="/contact"
              className="bg-[#FF0700] hover:bg-[#cc0500] text-white font-bold px-14 py-5 tracking-widest uppercase text-sm transition-all duration-200 hover:scale-105 inline-block shadow-xl shadow-red-900/40"
            >
              I&apos;m Ready to Visit
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
