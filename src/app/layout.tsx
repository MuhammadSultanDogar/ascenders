import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { COMPANY, SITE } from "@/lib/constants";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.title} | ${COMPANY.tagline}`,
    template: `%s | ${SITE.title}`,
  },
  description: SITE.description,
  keywords: [
    "Ascenders IT Solutions",
    "digital marketing agency",
    "Amazon seller management",
    "Walmart marketplace",
    "eBay seller management",
    "Shopify ecommerce",
    "TikTok Shop",
    "marketplace reinstatements",
    "Go High Level automation",
    "ecommerce USA UK Australia",
  ],
  authors: [{ name: SITE.title, url: SITE.url }],
  creator: SITE.title,
  publisher: SITE.title,
  category: "Business",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon-32.png"],
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.title,
    title: `${SITE.title} | ${COMPANY.tagline}`,
    description: SITE.description,
    images: [
      {
        url: "/logo.png",
        width: 757,
        height: 646,
        alt: `${SITE.title} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.title} | ${COMPANY.tagline}`,
    description: SITE.description,
    images: ["/logo.png"],
  },
  other: {
    "contact:email": COMPANY.email,
    "contact:phone_number": COMPANY.phone,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable}`}>
      <body className="antialiased">
        <div className="noise" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
