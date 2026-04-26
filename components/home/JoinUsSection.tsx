"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const contactDetails = [
  {
    icon: MapPin,
    label: "Address",
    value: "Plot 1A, Ojukwu Street, Off Black Gate, Satellite Town, Lagos, Nigeria",
    href: "#map",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+234 803 354 9525",
    href: "tel:+2348033549525",
  },
  {
    icon: Mail,
    label: "Email",
    value: "heavenlyliberationglobal@gmail.com",
    href: "mailto:heavenlyliberationglobal@gmail.com",
  },
];

const schedule = [
  { day: "Sunday",    services: "2:00 PM – 6:00 PM",   note: "Main Worship Service" },
  { day: "Tuesday",   services: "9:00 AM – 1:00 PM",   note: "Liberation Service" },
  { day: "2nd Friday", services: "10:00 PM – 5:00 AM", note: "Holy Ghost Liberation Night" },
];

export default function JoinUsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".join-heading",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".join-info-item",
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".join-info",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".join-map",
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".join-map",
            start: "top 85%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-[#0d0a3d] py-24 relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#FF0700]/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="join-heading text-center mb-16">
          <span className="text-[#FFBF00] text-xs font-semibold tracking-[0.3em] uppercase block mb-3">
            You Are Welcome
          </span>
          <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight mb-4">
            Join Us in <span className="text-[#FF0700]">Worship</span>
          </h2>
          <p className="text-white/60 text-base max-w-xl mx-auto leading-relaxed">
            Our doors are always open. Come as you are — there is a seat
            reserved for you at God&apos;s table.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Info */}
          <div className="join-info space-y-8">
            {/* Service Schedule */}
            <div className="join-info-item bg-[#191262]/60 border border-white/8 p-6">
              <div className="flex items-center gap-3 mb-5">
                <Clock size={18} className="text-[#FF0700]" />
                <h3 className="text-white font-bold text-base tracking-wider uppercase">
                  Service Schedule
                </h3>
              </div>
              <div className="space-y-4">
                {schedule.map((s) => (
                  <div
                    key={s.day}
                    className="flex items-start gap-4 pb-4 border-b border-white/8 last:border-b-0 last:pb-0"
                  >
                    <div className="flex-shrink-0 w-14 text-center">
                      <span className="text-[#FFBF00] text-xs font-bold tracking-wide uppercase block">
                        {s.day}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">
                        {s.services}
                      </p>
                      <p className="text-white/45 text-xs mt-0.5">{s.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-3">
              {contactDetails.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="join-info-item flex items-start gap-4 bg-[#191262]/40 hover:bg-[#191262]/80 border border-white/8 hover:border-[#FFBF00]/30 p-4 transition-all duration-200 group"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF0700]/15 border border-[#FF0700]/30 flex items-center justify-center group-hover:bg-[#FF0700]/25 transition-colors duration-200">
                    <c.icon size={16} className="text-[#FF0700]" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">
                      {c.label}
                    </p>
                    <p className="text-white text-sm font-medium group-hover:text-[#FFBF00] transition-colors duration-200">
                      {c.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="join-info-item flex flex-col sm:flex-row gap-3">
              <Link
                href="/about"
                className="flex-1 bg-[#FF0700] hover:bg-[#cc0500] text-white font-bold text-sm px-6 py-4 tracking-wider text-center transition-all duration-200 hover:scale-105"
              >
                Plan Your Visit
              </Link>
              <Link
                href="/contact"
                className="flex-1 border border-white/20 hover:border-[#FFBF00] text-white hover:text-[#FFBF00] font-semibold text-sm px-6 py-4 tracking-wider text-center transition-all duration-200"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right: Map Placeholder */}
          <div className="join-map">
            <div className="relative overflow-hidden shadow-2xl shadow-black/40 border border-white/10 h-[520px] bg-[#191262]/40">
              {/* Map iframe placeholder — replace src with your Google Maps embed URL */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#191262]/80">
                <div className="w-16 h-16 rounded-full bg-[#FF0700]/20 border border-[#FF0700]/40 flex items-center justify-center">
                  <MapPin size={28} className="text-[#FF0700]" />
                </div>
                <div className="text-center px-8">
                  <p className="text-white font-bold text-lg mb-1">
                    Heavenly Liberation Global Assembly
                  </p>
                  <p className="text-white/50 text-sm">Plot 1A, Ojukwu Street, Off Black Gate, Satellite Town, Lagos, Nigeria</p>
                </div>
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px",
                  }}
                />
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 bg-[#FF0700] hover:bg-[#cc0500] text-white font-bold text-sm px-6 py-3 tracking-wider transition-all duration-200 hover:scale-105"
                >
                  Open in Google Maps →
                </a>
              </div>

              {/* When ready, replace the above placeholder div with:
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

            {/* Note beneath map */}
            <p className="text-center text-white/30 text-xs mt-4">
              Free parking available on-site · Accessible facilities
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
