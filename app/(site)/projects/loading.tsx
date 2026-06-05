export default function Loading() {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden px-5 pt-24 sm:px-8">
      <div className="bp-grid absolute inset-0" />
      <div className="relative mx-auto max-w-7xl">
        <div className="h-3 w-40 animate-pulse bg-surface" />
        <div className="mt-4 h-16 w-3/4 max-w-2xl animate-pulse bg-surface" />
        <div className="mt-3 h-4 w-full max-w-xl animate-pulse bg-surface-2" />
        <div className="mt-12 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted">
          <span className="h-2 w-2 animate-ping rounded-full bg-amber" />
          Loading project map
        </div>
      </div>
    </div>
  );
}
