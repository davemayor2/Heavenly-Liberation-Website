"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Sermons", href: "/sermons" },
  { label: "Ministries", href: "/ministries" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

const ministriesLinks = [
  { label: "Children's Ministry", href: "/ministries/children" },
  { label: "Youth & Young Adults", href: "/ministries/youth" },
  { label: "Men's Fellowship", href: "/ministries/men" },
  { label: "Women's Ministry", href: "/ministries/women" },
  { label: "Prayer Ministry", href: "/ministries/prayer" },
  { label: "Worship Team", href: "/ministries/worship" },
];

const socials = [
  { name: "Facebook", icon: "/ic_outline-facebook.svg", href: "#" },
  { name: "Instagram", icon: "/line-md_instagram.svg", href: "#" },
  { name: "YouTube", icon: "/line-md_youtube-filled.svg", href: "#" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".footer-col",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      );
    },
    { scope: footerRef }
  );

  return (
    <footer ref={footerRef} className="bg-[#0a083a] border-t border-white/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="footer-col lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#FFBF00]/50 group-hover:ring-[#FFBF00] transition-all duration-300">
                <Image
                  src="/logo-removebg-preview.png"
                  alt="Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-tight">
                  HEAVENLY LIBERATION
                </p>
                <p className="text-[#FFBF00] text-xs tracking-widest">
                  GLOBAL ASSEMBLY
                </p>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              A Spirit-filled, Word-centered church committed to transforming
              lives through the love and power of Jesus Christ.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="w-9 h-9 rounded-full bg-white/8 border border-white/12 flex items-center justify-center hover:bg-[#FF0700]/20 hover:border-[#FF0700]/50 transition-all duration-200"
                >
                  <Image
                    src={s.icon}
                    alt={s.name}
                    width={16}
                    height={16}
                    className="object-contain invert opacity-70"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-5 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-[#FF0700] rounded-full" />
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-white/55 hover:text-[#FFBF00] text-sm transition-colors duration-200 hover:pl-1 block transition-all"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ministries */}
          <div className="footer-col">
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-5 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-[#FF0700] rounded-full" />
              Ministries
            </h4>
            <ul className="space-y-2.5">
              {ministriesLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-white/55 hover:text-[#FFBF00] text-sm transition-colors duration-200 hover:pl-1 block transition-all"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Times + Newsletter */}
          <div className="footer-col">
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-5 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-[#FF0700] rounded-full" />
              Service Times
            </h4>
            <div className="space-y-3 mb-8">
              {[
                { day: "Sunday", time: "8:00 AM & 10:30 AM" },
                { day: "Tuesday", time: "6:00 PM" },
                { day: "Saturday", time: "7:00 PM" },
              ].map((s) => (
                <div key={s.day} className="flex justify-between items-center">
                  <span className="text-[#FFBF00] text-xs font-bold tracking-wide">
                    {s.day}
                  </span>
                  <span className="text-white/60 text-xs">{s.time}</span>
                </div>
              ))}
            </div>

            <div>
              <p className="text-white/50 text-xs mb-3 tracking-wide">
                STAY CONNECTED
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-white/8 border border-white/12 text-white text-sm px-3 py-2.5 outline-none focus:border-[#FF0700]/50 transition-colors duration-200 placeholder:text-white/30"
                />
                <button className="bg-[#FF0700] hover:bg-[#cc0500] text-white text-xs font-bold px-4 py-2.5 tracking-wide transition-colors duration-200">
                  SUB
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/35 text-xs">
            © {new Date().getFullYear()} Heavenly Liberation Global Assembly. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-white/35 hover:text-white/60 text-xs transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <span className="text-white/20">·</span>
            <Link
              href="/terms"
              className="text-white/35 hover:text-white/60 text-xs transition-colors duration-200"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
