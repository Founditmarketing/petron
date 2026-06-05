export function MapSkeleton() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-base-2">
      <div className="bp-grid absolute inset-0" />
      <div className="relative flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted">
        <span className="h-2 w-2 animate-ping rounded-full bg-amber" />
        Initializing map
      </div>
    </div>
  );
}
