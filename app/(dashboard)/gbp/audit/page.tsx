"use client";
import { auditData } from "@/lib/mock-data";
import { CheckCircle, AlertCircle, XCircle, TrendingUp, Download, Zap } from "lucide-react";

const statusIcon = {
  complete: CheckCircle,
  needs_improvement: AlertCircle,
  incomplete: XCircle,
};
const statusColor = {
  complete: "#10b981",
  needs_improvement: "#f59e0b",
  incomplete: "#ef4444",
};

export default function GBPAuditPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#0f172a]">GBP Audit Report</h2>
          <p className="text-sm text-[#64748b] mt-0.5">Sharma Dental Clinic · Last updated: Today at 2:30 PM</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-[#ffffff] border border-[#e2e8f0] text-[#1e293b] text-sm font-medium px-4 py-2 rounded-lg hover:border-[#cbd5e1] transition-all">
          <Download className="w-4 h-4" />
          Export PDF
        </button>
      </div>

      {/* Audit Score Hero */}
      <div className="bg-gradient-to-br from-[#2563eb]/20 to-[#4c1d95]/10 border border-[#2563eb]/30 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
        {/* Score circle */}
        <div className="relative w-40 h-40 shrink-0">
          <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#1f2937" strokeWidth="10" />
            <circle
              cx="60" cy="60" r="50" fill="none"
              stroke="#2563eb" strokeWidth="10"
              strokeDasharray={`${2 * Math.PI * 50}`}
              strokeDashoffset={`${2 * Math.PI * 50 * (1 - auditData.overallScore / 100)}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold text-[#7c3aed]">{auditData.overallScore}</span>
            <span className="text-xs text-[#64748b]">/100</span>
          </div>
        </div>
        <div>
          <div className="inline-flex items-center gap-2 bg-[#f59e0b]/10 text-[#f59e0b] text-xs font-semibold px-3 py-1 rounded-full mb-3">
            <Zap className="w-3 h-3" /> Room for Growth
          </div>
          <h3 className="text-2xl font-bold text-[#0f172a] mb-2">Good Score — Let&apos;s Make it Great</h3>
          <p className="text-[#475569] text-sm mb-4 max-w-xl">
            Your GBP is performing above average, but 5 critical improvements could push you to the top 10% of businesses in your area.
          </p>
          <div className="flex gap-6">
            {[{ label: "Completeness", val: "72%" }, { label: "Review Score", val: "4.7★" }, { label: "Activity", val: "Medium" }].map(s => (
              <div key={s.label}>
                <p className="text-lg font-bold text-[#0f172a]">{s.val}</p>
                <p className="text-xs text-[#64748b]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Profile Completeness */}
        <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-6">
          <h3 className="font-semibold text-[#0f172a] mb-5">Profile Completeness</h3>
          <div className="space-y-4">
            {auditData.sections.map((section) => {
              const Icon = statusIcon[section.status];
              const color = statusColor[section.status];
              return (
                <div key={section.name} className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" style={{ color }} />
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#1e293b]">{section.name}</span>
                      <span className="font-semibold" style={{ color }}>{section.score}%</span>
                    </div>
                    <div className="h-1.5 bg-[#f1f5f9] rounded-full">
                      <div className="h-1.5 rounded-full transition-all" style={{ width: `${section.score}%`, background: color }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-6">
          <h3 className="font-semibold text-[#0f172a] mb-5">Improvement Recommendations</h3>
          <div className="space-y-3">
            {auditData.recommendations.map((rec) => (
              <div key={rec.title} className="flex items-start gap-3 p-3 bg-[#ffffff] border border-[#e2e8f0] rounded-xl">
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full shrink-0 mt-0.5 ${
                  rec.priority === "high" ? "bg-[#ef4444]/20 text-[#ef4444]" :
                  rec.priority === "medium" ? "bg-[#f59e0b]/20 text-[#f59e0b]" :
                  "bg-[#6b7280]/20 text-[#64748b]"
                }`}>{rec.priority.toUpperCase()}</span>
                <div className="flex-1">
                  <p className="text-sm text-[#1e293b]">{rec.title}</p>
                  <p className="text-xs text-[#10b981] mt-0.5">{rec.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Competitor Comparison */}
      <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-6">
        <h3 className="font-semibold text-[#0f172a] mb-5">Competitor Analysis</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e2e8f0]">
                <th className="text-left text-[#64748b] font-medium pb-3 pr-4">Business</th>
                <th className="text-left text-[#64748b] font-medium pb-3 pr-4">GBP Score</th>
                <th className="text-left text-[#64748b] font-medium pb-3 pr-4">Reviews</th>
                <th className="text-left text-[#64748b] font-medium pb-3">Rating</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#e2e8f0] bg-[#2563eb]/5">
                <td className="py-3 pr-4 font-semibold text-[#0f172a]">Your Business ✦</td>
                <td className="py-3 pr-4"><span className="text-[#7c3aed] font-bold">78</span></td>
                <td className="py-3 pr-4">256</td>
                <td className="py-3 text-[#f59e0b]">4.7★</td>
              </tr>
              {auditData.competitors.map((c) => (
                <tr key={c.name} className="border-b border-[#e2e8f0] last:border-0">
                  <td className="py-3 pr-4 text-[#475569]">{c.name}</td>
                  <td className="py-3 pr-4">
                    <span className={`font-semibold ${c.score > 78 ? "text-[#ef4444]" : "text-[#10b981]"}`}>{c.score}</span>
                    <TrendingUp className={`w-3 h-3 inline ml-1 ${c.score > 78 ? "text-[#ef4444]" : "text-[#10b981]"}`} />
                  </td>
                  <td className="py-3 pr-4 text-[#475569]">{c.reviews}</td>
                  <td className="py-3 text-[#f59e0b]">{c.rating}★</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
