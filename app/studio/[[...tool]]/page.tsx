import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { sanityEnabled } from "@/lib/sanity/env";

export const dynamic = "force-static";
export const metadata = {
  title: "Petron Studio",
  robots: { index: false },
};

export default function StudioPage() {
  if (!sanityEnabled) {
    return (
      <div style={{ minHeight: "100dvh", display: "grid", placeItems: "center", padding: "2rem", textAlign: "center", fontFamily: "ui-monospace, monospace" }}>
        <div style={{ maxWidth: 520 }}>
          <h1 style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>Sanity Studio is not configured</h1>
          <p style={{ opacity: 0.7, lineHeight: 1.6 }}>
            Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> in your environment to enable the embedded
            content studio. The public site runs on local seed data until then.
          </p>
        </div>
      </div>
    );
  }
  return <NextStudio config={config} />;
}
