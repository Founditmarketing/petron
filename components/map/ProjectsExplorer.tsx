"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Map, { Marker, NavigationControl, type MapRef, type ViewStateChangeEvent } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { AnimatePresence, motion } from "framer-motion";
import Supercluster from "supercluster";
import { DARK_STYLE, US_VIEW, categoryMeta } from "@/lib/map";
import { Gallery } from "@/components/ui/Gallery";
import { MapSkeleton } from "@/components/ui/MapSkeleton";
import { BottomSheet } from "@/components/ui/BottomSheet";
import type { Project, ProjectCategory } from "@/lib/types";

const ALL_CATS: ProjectCategory[] = ["fuel", "retail", "government"];

export function ProjectsExplorer({
  projects,
  initialSlug,
}: {
  projects: Project[];
  initialSlug?: string;
}) {
  const mapRef = useRef<MapRef | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const [cats, setCats] = useState<Set<ProjectCategory>>(new Set(ALL_CATS));
  const [client, setClient] = useState<string>("All clients");
  const [selected, setSelected] = useState<string | null>(initialSlug ?? null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [bbox, setBbox] = useState<[number, number, number, number]>([-130, 22, -65, 50]);
  const [zoom, setZoom] = useState(US_VIEW.zoom);
  const [mobileView, setMobileView] = useState<"map" | "list">("map");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const activeFilterCount = (cats.size < ALL_CATS.length ? 1 : 0) + (client !== "All clients" ? 1 : 0);

  const clients = useMemo(
    () => ["All clients", ...Array.from(new Set(projects.map((p) => p.client))).sort()],
    [projects]
  );

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) => cats.has(p.category) && (client === "All clients" || p.client === client)
      ),
    [projects, cats, client]
  );

  const index = useMemo(() => {
    const sc = new Supercluster<{ project: Project }>({ radius: 56, maxZoom: 14 });
    sc.load(
      filtered.map((p) => ({
        type: "Feature" as const,
        properties: { project: p },
        geometry: { type: "Point" as const, coordinates: [p.location.lng, p.location.lat] },
      }))
    );
    return sc;
  }, [filtered]);

  const clusters = useMemo(
    () => index.getClusters(bbox, Math.round(zoom)),
    [index, bbox, zoom]
  );

  const syncBounds = useCallback(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;
    const b = map.getBounds();
    setBbox([b.getWest(), b.getSouth(), b.getEast(), b.getNorth()]);
    setZoom(map.getZoom());
  }, []);

  const active = filtered.find((p) => p.slug === selected) ?? projects.find((p) => p.slug === selected);

  const syncUrl = (slug: string | null) => {
    const url = new URL(window.location.href);
    if (slug) url.searchParams.set("project", slug);
    else url.searchParams.delete("project");
    window.history.replaceState(null, "", url.toString());
  };

  const select = useCallback((p: Project) => {
    setSelected(p.slug);
    syncUrl(p.slug);
    mapRef.current?.flyTo({
      center: [p.location.lng, p.location.lat],
      zoom: 6.5,
      duration: 1400,
      essential: true,
    });
  }, []);

  const close = useCallback(() => {
    setSelected(null);
    syncUrl(null);
  }, []);

  useEffect(() => {
    if (!selected) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, close]);

  const toggleCat = (c: ProjectCategory) => {
    setCats((prev) => {
      const next = new Set(prev);
      if (next.has(c) && next.size > 1) next.delete(c);
      else next.add(c);
      return next;
    });
  };

  return (
    <div className="relative h-[calc(100dvh-4rem)] lg:grid lg:grid-cols-[360px_1fr]">
      {/* Desktop sidebar */}
      <aside className="hidden flex-col border-r border-line-soft bg-base-2/95 backdrop-blur-sm lg:flex">
        <div className="border-b border-line-soft p-5">
          <p className="eyebrow mb-2">Filter the map</p>
          <div className="flex flex-wrap gap-2">
            {ALL_CATS.map((c) => {
              const on = cats.has(c);
              return (
                <button
                  key={c}
                  onClick={() => toggleCat(c)}
                  className="tag transition-colors"
                  style={{
                    borderColor: on ? categoryMeta[c].colorVar : undefined,
                    color: on ? "var(--text)" : "var(--muted)",
                    background: on ? "color-mix(in oklch, var(--surface) 80%, transparent)" : "transparent",
                  }}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: on ? categoryMeta[c].colorVar : "var(--line)" }}
                  />
                  {categoryMeta[c].short}
                </button>
              );
            })}
          </div>

          <select
            value={client}
            onChange={(e) => setClient(e.target.value)}
            aria-label="Filter by client"
            className="mt-4 w-full appearance-none border border-line bg-surface px-3 py-2.5 font-mono text-xs uppercase tracking-wider text-text-dim outline-none focus:border-amber"
          >
            {clients.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <p className="mt-4 font-mono text-xs tracking-widest text-muted">
            <span className="text-amber">{filtered.length}</span> {filtered.length === 1 ? "project" : "projects"} shown
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.map((p) => (
            <button
              key={p._id}
              onClick={() => select(p)}
              className={`flex w-full items-center gap-3 border-b border-line-soft p-4 text-left transition-colors hover:bg-surface ${
                selected === p.slug ? "bg-surface" : ""
              }`}
            >
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: categoryMeta[p.category].colorVar }}
              />
              <span className="min-w-0">
                <span className="block truncate font-cond font-semibold text-text">{p.title}</span>
                <span className="block truncate font-mono text-[0.68rem] uppercase tracking-wider text-muted">
                  {p.city}, {p.state} · {p.year}
                </span>
              </span>
            </button>
          ))}
        </div>
      </aside>

      {/* Map */}
      <div className="relative h-full">
        {!mapLoaded && <MapSkeleton />}
        <Map
          ref={mapRef}
          initialViewState={US_VIEW}
          mapStyle={DARK_STYLE}
          attributionControl={{ compact: true }}
          onLoad={() => {
            setMapLoaded(true);
            syncBounds();
          }}
          onMove={(e: ViewStateChangeEvent) => setZoom(e.viewState.zoom)}
          onMoveEnd={syncBounds}
          style={{ width: "100%", height: "100%" }}
        >
          <NavigationControl position="bottom-right" showCompass={false} />
          {clusters.map((c) => {
            const [lng, lat] = c.geometry.coordinates;
            if ("cluster" in c.properties && c.properties.cluster) {
              const count = c.properties.point_count;
              const size = 34 + Math.min(count, filtered.length) * 2.5;
              return (
                <Marker key={`cluster-${c.id}`} longitude={lng} latitude={lat} anchor="center">
                  <button
                    className="cluster"
                    style={{ width: size, height: size }}
                    aria-label={`${count} projects, zoom in`}
                    onClick={(e) => {
                      e.stopPropagation();
                      const zoomTo = Math.min(index.getClusterExpansionZoom(c.id as number), 12);
                      mapRef.current?.flyTo({ center: [lng, lat], zoom: zoomTo, duration: 900, essential: true });
                    }}
                  >
                    {count}
                  </button>
                </Marker>
              );
            }
            const p = c.properties.project;
            return (
              <Marker key={p._id} longitude={lng} latitude={lat} anchor="center">
                <div
                  className="pin"
                  data-cat={p.category}
                  data-active={selected === p.slug}
                  onClick={(e) => {
                    e.stopPropagation();
                    select(p);
                  }}
                  title={`${p.title}, ${p.city}, ${p.state}`}
                >
                  <span className="pin-ring" />
                  <span className="pin-dot" />
                  <span className="pin-label">{p.title} · {p.state}</span>
                </div>
              </Marker>
            );
          })}
        </Map>

        {/* Legend (desktop) */}
        <div className="pointer-events-none absolute left-4 top-4 hidden gap-4 rounded-sm border border-line-soft bg-base/80 px-4 py-2.5 backdrop-blur-sm lg:flex">
          {ALL_CATS.map((c) => (
            <span key={c} className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-text-dim">
              <span className="h-2 w-2 rounded-full" style={{ background: categoryMeta[c].colorVar }} />
              {categoryMeta[c].short}
            </span>
          ))}
        </div>

        {/* Mobile control bar */}
        <div className="absolute inset-x-0 top-0 z-30 flex items-center gap-2 p-3 lg:hidden">
          <div className="flex rounded-full border border-line bg-base/85 p-1 backdrop-blur-md">
            {(["map", "list"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setMobileView(v)}
                className={`rounded-full px-5 py-2 font-cond text-sm font-bold uppercase tracking-wide transition-colors ${
                  mobileView === v ? "bg-amber text-base" : "text-text-dim"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          <button
            onClick={() => setFiltersOpen(true)}
            className="ml-auto flex items-center gap-2 rounded-full border border-line bg-base/85 px-5 py-2.5 font-cond text-sm font-bold uppercase tracking-wide text-text backdrop-blur-md"
          >
            Filters
            {activeFilterCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber font-mono text-[0.7rem] text-base">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile list overlay */}
        <AnimatePresence>
          {mobileView === "list" && (
            <motion.div
              className="absolute inset-0 z-20 overflow-y-auto overscroll-contain bg-base pb-24 pt-16 lg:hidden"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="px-5 pb-2 pt-2 font-mono text-xs tracking-widest text-muted">
                <span className="text-amber">{filtered.length}</span> {filtered.length === 1 ? "project" : "projects"}
              </p>
              {filtered.map((p) => (
                <button
                  key={p._id}
                  onClick={() => select(p)}
                  className="flex w-full items-center gap-3 border-b border-line-soft p-4 text-left active:bg-surface"
                >
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: categoryMeta[p.category].colorVar }} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-cond text-lg font-semibold text-text">{p.title}</span>
                    <span className="block truncate font-mono text-[0.68rem] uppercase tracking-wider text-muted">
                      {p.client} · {p.city}, {p.state}
                    </span>
                  </span>
                  <span className="font-display text-xl text-line">→</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Case study drawer */}
        <AnimatePresence>
          {active && (
            <motion.div
              key={active.slug}
              role="dialog"
              aria-modal="false"
              aria-label={`${active.title} case study`}
              className="fixed inset-0 z-[60] w-full overflow-y-auto bg-base-2 shadow-2xl lg:absolute lg:inset-y-0 lg:left-auto lg:right-0 lg:max-w-md lg:border-l lg:border-line"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative h-56 w-full">
                <Image src={active.image} alt={active.title} fill className="object-cover" sizes="448px" />
                <div className="absolute inset-0 bg-gradient-to-t from-base-2 via-base-2/20 to-transparent" />
                <button
                  ref={closeRef}
                  onClick={close}
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-sm border border-line bg-base/70 text-text-dim backdrop-blur-sm hover:text-amber"
                  aria-label="Close case study"
                >
                  ✕
                </button>
                <span
                  className="absolute left-4 top-4 tag"
                  style={{ borderColor: categoryMeta[active.category].colorVar, color: "var(--text)" }}
                >
                  {categoryMeta[active.category].short}
                </span>
              </div>

              <div className="p-6 pb-24 lg:pb-6">
                <p className="font-mono text-xs uppercase tracking-widest text-amber">{active.client}</p>
                <h2 className="mt-1 font-display text-3xl uppercase leading-none text-text">{active.title}</h2>
                <p className="mt-1 font-mono text-xs tracking-wider text-muted">
                  {active.city}, {active.state} · {active.year}
                </p>

                <p className="mt-5 text-sm leading-relaxed text-text-dim">{active.summary}</p>

                <h3 className="eyebrow mt-7 mb-3">Scope of work</h3>
                <ul className="space-y-2">
                  {active.scope.map((s) => (
                    <li key={s} className="flex items-start gap-2.5 text-sm text-text-dim">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-amber" />
                      {s}
                    </li>
                  ))}
                </ul>

                <h3 className="eyebrow mt-7 mb-3">Services</h3>
                <div className="flex flex-wrap gap-2">
                  {active.services.map((s) => (
                    <span key={s} className="tag">{s}</span>
                  ))}
                </div>

                <h3 className="eyebrow mt-7 mb-3">Gallery</h3>
                <Gallery images={active.gallery} alt={active.title} />

                <Link href="/contact" className="btn btn-amber mt-8 w-full justify-center">
                  Start a Project
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile filters sheet */}
      <BottomSheet open={filtersOpen} onClose={() => setFiltersOpen(false)} title="Filter the map">
        <p className="eyebrow mb-3">Project type</p>
        <div className="flex flex-wrap gap-2">
          {ALL_CATS.map((c) => (
            <button key={c} onClick={() => toggleCat(c)} className="chip" data-on={cats.has(c)}>
              <span className="h-2 w-2 rounded-full" style={{ background: cats.has(c) ? categoryMeta[c].colorVar : "var(--line)" }} />
              {categoryMeta[c].short}
            </button>
          ))}
        </div>

        <p className="eyebrow mb-3 mt-6">Client</p>
        <select
          value={client}
          onChange={(e) => setClient(e.target.value)}
          aria-label="Filter by client"
          className="w-full appearance-none border border-line bg-surface px-3 py-3 font-mono text-sm uppercase tracking-wider text-text-dim outline-none focus:border-amber"
        >
          {clients.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <button
          onClick={() => {
            setFiltersOpen(false);
            setMobileView("map");
          }}
          className="btn btn-amber mt-7 w-full justify-center"
        >
          Show {filtered.length} {filtered.length === 1 ? "project" : "projects"}
        </button>
      </BottomSheet>
    </div>
  );
}
