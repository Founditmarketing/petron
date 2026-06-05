"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Tab = { href: string; label: string; icon: React.ReactNode };

const icon = (paths: React.ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    {paths}
  </svg>
);

const tabs: Tab[] = [
  { href: "/", label: "Home", icon: icon(<><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></>) },
  { href: "/projects", label: "Map", icon: icon(<><path d="M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10Z" /><circle cx="12" cy="11" r="2.2" /></>) },
  { href: "/properties", label: "Lease", icon: icon(<><path d="M3 21h18" /><path d="M5 21V7l7-4 7 4v14" /><path d="M9 21v-5h6v5" /><path d="M9 10h.01M15 10h.01" /></>) },
  { href: "/contact", label: "Contact", icon: icon(<><path d="M4 5.5C4 4.7 4.7 4 5.5 4h2.6c.6 0 1.1.4 1.3 1l1 3a1.4 1.4 0 0 1-.4 1.5L9 11a12 12 0 0 0 4 4l1.5-1.1c.4-.3 1-.4 1.5-.2l3 1c.6.2 1 .7 1 1.3v2.6c0 .8-.7 1.5-1.5 1.4A15.5 15.5 0 0 1 4 5.5Z" /></>) },
];

export function MobileTabBar() {
  const pathname = usePathname();
  return (
    <nav className="safe-b fixed inset-x-0 bottom-0 z-50 border-t border-line bg-base/85 backdrop-blur-xl lg:hidden">
      <div className="grid grid-cols-4">
        {tabs.map((t) => {
          const active = t.href === "/" ? pathname === "/" : pathname.startsWith(t.href);
          return (
            <Link
              key={t.href}
              href={t.href}
              aria-current={active ? "page" : undefined}
              className={`flex flex-col items-center gap-1 py-2.5 transition-colors active:scale-95 ${
                active ? "text-amber" : "text-muted"
              }`}
            >
              {t.icon}
              <span className="font-mono text-[0.58rem] uppercase tracking-widest">{t.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
