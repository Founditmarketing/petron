"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSpring, useReducedMotion } from "framer-motion";
import type { Property } from "@/lib/types";
import { PropertyCard } from "./PropertyCard";

export type RateInfo = {
  type: "office" | "warehouse" | "retail";
  label: string;
  min: number;
  max: number;
  count: number;
};

/** Spring-animated integer, isolated so only this node re-renders per frame. */
function AnimatedInt({ value }: { value: number }) {
  const reduce = useReducedMotion();
  const spring = useSpring(value, { stiffness: 80, damping: 18, mass: 0.4 });
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (reduce) {
      setShown(value);
      return;
    }
    spring.set(value);
  }, [value, reduce, spring]);

  useEffect(() => spring.on("change", (v) => setShown(v)), [spring]);

  return <>{Math.round(shown).toLocaleString("en-US")}</>;
}

const MIN_SQFT = 1000;
const MAX_SQFT = 60000;
const PRESETS = [2500, 5000, 10000, 25000];

export function LeaseEstimator({
  rates,
  properties,
}: {
  rates: RateInfo[];
  properties: Property[];
}) {
  // Default to the type with the most available space.
  const defaultIndex = rates.reduce(
    (best, r, i, arr) => (r.count > arr[best].count ? i : best),
    0
  );
  const [typeIndex, setTypeIndex] = useState(defaultIndex);
  const [sqft, setSqft] = useState(5000);

  const rate = rates[typeIndex];
  const monthlyLow = Math.round((sqft * rate.min) / 12);
  const monthlyHigh = Math.round((sqft * rate.max) / 12);
  const annualLow = sqft * rate.min;
  const annualHigh = sqft * rate.max;

  const matches = properties
    .filter((p) => p.type === rate.type && p.available)
    .sort((a, b) => b.sqft - a.sqft);

  return (
    <div className="grid gap-px overflow-hidden border border-line-soft bg-line-soft lg:grid-cols-2">
      {/* Controls */}
      <div className="bg-base-2 p-7 sm:p-10">
        <span className="font-cond text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          1 / Space type
        </span>
        <div className="mt-3 flex flex-wrap gap-2">
          {rates.map((r, i) => (
            <button
              key={r.type}
              type="button"
              onClick={() => setTypeIndex(i)}
              className="chip"
              data-on={i === typeIndex}
            >
              {r.label}
            </button>
          ))}
        </div>

        <div className="mt-9 flex items-baseline justify-between">
          <span className="font-cond text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            2 / Square footage
          </span>
          <span className="font-display text-3xl leading-none text-text">
            {sqft.toLocaleString()}
            <span className="ml-1 font-cond text-sm font-semibold uppercase tracking-wide text-muted">
              sqft
            </span>
          </span>
        </div>
        <input
          type="range"
          min={MIN_SQFT}
          max={MAX_SQFT}
          step={500}
          value={sqft}
          onChange={(e) => setSqft(Number(e.target.value))}
          aria-label="Square footage"
          className="mt-5 w-full"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setSqft(p)}
              className="chip"
              data-on={sqft === p}
            >
              {(p / 1000).toLocaleString()}k
            </button>
          ))}
        </div>

        <p className="mt-9 border-t border-line-soft pt-5 text-sm leading-relaxed text-muted">
          <span className="font-cond font-semibold text-text">{rate.count}</span>{" "}
          {rate.label.toLowerCase()} {rate.count === 1 ? "space" : "spaces"} available now at
          published rates of ${rate.min}&ndash;${rate.max} / sqft.
        </p>
      </div>

      {/* Result */}
      <div className="relative flex flex-col justify-between bg-base p-7 sm:p-10">
        <div className="concrete absolute inset-0" />
        <div className="relative">
          <span className="font-cond text-xs font-semibold uppercase tracking-[0.16em] text-amber">
            Estimated base rent
          </span>
          <div className="mt-4 font-display leading-[0.92] text-text">
            <span className="text-[clamp(2.6rem,6vw,4.5rem)] text-amber">
              $<AnimatedInt value={monthlyLow} />
            </span>
            <span className="mx-2 text-[clamp(2rem,4vw,3rem)] text-muted">&ndash;</span>
            <span className="text-[clamp(2.6rem,6vw,4.5rem)] text-amber">
              $<AnimatedInt value={monthlyHigh} />
            </span>
            <span className="ml-2 font-cond text-base font-semibold uppercase tracking-wide text-muted">
              / mo
            </span>
          </div>
          <p className="mt-3 font-cond text-sm font-semibold uppercase tracking-wide text-text-dim">
            ${" "}
            <AnimatedInt value={annualLow} /> &ndash; ${" "}
            <AnimatedInt value={annualHigh} /> / year
          </p>
          <p className="mt-5 max-w-sm text-xs leading-relaxed text-muted">
            A ballpark on base rent only, from our published rates. NNN and FSG terms,
            improvements, and incentives are settled in person. No surprises.
          </p>
        </div>

        <div className="relative mt-8 flex flex-wrap gap-3">
          <Link href="/contact" className="btn btn-amber">
            Schedule a Tour
          </Link>
          <Link href="/properties" className="btn btn-ghost">
            Browse All Spaces
          </Link>
        </div>
      </div>

      {/* Matching available spaces */}
      <div className="bg-base-2 p-7 sm:p-10 lg:col-span-2">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <span className="font-cond text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Available {rate.label.toLowerCase()} spaces
          </span>
          <Link
            href="/properties"
            className="font-cond text-xs font-semibold uppercase tracking-[0.16em] text-text-dim transition-colors hover:text-amber"
          >
            View all {rate.count} &rarr;
          </Link>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {matches.slice(0, 3).map((p) => (
            <PropertyCard key={p._id} property={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
