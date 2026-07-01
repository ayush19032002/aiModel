"use client";
import { leadsData, type LeadStage } from "@/lib/mock-data";
import { Plus, MoreHorizontal, Calendar, DollarSign } from "lucide-react";

const stages: { id: LeadStage; label: string; color: string }[] = [
  { id: "new_lead", label: "New Lead", color: "#2563eb" },
  { id: "contacted", label: "Contacted", color: "#3b82f6" },
  { id: "interested", label: "Interested", color: "#3b82f6" },
  { id: "followup", label: "Follow-up", color: "#f59e0b" },
  { id: "proposal", label: "Proposal Sent", color: "#f97316" },
  { id: "won", label: "Won", color: "#10b981" },
  { id: "lost", label: "Lost", color: "#6b7280" },
];

export default function PipelinePage() {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#0f172a]">CRM Pipeline</h2>
          <p className="text-sm text-[#64748b] mt-0.5">{leadsData.length} total leads · ₹3.5L pipeline value</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-[#2563eb] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#1d4ed8]">
          <Plus className="w-4 h-4" /> Add Lead
        </button>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map(stage => {
          const stageLeads = leadsData.filter(l => l.stage === stage.id);
          const stageValue = stageLeads.reduce((sum, l) => sum + l.value, 0);
          return (
            <div key={stage.id} className="shrink-0 w-64">
              {/* Column header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: stage.color }} />
                  <span className="text-sm font-semibold text-[#1e293b]">{stage.label}</span>
                  <span className="text-xs bg-[#f1f5f9] text-[#64748b] px-1.5 py-0.5 rounded-full">{stageLeads.length}</span>
                </div>
              </div>

              {/* Value bar */}
              {stageValue > 0 && (
                <div className="flex items-center gap-1.5 mb-3 px-1">
                  <DollarSign className="w-3 h-3 text-[#64748b]" />
                  <span className="text-xs text-[#64748b]">₹{(stageValue / 1000).toFixed(0)}K</span>
                </div>
              )}

              {/* Cards */}
              <div className="space-y-2.5 min-h-[100px] bg-[#ffffff]/50 rounded-xl p-2 border border-[#e2e8f0]">
                {stageLeads.map(lead => (
                  <div
                    key={lead.id}
                    className="bg-[#ffffff] border border-[#e2e8f0] rounded-xl p-3.5 cursor-pointer hover:border-[#cbd5e1] transition-all card-hover"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-semibold text-[#0f172a]">{lead.name}</p>
                        <p className="text-xs text-[#64748b]">{lead.business}</p>
                      </div>
                      <button className="text-[#4b5563] hover:text-[#475569]">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold" style={{ color: stage.color }}>
                        ₹{(lead.value / 1000).toFixed(0)}K
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-[#64748b] flex items-center gap-1">
                          <Calendar className="w-2.5 h-2.5" />
                          {lead.date.toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                        </span>
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#2563eb] to-[#3b82f6] flex items-center justify-center text-white text-[9px] font-bold">
                          {lead.assignee.charAt(0)}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-[10px] bg-[#f1f5f9] text-[#64748b] px-2 py-0.5 rounded-full">
                        {lead.source}
                      </span>
                    </div>
                  </div>
                ))}
                {stageLeads.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <p className="text-xs text-[#4b5563]">No leads here</p>
                  </div>
                )}
                <button className="w-full flex items-center gap-2 py-2 text-xs text-[#4b5563] hover:text-[#64748b] transition-colors justify-center">
                  <Plus className="w-3.5 h-3.5" /> Add lead
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
