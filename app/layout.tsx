import type { Metadata, Viewport } from "next";
import "./globals.css";
import { contact, profile } from "@/content/site";
import { CookieConsent } from "@/components/CookieConsent";
import { LocaleProvider } from "@/components/LocaleProvider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://restagiuliano.com"),
  title: "Resta Giuliano — Product Designer",
  description: "Product Designer specialized in B2B SaaS, PropTech, Product Discovery, Data and AI. Designing complex products and making them simpler.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Resta Giuliano — Product Designer",
    description: "Product Designer specialized in B2B SaaS, PropTech, Product Discovery, Data and AI.",
    type: "website",
    locale: "en_US",
    siteName: "Resta Giuliano — Product Designer",
  },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  description: profile.summary,
  url: "https://restagiuliano.com",
  ...(contact.linkedin ? { sameAs: [contact.linkedin] } : {}),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <LocaleProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
          />
          {children}
          <CookieConsent />
        </LocaleProvider>
      </body>
    </html>
  );
}
