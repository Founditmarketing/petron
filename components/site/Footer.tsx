import Link from "next/link";
import { Logo } from "./Logo";
import type { SiteSettings } from "@/lib/types";

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="relative mt-px border-t border-line-soft bg-base-2">
      <div className="hazard-rule" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 pb-28 sm:px-8 lg:pb-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              A rugged general contractor, fuel-system installer, and commercial real-estate developer.
              Building on a firm foundation since day one.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="tag">Licensed</span>
              <span className="tag">Bonded</span>
              <span className="tag">Building across the U.S.</span>
            </div>
          </div>

          <div>
            <h3 className="eyebrow mb-4">Explore</h3>
            <ul className="space-y-2.5 text-sm text-text-dim">
              <li><Link href="/projects" className="link-underline hover:text-text">Project Map</Link></li>
              <li><Link href="/properties" className="link-underline hover:text-text">Available Properties</Link></li>
              <li><Link href="/services" className="link-underline hover:text-text">Services</Link></li>
              <li><Link href="/about" className="link-underline hover:text-text">About Petron</Link></li>
              <li><Link href="/contact" className="link-underline hover:text-text">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow mb-4">Office</h3>
            <address className="space-y-1.5 text-sm not-italic text-text-dim">
              <p>{settings.address}</p>
              <p>{settings.cityStateZip}</p>
              <p className="pt-2">
                <a href={`tel:${settings.phone.replace(/[^0-9]/g, "")}`} className="font-mono tracking-wider text-amber">
                  {settings.phone}
                </a>
              </p>
              <p className="pt-2 text-muted">{settings.hours}</p>
              <p className="text-muted">Sat / Sun: Closed</p>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line-soft pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Petron, L.L.C. All rights reserved.</p>
          <p className="font-mono tracking-widest uppercase">Building on a firm foundation</p>
        </div>
      </div>
    </footer>
  );
}
