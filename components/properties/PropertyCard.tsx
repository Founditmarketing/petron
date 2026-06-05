"use client";

import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/lib/types";

const typeLabel: Record<Property["type"], string> = {
  office: "Office",
  warehouse: "Warehouse",
  retail: "Retail",
};

export function PropertyCard({
  property,
  onHover,
  active,
}: {
  property: Property;
  onHover?: (slug: string | null) => void;
  active?: boolean;
}) {
  return (
    <Link
      href={`/properties/${property.slug}`}
      onMouseEnter={() => onHover?.(property.slug)}
      onMouseLeave={() => onHover?.(null)}
      className={`group block overflow-hidden border bg-base-2 transition-[transform,border-color] duration-200 active:scale-[0.99] ${
        active ? "border-amber" : "border-line-soft hover:border-line"
      }`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-2/80 to-transparent" />
        <span className="absolute left-3 top-3 tag bg-base/70 backdrop-blur-sm">{typeLabel[property.type]}</span>
        <span
          className={`absolute right-3 top-3 tag bg-base/70 backdrop-blur-sm ${
            property.available ? "text-ok" : "text-muted"
          }`}
          style={{ borderColor: property.available ? "var(--ok)" : undefined }}
        >
          {property.available ? "Available" : "Leased"}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl uppercase leading-none text-text">{property.title}</h3>
        </div>
        <p className="mt-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-muted">{property.city}</p>
        <div className="mt-4 flex items-center justify-between border-t border-line-soft pt-3">
          <span className="font-cond font-semibold text-text">
            {property.sqft.toLocaleString()} <span className="text-muted">sqft</span>
          </span>
          <span className="font-mono text-xs text-amber">{property.leaseRate}</span>
        </div>
      </div>
    </Link>
  );
}
