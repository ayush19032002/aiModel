"use client";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import {
  TrendingUp, TrendingDown, Star, Users, MessageSquare, BarChart3,
  ArrowUpRight, Zap, Search, AlertCircle
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

function KpiCard({
  label, value, unit, trend, trendUp, color, children
}: {
  label: string; value: string | number; unit?: string;
  trend?: string; trendUp?: boolean; color: string; children?: React.ReactNode;
}) {
  return (
    <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-5 card-hover">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-[#64748b]">{label}</p>
        {trend && (
          <span className={`text-xs font-semibold flex items-center gap-1 px-2 py-1 rounded-full ${trendUp ? "bg-[#10b981]/10 text-[#10b981]" : "bg-[#ef4444]/10 text-[#ef4444]"}`}>
            {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trend}
          </span>
        )}
      </div>
      <div className="flex items-end gap-1 mb-3">
        <span className="text-3xl font-extrabold" style={{ color }}>{value}</span>
        {unit && <span className="text-sm text-[#64748b] mb-1">{unit}</span>}
      </div>
      {children}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number; color: string }[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-xl px-4 py-3 text-xs shadow-xl">
      <p className="text-[#64748b] mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="font-semibold" style={{ color: p.color }}>{p.value}</p>
      ))}
    </div>
  );
};

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/dashboard").then(res => res.json()).then(setData);
  }, []);

  if (!data) return <div className="p-8 text-center text-[#64748b]">Loading dashboard...</div>;

  const { kpi: kpiData, leadGrowth: leadGrowthData, reviewGrowth: reviewGrowthData, visibility: visibilityData, retention: retentionData, ranking: rankingData } = data;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-[#0f172a]">Good evening, Arjun 👋</h2>
          <p className="text-sm text-[#64748b] mt-0.5">Here&apos;s your business performance for today</p>
        </div>
        <div className="w-full sm:w-auto">
          <Link href="/gbp/audit" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-[#2563eb] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#1d4ed8] transition-colors">
            <Zap className="w-4 h-4" />
            Run Audit
          </Link>
        </div>
      </div>

      {/* AI Insight Banner */}
      <div className="bg-[#2563eb]/10 border border-[#2563eb]/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#2563eb] flex items-center justify-center shrink-0">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#1d4ed8] mb-1">AI Insight · 2 new opportunities detected</p>
          <p className="text-sm text-[#475569]">Adding 5 more photos could increase your GBP Score by +8 points and bring ~40 more profile views/month. <a href="/gbp/audit" className="text-[#2563eb] underline">View audit →</a></p>
        </div>
      </div>

      {/* KPI Grid Row 1 */}
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <KpiCard label="GBP Score" value={kpiData.gbpScore} unit="/100" trend="+12 pts" trendUp color="#7c3aed">
          <div className="h-1.5 bg-[#f1f5f9] rounded-full">
            <div className="h-1.5 bg-[#2563eb] rounded-full" style={{ width: `${kpiData.gbpScore}%` }} />
          </div>
        </KpiCard>
        <KpiCard label="Visibility Score" value={kpiData.visibilityScore} unit="%" trend="+8%" trendUp color="#a855f7">
          <div className="h-1.5 bg-[#f1f5f9] rounded-full">
            <div className="h-1.5 bg-[#a855f7] rounded-full" style={{ width: `${kpiData.visibilityScore}%` }} />
          </div>
        </KpiCard>
        <KpiCard label="Monthly Leads" value={kpiData.monthlyLeads} trend="+34" trendUp color="#10b981" />
        <KpiCard label="Review Rating" value="4.7" unit="★" trend="+0.3" trendUp color="#f59e0b" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Lead Growth */}
        <div className="md:col-span-2 bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-4 md:p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="font-semibold text-[#0f172a]">Lead Growth</h3>
              <p className="text-xs text-[#64748b] mt-0.5">Monthly leads captured</p>
            </div>
            <span className="text-xs font-semibold text-[#10b981] bg-[#10b981]/10 px-2 py-1 rounded-full whitespace-nowrap">+34% vs last month</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={leadGrowthData}>
              <defs>
                <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="leads" stroke="#2563eb" strokeWidth={2} fill="url(#leadGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Customer Retention */}
        <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-4 md:p-5">
          <div className="mb-6">
            <h3 className="font-semibold text-[#0f172a]">Customer Retention</h3>
            <p className="text-xs text-[#64748b] mt-0.5">This month</p>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={retentionData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={3} dataKey="value">
                {retentionData.map((entry: any, i: number) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {retentionData.map((r: any) => (
              <div key={r.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: r.color }} />
                <span className="text-xs text-[#64748b]">{r.name} {r.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Review Growth */}
        <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-4 md:p-5">
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-4 h-4 text-[#f59e0b]" />
            <h3 className="font-semibold text-[#0f172a]">Review Growth</h3>
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={reviewGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="reviews" fill="#f59e0b" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Keyword Rankings */}
        <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-4 md:p-5">
          <div className="flex items-center justify-between gap-2 mb-5">
            <div className="flex items-center gap-2 min-w-0">
              <Search className="w-4 h-4 text-[#2563eb] shrink-0" />
              <h3 className="font-semibold text-[#0f172a] truncate">Keyword Rankings</h3>
            </div>
            <Link href="/gbp/rankings" className="text-xs text-[#7c3aed] hover:text-[#2563eb] whitespace-nowrap">View all</Link>
          </div>
          <ul className="space-y-3">
            {rankingData.map((kw: any) => (
              <li key={kw.keyword} className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#1e293b] truncate">{kw.keyword}</p>
                  <p className="text-[10px] text-[#64748b]">{kw.volume.toLocaleString()}/mo</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-bold text-[#0f172a]">#{kw.position}</span>
                  <span className={`text-xs font-semibold ${kw.change > 0 ? "text-[#10b981]" : kw.change < 0 ? "text-[#ef4444]" : "text-[#64748b]"}`}>
                    {kw.change > 0 ? `↑${kw.change}` : kw.change < 0 ? `↓${Math.abs(kw.change)}` : "—"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-4 md:p-5">
          <h3 className="font-semibold text-[#0f172a] mb-5">Quick Actions</h3>
          <div className="space-y-2">
            {[
              { label: "Reply to 3 pending reviews", icon: Star, color: "#f59e0b", href: "/gbp/reviews" },
              { label: "2 new WhatsApp leads", icon: MessageSquare, color: "#10b981", href: "/whatsapp/conversations" },
              { label: "Run weekly GBP audit", icon: BarChart3, color: "#2563eb", href: "/gbp/audit" },
              { label: "4 leads need followup", icon: Users, color: "#3b82f6", href: "/crm/pipeline" },
              { label: "Publish new GBP post", icon: AlertCircle, color: "#ef4444", href: "/gbp/posts" },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#ffffff] hover:bg-[#e2e8f0]/50 border border-[#e2e8f0] hover:border-[#cbd5e1] transition-all group"
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${action.color}20` }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: action.color }} />
                  </div>
                  <p className="text-xs text-[#475569] group-hover:text-[#1e293b] flex-1 truncate">{action.label}</p>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#4b5563] group-hover:text-[#64748b] shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* WhatsApp + Revenue row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Visibility trend */}
        <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-4 md:p-5">
          <div className="flex items-center justify-between gap-2 mb-6">
            <h3 className="font-semibold text-[#0f172a]">GBP Visibility Trend</h3>
            <span className="text-xs text-[#2563eb] font-medium whitespace-nowrap">Last 7 months</span>
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={visibilityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[40, 100]} tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2.5} dot={{ fill: "#a855f7", strokeWidth: 0, r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Impact */}
        <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-4 md:p-5">
          <h3 className="font-semibold text-[#0f172a] mb-2">Revenue Impact</h3>
          <p className="text-xs text-[#64748b] mb-6">Estimated from GBP-driven leads</p>
          <div className="flex items-end gap-2 mb-4">
            <span className="text-4xl md:text-5xl font-extrabold text-[#10b981]">₹4.8L</span>
            <span className="text-sm text-[#64748b] mb-2">this month</span>
          </div>
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-4 h-4 text-[#10b981]" />
            <span className="text-sm text-[#10b981] font-semibold">+23% vs last month</span>
          </div>
          <div className="grid grid-cols-3 gap-2 md:gap-3">
            {[
              { label: "Leads Value", value: "₹2.1L" },
              { label: "Repeat Revenue", value: "₹1.9L" },
              { label: "Upsells", value: "₹0.8L" },
            ].map((item) => (
              <div key={item.label} className="bg-[#ffffff] border border-[#e2e8f0] rounded-xl p-2 md:p-3 text-center">
                <p className="text-xs md:text-sm font-bold text-[#0f172a]">{item.value}</p>
                <p className="text-[9px] md:text-[10px] text-[#64748b] mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
