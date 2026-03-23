"use client";

import { useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const ministries = [
  {
    id: "children",
    title: "Children's Ministry",
    description:
      "A safe, fun, and Spirit-filled environment where children discover God's love and build a strong foundation of faith.",
    icon: "/garden_growth-chart-fill-16.svg",
    image: "/image2.png",
    href: "/ministries/children",
    color: "#FFBF00",
  },
  {
    id: "youth",
    title: "Youth & Young Adults",
    description:
      "Empowering the next generation with identity, purpose, and a passion for God — through community, mentorship, and mission.",
    icon: "/polarstar.png",
    image: "/image3.png",
    href: "/ministries/youth",
    color: "#FF0700",
  },
  {
    id: "men",
    title: "Men's Fellowship",
    description:
      "Building men of integrity, vision, and spiritual authority who lead their families and communities with grace.",
    icon: "/mdi_church-outline.svg",
    image: "/image4.png",
    href: "/ministries/men",
    color: "#FFBF00",
  },
  {
    id: "women",
    title: "Women's Ministry",
    description:
      "A sisterhood of prayer, purpose, and power — where women are equipped to walk in their God-given potential.",
    icon: "/boxicons_community.svg",
    image: "/image5.png",
    href: "/ministries/women",
    color: "#FF0700",
  },
];

function MinistryCard({ ministry }: { ministry: (typeof ministries)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const q = (selector: string) =>
    cardRef.current?.querySelector<HTMLElement>(selector) ?? null;

  const handleMouseEnter = useCallback(() => {
    gsap.to(cardRef.current, {
      scale: 1.035,
      boxShadow: "0 24px 60px rgba(255, 7, 0, 0.3)",
      duration: 0.35,
      ease: "power2.out",
    });
    const overlay = q(".card-overlay");
    if (overlay) gsap.to(overlay, { opacity: 0.55, duration: 0.35 });
    const icon = q(".card-icon-wrap");
    if (icon) gsap.to(icon, { scale: 1.1, y: -4, duration: 0.35, ease: "back.out(1.7)" });
  }, []);

  const handleMouseLeave = useCallback(() => {
    gsap.to(cardRef.current, {
      scale: 1,
      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
      duration: 0.35,
      ease: "power2.inOut",
    });
    const overlay = q(".card-overlay");
    if (overlay) gsap.to(overlay, { opacity: 0.7, duration: 0.35 });
    const icon = q(".card-icon-wrap");
    if (icon) gsap.to(icon, { scale: 1, y: 0, duration: 0.35 });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden cursor-pointer group"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}
    >
      {/* Background Image */}
      <div className="relative h-64">
        <Image
          src={ministry.image}
          alt={ministry.title}
          fill
          className="object-cover"
        />
        <div
          className="card-overlay absolute inset-0 bg-gradient-to-t from-[#191262] via-[#191262]/60 to-transparent"
          style={{ opacity: 0.7 }}
        />
      </div>

      {/* Card Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="card-icon-wrap w-10 h-10 bg-white/10 border border-white/20 flex items-center justify-center mb-3">
          <Image
            src={ministry.icon}
            alt=""
            width={20}
            height={20}
            className="object-contain"
          />
        </div>
        <h3 className="text-white font-bold text-lg mb-2 leading-tight">
          {ministry.title}
        </h3>
        <p className="text-white/65 text-sm leading-relaxed mb-4">
          {ministry.description}
        </p>
        <Link
          href={ministry.href}
          className="inline-flex items-center gap-1 text-xs font-bold tracking-widest uppercase transition-colors duration-200"
          style={{ color: ministry.color }}
        >
          Explore Ministry
          <span className="group-hover:translate-x-1 transition-transform duration-200">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}

export default function FindYourPlace() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // ── Heading fade-up (triggered by heading itself) ──────────────────
      gsap.fromTo(
        ".fyp-heading",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".fyp-heading",
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── Divider: star pops in → spins → lines elongate ────────────────
      const divTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".fyp-divider-row",
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      divTl.fromTo(
        ".fyp-divider-star",
        { opacity: 0, scale: 0.75, rotation: -10 },
        { opacity: 1, scale: 1, rotation: -10, duration: 0.35, ease: "power3.out" },
        0
      );
      divTl.to(
        ".fyp-divider-star",
        { rotation: 350, duration: 0.75, ease: "power2.inOut" },
        ">"
      );
      divTl.fromTo(
        ".fyp-divider-line",
        { scaleX: 0.04, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.65, ease: "power3.out", stagger: 0.06 },
        ">"
      );

      // ── Cards stagger up ───────────────────────────────────────────────
      gsap.fromTo(
        ".fyp-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".fyp-grid",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Heading ──────────────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <div className="fyp-heading opacity-0">
            <span className="font-sans text-gray-500 text-xs font-semibold tracking-[0.3em] uppercase block mb-3">
              You Belong Here
            </span>
            <h2 className="font-serif text-black text-3xl md:text-5xl leading-tight">
              Find Your Place
            </h2>
          </div>

          {/* Divider — identical animation pattern to WelcomeSection */}
          <div className="fyp-divider-row mt-6 flex items-center justify-center gap-6">
            <div className="h-0.5 w-56 bg-[#FF0700] origin-center fyp-divider-line opacity-0 scale-x-0" />
            <div className="flex items-center justify-center">
              <div className="fyp-divider-star origin-center opacity-0">
                <Image
                  src="/polarstar.png"
                  alt="divider star"
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                />
              </div>
            </div>
            <div className="h-0.5 w-56 bg-[#FF0700] origin-center fyp-divider-line opacity-0 scale-x-0" />
          </div>

          <p className="fyp-heading font-sans text-gray-500 text-base max-w-xl mx-auto leading-relaxed mt-5 opacity-0">
            No matter your age or season of life, there is a home for you here.
            Our ministries are designed to help you grow, connect, and serve.
          </p>
        </div>

        {/* ── Cards Grid ───────────────────────────────────────────────── */}
        <div className="fyp-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ministries.map((m) => (
            <div key={m.id} className="fyp-card">
              <MinistryCard ministry={m} />
            </div>
          ))}
        </div>

        {/* ── Bottom CTA ───────────────────────────────────────────────── */}
        <div className="text-center mt-12">
          <Link
            href="/ministries"
            className="inline-flex items-center gap-2 border border-gray-300 hover:border-[#FF0700] text-gray-700 hover:text-[#FF0700] px-8 py-3 font-semibold text-sm tracking-wider transition-all duration-200"
          >
            View All Ministries →
          </Link>
        </div>
      </div>
    </section>
  );
}
