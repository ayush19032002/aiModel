"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, Zap } from "lucide-react";
import { pricingPlans } from "@/lib/mock-data";

export default function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="section bg-[#ffffff]">
      <div className="container-custom px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-xs font-semibold text-[#2563eb] bg-[#2563eb]/10 border border-[#2563eb]/20 px-3 py-1 rounded-full mb-4">
            Pricing
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4">
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="text-[#64748b] text-base md:text-lg max-w-xl mx-auto mb-8">
            Start free. No credit card required. Cancel anytime.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-2 md:gap-3 bg-[#ffffff] border border-[#e2e8f0] rounded-xl p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
                !annual ? "bg-[#2563eb] text-white" : "text-[#64748b] hover:text-[#475569]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all flex items-center gap-2 ${
                annual ? "bg-[#2563eb] text-white" : "text-[#64748b] hover:text-[#475569]"
              }`}
            >
              Annual
              <span className="text-[10px] bg-[#10b981]/20 text-[#10b981] px-1.5 py-0.5 rounded-full font-semibold">
                -20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-5 md:p-7 flex flex-col transition-all ${
                plan.highlighted
                  ? "bg-[#2563eb] border border-[#a855f7]/50 shadow-lg md:scale-105"
                  : "bg-[#ffffff] border border-[#e2e8f0] card-hover"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#10b981] text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-lg md:text-xl font-bold mb-2 ${plan.highlighted ? "text-white" : "text-[#0f172a]"}`}>
                  {plan.name}
                </h3>
                <p className={`text-xs md:text-sm ${plan.highlighted ? "text-[#1e3a8a]" : "text-[#64748b]"}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-end gap-1">
                  <span className={`text-3xl md:text-4xl font-extrabold ${plan.highlighted ? "text-white" : "text-[#0f172a]"}`}>
                    ₹{(annual ? plan.price.yearly : plan.price.monthly).toLocaleString("en-IN")}
                  </span>
                  <span className={`text-xs md:text-sm mb-1.5 ${plan.highlighted ? "text-[#1e3a8a]" : "text-[#64748b]"}`}>
                    /mo
                  </span>
                </div>
                {annual && (
                  <p className={`text-xs mt-1 ${plan.highlighted ? "text-[#1d4ed8]" : "text-[#64748b]"}`}>
                    Billed annually · Save ₹{((plan.price.monthly - plan.price.yearly) * 12).toLocaleString("en-IN")}/yr
                  </p>
                )}
              </div>

              <ul className="space-y-2 md:space-y-3 flex-1 mb-6 md:mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check
                      className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlighted ? "text-[#1d4ed8]" : "text-[#10b981]"}`}
                    />
                    <span className={`text-xs md:text-sm ${plan.highlighted ? "text-[#1e3a8a]" : "text-[#475569]"}`}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.cta === "Contact Sales" ? "https://wa.me/911234567890?text=Hi!%20I%20want%20to%20know%20more%20about%20the%20Enterprise%20Plan." : "https://wa.me/911234567890?text=Hi!%20I%20want%20to%20grow%20my%20Google%20Business%20Profile%20and%20start%20my%20free%20audit."}
                className={`w-full text-center py-2 md:py-3 rounded-xl font-semibold text-xs md:text-sm transition-all ${
                  plan.highlighted
                    ? "bg-white text-[#2563eb] hover:bg-[#f5f3ff]"
                    : "bg-[#2563eb] text-white hover:bg-[#1d4ed8] hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-xs md:text-sm text-[#64748b] mt-8 md:mt-12">
          All plans include a{" "}
          <span className="text-[#2563eb] font-medium">14-day free trial</span>. No
          credit card required.
        </p>
      </div>
    </section>
  );
}
