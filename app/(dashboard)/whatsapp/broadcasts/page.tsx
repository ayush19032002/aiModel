"use client";
import { useState } from "react";
import { Megaphone, Users, MessageSquare, Send, Calendar, Clock } from "lucide-react";

export default function BroadcastsPage() {
  const [campaignName, setCampaignName] = useState("");
  const [audience, setAudience] = useState("all");
  const [template, setTemplate] = useState("promo_1");
  const [scheduled, setScheduled] = useState(false);
  
  const templates = [
    { id: "promo_1", name: "Summer Promo (Approved)", content: "Hi {{1}}, get 20% off all dental services this summer! Book now at {{2}}." },
    { id: "update_1", name: "Holiday Hours (Approved)", content: "Dear patient, please note our clinic will be closed from {{1}} to {{2}}." }
  ];

  const selectedTemplate = templates.find(t => t.id === template);

  const [isSending, setIsSending] = useState(false);
  
  const handleSend = async () => {
    setIsSending(true);
    try {
      // 1. Create broadcast
      const createRes = await fetch("/api/broadcasts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: campaignName, audience, templateId: template })
      });
      const broadcast = await createRes.json();
      
      // 2. Send broadcast
      const sendRes = await fetch(`/api/broadcasts/${broadcast.id}/send`, {
        method: "POST"
      });
      
      if (sendRes.ok) {
        alert(scheduled ? "Campaign scheduled successfully!" : "Campaign started successfully!");
        setCampaignName("");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to send broadcast");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0f172a]">Broadcast Campaigns</h1>
          <p className="text-muted-foreground text-sm">
            Send bulk WhatsApp messages using Meta-approved templates.
          </p>
        </div>
        <button className="bg-[#ffffff] border border-[#e2e8f0] text-[#0f172a] px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#f8fafc] transition-colors">
          View History
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-[#0f172a] mb-5 border-b border-[#e2e8f0] pb-3">Campaign Details</h3>
            
            <div className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-[#475569] mb-1.5 block">Campaign Name</label>
                <input
                  type="text"
                  value={campaignName}
                  onChange={e => setCampaignName(e.target.value)}
                  placeholder="e.g. Summer Promo 2026"
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#e2e8f0] bg-white focus:outline-none focus:border-[#2563eb]"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-[#475569] mb-1.5 block">Audience Segment</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div 
                    onClick={() => setAudience("all")}
                    className={`border rounded-xl p-4 cursor-pointer transition-colors ${audience === "all" ? "border-[#2563eb] bg-[#2563eb]/5" : "border-[#e2e8f0] hover:border-[#cbd5e1]"}`}
                  >
                    <Users className={`w-5 h-5 mb-2 ${audience === "all" ? "text-[#2563eb]" : "text-[#94a3b8]"}`} />
                    <p className="text-sm font-bold text-[#0f172a]">All Contacts</p>
                    <p className="text-xs text-[#64748b]">1,245 recipients</p>
                  </div>
                  <div 
                    onClick={() => setAudience("recent")}
                    className={`border rounded-xl p-4 cursor-pointer transition-colors ${audience === "recent" ? "border-[#2563eb] bg-[#2563eb]/5" : "border-[#e2e8f0] hover:border-[#cbd5e1]"}`}
                  >
                    <Clock className={`w-5 h-5 mb-2 ${audience === "recent" ? "text-[#2563eb]" : "text-[#94a3b8]"}`} />
                    <p className="text-sm font-bold text-[#0f172a]">Recent</p>
                    <p className="text-xs text-[#64748b]">Last 30 days (342)</p>
                  </div>
                  <div 
                    onClick={() => setAudience("manual")}
                    className={`border rounded-xl p-4 cursor-pointer transition-colors ${audience === "manual" ? "border-[#2563eb] bg-[#2563eb]/5" : "border-[#e2e8f0] hover:border-[#cbd5e1]"}`}
                  >
                    <Users className={`w-5 h-5 mb-2 ${audience === "manual" ? "text-[#2563eb]" : "text-[#94a3b8]"}`} />
                    <p className="text-sm font-bold text-[#0f172a]">Manual Contacts</p>
                    <p className="text-xs text-[#64748b]">Manually added (3)</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-[#475569] mb-1.5 block">Message Template</label>
                <select
                  value={template}
                  onChange={e => setTemplate(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#e2e8f0] bg-white focus:outline-none focus:border-[#2563eb]"
                >
                  {templates.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
                <p className="text-[11px] text-[#64748b] mt-2">
                  Only Meta-approved message templates can be used to initiate conversations with customers.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-[#0f172a] mb-5 border-b border-[#e2e8f0] pb-3">Scheduling</h3>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={!scheduled} onChange={() => setScheduled(false)} className="w-4 h-4 text-[#2563eb]" />
                <span className="text-sm font-medium text-[#0f172a]">Send Immediately</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={scheduled} onChange={() => setScheduled(true)} className="w-4 h-4 text-[#2563eb]" />
                <span className="text-sm font-medium text-[#0f172a]">Schedule for later</span>
              </label>
            </div>
            {scheduled && (
              <div className="flex gap-4 mt-4">
                <input type="date" className="px-4 py-2 text-sm border border-[#e2e8f0] rounded-lg focus:outline-none" />
                <input type="time" className="px-4 py-2 text-sm border border-[#e2e8f0] rounded-lg focus:outline-none" />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-[#0f172a] mb-5 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#2563eb]" /> Phone Preview
            </h3>
            
            <div className="bg-[#efeae2] w-full aspect-[9/16] max-h-[400px] rounded-3xl border-[8px] border-[#0f172a] p-4 flex flex-col shadow-xl overflow-hidden relative">
              <div className="w-1/3 h-4 bg-[#0f172a] absolute top-0 left-1/2 -translate-x-1/2 rounded-b-xl" />
              
              <div className="mt-8 flex flex-col gap-2">
                <div className="bg-white p-3 rounded-xl rounded-tl-none shadow-sm max-w-[85%] text-sm text-[#111b21] leading-relaxed self-start">
                  {selectedTemplate?.content.replace("{{1}}", "John").replace("{{2}}", "our website")}
                  <div className="text-[10px] text-right text-[#667781] mt-1">10:42 AM</div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleSend}
            disabled={isSending || !campaignName}
            className="w-full flex items-center justify-center gap-2 bg-[#2563eb] text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-[#1d4ed8] transition-colors shadow-lg shadow-[#2563eb]/20 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
            {isSending ? "Processing..." : (scheduled ? "Schedule Campaign" : "Send Now")}
          </button>
        </div>
      </div>
    </div>
  );
}
