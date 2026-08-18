"use client";
import { useState, useEffect } from "react";
import { Search, Filter, Plus, Phone, MessageSquare, X } from "lucide-react";

const stageColors: Record<string, string> = {
  new_lead: "#7c3aed", contacted: "#a855f7", interested: "#3b82f6",
  followup: "#f59e0b", proposal: "#f97316", won: "#10b981", lost: "#6b7280",
};

export default function LeadsPage() {
  const [leadsData, setLeadsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newLead, setNewLead] = useState({ name: "", business: "", source: "Website", stage: "new_lead", value: 0, assignee: "System" });

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    const res = await fetch("/api/crm/leads");
    const data = await res.json();
    // Convert date strings back to Date objects
    const parsedData = data.map((l: any) => ({ ...l, date: new Date(l.date) }));
    setLeadsData(parsedData);
    setLoading(false);
  };

  const handleAddLead = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/crm/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLead)
    });
    if (res.ok) {
      setShowModal(false);
      fetchLeads();
      setNewLead({ name: "", business: "", source: "Website", stage: "new_lead", value: 0, assignee: "System" });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#0f172a]">Leads</h2>
          <p className="text-sm text-[#64748b] mt-0.5">{leadsData.length} leads total</p>
        </div>
        <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-2 bg-[#2563eb] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#1d4ed8]">
          <Plus className="w-4 h-4" /> Add Lead
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Add New Lead</h3>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAddLead} className="space-y-4">
              <input required type="text" placeholder="Customer Name" className="w-full border p-2 rounded-lg" value={newLead.name} onChange={e => setNewLead({...newLead, name: e.target.value})} />
              <input required type="text" placeholder="Business Name" className="w-full border p-2 rounded-lg" value={newLead.business} onChange={e => setNewLead({...newLead, business: e.target.value})} />
              <input required type="number" placeholder="Estimated Value (₹)" className="w-full border p-2 rounded-lg" value={newLead.value} onChange={e => setNewLead({...newLead, value: parseInt(e.target.value) || 0})} />
              <button type="submit" className="w-full bg-[#2563eb] text-white py-2 rounded-lg font-semibold hover:bg-[#1d4ed8]">Save Lead</button>
            </form>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
          <input type="text" placeholder="Search leads..." className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-[#e2e8f0]" />
        </div>
        <button className="inline-flex items-center gap-2 bg-[#ffffff] border border-[#e2e8f0] text-[#1e293b] text-sm px-4 py-2.5 rounded-xl hover:border-[#cbd5e1]">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e2e8f0]">
                {["Name", "Business", "Source", "Stage", "Value", "Assignee", "Date", "Actions"].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-[#64748b] py-3.5 px-4 first:pl-5 last:pr-5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} className="py-8 text-center text-[#64748b]">Loading leads...</td></tr>
              ) : leadsData.map(lead => (
                <tr key={lead.id} className="border-b border-[#e2e8f0] last:border-0 hover:bg-[#e2e8f0]/30 transition-colors">
                  <td className="py-3.5 px-4 pl-5 font-medium text-[#0f172a]">{lead.name}</td>
                  <td className="py-3.5 px-4 text-[#475569]">{lead.business}</td>
                  <td className="py-3.5 px-4">
                    <span className="text-xs bg-[#f1f5f9] text-[#475569] px-2.5 py-1 rounded-full">{lead.source}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium capitalize" style={{ background: `${stageColors[lead.stage]}15`, color: stageColors[lead.stage] }}>
                      {lead.stage.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#10b981]">₹{(lead.value / 1000).toFixed(0)}K</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#2563eb] flex items-center justify-center text-white text-[10px] font-bold">
                        {lead.assignee.charAt(0)}
                      </div>
                      <span className="text-[#475569] text-xs">{lead.assignee}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[#64748b] text-xs">
                    {lead.date.toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                  </td>
                  <td className="py-3.5 px-4 pr-5">
                    <div className="flex gap-2">
                      <button className="w-7 h-7 rounded-lg bg-[#ffffff] border border-[#e2e8f0] flex items-center justify-center text-[#64748b] hover:text-[#1e293b] hover:border-[#cbd5e1]">
                        <Phone className="w-3 h-3" />
                      </button>
                      <button className="w-7 h-7 rounded-lg bg-[#ffffff] border border-[#e2e8f0] flex items-center justify-center text-[#64748b] hover:text-[#1e293b] hover:border-[#cbd5e1]">
                        <MessageSquare className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

