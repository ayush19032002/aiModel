import CTASection from "@/components/marketing/CTASection";

const stats = [
  { label: "Locations optimized", value: "3,600+" },
  { label: "Average rating lift", value: "+0.4★" },
  { label: "Response time", value: "Under 2s" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] pt-24 pb-16 text-[#0f172a]">
      <div className="container-custom max-w-5xl space-y-10">
        <div className="rounded-3xl border border-[#e2e8f0] bg-white p-8 shadow-sm md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2563eb]">About GBP Growth Pro</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            We help local businesses grow faster with AI-powered visibility.
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-[#475569]">
            GBP Growth Pro combines Google Business Profile auditing, review management, WhatsApp automation, CRM workflows, and AI content generation into one modern platform designed for local brands.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((item) => (
            <div key={item.label} className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-sm">
              <p className="text-3xl font-bold text-[#2563eb]">{item.value}</p>
              <p className="mt-2 text-sm text-[#64748b]">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-[#e2e8f0] bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">Why teams choose us</h2>
            <ul className="mt-5 space-y-3 text-[#475569]">
              <li>• Centralized dashboard for GBP, reviews, leads, and conversations</li>
              <li>• AI automation that saves hours of repetitive work</li>
              <li>• Built for agencies, clinics, salons, restaurants, and service businesses</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-[#e2e8f0] bg-gradient-to-br from-[#2563eb] to-[#7c3aed] p-8 text-white shadow-sm">
            <h2 className="text-2xl font-semibold">Our promise</h2>
            <p className="mt-4 text-sm leading-7 text-blue-50">
              More calls, more bookings, better reviews, and smarter follow-ups from one simple workspace.
            </p>
          </div>
        </div>
      </div>

      <CTASection />
    </div>
  );
}
