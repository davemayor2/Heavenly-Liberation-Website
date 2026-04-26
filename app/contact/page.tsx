"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────
   STATIC DATA
───────────────────────────────────────────────────────────────── */
const infoCards = [
  {
    id: "location",
    icon: MapPin,
    heading: "Visit Us",
    label: "Our Location",
    value: "Plot 1A, Ojukwu Street, Off Black Gate,\nSatellite Town, Lagos, Nigeria",
    href: "https://maps.google.com",
  },
  {
    id: "phone",
    icon: Phone,
    heading: "Call Us",
    label: "Phone Number",
    value: "+234 803 354 9525",
    value2: "+234 7082087535 ",
    value3: "+234 8154438690",
    href: "tel:+2348033549525",
  },
  {
    id: "email",
    icon: Mail,
    heading: "Email Us",
    label: "Email Address",
    value: "heavenlyliberationglobal@gmail.com",
    href: "mailto:heavenlyliberationglobal@gmail.com",
  },
];

const serviceTimes = [
  { day: "Tuesday",    time: "9:00 AM – 1:00 PM — Main Liberation Program" },
  { day: "2nd Friday", time: "10:00 PM – 5:00 AM — Holy Ghost Liberation Night" },
  { day: "Mon/Wed/Fri/", time: "9:00 AM – 5:00 PM — Counselling & Deliverance" },
  { day: "Sunday",     time: "2:00 PM – 6:00 PM — Counselling & Deliverance" },

];

/* ─────────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────────── */
export default function ContactPage() {
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
        ".ct-hero-content",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.35 }
      );

      /* ── Info cards stagger from left ───────────────────────── */
      gsap.fromTo(
        ".ct-info-card",
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ct-info-col",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      /* ── Service times fade up ──────────────────────────────── */
      gsap.fromTo(
        ".ct-hours",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ct-hours",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      /* ── Form slides from right ─────────────────────────────── */
      gsap.fromTo(
        ".ct-form-col",
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ct-form-col",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      /* ── Map fades + scales in ──────────────────────────────── */
      gsap.fromTo(
        ".ct-map",
        { opacity: 0, scale: 0.97 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ct-map",
            start: "top 88%",
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

        {/* ══════════════════════════════════════════════════════════
            1. HERO
        ══════════════════════════════════════════════════════════ */}
        <section className="relative h-[88vh] min-h-[600px] flex items-center justify-center overflow-hidden">
          <Image
            src="/herosection1.png"
            alt="Contact Heavenly Liberation Global Assembly"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-[#0d0a3d]/80" />

          <div className="ct-hero-content relative z-10 text-center px-4 max-w-3xl mx-auto">
            <span className="font-sans text-[#FFBF00] text-xs font-semibold tracking-[0.35em] uppercase block mb-5">
              We&apos;d Love to Hear From You
            </span>
            <h1 className="font-serif text-white text-4xl sm:text-5xl md:text-6xl leading-tight mb-6">
              Contact Us
            </h1>
            <p className="font-sans text-white/75 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
              Have a question, prayer request, or simply want to connect? Reach
              out to us — our doors and hearts are always open.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            2. CONTACT INFO + FORM
        ══════════════════════════════════════════════════════════ */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 items-start">

              {/* ── Left: info cards ───────────────────────────── */}
              <div className="ct-info-col space-y-4">

                {infoCards.map((card) => (
                  <a
                    key={card.id}
                    href={card.href}
                    target={card.id === "location" ? "_blank" : undefined}
                    rel={card.id === "location" ? "noopener noreferrer" : undefined}
                    className="ct-info-card flex items-start gap-5 bg-gray-50 border border-gray-100 border-l-4 border-l-[#FF0700] p-6 group hover:bg-red-50/40 transition-colors duration-200 opacity-0"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-full flex items-center justify-center group-hover:bg-red-100 transition-colors duration-200">
                      <card.icon size={18} className="text-[#FF0700]" />
                    </div>
                    <div>
                      <p className="font-sans font-bold text-gray-900 text-sm mb-0.5">
                        {card.heading}
                      </p>
                      <p className="font-sans text-gray-400 text-xs uppercase tracking-wider mb-1">
                        {card.label}
                      </p>
                      <p className="font-sans text-gray-700 text-sm leading-snug whitespace-pre-line group-hover:text-[#FF0700] transition-colors duration-200">
                        {card.value}
                      </p>
                    </div>
                  </a>
                ))}

                {/* Service Times */}
                <div className="ct-hours opacity-0 bg-gray-50 border border-gray-100 border-l-4 border-l-[#FFBF00] p-6 mt-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-yellow-50 rounded-full flex items-center justify-center">
                      <Clock size={18} className="text-[#FFBF00]" />
                    </div>
                    <p className="font-sans font-bold text-gray-900 text-sm uppercase tracking-widest">
                      Service Times
                    </p>
                  </div>
                  <div className="space-y-3">
                    {serviceTimes.map((s, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-b-0 last:pb-0"
                      >
                        <span className="font-sans font-semibold text-[#FF0700] text-sm">
                          {s.day}
                        </span>
                        <span className="font-sans text-gray-500 text-sm">
                          {s.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Liberation Assignment notice */}
                <div className="border border-[#FFBF00]/40 bg-yellow-50/40 p-5 mt-2">
                  <p className="font-sans font-bold text-gray-900 text-sm mb-1">
                    Family &amp; Land Liberation Assignments
                  </p>
                  <p className="font-sans text-gray-600 text-sm leading-relaxed">
                    We undertake liberation assignments across Nigeria and internationally.
                    Available on <strong>invitation and prior booking only</strong> — contact
                    us to make enquiries.
                  </p>
                </div>
              </div>

              {/* ── Right: contact form ────────────────────────── */}
              <div className="ct-form-col opacity-0">
                <h2 className="font-serif text-black text-2xl md:text-3xl leading-tight mb-8">
                  Send Us a Message
                </h2>

                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-5"
                >
                  {/* Row 1: Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-gray-600 text-xs font-semibold uppercase tracking-wider">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="rounded-none border border-gray-200 focus:border-[#FF0700] bg-white font-sans text-sm py-3 px-4 outline-none w-full transition-colors duration-200 placeholder:text-gray-300"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-gray-600 text-xs font-semibold uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        className="rounded-none border border-gray-200 focus:border-[#FF0700] bg-white font-sans text-sm py-3 px-4 outline-none w-full transition-colors duration-200 placeholder:text-gray-300"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone + Subject */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-gray-600 text-xs font-semibold uppercase tracking-wider">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+234 000 000 0000"
                        className="rounded-none border border-gray-200 focus:border-[#FF0700] bg-white font-sans text-sm py-3 px-4 outline-none w-full transition-colors duration-200 placeholder:text-gray-300"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-gray-600 text-xs font-semibold uppercase tracking-wider">
                        Subject
                      </label>
                      <input
                        type="text"
                        placeholder="How can we help?"
                        className="rounded-none border border-gray-200 focus:border-[#FF0700] bg-white font-sans text-sm py-3 px-4 outline-none w-full transition-colors duration-200 placeholder:text-gray-300"
                      />
                    </div>
                  </div>

                  {/* Row 3: Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-gray-600 text-xs font-semibold uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Write your message here..."
                      className="rounded-none border border-gray-200 focus:border-[#FF0700] bg-white font-sans text-sm py-3 px-4 outline-none w-full transition-colors duration-200 resize-none placeholder:text-gray-300"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full bg-[#FF0700] hover:bg-[#cc0500] text-white font-bold py-4 tracking-widest uppercase text-sm rounded-none transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-red-900/20"
                  >
                    Send Message
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            3. MAP
        ══════════════════════════════════════════════════════════ */}
        <section className="bg-[#f8f8f8]">
          <div
            className="ct-map relative w-full h-[420px] bg-[#e8eaf0] overflow-hidden opacity-0"
          >
            {/* Subtle grid overlay */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,0,0,.06) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,.06) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />

            {/* Placeholder content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 z-10">
              <div className="w-16 h-16 rounded-full bg-[#FF0700]/15 border-2 border-[#FF0700]/40 flex items-center justify-center">
                <MapPin size={28} className="text-[#FF0700]" />
              </div>
              <div className="text-center px-8">
                <p className="font-sans font-bold text-gray-900 text-lg mb-1">
                  Heavenly Liberation Global Assembly
                </p>
                <p className="font-sans text-gray-500 text-sm">
                  Plot 1A, Ojukwu Street, Off Black Gate, Satellite Town, Lagos, Nigeria
                </p>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FF0700] hover:bg-[#cc0500] text-white font-bold text-sm px-8 py-3 tracking-wider uppercase transition-all duration-200 hover:scale-105 shadow-lg shadow-red-900/20"
              >
                Open in Google Maps →
              </a>
            </div>

            {/* When real embed URL is available, replace the placeholder above with:
            <iframe
              src="https://www.google.com/maps/embed?pb=YOUR_EMBED_URL"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            /> */}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            4. FOOTER
        ══════════════════════════════════════════════════════════ */}
        <Footer />

      </main>
    </>
  );
}
