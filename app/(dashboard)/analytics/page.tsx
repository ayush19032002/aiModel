"use client";
import { useState } from "react";
import { leadGrowthData, reviewGrowthData, visibilityData, campaignPerformanceData, retentionData } from "@/lib/mock-data";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { Calendar } from "lucide-react";

const ranges = ["7 days", "30 days", "90 days", "Custom"];

export default function AnalyticsPage() {
  const [range, setRange] = useState("30 days");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#0f172a]">Analytics</h2>
          <p className="text-sm text-[#64748b] mt-0.5">Performance metrics across all channels</p>
        </div>
        <div className="flex items-center gap-2">
          {ranges.map(r => (
            <button key={r} onClick={() => setRange(r)} className={`text-xs px-3 py-1.5 rounded-lg transition-all ${range === r ? "bg-[#2563eb] text-white" : "bg-[#ffffff] border border-[#e2e8f0] text-[#64748b] hover:text-[#475569]"}`}>
              {r === "Custom" ? <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {r}</span> : r}
            </button>
          ))}
        </div>
      </div>

      {/* KPI summary row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Leads", value: "247", change: "+34%", up: true },
          { label: "New Reviews", value: "35", change: "+18%", up: true },
          { label: "Avg Position", value: "#3.4", change: "-1.2", up: true },
          { label: "Campaign Reach", value: "2,480", change: "+42%", up: true },
        ].map(k => (
          <div key={k.label} className="bg-[#ffffff] border border-[#e2e8f0] rounded-xl p-4">
            <p className="text-xs text-[#64748b] mb-1">{k.label}</p>
            <p className="text-2xl font-bold text-[#0f172a]">{k.value}</p>
            <p className={`text-xs mt-1 font-medium ${k.up ? "text-[#10b981]" : "text-[#ef4444]"}`}>{k.change} vs last period</p>
          </div>
        ))}
      </div>

      {/* Charts grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Lead Growth */}
        <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-5">
          <h3 className="font-semibold text-[#0f172a] mb-5">Lead Growth</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={leadGrowthData}>
              <defs>
                <linearGradient id="lg2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/><stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 8, color: "#f9fafb" }} />
              <Area type="monotone" dataKey="leads" stroke="#2563eb" strokeWidth={2} fill="url(#lg2)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Review Growth */}
        <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-5">
          <h3 className="font-semibold text-[#0f172a] mb-5">Review Growth</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={reviewGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 8, color: "#f9fafb" }} />
              <Bar dataKey="reviews" fill="#f59e0b" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Visibility Trend */}
        <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-5">
          <h3 className="font-semibold text-[#0f172a] mb-5">GBP Visibility Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={visibilityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[40,100]} tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 8, color: "#f9fafb" }} />
              <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2.5} dot={{ fill: "#a855f7", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Campaign Performance */}
        <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-5">
          <h3 className="font-semibold text-[#0f172a] mb-5">Campaign Performance</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={campaignPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 8, color: "#f9fafb" }} />
              <Legend />
              <Bar dataKey="sent" fill="#1f2937" radius={[2,2,0,0]} />
              <Bar dataKey="opened" fill="#2563eb" radius={[2,2,0,0]} />
              <Bar dataKey="clicked" fill="#10b981" radius={[2,2,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Retention donut */}
        <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-5">
          <h3 className="font-semibold text-[#0f172a] mb-5">Customer Retention</h3>
          <div className="flex items-center gap-8">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={retentionData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={3} dataKey="value">
                  {retentionData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {retentionData.map(r => (
                <div key={r.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: r.color }} />
                  <span className="text-sm text-[#475569]">{r.name}</span>
                  <span className="text-sm font-bold text-[#0f172a] ml-auto">{r.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Impact */}
        <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-5">
          <h3 className="font-semibold text-[#0f172a] mb-5">Revenue Impact</h3>
          <div className="flex items-end gap-2 mb-4">
            <span className="text-5xl font-extrabold text-[#10b981]">₹4.8L</span>
            <span className="text-sm text-[#64748b] mb-2">this period</span>
          </div>
          <p className="text-xs text-[#10b981] font-semibold mb-6">↑ +23% vs previous period</p>
          <div className="space-y-3">
            {[
              { label: "From GBP Leads", value: 60, amount: "₹2.88L" },
              { label: "From Referrals", value: 25, amount: "₹1.20L" },
              { label: "From Campaigns", value: 15, amount: "₹0.72L" },
            ].map(row => (
              <div key={row.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#475569]">{row.label}</span>
                  <span className="text-[#0f172a] font-medium">{row.amount}</span>
                </div>
                <div className="h-1.5 bg-[#f1f5f9] rounded-full"><div className="h-1.5 bg-[#10b981] rounded-full" style={{ width: `${row.value}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
