"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Map, { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { DARK_STYLE, US_VIEW } from "@/lib/map";
import type { Project } from "@/lib/types";

export function HomeMap({ projects, animate = false }: { projects: Project[]; animate?: boolean }) {
  const router = useRouter();
  const wrapRef = useRef<HTMLDivElement>(null);
  // When `animate`, hold the pins hidden until the map scrolls into view, then
  // drop them in sequence so the map appears to build itself.
  const [shown, setShown] = useState(!animate);

  useEffect(() => {
    if (!animate || !wrapRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, [animate]);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Map
        initialViewState={{ ...US_VIEW, zoom: 3.9 }}
        mapStyle={DARK_STYLE}
        attributionControl={false}
        dragPan={false}
        scrollZoom={false}
        doubleClickZoom={false}
        touchZoomRotate={false}
        keyboard={false}
        style={{ width: "100%", height: "100%" }}
      >
        {projects.map((p, i) => (
          <Marker key={p._id} longitude={p.location.lng} latitude={p.location.lat} anchor="center">
            <div
              className={`pin ${animate && !shown ? "opacity-0" : ""} ${animate && shown ? "pin-drop" : ""}`}
              data-cat={p.category}
              style={animate && shown ? { animationDelay: `${i * 0.07}s` } : undefined}
              onClick={() => router.push(`/projects?project=${p.slug}`)}
              title={`${p.title}, ${p.city}, ${p.state}`}
            >
              <span className="pin-ring" />
              <span className="pin-dot" />
            </div>
          </Marker>
        ))}
      </Map>
    </div>
  );
}
