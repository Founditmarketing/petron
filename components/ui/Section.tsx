import { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl"} ${className}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="font-display text-4xl uppercase leading-[0.95] text-text sm:text-5xl md:text-6xl">
        {title}
      </h2>
    </div>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-t border-line pt-4">
      <div className="font-display text-4xl text-amber sm:text-5xl">{value}</div>
      <div className="mt-1 font-mono text-[0.7rem] uppercase tracking-widest text-muted">{label}</div>
    </div>
  );
}
