import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group flex items-center gap-2.5 ${className}`} aria-label="Petron home">
      <span className="relative flex h-8 w-8 items-center justify-center">
        <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
          <path d="M3 3h12a8 8 0 0 1 0 16H9v10H3z" fill="var(--amber)" />
          <rect x="9" y="9" width="6" height="4" rx="0.5" fill="var(--base)" />
        </svg>
      </span>
      <span className="font-display text-2xl leading-none tracking-wide text-text">
        PETR<span className="text-amber">O</span>N
      </span>
    </Link>
  );
}
