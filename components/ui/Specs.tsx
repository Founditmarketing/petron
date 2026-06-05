export function Specs({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <dl className="divide-y divide-line-soft border-y border-line-soft">
      {rows.map((r) => (
        <div key={r.label} className="flex items-baseline justify-between gap-4 py-3">
          <dt className="font-mono text-[0.7rem] uppercase tracking-widest text-muted">{r.label}</dt>
          <dd className="text-right font-cond font-semibold text-text">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
