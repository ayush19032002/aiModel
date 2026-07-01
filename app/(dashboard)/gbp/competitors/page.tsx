import { auditData } from "@/lib/mock-data";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function CompetitorsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-[#0f172a]">Competitor Analysis</h2>
        <p className="text-sm text-[#64748b] mt-0.5">Tracking 3 local competitors</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-[#2563eb]/10 border border-[#2563eb]/30 rounded-2xl p-5">
          <p className="text-xs font-semibold text-[#2563eb] mb-2">YOUR BUSINESS</p>
          <p className="text-[#0f172a] font-bold mb-3">Sharma Dental Clinic</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm"><span className="text-[#64748b]">GBP Score</span><span className="font-bold text-[#7c3aed]">78</span></div>
            <div className="flex justify-between text-sm"><span className="text-[#64748b]">Reviews</span><span className="text-[#0f172a]">256</span></div>
            <div className="flex justify-between text-sm"><span className="text-[#64748b]">Rating</span><span className="text-[#f59e0b]">4.7★</span></div>
          </div>
        </div>
        {auditData.competitors.map(c => (
          <div key={c.name} className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-5">
            <p className="text-xs font-semibold text-[#64748b] mb-2">COMPETITOR</p>
            <p className="text-[#0f172a] font-bold mb-3 text-sm">{c.name}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#64748b]">GBP Score</span>
                <span className={`font-bold flex items-center gap-1 ${c.score > 78 ? "text-[#ef4444]" : "text-[#10b981]"}`}>
                  {c.score} {c.score > 78 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                </span>
              </div>
              <div className="flex justify-between text-sm"><span className="text-[#64748b]">Reviews</span><span className="text-[#0f172a]">{c.reviews}</span></div>
              <div className="flex justify-between text-sm"><span className="text-[#64748b]">Rating</span><span className="text-[#f59e0b]">{c.rating}★</span></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-6">
        <h3 className="font-semibold text-[#0f172a] mb-4">Opportunities vs. Competitors</h3>
        <div className="space-y-4">
          {[
            { area: "Photo Count", your: 12, best: 48, tip: "Add 36 more photos to match the top competitor" },
            { area: "Review Count", your: 256, best: 312, tip: "Collect 56 more reviews to lead the local market" },
            { area: "Q&A Answers", your: 3, best: 18, tip: "Add 15 more Q&A entries for better visibility" },
            { area: "Weekly Posts", your: 1, best: 3, tip: "Post 2x more per week to increase engagement" },
          ].map(item => (
            <div key={item.area} className="grid md:grid-cols-4 gap-4 items-center p-4 bg-[#ffffff] rounded-xl border border-[#e2e8f0]">
              <div>
                <p className="text-sm font-medium text-[#1e293b]">{item.area}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 bg-[#f1f5f9] rounded-full">
                  <div className="h-2 bg-[#2563eb] rounded-full" style={{ width: `${Math.min(100, (item.your / item.best) * 100)}%` }} />
                </div>
                <span className="text-sm font-bold text-[#7c3aed] w-8 shrink-0">{item.your}</span>
              </div>
              <div>
                <span className="text-xs text-[#64748b]">Best competitor: {item.best}</span>
              </div>
              <p className="text-xs text-[#2563eb]">{item.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
