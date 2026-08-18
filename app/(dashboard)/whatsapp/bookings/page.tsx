"use client";
import { useState } from "react";
import { Bot, Check, Settings2, Play, Calendar, User, Clock, Phone, Power } from "lucide-react";

export default function BookingsPage() {
  const [isAiEnabled, setIsAiEnabled] = useState(true);
  const [instructions, setInstructions] = useState(
    "You are the booking assistant for Sharma Dental Clinic. Your goal is to help users schedule an appointment. You must collect their Name, Phone Number, preferred Date, and preferred Time. Available hours are Mon-Fri 9AM-5PM. Reply nicely."
  );
  
  const [saved, setSaved] = useState(false);

  const bookings = [
    { id: 1, name: "Alice Johnson", phone: "+1 555-0102", service: "General Checkup", date: "2026-08-15", time: "10:00 AM", status: "Confirmed via WhatsApp" },
    { id: 2, name: "Mark Smith", phone: "+1 555-0199", service: "Teeth Whitening", date: "2026-08-15", time: "02:30 PM", status: "Confirmed via WhatsApp" },
    { id: 3, name: "Sarah Lee", phone: "+1 555-0123", service: "Consultation", date: "2026-08-16", time: "11:00 AM", status: "Confirmed via WhatsApp" },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-[#0f172a]">AI Auto Bookings</h1>
          <p className="text-muted-foreground text-sm">
            Configure your AI assistant to handle WhatsApp booking requests automatically.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-[#ffffff] border border-[#e2e8f0] px-4 py-2 rounded-xl">
          <span className="text-sm font-semibold text-[#475569]">AI Agent Status:</span>
          <button 
            onClick={() => setIsAiEnabled(!isAiEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isAiEnabled ? 'bg-[#10b981]' : 'bg-[#cbd5e1]'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAiEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Agent Configuration */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-[#0f172a] mb-5 flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-[#2563eb]" /> Agent Configuration
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-[#475569] mb-1.5 block">Custom Instructions (Prompt)</label>
                <textarea
                  value={instructions}
                  onChange={e => setInstructions(e.target.value)}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-[#e2e8f0] focus:outline-none focus:border-[#2563eb] h-48 resize-none bg-[#f8fafc] focus:bg-white transition-colors"
                />
                <p className="text-[11px] text-[#64748b] mt-2 leading-relaxed">
                  The AI uses this prompt to guide the conversation. Ensure you specify your available hours, required fields (name, service), and tone.
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-[#475569] mb-1.5 flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#10b981]" /> Auto-Confirmation Messages
                </label>
                <p className="text-xs text-[#64748b] mb-3">
                  When a booking is finalized, the system will automatically send a WhatsApp confirmation message containing the booking details.
                </p>
                
                <label className="text-sm font-semibold text-[#475569] mb-1.5 block mt-4">Target Audience for Confirmations</label>
                <select className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#e2e8f0] bg-white focus:outline-none focus:border-[#2563eb]">
                  <option value="all">All Incoming Numbers</option>
                  <option value="manual">Manual Contacts Only</option>
                </select>
              </div>

              <button
                onClick={handleSave}
                className="w-full flex items-center justify-center gap-2 bg-[#2563eb] text-white px-4 py-2.5 rounded-xl font-bold hover:bg-[#1d4ed8] transition-colors"
              >
                {saved ? <><Check className="w-4 h-4" /> Saved!</> : "Save Configuration"}
              </button>
            </div>
          </div>

          {/* Test Simulator */}
          <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
             <h3 className="font-semibold text-[#0f172a] mb-4 flex items-center gap-2">
              <Play className="w-5 h-5 text-[#2563eb]" /> Try it out
            </h3>
            <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 h-48 flex flex-col justify-end space-y-3">
              <div className="self-end bg-[#dcf8c6] px-3 py-2 rounded-lg text-sm rounded-tr-none">
                Hi, I'd like to book a checkup.
              </div>
              <div className="self-start bg-gray-100 px-3 py-2 rounded-lg text-sm rounded-tl-none">
                Hello! I'd be happy to help you schedule a checkup. What is your preferred date and time? (We are open Mon-Fri, 9AM-5PM).
              </div>
            </div>
            <div className="mt-3 relative">
              <input type="text" placeholder="Type a message..." className="w-full text-sm py-2 px-3 rounded-lg border border-[#e2e8f0]" />
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="lg:col-span-2 bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-[#0f172a] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#2563eb]" /> Recent AI Bookings
            </h3>
            <button className="text-sm text-[#2563eb] font-semibold hover:underline">View Calendar</button>
          </div>

          <div className="space-y-4">
            {bookings.map(b => (
              <div key={b.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-[#e2e8f0] rounded-xl hover:border-[#cbd5e1] transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#2563eb]/10 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-[#2563eb]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0f172a] text-sm">{b.name}</h4>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-[#64748b]">
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {b.phone}</span>
                      <span className="flex items-center gap-1"><Check className="w-3 h-3 text-[#10b981]" /> {b.service}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 sm:text-right">
                  <div>
                    <div className="flex items-center sm:justify-end gap-1 text-sm font-bold text-[#0f172a]">
                      <Calendar className="w-3.5 h-3.5 text-[#64748b]" /> {b.date}
                    </div>
                    <div className="flex items-center sm:justify-end gap-1 text-xs text-[#64748b] mt-0.5">
                      <Clock className="w-3.5 h-3.5" /> {b.time}
                    </div>
                  </div>
                  <div className="bg-[#10b981]/10 text-[#10b981] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">
                    Confirmed
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
