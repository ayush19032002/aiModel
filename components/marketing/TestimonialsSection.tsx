import { Star } from "lucide-react";
import { testimonials } from "@/lib/mock-data";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="section bg-[#ffffff]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold text-[#2563eb] bg-[#2563eb]/10 border border-[#2563eb]/20 px-3 py-1 rounded-full mb-4">
            Customer Stories
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Real Businesses. <span className="gradient-text">Real Results.</span>
          </h2>
          <p className="text-[#64748b] text-lg max-w-xl mx-auto">
            Join thousands of local businesses that have transformed their online
            presence and revenue with GBP Growth Pro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-6 card-hover flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#f59e0b]" fill="currentColor" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-[#1e293b] text-sm leading-relaxed flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                {t.avatar ? (
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2563eb] to-[#3b82f6] flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {t.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-[#0f172a] font-semibold text-sm">{t.name}</p>
                  <p className="text-[#64748b] text-xs">{t.business}</p>
                </div>
                <div className="ml-auto">
                  <span className="text-[10px] font-medium text-[#2563eb] bg-[#2563eb]/10 px-2 py-1 rounded-full">
                    {t.industry}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stat */}
        <div className="mt-12 flex flex-wrap justify-center gap-12">
          {[
            { value: "4.9/5", label: "Average Rating on G2" },
            { value: "5,000+", label: "Businesses Trust Us" },
            { value: "98%", label: "Customer Satisfaction Rate" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-[#0f172a] mb-1">{s.value}</div>
              <div className="text-sm text-[#64748b]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
