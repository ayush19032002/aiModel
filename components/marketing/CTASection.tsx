import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="section">
      <div className="container-custom">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#2563eb] via-[#3b82f6] to-[#1d4ed8] rounded-3xl p-12 md:p-20 text-center">
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#60a5fa]/20 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1e3a8a]/40 rounded-full blur-[80px]" />
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }}
            />
          </div>

          <div className="relative">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Ready to Grow Your<br />
              <span className="text-[#93c5fd]">Local Business?</span>
            </h2>
            <p className="text-[#dbeafe] text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Join 5,000+ businesses that use GBP Growth Pro to dominate local
              search, generate reviews, and convert more customers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 bg-white text-[#2563eb] font-bold px-8 py-4 rounded-xl text-base hover:bg-[#f1f5f9] transition-all hover:shadow-xl group"
              >
                Start Free Audit — No Card Needed
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl text-base hover:bg-white/10 transition-all"
              >
                Book a Live Demo
              </Link>
            </div>
            <p className="mt-6 text-[#bfdbfe] text-sm">
              14-day free trial · No setup fee · Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
