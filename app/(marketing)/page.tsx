import HeroSection from "@/components/marketing/HeroSection";
import TrustBar from "@/components/marketing/TrustBar";
import CTASection from "@/components/marketing/CTASection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GBP Growth Pro — Grow Your Google Business Profile With AI",
  description:
    "Increase visibility, generate reviews, automate customer conversations, capture leads, and grow revenue from one AI-powered platform.",
};

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <CTASection />
    </>
  );
}
