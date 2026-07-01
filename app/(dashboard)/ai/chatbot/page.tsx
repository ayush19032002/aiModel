"use client";
import { useEffect, useState } from "react";
import { Bot, MessageSquare, Handshake, BarChart3, Plus } from "lucide-react";
import { SectionCard } from "@/components/shared/SectionCard";

export default function ChatbotPage() {
  const [threads, setThreads] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/modules")
      .then((res) => res.json())
      .then((data) => setThreads(data.chatbot || []));
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">AI Chatbot</h2>
          <p className="mt-1 text-sm text-slate-500">Website chat, WhatsApp support, FAQ automation, handoff, and analytics.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New workflow
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title="Bot coverage" description="Multi-channel assistant" className="lg:col-span-2">
          <div className="grid gap-3 md:grid-cols-3">
            {[
              { label: "Website chats", value: "1,240" },
              { label: "WhatsApp replies", value: "4,110" },
              { label: "Lead capture", value: "92%" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</p>
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Live status" description="Agent health">
          <div className="space-y-3">
            {[
              { label: "FAQ matching", value: "98%" },
              { label: "Escalations", value: "6" },
              { label: "Avg response", value: "2.1s" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2">
                <span className="text-sm text-slate-600">{item.label}</span>
                <span className="text-sm font-semibold text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <SectionCard title="Conversation history" description="Recent threads from website and WhatsApp.">
          <div className="space-y-3">
            {threads.map((thread) => (
              <div key={thread.id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{thread.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{thread.lastMessage}</p>
                  </div>
                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">{thread.status}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1">{thread.channel}</span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1">{thread.leadCaptured ? "Lead captured" : "No lead"}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Operations" description="Support controls and team handoff.">
          <div className="space-y-3">
            {[
              { icon: MessageSquare, label: "Lead capture forms", value: "Active" },
              { icon: Handshake, label: "Human handoff", value: "Enabled" },
              { icon: BarChart3, label: "Conversation analytics", value: "Live" },
              { icon: Bot, label: "FAQ knowledge base", value: "Updated" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-3">
                  <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                    <p className="text-sm text-slate-500">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
