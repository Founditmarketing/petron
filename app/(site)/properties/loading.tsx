export default function Loading() {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden px-5 pt-28 sm:px-8">
      <div className="bp-grid absolute inset-0" />
      <div className="relative mx-auto max-w-7xl">
        <div className="h-3 w-40 animate-pulse bg-surface" />
        <div className="mt-4 h-16 w-3/4 max-w-2xl animate-pulse bg-surface" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border border-line-soft bg-base-2">
              <div className="aspect-[16/10] animate-pulse bg-surface" />
              <div className="space-y-3 p-5">
                <div className="h-6 w-2/3 animate-pulse bg-surface" />
                <div className="h-3 w-1/3 animate-pulse bg-surface-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
