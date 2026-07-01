"use client";
import { useState } from "react";
import { User, Building2, Link2, CreditCard, Users, Bell, Code } from "lucide-react";

const tabs = [
  { id: "profile", icon: User, label: "Profile" },
  { id: "business", icon: Building2, label: "Business" },
  { id: "integrations", icon: Link2, label: "Integrations" },
  { id: "billing", icon: CreditCard, label: "Billing" },
  { id: "team", icon: Users, label: "Team" },
  { id: "notifications", icon: Bell, label: "Notifications" },
  { id: "api", icon: Code, label: "API" },
];

const integrations = [
  { name: "Google Business Profile", desc: "Connected as Sharma Dental Clinic", status: "connected", color: "#10b981" },
  { name: "WhatsApp Business API", desc: "+91 98765 43210 · 1,240 conversations", status: "connected", color: "#10b981" },
  { name: "Google Analytics", desc: "Tracking code active on your website", status: "connected", color: "#10b981" },
  { name: "Email (SMTP)", desc: "Not connected — required for email campaigns", status: "disconnected", color: "#ef4444" },
];

const teamMembers = [
  { name: "Arjun Sharma", email: "arjun@sharmadental.com", role: "Owner", avatar: "A" },
  { name: "Priya Mehta", email: "priya@sharmadental.com", role: "Manager", avatar: "P" },
  { name: "Rahul Kumar", email: "rahul@sharmadental.com", role: "Viewer", avatar: "R" },
];

export default function SettingsPage() {
  const [active, setActive] = useState("profile");

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#0f172a]">Settings</h2>
        <p className="text-sm text-[#64748b] mt-0.5">Manage your account, business, and integrations</p>
      </div>

      <div className="flex gap-6">
        {/* Tab sidebar */}
        <div className="w-48 shrink-0 space-y-1">
          {tabs.map(t => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  active === t.id ? "bg-[#2563eb]/15 text-[#3b82f6] font-medium" : "text-[#64748b] hover:text-[#1e293b] hover:bg-[#ffffff]"
                }`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1">
          {active === "profile" && (
            <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-6 space-y-5">
              <h3 className="font-semibold text-[#0f172a]">Profile Settings</h3>
              <div className="flex items-center gap-5 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2563eb] to-[#3b82f6] flex items-center justify-center text-white text-2xl font-bold">A</div>
                <div>
                  <p className="font-semibold text-[#0f172a]">Arjun Sharma</p>
                  <p className="text-sm text-[#64748b]">arjun@sharmadental.com</p>
                  <button className="text-xs text-[#7c3aed] mt-1">Change photo</button>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {[["First Name", "Arjun"], ["Last Name", "Sharma"], ["Email", "arjun@sharmadental.com"], ["Phone", "+91 98765 43210"]].map(([l, v]) => (
                  <div key={l}>
                    <label className="block text-sm text-[#475569] mb-2">{l}</label>
                    <input type="text" defaultValue={v} className="w-full px-4 py-3 text-sm rounded-xl" />
                  </div>
                ))}
              </div>
              <button className="bg-[#2563eb] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1d4ed8]">Save Changes</button>
            </div>
          )}

          {active === "integrations" && (
            <div className="space-y-4">
              {integrations.map(intg => (
                <div key={intg.name} className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#ffffff] border border-[#e2e8f0] flex items-center justify-center shrink-0">
                    <Link2 className="w-5 h-5 text-[#64748b]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#0f172a] text-sm">{intg.name}</p>
                    <p className="text-xs text-[#64748b] mt-0.5">{intg.desc}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: `${intg.color}15`, color: intg.color }}>
                      {intg.status}
                    </span>
                    <button className="text-xs bg-[#ffffff] border border-[#e2e8f0] text-[#1e293b] px-3 py-1.5 rounded-lg hover:border-[#cbd5e1]">
                      {intg.status === "connected" ? "Manage" : "Connect"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {active === "billing" && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-[#2563eb] to-[#4c1d95] rounded-2xl p-6 text-white">
                <p className="text-sm text-[#1d4ed8] mb-2">Current Plan</p>
                <p className="text-2xl font-bold mb-1">Growth Plan</p>
                <p className="text-[#1d4ed8] text-sm">₹7,999/month · Renews Aug 1, 2024</p>
                <button className="mt-4 bg-white text-[#7c3aed] px-4 py-2 rounded-lg text-sm font-semibold">Upgrade to Enterprise</button>
              </div>
              <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-5">
                <h4 className="font-semibold text-[#0f172a] mb-4">Billing History</h4>
                <div className="space-y-3">
                  {["Jul 1 · ₹7,999 · Paid", "Jun 1 · ₹7,999 · Paid", "May 1 · ₹7,999 · Paid"].map(b => (
                    <div key={b} className="flex justify-between text-sm">
                      <span className="text-[#475569]">{b.split(" · ").slice(0,2).join(" · ")}</span>
                      <span className="text-[#10b981] font-medium">{b.split(" · ")[2]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {active === "team" && (
            <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h4 className="font-semibold text-[#0f172a]">Team Members</h4>
                <button className="text-xs bg-[#2563eb] text-white px-3 py-1.5 rounded-lg">Invite Member</button>
              </div>
              <div className="space-y-3">
                {teamMembers.map(m => (
                  <div key={m.email} className="flex items-center gap-3 p-3 bg-[#ffffff] rounded-xl border border-[#e2e8f0]">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2563eb] to-[#3b82f6] flex items-center justify-center text-white text-sm font-bold shrink-0">{m.avatar}</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#0f172a]">{m.name}</p>
                      <p className="text-xs text-[#64748b]">{m.email}</p>
                    </div>
                    <span className="text-xs bg-[#f1f5f9] text-[#475569] px-2.5 py-1 rounded-full">{m.role}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(active === "business" || active === "notifications" || active === "api") && (
            <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-12 text-center">
              <p className="text-[#64748b]">Settings for <span className="text-[#2563eb] font-medium capitalize">{active}</span> will be available here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
