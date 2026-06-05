"use client";

import { useRouter } from "next/navigation";
import Map, { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { DARK_STYLE, US_VIEW } from "@/lib/map";
import type { Project } from "@/lib/types";

export function HomeMap({ projects, animate = false }: { projects: Project[]; animate?: boolean }) {
  const router = useRouter();
  return (
    <div className="absolute inset-0">
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
              className={`pin ${animate ? "pin-drop" : ""}`}
              data-cat={p.category}
              style={animate ? { animationDelay: `${0.4 + i * 0.08}s` } : undefined}
              onClick={() => router.push(`/projects?project=${p.slug}`)}
              title={`${p.title} — ${p.city}, ${p.state}`}
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
