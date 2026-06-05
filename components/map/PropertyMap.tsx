"use client";

import { useRef, useState } from "react";
import Map, { Marker, NavigationControl, type MapRef } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { DARK_STYLE } from "@/lib/map";
import { MapSkeleton } from "@/components/ui/MapSkeleton";
import type { Property } from "@/lib/types";

export function PropertyMap({
  properties,
  activeSlug,
  onSelect,
  onHover,
  center,
  zoom = 11,
  interactive = true,
  className = "",
}: {
  properties: Property[];
  activeSlug?: string | null;
  onSelect?: (slug: string) => void;
  onHover?: (slug: string | null) => void;
  center?: { lat: number; lng: number };
  zoom?: number;
  interactive?: boolean;
  className?: string;
}) {
  const mapRef = useRef<MapRef | null>(null);
  const [loaded, setLoaded] = useState(false);

  const initial = center
    ? { longitude: center.lng, latitude: center.lat, zoom }
    : { longitude: -92.45, latitude: 31.29, zoom: 11.2 };

  return (
    <div className={`relative ${className}`}>
      {!loaded && <MapSkeleton />}
      <Map
        ref={mapRef}
        initialViewState={initial}
        mapStyle={DARK_STYLE}
        attributionControl={{ compact: true }}
        interactive={interactive}
        onLoad={() => setLoaded(true)}
        style={{ width: "100%", height: "100%" }}
      >
        {interactive && <NavigationControl position="bottom-right" showCompass={false} />}
        {properties.map((p) => (
          <Marker key={p._id} longitude={p.location.lng} latitude={p.location.lat} anchor="center">
            <div
              className="pin"
              data-cat="retail"
              data-active={activeSlug === p.slug}
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.(p.slug);
              }}
              onMouseEnter={() => onHover?.(p.slug)}
              onMouseLeave={() => onHover?.(null)}
              title={p.title}
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
