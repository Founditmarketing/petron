import Link from "next/link";

/** Petron mark: a chamfered "cut-steel" P standing on a solid foundation bar,
 *  a literal read of "building on a firm foundation." Counter is a true cut-out
 *  (evenodd), so the mark works on any background. */
export function PetronMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 5 H23 L28 10 V17 L23 22 H14 V29 H7 Z M14 10 H22 V17 H14 Z"
        fill="var(--amber)"
      />
      <rect x="6" y="32" width="24" height="4" rx="1" fill="var(--amber)" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group flex items-center gap-2.5 ${className}`} aria-label="Petron home">
      <PetronMark className="h-9 w-9 transition-transform duration-300 group-hover:-translate-y-0.5" />
      <span className="font-display text-2xl leading-none tracking-wide text-text">
        PETR<span className="text-amber">O</span>N
      </span>
    </Link>
  );
}
