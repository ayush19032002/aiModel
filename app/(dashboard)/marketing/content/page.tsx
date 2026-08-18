"use client";
import { useState } from "react";
import { Sparkles, Send, RefreshCw } from "lucide-react";
import { SectionCard } from "@/components/shared/SectionCard";

const templates = [
  "Instagram post for a new teeth whitening offer",
  "WhatsApp campaign for review requests",
  "Email draft for a seasonal promotion",
];

export default function ContentGeneratorPage() {
  const [input, setInput] = useState("Create a polished promotional caption for a dental clinic");
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input, contentType: "marketing_copy" })
      });
      const data = await res.json();
      setOutput(data.content || "Failed to generate content");
    } catch (error) {
      setOutput("Error connecting to AI service.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Social Media AI Content Generator</h2>
        <p className="mt-1 text-sm text-slate-500">Generate polished copy for campaigns, reviews, and outreach.</p>
      </div>

      <SectionCard title="Create AI content" description="Turn a prompt into marketing-ready assets.">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {templates.map((template) => (
              <button key={template} onClick={() => setInput(template)} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-600 hover:border-slate-300">
                {template}
              </button>
            ))}
          </div>
          <textarea value={input} onChange={(event) => setInput(event.target.value)} className="min-h-32 w-full rounded-xl border border-slate-200 p-3 text-sm" />
          <div className="flex gap-3">
            <button onClick={handleGenerate} disabled={isGenerating || !input} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50">
              <Sparkles className="h-4 w-4" /> {isGenerating ? "Generating..." : "Generate"}
            </button>
            <button onClick={handleGenerate} disabled={isGenerating || !input} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 disabled:opacity-50 hover:bg-slate-50">
              <RefreshCw className={`h-4 w-4 ${isGenerating ? "animate-spin" : ""}`} /> Rewrite
            </button>
          </div>
          
          {output && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 animate-fade-in">
              <div className="mb-2 flex items-center gap-2 font-semibold text-slate-900"><Send className="h-4 w-4 text-blue-600" /> Generated output</div>
              <p className="whitespace-pre-wrap">{output}</p>
            </div>
          )}
        </div>
      </SectionCard>
    </div>
  );
}
