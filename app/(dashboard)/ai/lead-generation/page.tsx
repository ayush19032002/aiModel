"use client";
import { useEffect, useMemo, useState } from "react";
import { Search, Filter, Download, ShieldAlert, Sparkles } from "lucide-react";
import { SectionCard } from "@/components/shared/SectionCard";

export default function LeadGenerationPage() {
  const [results, setResults] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("/api/modules")
      .then((res) => res.json())
      .then((data) => setResults(data.leads || []));
  }, []);

  const filtered = useMemo(() => {
    return results.filter((lead) => {
      const matchSearch = `${lead.name} ${lead.category} ${lead.address}`.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "all" || lead.category.toLowerCase() === category.toLowerCase();
      return matchSearch && matchCategory;
    });
  }, [results, search, category]);

  const pageSize = 3;
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">AI Lead Generation</h2>
          <p className="mt-1 text-sm text-slate-500">Search businesses by keyword, category, city, radius, and generate outreach suggestions.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300">
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      <SectionCard title="Search and filter" description="Find promising businesses and prioritize them with AI lead scoring.">
        <div className="grid gap-3 md:grid-cols-[1.4fr_0.8fr]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search by company, category, or city"
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none ring-0"
            />
          </label>
          <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
            <Filter className="h-4 w-4" />
            <select value={category} onChange={(event) => { setCategory(event.target.value); setPage(1); }} className="w-full bg-transparent outline-none">
              <option value="all">All categories</option>
              <option value="dentist">Dentist</option>
              <option value="orthodontist">Orthodontist</option>
              <option value="cosmetic dentistry">Cosmetic Dentistry</option>
            </select>
          </label>
        </div>
      </SectionCard>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {paginated.map((lead) => (
          <div key={lead.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-slate-900">{lead.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{lead.category}</p>
              </div>
              <div className="rounded-full bg-emerald-50 px-2.5 py-1 text-sm font-semibold text-emerald-700">{lead.score}</div>
            </div>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <p>{lead.address}</p>
              <p>{lead.phone}</p>
              {lead.email ? <p>{lead.email}</p> : null}
              {lead.website ? <p>{lead.website}</p> : null}
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
              <span className="rounded-full bg-slate-100 px-2.5 py-1">⭐ {lead.rating}</span>
              <span className="rounded-full bg-slate-100 px-2.5 py-1">{lead.reviews} reviews</span>
              {lead.duplicateOf ? <span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-700">Duplicate</span> : null}
            </div>
            <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/70 p-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-blue-700">
                <Sparkles className="h-4 w-4" /> AI outreach suggestions
              </div>
              <ul className="mt-2 space-y-1 text-sm text-slate-600">
                {lead.suggestions.map((suggestion: string) => (
                  <li key={suggestion} className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-600" />{suggestion}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <ShieldAlert className="h-4 w-4 text-amber-500" /> Duplicate detection enabled for matching businesses.
        </div>
        <div className="flex gap-2">
          <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600" onClick={() => setPage((value) => Math.max(1, value - 1))}>Prev</button>
          <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600" onClick={() => setPage((value) => value + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
}
