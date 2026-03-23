"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealDirection = "up" | "down" | "left" | "right" | "fade";

interface UseRevealOptions {
  direction?: RevealDirection;
  duration?: number;
  delay?: number;
  distance?: number;
  stagger?: number;
  start?: string;
  once?: boolean;
}

/**
 * Reusable GSAP scroll-reveal hook.
 * Attach the returned `ref` to any container element.
 * All direct children (or elements matching `selector`) will animate in.
 *
 * @example
 * const ref = useReveal({ direction: "up", stagger: 0.15 });
 * return <div ref={ref}>...</div>
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseRevealOptions = {}
) {
  const ref = useRef<T>(null);

  const {
    direction = "up",
    duration = 0.9,
    delay = 0,
    distance = 50,
    stagger = 0,
    start = "top 85%",
    once = true,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger > 0 ? el.children : [el];

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      duration,
      delay,
      ease: "power3.out",
    };

    switch (direction) {
      case "up":
        fromVars.y = distance;
        break;
      case "down":
        fromVars.y = -distance;
        break;
      case "left":
        fromVars.x = distance;
        break;
      case "right":
        fromVars.x = -distance;
        break;
      case "fade":
      default:
        break;
    }

    const toVars: gsap.TweenVars = {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease: "power3.out",
      stagger: stagger,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: once ? "play none none none" : "play none none reverse",
      },
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(targets, fromVars, toVars);
    }, el);

    return () => ctx.revert();
  }, [direction, duration, delay, distance, stagger, start, once]);

  return ref;
}
