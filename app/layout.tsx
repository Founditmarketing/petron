import type { Metadata } from "next";
import { Bebas_Neue, Archivo, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({ variable: "--font-bebas", subsets: ["latin"], weight: "400" });
const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], weight: ["500", "600", "700", "800"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://petron-us.com"),
  title: {
    default: "Petron LLC | Building on a Firm Foundation",
    template: "%s | Petron LLC",
  },
  description:
    "Petron is a rugged general contractor, fuel-system installer, and commercial real-estate developer building across the U.S. from Alexandria, Louisiana.",
  keywords: [
    "general contractor Louisiana",
    "fuel system installation",
    "commercial real estate Alexandria LA",
    "underground storage tanks",
    "Petron LLC",
  ],
  openGraph: {
    title: "Petron LLC | Building on a Firm Foundation",
    description: "General contracting, fuel systems, and commercial real estate. Building across the U.S.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${bebas.variable} ${archivo.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body className="min-h-dvh bg-base text-text">{children}</body>
    </html>
  );
}
