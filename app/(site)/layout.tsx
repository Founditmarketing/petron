import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress, ConsoleSignature } from "@/components/ui/Kinetic";
import { getSiteSettings } from "@/lib/content";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollProgress />
      <Nav settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
      <div className="grain" aria-hidden />
      <ConsoleSignature />
    </div>
  );
}
