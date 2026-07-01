"use client";
import { rankingData } from "@/lib/mock-data";
import { TrendingUp, TrendingDown, Minus, Search } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const historyData = [
  { day: "Day 1", pos: 8 }, { day: "Day 7", pos: 6 }, { day: "Day 14", pos: 4 },
  { day: "Day 21", pos: 3 }, { day: "Day 28", pos: 2 },
];

export default function RankingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-[#0f172a]">Keyword Rankings</h2>
        <p className="text-sm text-[#64748b] mt-0.5">Tracking 18 keywords · Updated daily</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Top 3 Rankings", value: "7", color: "#10b981" },
          { label: "Avg Position", value: "#3.4", color: "#2563eb" },
          { label: "Ranking Improved", value: "↑12", color: "#3b82f6" },
        ].map(s => (
          <div key={s.label} className="bg-[#ffffff] border border-[#e2e8f0] rounded-xl p-4 text-center">
            <p className="text-xs text-[#64748b] mb-1">{s.label}</p>
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-6">
          <h3 className="font-semibold text-[#0f172a] mb-4">Keyword Position History</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={historyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="day" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis reversed tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 8, color: "#f9fafb" }} />
              <Line type="monotone" dataKey="pos" stroke="#2563eb" strokeWidth={2.5} dot={{ fill: "#7c3aed", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0f172a]">All Keywords</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
              <input type="text" placeholder="Search..." className="pl-9 pr-4 py-2 text-xs rounded-lg w-40" />
            </div>
          </div>
          <div className="space-y-3">
            {rankingData.map(kw => (
              <div key={kw.keyword} className="flex items-center gap-3 p-3 bg-[#ffffff] rounded-xl border border-[#e2e8f0]">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#1e293b] truncate">{kw.keyword}</p>
                  <p className="text-xs text-[#64748b]">{kw.volume.toLocaleString()} searches/mo</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-base font-bold text-[#0f172a]">#{kw.position}</span>
                  {kw.change > 0 && <TrendingUp className="w-4 h-4 text-[#10b981]" />}
                  {kw.change < 0 && <TrendingDown className="w-4 h-4 text-[#ef4444]" />}
                  {kw.change === 0 && <Minus className="w-4 h-4 text-[#64748b]" />}
                  <span className={`text-xs font-semibold w-8 text-right ${kw.change > 0 ? "text-[#10b981]" : kw.change < 0 ? "text-[#ef4444]" : "text-[#64748b]"}`}>
                    {kw.change > 0 ? `+${kw.change}` : kw.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
