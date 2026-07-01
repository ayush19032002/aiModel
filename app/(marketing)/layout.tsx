import type { Metadata } from "next";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import FloatingWhatsAppWidget from "@/components/marketing/FloatingWhatsAppWidget";

export const metadata: Metadata = {
  title: "GBP Growth Pro — AI-Powered Google Business Profile Platform",
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <FloatingWhatsAppWidget />
      <Footer />
    </>
  );
}

