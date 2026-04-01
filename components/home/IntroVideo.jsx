"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function IntroVideo() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".intro-video-content",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".intro-video-content",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-[#0d0a3d] py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="intro-video-content text-center opacity-0">

          {/* Label */}
          <span className="font-sans text-[#FFBF00] text-xs font-semibold tracking-[0.35em] uppercase block mb-4">
            Meet Our Church
          </span>

          {/* Heading */}
          <h2 className="font-serif text-white text-3xl md:text-4xl leading-tight mb-5">
            Watch Our Story
          </h2>

          {/* Subtext */}
          <p className="font-sans text-white/60 text-base leading-relaxed max-w-xl mx-auto mb-10">
            Get to know Heavenly Liberation Global Assembly — who we are,
            what we believe, and the community you can be part of.
          </p>

          {/* YouTube embed — responsive 16:9 */}
          <div className="relative w-full aspect-video max-w-3xl mx-auto shadow-2xl shadow-black/50">
            <iframe
              src="https://www.youtube.com/embed/-oYlOaUrdag"
              title="Heavenly Liberation Global Assembly Introduction"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
