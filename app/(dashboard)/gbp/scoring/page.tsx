"use client";
import { useState } from "react";
import { Search, CheckCircle2, XCircle, AlertTriangle, ArrowRight, Zap, Trophy, TrendingUp } from "lucide-react";

export default function ProfileScoringPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(true);

  // Mock score data
  const score = 78;
  const strengths = [
    "Consistent NAP (Name, Address, Phone) across directories",
    "High average review rating (4.7 stars)",
    "Properly categorized primary business type"
  ];
  const weaknesses = [
    "Low frequency of new reviews in the past 30 days",
    "No Google Posts published in the last 14 days",
    "Missing product/service catalog"
  ];
  const missingInfo = [
    "Holiday hours for upcoming national holidays",
    "Business description is too short (under 200 characters)",
    "Attributes like 'Wheelchair accessible' not set"
  ];
  const recommendations = [
    { title: "Publish a new Post", impact: "High", action: "Create Post" },
    { title: "Run a Review Campaign", impact: "High", action: "Send Campaign" },
    { title: "Update Business Description", impact: "Medium", action: "Use AI Generator" }
  ];

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setHasScanned(true);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#0f172a]">Profile Scoring</h2>
          <p className="text-sm text-[#64748b] mt-0.5">AI analysis of your Google Business Profile</p>
        </div>
        <button
          onClick={handleScan}
          disabled={isScanning}
          className="flex items-center gap-2 bg-[#2563eb] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1d4ed8] transition-colors disabled:opacity-70"
        >
          {isScanning ? (
            <span className="flex items-center gap-2"><Search className="w-4 h-4 animate-spin" /> Scanning...</span>
          ) : (
            <span className="flex items-center gap-2"><Search className="w-4 h-4" /> Rescan Profile</span>
          )}
        </button>
      </div>

      {!hasScanned ? (
        <div className="flex flex-col items-center justify-center py-20 border border-[#e2e8f0] rounded-2xl bg-[#ffffff] shadow-sm">
          <Trophy className="w-16 h-16 text-[#cbd5e1] mb-4" />
          <h3 className="text-xl font-bold text-[#0f172a] mb-2">Ready to Score Your Profile?</h3>
          <p className="text-[#64748b] max-w-md text-center mb-6">
            Run our AI scanner to analyze your Google Business Profile against 50+ local SEO ranking factors.
          </p>
          <button
            onClick={handleScan}
            disabled={isScanning}
            className="bg-[#2563eb] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#1d4ed8] transition-colors"
          >
            {isScanning ? "Analyzing..." : "Start Initial Scan"}
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Score Card */}
          <div className="lg:col-span-1 bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-8 flex flex-col items-center justify-center shadow-sm text-center">
            <h3 className="font-semibold text-[#0f172a] mb-8 w-full text-left">Overall Profile Score</h3>
            <div className="relative w-40 h-40 mb-6 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="10" />
                <circle cx="50" cy="50" r="45" fill="none" stroke={score > 80 ? '#10b981' : score > 60 ? '#f59e0b' : '#ef4444'} strokeWidth="10" strokeDasharray={`${score * 2.83} 283`} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-[#0f172a]">{score}</span>
              </div>
            </div>
            <p className="text-lg font-bold text-[#0f172a] mb-2">Good, but needs work.</p>
            <p className="text-sm text-[#64748b]">Your profile is outperforming 65% of competitors, but key optimizations are missing.</p>
          </div>

          {/* Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
                <h4 className="font-semibold text-[#0f172a] flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-[#10b981]" /> Profile Strengths
                </h4>
                <ul className="space-y-3">
                  {strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#475569]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] mt-1.5 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
                <h4 className="font-semibold text-[#0f172a] flex items-center gap-2 mb-4">
                  <XCircle className="w-5 h-5 text-[#ef4444]" /> Profile Weaknesses
                </h4>
                <ul className="space-y-3">
                  {weaknesses.map((w, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#475569]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ef4444] mt-1.5 shrink-0" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Missing Info & Recommendations */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
                <h4 className="font-semibold text-[#0f172a] flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-[#f59e0b]" /> Missing Information
                </h4>
                <ul className="space-y-3">
                  {missingInfo.map((m, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#475569]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] mt-1.5 shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#ffffff] border border-[#2563eb]/20 rounded-2xl p-6 shadow-sm bg-gradient-to-b from-white to-[#2563eb]/5">
                <h4 className="font-semibold text-[#2563eb] flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-[#2563eb]" /> AI Recommendations
                </h4>
                <div className="space-y-3">
                  {recommendations.map((rec, i) => (
                    <div key={i} className="bg-white border border-[#e2e8f0] rounded-xl p-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-[#0f172a]">{rec.title}</p>
                        <p className="text-[10px] uppercase font-bold text-[#64748b] mt-0.5">{rec.impact} IMPACT</p>
                      </div>
                      <button className="text-xs bg-[#f1f5f9] text-[#2563eb] px-3 py-1.5 rounded-lg font-semibold hover:bg-[#e2e8f0] transition-colors whitespace-nowrap">
                        {rec.action}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
