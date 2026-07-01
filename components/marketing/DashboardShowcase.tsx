"use client";
import React, { useState } from "react";
import { BarChart3, Star, MessageSquare, Users, TrendingUp, Globe } from "lucide-react";

const showcaseItems = [
  {
    id: "dashboard",
    icon: BarChart3,
    label: "Dashboard",
    title: "Everything at a glance",
    description:
      "Your most critical KPIs — GBP score, visibility, reviews, leads — organized in a professional grid with real-time charts.",
  },
  {
    id: "audit",
    icon: TrendingUp,
    label: "GBP Audit",
    title: "Know exactly what to fix",
    description:
      "A detailed 40-point audit with color-coded scoring, competitor comparison, and a step-by-step improvement plan.",
  },
  {
    id: "reviews",
    icon: Star,
    label: "Reviews",
    title: "Never miss a review",
    description:
      "Monitor, filter, and reply to reviews with one click. The AI generates contextual, brand-appropriate responses in seconds.",
  },
  {
    id: "whatsapp",
    icon: MessageSquare,
    label: "WhatsApp AI",
    title: "Conversations that convert",
    description:
      "A WhatsApp-inspired interface with AI suggestions, customer profiles, and automation flows all in one view.",
  },
  {
    id: "crm",
    icon: Users,
    label: "CRM Pipeline",
    title: "Visual pipeline management",
    description:
      "Drag-and-drop Kanban board with 7 customizable stages. Track every lead from first contact to closed deal.",
  },
  {
    id: "analytics",
    icon: Globe,
    label: "Analytics",
    title: "Data that drives decisions",
    description:
      "Professional charts covering lead growth, review trends, ranking movements, and campaign performance over time.",
  },
];

const MockScreens: Record<string, () => React.ReactElement> = {
  dashboard: () => (
    <div className="p-4 h-full grid grid-cols-3 gap-3 content-start">
      {[
        { label: "GBP Score", val: "78/100", color: "#2563eb" },
        { label: "Monthly Leads", val: "247", color: "#10b981" },
        { label: "Review Rating", val: "4.7★", color: "#f59e0b" },
      ].map((k) => (
        <div key={k.label} className="bg-[#f1f5f9] rounded-xl p-3">
          <p className="text-[10px] text-[#64748b]">{k.label}</p>
          <p className="font-bold text-sm mt-1" style={{ color: k.color }}>{k.val}</p>
        </div>
      ))}
      <div className="col-span-3 bg-[#f1f5f9] rounded-xl p-4">
        <p className="text-[10px] text-[#64748b] mb-2">Lead Growth</p>
        <div className="flex items-end gap-1 h-16">
          {[30,45,35,60,72,88,100].map((h,i) => (
            <div key={i} className="flex-1 rounded-sm" style={{ height:`${h}%`, background: i===6 ? "#2563eb" : `rgba(37,99,235,${0.2+i*0.1})` }} />
          ))}
        </div>
      </div>
    </div>
  ),
  audit: () => (
    <div className="p-4 h-full space-y-3">
      <div className="flex items-center justify-between bg-[#f1f5f9] rounded-xl p-4">
        <span className="text-[10px] text-[#64748b]">Overall Audit Score</span>
        <span className="text-2xl font-bold text-[#2563eb]">78<span className="text-sm text-[#64748b]">/100</span></span>
      </div>
      {[
        { name: "Business Name", score: 100, color: "#10b981" },
        { name: "Photos & Videos", score: 55, color: "#f59e0b" },
        { name: "Q&A Section", score: 30, color: "#ef4444" },
        { name: "Review Response", score: 70, color: "#3b82f6" },
      ].map(s => (
        <div key={s.name} className="bg-[#f1f5f9] rounded-lg px-3 py-2">
          <div className="flex justify-between text-[10px] mb-1">
            <span className="text-[#475569]">{s.name}</span>
            <span style={{ color: s.color }}>{s.score}%</span>
          </div>
          <div className="h-1 bg-[#374151] rounded-full"><div className="h-1 rounded-full transition-all" style={{ width:`${s.score}%`, background: s.color }} /></div>
        </div>
      ))}
    </div>
  ),
  reviews: () => (
    <div className="p-4 h-full space-y-3">
      {[
        { name: "Priya Sharma", stars: 5, text: "Absolutely brilliant! Highly recommend.", replied: false },
        { name: "Rahul Mehta", stars: 4, text: "Good experience, professional staff.", replied: true },
        { name: "Anita Patel", stars: 3, text: "Average. Better communication needed.", replied: false },
      ].map(r => (
        <div key={r.name} className="bg-[#f1f5f9] rounded-xl p-3">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <p className="text-[11px] font-semibold text-[#0f172a]">{r.name}</p>
              <div className="flex">{Array.from({length:r.stars}).map((_,i) => <span key={i} className="text-[#f59e0b] text-[8px]">★</span>)}</div>
            </div>
            {!r.replied && <span className="text-[9px] bg-[#2563eb]/20 text-[#2563eb] px-2 py-0.5 rounded-full">AI Reply Ready</span>}
            {r.replied && <span className="text-[9px] bg-[#10b981]/20 text-[#10b981] px-2 py-0.5 rounded-full">Replied</span>}
          </div>
          <p className="text-[9px] text-[#64748b]">{r.text}</p>
        </div>
      ))}
    </div>
  ),
  whatsapp: () => (
    <div className="p-3 h-full grid grid-cols-5 gap-2">
      <div className="col-span-2 space-y-2">
        {[{n:"Priya S.",m:"Can I book Saturday?",u:2},{n:"Rahul M.",m:"See you at 3pm!",u:0},{n:"Anita P.",m:"What are your charges?",u:1}].map(c => (
          <div key={c.n} className={`rounded-lg p-2 ${c.u > 0 ? "bg-[#2563eb]/10 border border-[#2563eb]/30" : "bg-[#f1f5f9]"}`}>
            <div className="flex justify-between"><p className="text-[10px] font-semibold text-[#0f172a]">{c.n}</p>{c.u>0 && <span className="bg-[#2563eb] text-white text-[8px] rounded-full w-4 h-4 flex items-center justify-center">{c.u}</span>}</div>
            <p className="text-[9px] text-[#64748b] mt-0.5 truncate">{c.m}</p>
          </div>
        ))}
      </div>
      <div className="col-span-3 bg-[#f1f5f9] rounded-xl p-2 flex flex-col gap-2">
        <div className="bg-[#374151] rounded-lg p-2 self-start max-w-[80%]"><p className="text-[9px] text-[#0f172a]">Hi! Can I book a dental appointment for Saturday?</p></div>
        <div className="bg-[#2563eb]/20 rounded-lg p-2 self-end max-w-[80%]"><p className="text-[9px] text-[#3b82f6]">Hello! I'd be happy to help. Saturday 10am or 2pm works. Which do you prefer?</p></div>
        <div className="mt-auto pt-2 border-t border-[#cbd5e1]">
          <div className="bg-[#ffffff] rounded-lg px-2 py-1.5 text-[9px] text-[#64748b]">AI Suggestion: Confirm 10am slot...</div>
        </div>
      </div>
    </div>
  ),
  crm: () => (
    <div className="p-3 h-full grid grid-cols-4 gap-2 content-start">
      {[
        { stage: "New Lead", count: 8, color: "#2563eb", leads: ["Sunita R.", "Ashok T."] },
        { stage: "Interested", count: 5, color: "#3b82f6", leads: ["Meena K."] },
        { stage: "Proposal", count: 3, color: "#f59e0b", leads: ["Pooja A."] },
        { stage: "Won", count: 2, color: "#10b981", leads: ["Kiran S."] },
      ].map(col => (
        <div key={col.stage} className="bg-[#f1f5f9] rounded-xl p-2">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[9px] font-semibold text-[#475569]">{col.stage}</p>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: `${col.color}20`, color: col.color }}>{col.count}</span>
          </div>
          {col.leads.map(l => (
            <div key={l} className="bg-[#ffffff] rounded-lg px-2 py-1.5 mb-1.5">
              <p className="text-[9px] text-[#0f172a]">{l}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
  analytics: () => (
    <div className="p-4 h-full space-y-3">
      <div className="bg-[#f1f5f9] rounded-xl p-3">
        <p className="text-[10px] text-[#64748b] mb-3">Lead Growth (7 months)</p>
        <div className="flex items-end gap-1 h-14">
          {[40,60,55,80,92,110,130].map((h,i) => (
            <div key={i} className="flex-1 rounded-t-sm" style={{ height:`${(h/130)*100}%`, background: `rgba(124,58,237,${0.3+i*0.1})` }} />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-[#f1f5f9] rounded-xl p-3">
          <p className="text-[10px] text-[#64748b]">Avg Rating</p>
          <p className="text-xl font-bold text-[#f59e0b]">4.7<span className="text-xs">★</span></p>
        </div>
        <div className="bg-[#f1f5f9] rounded-xl p-3">
          <p className="text-[10px] text-[#64748b]">Campaigns Sent</p>
          <p className="text-xl font-bold text-[#2563eb]">18</p>
        </div>
      </div>
    </div>
  ),
};

export default function DashboardShowcase() {
  const [active, setActive] = useState("dashboard");
  const item = showcaseItems.find((i) => i.id === active)!;
  const Screen = MockScreens[active];

  return (
    <section className="section">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold text-[#2563eb] bg-[#2563eb]/10 border border-[#2563eb]/20 px-3 py-1 rounded-full mb-4">
            Product Preview
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Built for <span className="gradient-text">Real Work</span>
          </h2>
          <p className="text-[#64748b] text-lg max-w-xl mx-auto">
            Every screen is designed to help you act quickly and work
            efficiently — not just look at data.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-6 items-start">
          {/* Tab list */}
          <div className="md:col-span-2 flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
            {showcaseItems.map((it) => {
              const Icon = it.icon;
              return (
                <button
                  key={it.id}
                  onClick={() => setActive(it.id)}
                  className={`flex items-start gap-3 p-4 rounded-xl text-left transition-all shrink-0 md:shrink ${
                    active === it.id
                      ? "bg-[#2563eb]/15 border border-[#2563eb]/40 text-[#0f172a]"
                      : "bg-[#ffffff] border border-[#e2e8f0] text-[#64748b] hover:border-[#cbd5e1] hover:text-[#475569]"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 mt-0.5 shrink-0 ${active === it.id ? "text-[#2563eb]" : ""}`}
                  />
                  <div className="hidden md:block">
                    <p className="font-semibold text-sm">{it.label}</p>
                    <p className="text-xs mt-0.5 text-[#64748b]">{it.title}</p>
                  </div>
                  <p className="md:hidden text-sm font-semibold">{it.label}</p>
                </button>
              );
            })}
          </div>

          {/* Screen preview */}
          <div className="md:col-span-3">
            <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl overflow-hidden shadow-2xl">
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#e2e8f0] bg-[#ffffff]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]/50" />
                </div>
                <div className="flex-1 mx-3 bg-[#f1f5f9] rounded px-3 py-1 text-xs text-[#64748b]">
                  app.gbpgrowthpro.com/{active}
                </div>
              </div>
              <div className="h-72 overflow-hidden">
                <Screen />
              </div>
            </div>
            <div className="mt-4 bg-[#ffffff] border border-[#e2e8f0] rounded-xl p-4">
              <h4 className="font-semibold text-[#0f172a] mb-1">{item.title}</h4>
              <p className="text-sm text-[#64748b]">{item.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
