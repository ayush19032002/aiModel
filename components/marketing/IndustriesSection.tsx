import { industries } from "@/lib/mock-data";

export default function IndustriesSection() {
  return (
    <section className="section">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold text-[#2563eb] bg-[#2563eb]/10 border border-[#2563eb]/20 px-3 py-1 rounded-full mb-4">
            Industries
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Built for{" "}
            <span className="gradient-text">Every Local Business</span>
          </h2>
          <p className="text-[#64748b] text-lg max-w-xl mx-auto">
            GBP Growth Pro is designed to work for any business that depends on
            local customers finding them on Google.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {industries.map((industry) => (
            <div
              key={industry.name}
              className="group bg-[#ffffff] border border-[#e2e8f0] hover:border-[#2563eb]/40 hover:bg-[#2563eb]/5 rounded-2xl p-5 text-center cursor-default transition-all"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform inline-block">
                {industry.icon}
              </div>
              <p className="text-xs font-medium text-[#475569] group-hover:text-[#0f172a] transition-colors leading-tight">
                {industry.name}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-8 text-center">
          <p className="text-[#64748b] text-sm mb-2">Don&apos;t see your industry?</p>
          <p className="text-[#0f172a] font-medium">
            GBP Growth Pro works for{" "}
            <span className="text-[#2563eb]">any local business</span> that
            appears on Google Maps — regardless of industry.
          </p>
        </div>
      </div>
    </section>
  );
}
