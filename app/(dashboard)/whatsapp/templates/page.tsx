"use client";
import { Plus, Copy, Smartphone } from "lucide-react";

const templates = [
  { id: 1, name: "Welcome Message", category: "Greeting", preview: "Hello {{name}}! 👋 Welcome to {{business_name}}. How can we help you today?", status: "approved" },
  { id: 2, name: "Appointment Confirmed", category: "Appointment", preview: "Dear {{name}}, your appointment is confirmed for {{date}} at {{time}}. See you soon! 😊", status: "approved" },
  { id: 3, name: "Review Request", category: "Feedback", preview: "Hi {{name}}! We hope you enjoyed your visit to {{business_name}}. Would you mind leaving us a Google review? 🌟", status: "approved" },
  { id: 4, name: "Festival Offer", category: "Marketing", preview: "Happy {{festival}}! 🎉 As a special treat, we're offering {{discount}}% off all services this week only.", status: "pending" },
  { id: 5, name: "Appointment Reminder", category: "Reminder", preview: "Reminder: You have an appointment tomorrow at {{time}}. Reply YES to confirm or CANCEL to reschedule.", status: "approved" },
];

const categories = ["All", "Greeting", "Appointment", "Feedback", "Marketing", "Reminder"];

export default function TemplatesPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#0f172a]">Message Templates</h2>
          <p className="text-sm text-[#64748b] mt-0.5">{templates.length} templates · Pre-approved for WhatsApp</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-[#2563eb] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#1d4ed8]">
          <Plus className="w-4 h-4" /> New Template
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map(c => (
          <button key={c} className={`text-xs px-3 py-1.5 rounded-lg transition-all ${c === "All" ? "bg-[#2563eb] text-white" : "bg-[#ffffff] border border-[#e2e8f0] text-[#64748b] hover:text-[#475569]"}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {templates.map(t => (
          <div key={t.id} className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-5 card-hover">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-[#0f172a] text-sm">{t.name}</h4>
                <span className="text-xs text-[#64748b]">{t.category}</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${t.status === "approved" ? "bg-[#10b981]/15 text-[#10b981]" : "bg-[#f59e0b]/15 text-[#f59e0b]"}`}>
                {t.status}
              </span>
            </div>

            {/* Mock phone preview */}
            <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-xl p-3 mb-4 flex gap-2">
              <Smartphone className="w-4 h-4 text-[#64748b] shrink-0 mt-0.5" />
              <p className="text-xs text-[#475569] leading-relaxed">{t.preview}</p>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 text-xs bg-[#ffffff] border border-[#e2e8f0] text-[#1e293b] py-2 rounded-lg hover:border-[#cbd5e1] transition-colors">
                Edit
              </button>
              <button className="flex items-center gap-1.5 text-xs bg-[#2563eb]/10 text-[#2563eb] border border-[#2563eb]/20 px-3 py-2 rounded-lg hover:bg-[#2563eb]/20 transition-colors">
                <Copy className="w-3 h-3" /> Use
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
