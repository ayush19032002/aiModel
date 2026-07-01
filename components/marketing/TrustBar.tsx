const brands = [
  "Patel Dental Care",
  "Mumbai Motors",
  "Sharma Jewellers",
  "City Spa & Wellness",
  "Verma Electronics",
  "Krishnan Law Firm",
  "AK Restaurant Group",
  "Sunrise Coaching",
  "Royal Hotel & Resorts",
  "Meena Boutique",
];

export default function TrustBar() {
  return (
    <section className="py-10 border-y border-[#e2e8f0] overflow-hidden">
      <div className="container-custom mb-6">
        <p className="text-center text-[#64748b] text-sm">
          Trusted by{" "}
          <span className="text-[#475569] font-medium">5,000+ businesses</span>{" "}
          across India
        </p>
      </div>
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#09090b] to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#09090b] to-transparent" />
        {/* Marquee */}
        <div className="flex animate-marquee whitespace-nowrap">
          {[...brands, ...brands].map((b, i) => (
            <div
              key={i}
              className="inline-flex items-center mx-6 px-5 py-2.5 bg-[#ffffff] border border-[#e2e8f0] rounded-lg text-[#64748b] text-sm font-medium shrink-0 hover:border-[#cbd5e1] hover:text-[#475569] transition-colors"
            >
              <span className="w-2 h-2 bg-[#2563eb] rounded-full mr-2.5 opacity-60" />
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
