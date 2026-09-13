"use client";

import * as React from "react";

/**
 * Section 3.6 & Section 5.1: The Beam Sweep Motif
 * - Adapted to use the teal accent token (#087F8C) from DEV-03 confirmed brand palette.
 * - Slow gradient sweep (3 seconds).
 * - Opacity capped at 0.25.
 * - Paused when off-screen via IntersectionObserver.
 * - Completely disabled under prefers-reduced-motion: reduce.
 */
export function HeroBeamSweep() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = React.useState(true);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="hero-beam-element absolute -top-1/2 -left-1/2 h-[200%] w-[200%]"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(8, 127, 140, 0.25) 0%, rgba(8, 127, 140, 0.08) 45%, transparent 70%)",
          animation: isIntersecting ? "hero-beam-sweep 3s ease-in-out infinite alternate" : "none",
          animationPlayState: isIntersecting ? "running" : "paused",
        }}
      />
      <style jsx>{`
        @keyframes hero-beam-sweep {
          0% {
            transform: translate3d(-15%, -10%, 0) rotate(-6deg);
            opacity: 0.12;
          }
          50% {
            opacity: 0.25;
          }
          100% {
            transform: translate3d(15%, 10%, 0) rotate(6deg);
            opacity: 0.18;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-beam-element {
            animation: none !important;
            opacity: 0.1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
