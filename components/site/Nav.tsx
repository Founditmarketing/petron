"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import type { SiteSettings } from "@/lib/types";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/properties", label: "Properties" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav({ settings }: { settings: SiteSettings }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line-soft bg-base/92 backdrop-blur-md"
          : "border-b border-transparent bg-gradient-to-b from-base/70 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => {
            const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`font-cond text-sm font-semibold uppercase tracking-wider link-underline ${
                  active ? "text-amber" : "text-text-dim hover:text-text"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${settings.phone.replace(/[^0-9]/g, "")}`}
            className="hidden font-mono text-xs tracking-widest text-text-dim transition-colors hover:text-amber lg:block"
          >
            {settings.phone}
          </a>
          <Link href="/contact" className="btn btn-amber hidden sm:inline-flex">
            Start a Project
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center text-text md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-6 bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-6 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-6 bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="fixed inset-0 top-16 z-40 flex flex-col bg-base md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="bp-grid absolute inset-0" />
            <div className="relative flex flex-1 flex-col px-5 pt-4">
              {links.map((l, i) => {
                const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
                return (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-3 border-b border-line-soft py-5"
                    >
                      <span className="font-mono text-xs text-muted">0{i + 1}</span>
                      <span className={`font-display text-4xl uppercase leading-none ${active ? "text-amber" : "text-text"}`}>
                        {l.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}

              <div className="safe-b mt-auto pb-8 pt-8">
                <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-amber w-full justify-center">
                  Start a Project
                </Link>
                <a
                  href={`tel:${settings.phone.replace(/[^0-9]/g, "")}`}
                  className="mt-4 block text-center font-mono text-sm tracking-widest text-text-dim"
                >
                  {settings.phone}
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
