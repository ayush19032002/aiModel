"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqItems } from "@/lib/mock-data";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section">
      <div className="container-custom max-w-3xl">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold text-[#2563eb] bg-[#2563eb]/10 border border-[#2563eb]/20 px-3 py-1 rounded-full mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-[#64748b] text-lg">
            Everything you need to know about GBP Growth Pro.
          </p>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <div
              key={i}
              className={`border rounded-2xl overflow-hidden transition-all ${
                open === i
                  ? "border-[#2563eb]/40 bg-[#2563eb]/5"
                  : "border-[#e2e8f0] bg-[#ffffff]"
              }`}
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span
                  className={`font-medium text-sm md:text-base ${
                    open === i ? "text-[#0f172a]" : "text-[#1e293b]"
                  }`}
                >
                  {item.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 ml-4 transition-transform ${
                    open === i ? "rotate-180 text-[#2563eb]" : "text-[#64748b]"
                  }`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-6">
                  <p className="text-[#475569] text-sm leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
