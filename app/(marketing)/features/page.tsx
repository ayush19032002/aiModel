import FeaturesSection from "@/components/marketing/FeaturesSection";
import AgentsSection from "@/components/marketing/AgentsSection";
import DashboardShowcase from "@/components/marketing/DashboardShowcase";
import CTASection from "@/components/marketing/CTASection";

export default function FeaturesPage() {
  return (
    <div className="pt-24">
      <FeaturesSection />
      <AgentsSection />
      <DashboardShowcase />
      <CTASection />
    </div>
  );
}
