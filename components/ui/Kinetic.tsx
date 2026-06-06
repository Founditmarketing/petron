"use client";

import { ReactNode, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/** Thin amber rule at the very top that tracks scroll progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-amber"
    />
  );
}

/** A quiet signature for anyone who opens the console. */
export function ConsoleSignature() {
  useEffect(() => {
    console.log(
      "%cPETRON",
      "color:#f0a020;font:700 22px/1 sans-serif;letter-spacing:2px"
    );
    console.log(
      "%cBuilding on a firm foundation. Looking for the crew that builds things that last? info@petron-us.com",
      "color:#9aa0ab;font:13px sans-serif"
    );
  }, []);
  return null;
}

/** Masked line that rises into view from below its own clip box. Cinematic
 *  title-sequence reveal for big display headlines. Reduced-motion: plain fade. */
export function MaskReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className={`block ${className}`}
        initial={reduce ? { opacity: 0 } : { y: "112%" }}
        animate={reduce ? { opacity: 1 } : { y: "0%" }}
        transition={{ duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** A thin rule that draws out from the left on mount. */
export function DrawRule({
  delay = 0,
  className = "",
}: {
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      className={`block h-px origin-left bg-amber ${className}`}
      initial={reduce ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0.8 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}

/** Wraps an interactive element so it subtly pulls toward the cursor. Pointer
 *  physics run on motion values (never React state). Reduced-motion: inert. */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.3 });

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: reduce ? 0 : sx, y: reduce ? 0 : sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.span>
  );
}
