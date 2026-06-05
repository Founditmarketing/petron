import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70dvh] items-center overflow-hidden px-5 sm:px-8">
      <div className="bp-grid absolute inset-0" />
      <div className="relative mx-auto max-w-2xl text-center">
        <p className="font-display text-[8rem] leading-none text-amber sm:text-[12rem]">404</p>
        <h1 className="font-display text-3xl uppercase text-text sm:text-4xl">This lot is empty</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-text-dim">
          The page you are looking for was moved or never built. Let&apos;s get you back on solid ground.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-amber">Back home</Link>
          <Link href="/properties" className="btn btn-ghost">Browse properties</Link>
        </div>
      </div>
    </section>
  );
}
