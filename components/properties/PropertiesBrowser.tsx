"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PropertyCard } from "./PropertyCard";
import { PropertyMap } from "@/components/map/PropertyMap";
import { BottomSheet } from "@/components/ui/BottomSheet";
import type { Property, PropertyType } from "@/lib/types";

const TYPES: { value: PropertyType; label: string }[] = [
  { value: "office", label: "Office" },
  { value: "warehouse", label: "Warehouse" },
  { value: "retail", label: "Retail" },
];

export function PropertiesBrowser({ properties }: { properties: Property[] }) {
  const router = useRouter();
  const [types, setTypes] = useState<Set<PropertyType>>(new Set());
  const [minSqft, setMinSqft] = useState(0);
  const [city, setCity] = useState("All locations");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [view, setView] = useState<"grid" | "map">("grid");
  const [hovered, setHovered] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const hasFilters = types.size > 0 || minSqft > 0 || city !== "All locations" || onlyAvailable;
  const filterCount =
    (types.size > 0 ? 1 : 0) + (minSqft > 0 ? 1 : 0) + (city !== "All locations" ? 1 : 0) + (onlyAvailable ? 1 : 0);

  const maxSqft = useMemo(() => Math.max(...properties.map((p) => p.sqft)), [properties]);
  const cities = useMemo(
    () => ["All locations", ...Array.from(new Set(properties.map((p) => p.city))).sort()],
    [properties]
  );

  const filtered = useMemo(
    () =>
      properties.filter(
        (p) =>
          (types.size === 0 || types.has(p.type)) &&
          p.sqft >= minSqft &&
          (city === "All locations" || p.city === city) &&
          (!onlyAvailable || p.available)
      ),
    [properties, types, minSqft, city, onlyAvailable]
  );

  const toggleType = (t: PropertyType) =>
    setTypes((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });

  const reset = () => {
    setTypes(new Set());
    setMinSqft(0);
    setCity("All locations");
    setOnlyAvailable(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
      {/* Controls */}
      <div className="sticky top-16 z-30 -mx-5 mb-8 border-y border-line-soft bg-base/92 backdrop-blur-md sm:-mx-8">
        {/* Desktop controls */}
        <div className="hidden flex-wrap items-center gap-x-6 gap-y-4 px-5 py-4 md:flex sm:px-8">
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => {
              const on = types.has(t.value);
              return (
                <button
                  key={t.value}
                  onClick={() => toggleType(t.value)}
                  className={`tag transition-colors ${on ? "border-amber text-text" : "hover:border-line"}`}
                  style={on ? { background: "color-mix(in oklch, var(--surface) 80%, transparent)" } : undefined}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          <div className="flex min-w-[200px] flex-1 items-center gap-3">
            <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">Min sqft</span>
            <input
              type="range"
              min={0}
              max={maxSqft}
              step={1000}
              value={minSqft}
              onChange={(e) => setMinSqft(Number(e.target.value))}
              className="flex-1"
              aria-label="Minimum square footage"
            />
            <span className="w-16 text-right font-mono text-xs text-amber">{minSqft.toLocaleString()}</span>
          </div>

          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            aria-label="Filter by location"
            className="appearance-none border border-line bg-surface px-3 py-2 font-mono text-xs uppercase tracking-wider text-text-dim outline-none focus:border-amber"
          >
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <label className="flex cursor-pointer items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-text-dim">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              className="h-3.5 w-3.5 accent-[oklch(0.74_0.15_150)]"
            />
            Available only
          </label>

          <div className="ml-auto flex items-center gap-3">
            {hasFilters && (
              <button
                onClick={reset}
                className="font-mono text-[0.65rem] uppercase tracking-widest text-muted underline-offset-4 hover:text-amber hover:underline"
              >
                Clear
              </button>
            )}
            <span className="font-mono text-xs tracking-widest text-muted">
              <span className="text-amber">{filtered.length}</span> / {properties.length}
            </span>
            <div className="flex border border-line">
              {(["grid", "map"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-widest transition-colors ${
                    view === v ? "bg-amber text-base" : "text-text-dim hover:text-text"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden">
          <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pt-3">
            {TYPES.map((t) => (
              <button key={t.value} onClick={() => toggleType(t.value)} className="chip" data-on={types.has(t.value)}>
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 px-5 py-3">
            <button
              onClick={() => setFiltersOpen(true)}
              className="flex items-center gap-2 rounded-full border border-line px-4 py-2 font-cond text-sm font-bold uppercase tracking-wide text-text"
            >
              Filters
              {filterCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber font-mono text-[0.7rem] text-base">
                  {filterCount}
                </span>
              )}
            </button>
            <span className="font-mono text-xs tracking-widest text-muted">
              <span className="text-amber">{filtered.length}</span> / {properties.length}
            </span>
            <div className="ml-auto flex rounded-full border border-line p-0.5">
              {(["grid", "map"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`rounded-full px-4 py-1.5 font-mono text-[0.65rem] uppercase tracking-widest transition-colors ${
                    view === v ? "bg-amber text-base" : "text-text-dim"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="border border-line-soft bg-base-2 py-24 text-center">
          <p className="font-display text-3xl uppercase text-text">No matches</p>
          <p className="mt-2 text-sm text-muted">Try widening your filters.</p>
          <button onClick={reset} className="btn btn-ghost mt-6">Reset filters</button>
        </div>
      ) : view === "grid" ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PropertyCard key={p._id} property={p} onHover={setHovered} active={hovered === p.slug} />
          ))}
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
          <PropertyMap
            properties={filtered}
            activeSlug={hovered}
            onHover={setHovered}
            onSelect={(slug) => router.push(`/properties/${slug}`)}
            className="h-[52vh] overflow-hidden border border-line-soft lg:sticky lg:top-36 lg:h-[70vh]"
          />
          <div className="space-y-4 lg:max-h-[70vh] lg:overflow-y-auto lg:pr-1">
            {filtered.map((p) => (
              <PropertyCard key={p._id} property={p} onHover={setHovered} active={hovered === p.slug} />
            ))}
          </div>
        </div>
      )}

      {/* Mobile filters sheet */}
      <BottomSheet open={filtersOpen} onClose={() => setFiltersOpen(false)} title="Filters">
        <p className="eyebrow mb-3">Property type</p>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <button key={t.value} onClick={() => toggleType(t.value)} className="chip" data-on={types.has(t.value)}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="mb-3 mt-6 flex items-center justify-between">
          <p className="eyebrow">Minimum size</p>
          <span className="font-mono text-sm text-amber">{minSqft.toLocaleString()} sqft</span>
        </div>
        <input
          type="range"
          min={0}
          max={maxSqft}
          step={1000}
          value={minSqft}
          onChange={(e) => setMinSqft(Number(e.target.value))}
          className="w-full"
          aria-label="Minimum square footage"
        />

        <p className="eyebrow mb-3 mt-6">Location</p>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          aria-label="Filter by location"
          className="w-full appearance-none border border-line bg-surface px-3 py-3 font-mono text-sm uppercase tracking-wider text-text-dim outline-none focus:border-amber"
        >
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <label className="mt-6 flex cursor-pointer items-center justify-between border-y border-line-soft py-4">
          <span className="font-cond font-semibold uppercase tracking-wide text-text">Available only</span>
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={(e) => setOnlyAvailable(e.target.checked)}
            className="h-5 w-5 accent-[oklch(0.74_0.15_150)]"
          />
        </label>

        <div className="mt-7 flex gap-3">
          {hasFilters && (
            <button onClick={reset} className="btn btn-ghost flex-1 justify-center">
              Clear
            </button>
          )}
          <button onClick={() => setFiltersOpen(false)} className="btn btn-amber flex-1 justify-center">
            Show {filtered.length}
          </button>
        </div>
      </BottomSheet>
    </div>
  );
}
