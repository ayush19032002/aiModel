"use client";
import { useMemo, useState } from "react";
import { Sparkles, TrendingUp, Search, Image as ImageIcon, PenTool, BarChart3 } from "lucide-react";
import { SectionCard } from "@/components/shared/SectionCard";

const audit = {
  seoScore: 84,
  completeness: 76,
  keywordSuggestions: ["dentist near me", "teeth whitening", "cosmetic dentist"],
  competitorComparison: [
    { name: "SmilePro", score: 88 },
    { name: "BrightCare", score: 80 },
    { name: "Your profile", score: 84 },
  ],
  recommendations: [
    "Add 8 more photos to improve trust signals",
    "Publish one post per week with local keywords",
    "Respond to reviews within 24 hours",
  ],
};

export default function SeoSuggestionsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const competitorList = useMemo(() => audit.competitorComparison, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Google Business SEO Suggestions</h2>
        <p className="mt-1 text-sm text-slate-500">Audit your profile, compare against competitors, and get AI-powered improvement suggestions.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title="SEO score" description="Current profile strength">
          <div className="text-4xl font-semibold text-slate-900">{audit.seoScore}/100</div>
          <p className="mt-2 text-sm text-slate-500">Profile completeness is at {audit.completeness}%.</p>
        </SectionCard>
        <SectionCard title="Keyword suggestions" description="High-intent search terms">
          <div className="flex flex-wrap gap-2">
            {audit.keywordSuggestions.map((keyword) => (
              <span key={keyword} className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700">{keyword}</span>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Focus areas" description="Recommended actions">
          <div className="space-y-2 text-sm text-slate-600">
            {audit.recommendations.map((item) => <div key={item} className="rounded-lg border border-slate-200 px-3 py-2">{item}</div>)}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <SectionCard title="Competitor comparison" description="How your profile stacks up">
          <div className="space-y-3">
            {competitorList.map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-3">
                <span className="text-sm font-medium text-slate-700">{item.name}</span>
                <span className="text-sm font-semibold text-slate-900">{item.score}/100</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="AI recommendations" description="Actionable SEO improvements">
          <div className="flex gap-2">
            {[
              { id: "overview", label: "Overview" },
              { id: "content", label: "Content" },
              { id: "media", label: "Media" },
            ].map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`rounded-full px-3 py-1.5 text-sm ${activeTab === tab.id ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="mt-4 space-y-3">
            {activeTab === "overview" && (
              <>
                <div className="rounded-xl border border-slate-200 p-3"><div className="flex items-center gap-2 text-sm font-semibold text-slate-900"><TrendingUp className="h-4 w-4 text-emerald-600" /> Improve local discoverability by adding exact-service language.</div></div>
                <div className="rounded-xl border border-slate-200 p-3"><div className="flex items-center gap-2 text-sm font-semibold text-slate-900"><Search className="h-4 w-4 text-blue-600" /> Optimize for service-area keywords in your business description.</div></div>
              </>
            )}
            {activeTab === "content" && (
              <div className="rounded-xl border border-slate-200 p-3"><div className="flex items-center gap-2 text-sm font-semibold text-slate-900"><PenTool className="h-4 w-4 text-violet-600" /> Publish posts that answer common customer questions and include location terms.</div></div>
            )}
            {activeTab === "media" && (
              <div className="rounded-xl border border-slate-200 p-3"><div className="flex items-center gap-2 text-sm font-semibold text-slate-900"><ImageIcon className="h-4 w-4 text-amber-600" /> Add before/after photos and team portraits to increase profile trust.</div></div>
            )}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Performance snapshot" description="Operational metrics from the SEO workflow">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Listings monitored", value: "12" },
            { label: "Posts recommended", value: "24" },
            { label: "Image insights", value: "9" },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-sm text-slate-500"><BarChart3 className="h-4 w-4" /> {item.label}</div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
