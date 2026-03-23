"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Sermons", href: "/sermons" },
  { label: "Events", href: "/events" },
  { label: "Giving", href: "/giving" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(
    () => {
      gsap.fromTo(
        navRef.current,
        { y: -72, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: "power3.out", delay: 0.1 }
      );
    },
    { scope: navRef }
  );

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 font-sans transition-all duration-500 ${
        scrolled
          ? "bg-[#050A0F]/95 backdrop-blur-md shadow-lg shadow-black/50"
          : "bg-transparent"
      }`}
    >
      {/* ── Main bar ────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <div className="flex items-center justify-between h-[72px]">

          {/* ── LOGO ──────────────────────────────────────────── */}
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

          {/* ── NAV LINKS (desktop) ───────────────────────────── */}
          <ul className="hidden lg:flex items-center gap-x-10 xl:gap-x-12">
            {navLinks.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <li key={label}>
                  <Link
                    href={href}
                    className={`font-sans text-sm uppercase tracking-widest transition-colors duration-200 ${
                      isActive
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

          {/* ── CTA BUTTON (desktop) ─────────────────────────── */}
          <Link
            href="/contact"
            className="hidden lg:inline-flex items-center font-sans bg-[#FF0700] hover:bg-[#D90600] active:bg-[#BB0500] text-white font-bold text-sm uppercase tracking-widest px-7 py-3 transition-colors duration-150 shrink-0"
          >
            Contact Us
          </Link>

          {/* ── MOBILE HAMBURGER ─────────────────────────────── */}
          <button
            className="lg:hidden text-white p-2 shrink-0"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── MOBILE DRAWER ────────────────────────────────────────── */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 bg-[#050A0F]/98 border-t border-white/8 ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-4 gap-1">
          {navLinks.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <li key={label}>
                <Link
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`block font-sans text-sm uppercase tracking-widest py-3 transition-colors duration-200 ${
                    isActive ? "text-white font-bold" : "text-gray-400 hover:text-white"
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
  );
}
