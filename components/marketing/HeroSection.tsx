"use client";
import Link from "next/link";
import { ArrowRight, Play, Star, TrendingUp, MessageSquare, Users } from "lucide-react";

const statsRow = [
  { value: "5,000+", label: "Businesses" },
  { value: "4.8★", label: "Avg Rating" },
  { value: "3.2x", label: "More Leads" },
  { value: "98%", label: "Satisfaction" },
];

const DashboardPreview = () => (
  <div className="relative rounded-2xl border border-[#e2e8f0] bg-[#ffffff] overflow-hidden shadow-2xl">
    {/* Browser bar */}
    <div className="flex items-center gap-2 px-4 py-3 border-b border-[#e2e8f0] bg-[#ffffff]">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-[#ef4444]/60" />
        <div className="w-3 h-3 rounded-full bg-[#f59e0b]/60" />
        <div className="w-3 h-3 rounded-full bg-[#10b981]/60" />
      </div>
      <div className="flex-1 mx-4 bg-[#f1f5f9] rounded px-3 py-1 text-xs text-[#64748b]">
        app.gbpgrowthpro.com/dashboard
      </div>
    </div>

    {/* Dashboard content */}
    <div className="p-4 grid grid-cols-4 gap-3">
      {/* KPI Cards */}
      {[
        { label: "GBP Score", value: "78", unit: "/100", color: "#2563eb", trend: "+12" },
        { label: "Monthly Leads", value: "247", unit: "", color: "#10b981", trend: "+34" },
        { label: "Review Rating", value: "4.7", unit: "★", color: "#f59e0b", trend: "+0.3" },
        { label: "Visibility", value: "84", unit: "%", color: "#3b82f6", trend: "+8%" },
      ].map((kpi) => (
        <div key={kpi.label} className="bg-[#ffffff] border border-[#e2e8f0] rounded-xl p-3">
          <p className="text-[10px] text-[#64748b] mb-1">{kpi.label}</p>
          <div className="flex items-end gap-1 mb-1">
            <span className="text-xl font-bold" style={{ color: kpi.color }}>{kpi.value}</span>
            <span className="text-xs text-[#64748b] mb-0.5">{kpi.unit}</span>
          </div>
          <span className="text-[10px] text-[#10b981]">↑ {kpi.trend}</span>
        </div>
      ))}

      {/* Mini chart area */}
      <div className="col-span-2 bg-[#ffffff] border border-[#e2e8f0] rounded-xl p-3">
        <p className="text-[10px] text-[#64748b] mb-3">Lead Growth</p>
        <div className="flex items-end gap-1 h-12">
          {[35, 52, 44, 68, 75, 88, 95].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${h}%`,
                background: i === 6 ? "#2563eb" : `rgba(37,99,235,${0.2 + i * 0.08})`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Keyword rankings mini */}
      <div className="col-span-2 bg-[#ffffff] border border-[#e2e8f0] rounded-xl p-3">
        <p className="text-[10px] text-[#64748b] mb-2">Keyword Rankings</p>
        {[
          { kw: "dental clinic near me", pos: "#2", up: true },
          { kw: "teeth whitening", pos: "#1", up: true },
          { kw: "orthodontist nearby", pos: "#6", up: false },
        ].map((row) => (
          <div key={row.kw} className="flex items-center justify-between py-0.5">
            <span className="text-[9px] text-[#475569] truncate max-w-[80px]">{row.kw}</span>
            <div className="flex items-center gap-1">
              <span className="text-[9px] font-bold text-[#0f172a]">{row.pos}</span>
              <span className={`text-[8px] ${row.up ? "text-[#10b981]" : "text-[#ef4444]"}`}>
                {row.up ? "↑" : "↓"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Review Activity */}
      <div className="col-span-4 bg-[#ffffff] border border-[#e2e8f0] rounded-xl p-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] text-[#64748b]">Recent Reviews</p>
          <span className="text-[9px] text-[#2563eb]">AI Reply Ready</span>
        </div>
        <div className="flex gap-3">
          {[
            { name: "Priya S.", stars: 5, text: "Excellent service! Highly recommend..." },
            { name: "Rahul M.", stars: 4, text: "Very professional. Would visit again..." },
            { name: "Anita P.", stars: 5, text: "Best dental experience. Thank you..." },
          ].map((r) => (
            <div key={r.name} className="flex-1 bg-[#e2e8f0]/50 rounded-lg p-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-medium text-[#0f172a]">{r.name}</span>
                <div className="flex">
                  {Array.from({length: r.stars}).map((_, i) => (
                    <Star key={i} className="w-2 h-2 text-[#f59e0b]" fill="currentColor" />
                  ))}
                </div>
              </div>
              <p className="text-[8px] text-[#64748b] leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default function HeroSection() {
  return (
    <section className="relative pt-16 pb-12 md:pt-24 md:pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] md:w-[800px] h-[300px] md:h-[600px] bg-[#2563eb]/10 rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute top-40 left-20 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-[#a855f7]/8 rounded-full blur-[60px] md:blur-[80px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container-custom relative px-4 md:px-6">
        {/* Badge */}
        <div className="flex justify-center mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 bg-[#2563eb]/10 border border-[#2563eb]/30 text-[#2563eb] text-xs font-semibold px-3 md:px-4 py-1.5 md:py-2 rounded-full">
            <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full animate-pulse" />
            New: AI-Powered GBP Audit Engine 2.0
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-center text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-4 md:mb-6 max-w-5xl mx-auto">
          Grow Your{" "}
          <span className="gradient-text">Google Business Profile</span>
          {" "}With AI
        </h1>

        {/* Subheadline */}
        <p className="text-center text-[#475569] text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-2">
          Increase visibility, generate reviews, automate customer conversations,
          capture leads, and grow revenue — all from one intelligent platform.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-12 md:mb-16 px-2">
          <Link
            href="/demo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold px-6 py-3 md:py-3.5 rounded-xl text-sm md:text-base transition-all hover:shadow-[0_0_32px_rgba(124,58,237,0.5)] group"
          >
            Start Free Audit
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/demo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#ffffff] hover:bg-[#f1f5f9] border border-[#e2e8f0] hover:border-[#cbd5e1] text-[#0f172a] font-semibold px-6 py-3 md:py-3.5 rounded-xl text-sm md:text-base transition-all"
          >
            <Play className="w-4 h-4 text-[#2563eb]" />
            Book Demo
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-6 md:gap-8 mb-12 md:mb-16 px-2">
          {statsRow.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-xl md:text-2xl font-bold text-[#0f172a]">{s.value}</div>
              <div className="text-xs text-[#64748b] mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Dashboard Preview */}
        <div className="max-w-4xl mx-auto px-2 md:px-0">
          <div className="relative rounded-xl md:rounded-2xl border border-[#e2e8f0] bg-[#ffffff] overflow-hidden shadow-lg md:shadow-2xl">
            {/* Browser bar */}
            <div className="flex items-center gap-2 px-2 md:px-4 py-2 md:py-3 border-b border-[#e2e8f0] bg-[#ffffff]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ef4444]/60" />
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#f59e0b]/60" />
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#10b981]/60" />
              </div>
              <div className="flex-1 mx-2 md:mx-4 bg-[#f1f5f9] rounded px-2 md:px-3 py-1 text-[10px] md:text-xs text-[#64748b] truncate">
                app.gbpgrowthpro.com/dashboard
              </div>
            </div>

            {/* Dashboard content - scroll on mobile, grid on desktop */}
            <div className="p-2 md:p-4 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 overflow-x-auto">
              {/* KPI Cards */}
              {[
                { label: "GBP Score", value: "78", unit: "/100", color: "#2563eb", trend: "+12" },
                { label: "Monthly Leads", value: "247", unit: "", color: "#10b981", trend: "+34" },
                { label: "Review Rating", value: "4.7", unit: "★", color: "#f59e0b", trend: "+0.3" },
                { label: "Visibility", value: "84", unit: "%", color: "#3b82f6", trend: "+8%" },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-[#ffffff] border border-[#e2e8f0] rounded-lg md:rounded-xl p-2 md:p-3">
                  <p className="text-[8px] md:text-[10px] text-[#64748b] mb-1 truncate">{kpi.label}</p>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-lg md:text-xl font-bold" style={{ color: kpi.color }}>{kpi.value}</span>
                    <span className="text-[7px] md:text-xs text-[#64748b] mb-0.5">{kpi.unit}</span>
                  </div>
                  <span className="text-[7px] md:text-[10px] text-[#10b981]">↑ {kpi.trend}</span>
                </div>
              ))}

              {/* Mini chart area */}
              <div className="col-span-2 md:col-span-2 bg-[#ffffff] border border-[#e2e8f0] rounded-lg md:rounded-xl p-2 md:p-3">
                <p className="text-[8px] md:text-[10px] text-[#64748b] mb-2"">Lead Growth</p>
                <div className="flex items-end gap-1 h-10 md:h-12">
                  {[35, 52, 44, 68, 75, 88, 95].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{
                        height: `${h}%`,
                        background: i === 6 ? "#2563eb" : `rgba(37,99,235,${0.2 + i * 0.08})`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Keyword rankings mini */}
              <div className="col-span-2 md:col-span-2 bg-[#ffffff] border border-[#e2e8f0] rounded-lg md:rounded-xl p-2 md:p-3">
                <p className="text-[8px] md:text-[10px] text-[#64748b] mb-2">Keyword Rankings</p>
                {[
                  { kw: "dental clinic near me", pos: "#2", up: true },
                  { kw: "teeth whitening", pos: "#1", up: true },
                  { kw: "orthodontist nearby", pos: "#6", up: false },
                ].map((row) => (
                  <div key={row.kw} className="flex items-center justify-between py-0.5">
                    <span className="text-[7px] md:text-[9px] text-[#475569] truncate max-w-[60px] md:max-w-[80px]">{row.kw}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[7px] md:text-[9px] font-bold text-[#0f172a]">{row.pos}</span>
                      <span className={`text-[7px] md:text-[8px] ${row.up ? "text-[#10b981]" : "text-[#ef4444]"}`}>
                        {row.up ? "↑" : "↓"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Review Activity */}
              <div className="col-span-2 md:col-span-4 bg-[#ffffff] border border-[#e2e8f0] rounded-lg md:rounded-xl p-2 md:p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[8px] md:text-[10px] text-[#64748b]">Recent Reviews</p>
                  <span className="text-[7px] md:text-[9px] text-[#2563eb]">AI Reply Ready</span>
                </div>
                <div className="flex gap-2 md:gap-3 overflow-x-auto">
                  {[
                    { name: "Priya S.", stars: 5, text: "Excellent service!..." },
                    { name: "Rahul M.", stars: 4, text: "Very professional..." },
                    { name: "Anita P.", stars: 5, text: "Best experience!..." },
                  ].map((r) => (
                    <div key={r.name} className="flex-1 min-w-[140px] bg-[#e2e8f0]/50 rounded-lg p-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[7px] md:text-[9px] font-medium text-[#0f172a] truncate">{r.name}</span>
                        <div className="flex">
                          {Array.from({length: r.stars}).map((_, i) => (
                            <Star key={i} className="w-2 h-2 text-[#f59e0b]" fill="currentColor" />
                          ))}
                        </div>
                      </div>
                      <p className="text-[7px] md:text-[8px] text-[#64748b] leading-tight">{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature pills below dashboard */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-8 md:mt-12 px-2">
          {[
            { icon: TrendingUp, text: "GBP Ranking Growth" },
            { icon: Star, text: "Review Automation" },
            { icon: MessageSquare, text: "WhatsApp AI Agent" },
            { icon: Users, text: "CRM & Lead Pipeline" },
          ].map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 bg-[#ffffff] border border-[#e2e8f0] text-[#475569] text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full"
            >
              <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#2563eb] shrink-0" />
              <span className="hidden sm:block">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
