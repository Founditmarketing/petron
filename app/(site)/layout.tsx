import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { MobileTabBar } from "@/components/site/MobileTabBar";
import { getSiteSettings } from "@/lib/content";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  return (
    <div className="flex min-h-dvh flex-col">
      <Nav settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
      <MobileTabBar />
    </div>
  );
}
