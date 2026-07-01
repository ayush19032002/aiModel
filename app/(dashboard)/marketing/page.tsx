"use client";
import { useState } from "react";
import { Megaphone, Zap, Plus, ArrowRight, Send } from "lucide-react";
import { campaignPerformanceData } from "@/lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const campaigns = [
  { id: 1, name: "Diwali Special Offer", type: "Festival", channel: "WhatsApp", status: "sent", reach: 650, date: "Oct 28" },
  { id: 2, name: "Monthly Review Request", type: "Review", channel: "WhatsApp", status: "scheduled", reach: 380, date: "Jul 15" },
  { id: 3, name: "Re-engage Inactive Customers", type: "Re-engagement", channel: "WhatsApp + Email", status: "draft", reach: 290, date: "—" },
];

export default function MarketingPage() {
  const [creating, setCreating] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#0f172a]">Marketing Automation</h2>
          <p className="text-sm text-[#64748b] mt-0.5">Build campaigns that convert across WhatsApp, Email & SMS</p>
        </div>
        <button onClick={() => setCreating(!creating)} className="inline-flex items-center gap-2 bg-[#2563eb] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#1d4ed8]">
          <Plus className="w-4 h-4" /> New Campaign
        </button>
      </div>

      {creating && (
        <div className="bg-[#ffffff] border border-[#2563eb]/30 rounded-2xl p-6 space-y-5">
          <h3 className="font-semibold text-[#0f172a] flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#7c3aed]" /> Campaign Builder
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[#475569] mb-2 block">Campaign Name</label>
              <input type="text" placeholder="e.g. Diwali Special 2024" className="w-full px-4 py-3 text-sm rounded-xl" />
            </div>
            <div>
              <label className="text-sm text-[#475569] mb-2 block">Campaign Type</label>
              <select className="w-full px-4 py-3 text-sm rounded-xl">
                <option>Offer / Promotion</option>
                <option>Festival Campaign</option>
                <option>Review Request</option>
                <option>Re-engagement</option>
                <option>Follow-up</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-[#475569] mb-2 block">Channels</label>
              <div className="flex gap-2">
                {["WhatsApp", "Email", "SMS"].map(c => (
                  <label key={c} className="flex items-center gap-2 bg-[#ffffff] border border-[#e2e8f0] px-3 py-2 rounded-lg cursor-pointer hover:border-[#cbd5e1]">
                    <input type="checkbox" className="accent-[#7c3aed]" defaultChecked={c === "WhatsApp"} />
                    <span className="text-xs text-[#1e293b]">{c}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm text-[#475569] mb-2 block">Audience</label>
              <select className="w-full px-4 py-3 text-sm rounded-xl">
                <option>All Customers (256)</option>
                <option>New Leads (47)</option>
                <option>Inactive (90 days) (89)</option>
                <option>High-Value Customers (43)</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-[#475569] mb-2 block">Message</label>
              <textarea defaultValue="🎉 Special offer just for you! Book your appointment this month and get 20% off on all services. Limited time only." className="w-full px-4 py-3 text-sm rounded-xl h-24 resize-none" />
            </div>
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 bg-[#2563eb] text-white px-5 py-2.5 rounded-xl text-sm font-semibold">
              <Send className="w-4 h-4" /> Launch Campaign
            </button>
            <button className="px-5 py-2.5 border border-[#e2e8f0] text-[#1e293b] rounded-xl text-sm">Schedule</button>
          </div>
        </div>
      )}

      {/* Campaign performance chart */}
      <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-6">
        <h3 className="font-semibold text-[#0f172a] mb-5 flex items-center gap-2">
          <Megaphone className="w-4 h-4 text-[#2563eb]" /> Campaign Performance
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={campaignPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 8, color: "#f9fafb" }} />
            <Legend />
            <Bar dataKey="sent" fill="#1f2937" radius={[4,4,0,0]} />
            <Bar dataKey="opened" fill="#2563eb" radius={[4,4,0,0]} />
            <Bar dataKey="clicked" fill="#10b981" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Campaigns list */}
      <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#e2e8f0]">
          <h3 className="font-semibold text-[#0f172a]">All Campaigns</h3>
        </div>
        {campaigns.map(c => (
          <div key={c.id} className="flex items-center gap-4 px-5 py-4 border-b border-[#e2e8f0] last:border-0 hover:bg-[#e2e8f0]/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#2563eb]/15 flex items-center justify-center shrink-0">
              <Megaphone className="w-5 h-5 text-[#7c3aed]" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-[#0f172a] text-sm">{c.name}</p>
              <p className="text-xs text-[#64748b]">{c.type} · {c.channel} · {c.reach} recipients</p>
            </div>
            <div className="text-right shrink-0">
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                c.status === "sent" ? "bg-[#10b981]/15 text-[#10b981]" :
                c.status === "scheduled" ? "bg-[#f59e0b]/15 text-[#f59e0b]" :
                "bg-[#6b7280]/15 text-[#64748b]"
              }`}>{c.status}</span>
              <p className="text-xs text-[#64748b] mt-1">{c.date}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#4b5563]" />
          </div>
        ))}
      </div>
    </div>
  );
}
