"use client";
import { Zap, ArrowRight, Clock, Star, UserCheck, RefreshCw } from "lucide-react";

const automations = [
  { id: 1, name: "Welcome New Lead", trigger: "New WhatsApp message", action: "Send welcome + ask for appointment", active: true, runs: 142, icon: UserCheck, color: "#2563eb" },
  { id: 2, name: "Review Request", trigger: "After appointment (24h)", action: "Send review link via WhatsApp", active: true, runs: 89, icon: Star, color: "#f59e0b" },
  { id: 3, name: "Appointment Reminder", trigger: "1 day before appointment", action: "Send reminder message", active: true, runs: 213, icon: Clock, color: "#10b981" },
  { id: 4, name: "Re-engagement", trigger: "No activity for 30 days", action: "Send promotional offer", active: false, runs: 34, icon: RefreshCw, color: "#3b82f6" },
];

export default function AutomationsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#0f172a]">Automations</h2>
          <p className="text-sm text-[#64748b] mt-0.5">Build smart workflows that run on autopilot</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-[#2563eb] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#1d4ed8]">
          <Zap className="w-4 h-4" /> New Automation
        </button>
      </div>

      {/* Flow builder teaser */}
      <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-6">
        <h3 className="font-semibold text-[#0f172a] mb-6">Visual Flow Builder</h3>
        <div className="flex items-center gap-0 overflow-x-auto pb-2">
          {[
            { label: "Trigger", sub: "New WhatsApp message", color: "#2563eb" },
            { label: "Condition", sub: "First message? Yes", color: "#3b82f6" },
            { label: "Action", sub: "Send welcome message", color: "#10b981" },
            { label: "Wait", sub: "24 hours", color: "#f59e0b" },
            { label: "Action", sub: "Ask for appointment", color: "#10b981" },
          ].map((node, i) => (
            <div key={i} className="flex items-center gap-0 shrink-0">
              <div className="flex flex-col items-center gap-2">
                <div className="px-4 py-3 rounded-xl border-2 text-center min-w-[120px]" style={{ borderColor: node.color, background: `${node.color}15` }}>
                  <p className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: node.color }}>{node.label}</p>
                  <p className="text-xs text-[#1e293b]">{node.sub}</p>
                </div>
              </div>
              {i < 4 && <ArrowRight className="w-5 h-5 text-[#374151] mx-2 shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      {/* Active Automations */}
      <div className="space-y-3">
        {automations.map(a => {
          const Icon = a.icon;
          return (
            <div key={a.id} className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-5 flex items-center gap-5 card-hover">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${a.color}15` }}>
                <Icon className="w-5 h-5" style={{ color: a.color }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-semibold text-[#0f172a]">{a.name}</h4>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${a.active ? "bg-[#10b981]/15 text-[#10b981]" : "bg-[#6b7280]/15 text-[#64748b]"}`}>
                    {a.active ? "Active" : "Paused"}
                  </span>
                </div>
                <p className="text-xs text-[#64748b]">
                  <span className="text-[#475569]">Trigger:</span> {a.trigger} →{" "}
                  <span className="text-[#475569]">Action:</span> {a.action}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xl font-bold text-[#0f172a]">{a.runs}</p>
                <p className="text-xs text-[#64748b]">runs</p>
              </div>
              <div className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${a.active ? "bg-[#2563eb]" : "bg-[#f1f5f9]"}`}>
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${a.active ? "left-5" : "left-0.5"}`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
