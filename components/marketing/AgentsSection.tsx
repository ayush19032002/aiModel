"use client";
import { useState } from "react";
import { TrendingUp, MessageSquare, Megaphone, Search, Star, BarChart3, Globe, Users } from "lucide-react";

const agents = [
  {
    id: "gbp",
    icon: TrendingUp,
    color: "#2563eb",
    bgColor: "rgba(37,99,235,0.1)",
    name: "Google Business Profile Agent",
    tagline: "Bring New Potential Customers",
    description:
      "Optimize your Google Maps rankings on autopilot. Run automated SEO audits, reply to customer reviews in customized tones, and schedule local posts to drive new page-1 traffic.",
    features: [
      { icon: Search, text: "AI GBP Audit (40+ factors)" },
      { icon: TrendingUp, text: "SEO & Keyword Optimization" },
      { icon: BarChart3, text: "Competitor Map Tracking" },
      { icon: Star, text: "Review Replies & QR Codes" },
      { icon: Globe, text: "GBP Update Post Generator" },
      { icon: BarChart3, text: "Local Search Ranking Insights" },
    ],
    stat: { value: "3.2×", label: "Average page views increase" },
  },
  {
    id: "whatsapp-chat",
    icon: MessageSquare,
    color: "#10b981",
    bgColor: "rgba(16,185,129,0.1)",
    name: "WhatsApp Chat Agent",
    tagline: "Realtime Customer Interaction 24/7",
    description:
      "Automate customer support and booking. Answer FAQs, capture lead profiles, schedule treatment appointments, and execute seamless handoffs to human agents.",
    features: [
      { icon: MessageSquare, text: "24/7 Live AI Replies" },
      { icon: Users, text: "Hinglish Language Chat" },
      { icon: Star, text: "Slot & Appointment Booking" },
      { icon: BarChart3, text: "Instant FAQ Automation" },
      { icon: TrendingUp, text: "CRM Lead Profiling" },
      { icon: Globe, text: "Human Handoff Trigger" },
    ],
    stat: { value: "4hrs", label: "Daily office time saved" },
  },
  {
    id: "whatsapp-marketing",
    icon: Megaphone,
    color: "#f59e0b",
    bgColor: "rgba(245,158,11,0.1)",
    name: "WhatsApp Marketing Agent",
    tagline: "Promotional Marketing to Existing Customers",
    description:
      "Nurture customer lists and boost retention. Send targeted promotional broadcasts, festival/event campaigns, coupon code offers, and review requests directly on WhatsApp.",
    features: [
      { icon: Megaphone, text: "Festival & Event Campaigns" },
      { icon: Star, text: "Automated Review Requests" },
      { icon: Users, text: "Broadcast List Filtering" },
      { icon: BarChart3, text: "Campaign Analytics & ROI" },
      { icon: MessageSquare, text: "Re-engagement Campaigns" },
      { icon: TrendingUp, text: "Upsell & Coupon Broadcasts" },
    ],
    stat: { value: "68%", label: "Average broadcast open rate" },
  },
];

export default function AgentsSection() {
  const [active, setActive] = useState("gbp");
  const agent = agents.find((a) => a.id === active)!;
  const Icon = agent.icon;

  return (
    <section id="agents" className="section">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold text-[#2563eb] bg-[#2563eb]/10 border border-[#2563eb]/20 px-3 py-1 rounded-full mb-4">
            AI Agents
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Three AI Agents. <br className="hidden md:block" />
            <span className="gradient-text">One Intelligent Platform.</span>
          </h2>
          <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
            Each agent specializes in a different growth lever — powered by a
            shared customer intelligence layer that learns your business.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-3 justify-center mb-12 flex-wrap">
          {agents.map((a) => {
            const AIcon = a.icon;
            return (
              <button
                key={a.id}
                onClick={() => setActive(a.id)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  active === a.id
                    ? "text-white border"
                    : "bg-[#ffffff] border border-[#e2e8f0] text-[#64748b] hover:text-[#475569]"
                }`}
                style={
                  active === a.id
                    ? { background: a.bgColor, borderColor: a.color, color: a.color }
                    : {}
                }
              >
                <AIcon className="w-4 h-4" />
                {a.name}
              </button>
            );
          })}
        </div>

        {/* Agent Detail Card */}
        <div className="grid md:grid-cols-2 gap-8 items-center bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-8 md:p-12">
          {/* Left */}
          <div>
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: agent.bgColor }}
            >
              <Icon className="w-7 h-7" style={{ color: agent.color }} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: agent.color }}>
              {agent.tagline}
            </p>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">{agent.name}</h3>
            <p className="text-[#475569] leading-relaxed mb-8">{agent.description}</p>

            {/* Stat */}
            <div
              className="inline-flex items-center gap-4 px-5 py-4 rounded-xl border"
              style={{ background: agent.bgColor, borderColor: `${agent.color}30` }}
            >
              <span className="text-4xl font-extrabold" style={{ color: agent.color }}>
                {agent.stat.value}
              </span>
              <span className="text-sm text-[#475569]">{agent.stat.label}</span>
            </div>
          </div>

          {/* Right: Feature List */}
          <div className="grid grid-cols-2 gap-3">
            {agent.features.map((f) => {
              const FIcon = f.icon;
              return (
                <div
                  key={f.text}
                  className="flex items-center gap-3 bg-[#ffffff] border border-[#e2e8f0] rounded-xl p-4"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: agent.bgColor }}
                  >
                    <FIcon className="w-4 h-4" style={{ color: agent.color }} />
                  </div>
                  <span className="text-sm text-[#475569]">{f.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Shared intelligence note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#64748b]">
            All agents share a{" "}
            <span className="text-[#2563eb] font-medium">
              unified customer intelligence layer
            </span>{" "}
            — data flows between them automatically.
          </p>
        </div>
      </div>
    </section>
  );
}
