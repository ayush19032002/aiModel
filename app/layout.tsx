import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "GBP Growth Pro — AI-Powered Google Business Profile Platform",
    template: "%s | GBP Growth Pro",
  },
  description:
    "Grow your Google Business Profile with AI. Increase visibility, generate reviews, automate customer conversations, capture leads, and grow revenue from one platform.",
  keywords: [
    "Google Business Profile",
    "GBP optimization",
    "local SEO",
    "review management",
    "WhatsApp AI",
    "business growth",
    "local marketing",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://gbpgrowthpro.com",
    siteName: "GBP Growth Pro",
    title: "GBP Growth Pro — AI-Powered Google Business Profile Platform",
    description:
      "Grow your Google Business Profile with AI. Increase visibility, generate reviews, automate conversations, and capture leads.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GBP Growth Pro",
    description: "AI-Powered Google Business Profile Growth Platform",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#09090b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
