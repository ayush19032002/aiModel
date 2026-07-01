"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, X, HelpCircle, Zap, ShieldCheck } from "lucide-react";
import { pricingPlans } from "@/lib/mock-data";

interface FeatureRow {
  name: string;
  starter: string | boolean;
  growth: string | boolean;
  enterprise: string | boolean;
}

const comparisonFeatures: { category: string; features: FeatureRow[] }[] = [
  {
    category: "Google Business Profile",
    features: [
      { name: "GBP Audit & Scoring", starter: true, growth: true, enterprise: true },
      { name: "Locations Managed", starter: "1 Location", growth: "3 Locations", enterprise: "Unlimited" },
      { name: "Review Monitoring", starter: true, growth: true, enterprise: true },
      { name: "AI Reply Assistant", starter: "Basic", growth: "Advanced Custom Tones", enterprise: "Custom Fine-Tuned AI" },
      { name: "Review Collection QR Codes", starter: true, growth: true, enterprise: true },
      { name: "Competitor Intelligence", starter: false, growth: "5 Competitors", enterprise: "Unlimited Competitors" },
      { name: "AI Local Post Generator", starter: false, growth: true, enterprise: true },
    ],
  },
  {
    category: "WhatsApp AI & Automation",
    features: [
      { name: "WhatsApp Business API", starter: true, growth: true, enterprise: true },
      { name: "AI Messages / Month", starter: "500 / mo", growth: "5,000 / mo", enterprise: "Unlimited" },
      { name: "Visual Flow Builder", starter: false, growth: true, enterprise: true },
      { name: "Pre-built Automations", starter: "2 Templates", growth: "All Templates", enterprise: "Custom Workflows" },
      { name: "Human Agent Handoff", starter: true, growth: true, enterprise: true },
    ],
  },
  {
    category: "CRM & Leads",
    features: [
      { name: "Lead Capturing", starter: true, growth: true, enterprise: true },
      { name: "Lead Records Limit", starter: "Up to 100", growth: "Unlimited", enterprise: "Unlimited" },
      { name: "Kanban Pipeline Board", starter: true, growth: true, enterprise: true },
      { name: "Customer Timeline History", starter: "Basic", growth: "Full History", enterprise: "Custom Fields & Notes" },
    ],
  },
  {
    category: "Marketing & Website",
    features: [
      { name: "Automated Website Builder", starter: false, growth: "Yes (Standard)", enterprise: "Yes (Custom Templates)" },
      { name: "Marketing Campaigns", starter: false, growth: "Yes (WhatsApp/Email)", enterprise: "Yes (Multi-channel + SMS)" },
      { name: "Domain Connection", starter: false, growth: true, enterprise: true },
    ],
  },
  {
    category: "Analytics & Platform",
    features: [
      { name: "Analytics Dashboard", starter: "Basic Metrics", growth: "Advanced Interactive", enterprise: "Custom BI & Cohorts" },
      { name: "Scheduled Reports", starter: false, growth: "Yes (PDF/CSV)", enterprise: "Yes (White-label + Brand Logo)" },
      { name: "API Access", starter: false, growth: false, enterprise: true },
      { name: "Support Team", starter: "Email Support (24h)", growth: "Priority Live Chat", enterprise: "24/7 Phone & Account Manager" },
    ],
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  const renderValue = (val: string | boolean) => {
    if (typeof val === "boolean") {
      return val ? (
        <Check className="w-5 h-5 text-[#10b981] mx-auto" />
      ) : (
        <X className="w-5 h-5 text-[#374151] mx-auto" />
      );
    }
    return <span className="text-sm text-[#e5e7eb]">{val}</span>;
  };

  return (
    <div className="bg-[#f8fafc] text-[#0f172a] min-h-screen pt-24 pb-16">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2563eb]/10 via-transparent to-transparent pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563eb] bg-[#2563eb]/10 border border-[#2563eb]/20 px-3 py-1 rounded-full mb-4">
            <Zap className="w-3.5 h-3.5" /> Plans & Pricing
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Flexible plans for <span className="gradient-text">every stage of growth</span>
          </h1>
          <p className="text-[#475569] text-lg mb-8">
            Choose the perfect plan to optimize your Google Business Profile, automate conversations with customers, and drive revenue.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-[#ffffff] border border-[#e2e8f0] rounded-xl p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                !annual ? "bg-[#2563eb] text-white" : "text-[#64748b] hover:text-[#475569]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                annual ? "bg-[#2563eb] text-white" : "text-[#64748b] hover:text-[#475569]"
              }`}
            >
              Annual
              <span className="text-[10px] bg-[#10b981]/25 text-[#10b981] px-1.5 py-0.5 rounded-full font-semibold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-24">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 flex flex-col transition-all border ${
                plan.highlighted
                  ? "bg-[#ffffff] border-[#2563eb] shadow-md"
                  : "bg-[#ffffff]/60 border-[#e2e8f0] hover:border-[#cbd5e1]"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#2563eb] text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-[#7c3aed]/20">
                  <SparklesIcon /> Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[#0f172a] mb-2">{plan.name}</h3>
                <p className="text-sm text-[#475569] min-h-[40px]">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-[#0f172a]">
                    ₹{(annual ? plan.price.yearly : plan.price.monthly).toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm text-[#64748b] mb-1.5">/month</span>
                </div>
                {annual && (
                  <p className="text-xs text-[#10b981] mt-1.5 font-medium">
                    Save ₹{((plan.price.monthly - plan.price.yearly) * 12).toLocaleString("en-IN")} per year
                  </p>
                )}
              </div>

              <div className="border-t border-[#e2e8f0] my-6" />

              <ul className="space-y-3.5 flex-1 mb-8">
                {plan.features.slice(0, 6).map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="w-4 h-4 mt-0.5 text-[#10b981] shrink-0" />
                    <span className="text-sm text-[#475569]">{f}</span>
                  </li>
                ))}
                {plan.features.length > 6 && (
                  <li className="text-xs text-[#2563eb] font-medium pl-7">
                    + {plan.features.length - 6} more features
                  </li>
                )}
              </ul>

              <Link
                href={plan.cta === "Contact Sales" ? "mailto:sales@gbpgrowthpro.com" : "/signup"}
                className={`w-full text-center py-3.5 rounded-xl font-bold text-sm transition-all ${
                  plan.highlighted
                    ? "bg-[#2563eb] text-white hover:bg-[#1d4ed8] shadow-md"
                    : "bg-[#f1f5f9] text-[#0f172a] hover:bg-[#374151] border border-[#cbd5e1]"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Comparison Table Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Compare Plans & Features</h2>
            <p className="text-[#475569] text-sm">Detailed comparison of our GBP, WhatsApp, CRM and automation features.</p>
          </div>

          <div className="overflow-x-auto border border-[#e2e8f0] rounded-2xl bg-[#ffffff]/30 backdrop-blur-sm">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#e2e8f0] bg-[#ffffff]/80">
                  <th className="p-5 text-sm font-bold text-[#0f172a] w-[40%]">Feature</th>
                  <th className="p-5 text-sm font-bold text-[#0f172a] text-center w-[20%]">Starter</th>
                  <th className="p-5 text-sm font-bold text-[#0f172a] text-center w-[20%] bg-[#2563eb]/5 border-x border-[#e2e8f0]">
                    <span className="text-[#2563eb]">Growth</span>
                  </th>
                  <th className="p-5 text-sm font-bold text-[#0f172a] text-center w-[20%]">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((cat, i) => (
                  <tr key={i} className="contents">
                    {/* Category Title Row */}
                    <tr className="bg-[#e2e8f0]/30 border-b border-[#e2e8f0]">
                      <td colSpan={4} className="p-4 text-xs font-bold tracking-wider text-[#2563eb] uppercase">
                        {cat.category}
                      </td>
                    </tr>
                    {/* Feature Rows */}
                    {cat.features.map((row, j) => (
                      <tr key={j} className="border-b border-[#e2e8f0] hover:bg-[#ffffff]/25 transition-colors">
                        <td className="p-5 text-sm font-medium text-[#0f172a] flex items-center gap-2">
                          {row.name}
                        </td>
                        <td className="p-5 text-center">{renderValue(row.starter)}</td>
                        <td className="p-5 text-center bg-[#2563eb]/5 border-x border-[#e2e8f0]">
                          {renderValue(row.growth)}
                        </td>
                        <td className="p-5 text-center">{renderValue(row.enterprise)}</td>
                      </tr>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Security / FAQ banner */}
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-[#111827] to-[#1f2937]/40 border border-[#e2e8f0] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 border border-[#10b981]/25 flex items-center justify-center text-[#10b981] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0f172a] mb-1">Secure & Risk-Free</h3>
              <p className="text-sm text-[#475569] max-w-xl">
                We use the official Google Business Profile API and WhatsApp Business Cloud API. Your data is encrypted in transit and at rest. Cancel your plan at any time with one click from settings.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Link
              href="https://wa.me/911234567890?text=Hi!%20I%20want%20to%20grow%20my%20Google%20Business%20Profile%20and%20start%20my%20free%20audit."
              className="px-6 py-3 rounded-xl bg-[#2563eb] text-white hover:bg-[#1d4ed8] font-semibold text-center text-sm transition-all"
            >
              Start Free Trial
            </Link>
            <Link
              href="/#faq"
              className="px-6 py-3 rounded-xl bg-transparent text-[#475569] border border-[#e2e8f0] hover:text-[#0f172a] hover:border-[#cbd5e1] font-semibold text-center text-sm transition-all"
            >
              Read Pricing FAQs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function SparklesIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 text-white"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2l2.4 7.2h7.6l-6.2 4.5 2.4 7.2-6.2-4.5-6.2 4.5 2.4-7.2-6.2-4.5h7.6z" />
    </svg>
  );
}
