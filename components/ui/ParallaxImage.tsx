"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/** Drop-in absolute image layer with a subtle scroll parallax.
 *  Place inside a `relative overflow-hidden` parent. */
export function ParallaxImage({
  src,
  alt,
  sizes,
  intensity = 10,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  sizes?: string;
  intensity?: number;
  className?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${intensity}%`, `${intensity}%`]);

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div style={{ y: reduce ? 0 : y }} className="absolute inset-x-0 -top-[14%] h-[128%]">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </motion.div>
    </div>
  );
}
