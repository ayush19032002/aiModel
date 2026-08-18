"use client";
import { useState } from "react";
import { Globe, Check, Eye, Smartphone, Monitor, Upload } from "lucide-react";
import { toast } from "react-hot-toast";

const templates = [
  { id: "clinic", name: "Healthcare & Clinic", desc: "Clean, trust-building design for medical practices", color: "#10b981" },
  { id: "restaurant", name: "Restaurant & Cafe", desc: "Appetizing design with menu and gallery focus", color: "#f59e0b" },
  { id: "retail", name: "Retail & Boutique", desc: "Elegant product-focused layout for shops", color: "#3b82f6" },
];

const steps = ["Business Info", "Template", "SEO", "Preview & Publish"];

export default function WebsitePage() {
  const [step, setStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState("clinic");
  const [preview, setPreview] = useState<"desktop" | "mobile">("desktop");
  const [published, setPublished] = useState(false);

  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const res = await fetch("/api/website/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ template: selectedTemplate })
      });
      const data = await res.json();
      if (data.success) {
        setPublished(true);
        toast.success(`Website published successfully!`);
      }
    } catch (e) {
      toast.error("Failed to publish website");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-[#0f172a]">Website Builder</h2>
        <p className="text-sm text-[#64748b] mt-0.5">Generate a professional SEO-optimized website in minutes</p>
      </div>

      {/* Progress */}
      <div className="flex gap-2">
        {steps.map((s, i) => (
          <button key={s} onClick={() => setStep(i)} className={`flex items-center gap-2 flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${i === step ? "bg-[#2563eb] text-white" : i < step ? "bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/20" : "bg-[#ffffff] border border-[#e2e8f0] text-[#64748b]"}`}>
            {i < step && <Check className="w-3 h-3" />}
            {i + 1}. {s}
          </button>
        ))}
      </div>

      {/* Step Content */}
      {step === 0 && (
        <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-6 space-y-5">
          <h3 className="font-semibold text-[#0f172a]">Business Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[["Business Name", "Sharma Dental Clinic"], ["Phone Number", "+91 98765 43210"], ["Email", "contact@sharmadental.com"], ["City", "Mumbai, Maharashtra"], ["Tagline", "Your Smile, Our Priority"]].map(([l, p]) => (
              <div key={l}>
                <label className="block text-sm text-[#475569] mb-2">{l}</label>
                <input type="text" defaultValue={p} className="w-full px-4 py-3 text-sm rounded-xl" />
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="block text-sm text-[#475569] mb-2">Services (comma-separated)</label>
              <input type="text" defaultValue="Teeth Cleaning, Whitening, Braces, Root Canal, Dental Implants" className="w-full px-4 py-3 text-sm rounded-xl" />
            </div>
          </div>
          <button onClick={() => setStep(1)} className="bg-[#2563eb] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#1d4ed8]">Continue →</button>
        </div>
      )}

      {step === 1 && (
        <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-6">
          <h3 className="font-semibold text-[#0f172a] mb-5">Choose Template</h3>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {templates.map(t => (
              <button key={t.id} onClick={() => setSelectedTemplate(t.id)} className={`p-4 rounded-xl border-2 text-left transition-all ${selectedTemplate === t.id ? "border-[#2563eb] bg-[#2563eb]/10" : "border-[#e2e8f0] bg-[#ffffff] hover:border-[#cbd5e1]"}`}>
                <div className="w-full h-24 rounded-lg mb-3 flex items-center justify-center" style={{ background: `${t.color}15` }}>
                  <Globe className="w-8 h-8" style={{ color: t.color }} />
                </div>
                <p className="font-semibold text-[#0f172a] text-sm mb-1">{t.name}</p>
                <p className="text-xs text-[#64748b]">{t.desc}</p>
                {selectedTemplate === t.id && <Check className="w-4 h-4 text-[#7c3aed] mt-2" />}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(0)} className="px-4 py-2.5 text-sm border border-[#e2e8f0] text-[#1e293b] rounded-xl">← Back</button>
            <button onClick={() => setStep(2)} className="bg-[#2563eb] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1d4ed8]">Continue →</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-6 space-y-5">
          <h3 className="font-semibold text-[#0f172a]">SEO Settings</h3>
          {[["Meta Title", "Sharma Dental Clinic | Best Dentist in Mumbai"], ["Meta Description", "Expert dental care in Mumbai. Teeth whitening, braces, implants & more. Book appointment today!"], ["Focus Keyword", "dentist in mumbai"]].map(([l, v]) => (
            <div key={l}>
              <label className="block text-sm text-[#475569] mb-2">{l}</label>
              <input type="text" defaultValue={v} className="w-full px-4 py-3 text-sm rounded-xl" />
            </div>
          ))}
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="px-4 py-2.5 text-sm border border-[#e2e8f0] text-[#1e293b] rounded-xl">← Back</button>
            <button onClick={() => setStep(3)} className="bg-[#2563eb] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1d4ed8]">Preview →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-[#e2e8f0]">
            <div className="flex gap-2">
              <button onClick={() => setPreview("desktop")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs ${preview === "desktop" ? "bg-[#2563eb] text-white" : "text-[#64748b] hover:text-[#1e293b]"}`}>
                <Monitor className="w-3.5 h-3.5" /> Desktop
              </button>
              <button onClick={() => setPreview("mobile")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs ${preview === "mobile" ? "bg-[#2563eb] text-white" : "text-[#64748b] hover:text-[#1e293b]"}`}>
                <Smartphone className="w-3.5 h-3.5" /> Mobile
              </button>
            </div>
            <button onClick={handlePublish} disabled={isPublishing || published} className="inline-flex items-center gap-2 bg-[#10b981] text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-[#059669] disabled:opacity-50">
              <Upload className="w-4 h-4" /> {isPublishing ? "Publishing..." : published ? "Published! ✓" : "Publish Website"}
            </button>
          </div>
          <div className={`mx-auto transition-all duration-300 ${preview === "mobile" ? "max-w-sm" : "max-w-full"}`}>
            <div className="bg-[#ffffff] p-8 text-center">
              <div className="bg-[#10b981] text-white text-xs px-3 py-1 rounded-full inline-block mb-4">Live Preview</div>
              <h1 className="text-3xl font-bold text-[#0f172a] mb-2">Sharma Dental Clinic</h1>
              <p className="text-[#475569] mb-6">Your Smile, Our Priority · Mumbai</p>
              <div className="flex gap-3 justify-center mb-8">
                <div className="bg-[#10b981] text-white px-5 py-2 rounded-lg text-sm font-semibold">Book Appointment</div>
                <div className="border border-[#e2e8f0] text-[#1e293b] px-5 py-2 rounded-lg text-sm">Call Now</div>
              </div>
              <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
                {["Teeth Cleaning", "Whitening", "Braces", "Root Canal", "Implants", "Consultation"].map(s => (
                  <div key={s} className="bg-[#ffffff] border border-[#e2e8f0] rounded-xl p-3 text-center">
                    <p className="text-xs text-[#475569]">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
