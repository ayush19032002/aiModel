"use client";
import { useState } from "react";
import { Globe, Sparkles, LayoutTemplate, PenTool, CheckCircle2, ChevronRight, RefreshCw, Eye, Edit3 } from "lucide-react";

export default function WebsiteGeneratorPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [businessName, setBusinessName] = useState("Sharma Dental Clinic");
  const [businessType, setBusinessType] = useState("Dental Clinic");
  const [tone, setTone] = useState("Professional and Caring");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Editable generated content
  const [siteData, setSiteData] = useState({
    heroTitle: "Premium Dental Care for Your Brightest Smile",
    heroSubtitle: "Experience state-of-the-art dentistry in a comfortable, caring environment.",
    aboutText: "At Sharma Dental Clinic, we believe that a healthy smile is the foundation of overall wellness. With over 15 years of experience, our team provides comprehensive dental care tailored to your unique needs.",
    services: [
      { name: "General Dentistry", desc: "Routine checkups, cleanings, and preventive care." },
      { name: "Cosmetic Procedures", desc: "Teeth whitening, veneers, and smile makeovers." },
      { name: "Orthodontics", desc: "Clear aligners and traditional braces for all ages." }
    ],
    ctaText: "Book Your Appointment Today"
  });

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setStep(2);
    }, 2500);
  };

  const renderStep1 = () => (
    <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-8 max-w-2xl mx-auto shadow-sm">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-[#2563eb]/10 flex items-center justify-center shrink-0">
          <Globe className="w-6 h-6 text-[#2563eb]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#0f172a]">Business Details</h3>
          <p className="text-sm text-[#64748b]">Tell us about your business to generate a tailored website.</p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label className="text-sm font-semibold text-[#475569] mb-1.5 block">Business Name</label>
          <input
            type="text"
            value={businessName}
            onChange={e => setBusinessName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#2563eb] transition-colors"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-[#475569] mb-1.5 block">Business Type / Niche</label>
          <input
            type="text"
            value={businessType}
            onChange={e => setBusinessType(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#2563eb] transition-colors"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-[#475569] mb-1.5 block">Brand Tone</label>
          <input
            type="text"
            value={tone}
            onChange={e => setTone(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#2563eb] transition-colors"
          />
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={isGenerating || !businessName}
        className="w-full mt-8 flex items-center justify-center gap-2 bg-[#2563eb] text-white px-6 py-3.5 rounded-xl font-bold hover:bg-[#1d4ed8] transition-colors disabled:opacity-70"
      >
        {isGenerating ? (
          <><RefreshCw className="w-5 h-5 animate-spin" /> Generating Structure & Content...</>
        ) : (
          <><Sparkles className="w-5 h-5" /> Generate My Website</>
        )}
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[#0f172a] flex items-center gap-2">
          <PenTool className="w-5 h-5 text-[#2563eb]" /> Edit Generated Content
        </h3>
        <div className="flex gap-2">
          <button onClick={() => setIsPreviewMode(true)} className="flex items-center gap-2 bg-[#f1f5f9] text-[#0f172a] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#e2e8f0] transition-colors">
            <Eye className="w-4 h-4" /> Live Preview
          </button>
          <button onClick={() => setStep(3)} className="flex items-center gap-2 bg-[#10b981] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#059669] transition-colors">
            <CheckCircle2 className="w-4 h-4" /> Finalize & Publish
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div>
            <label className="text-sm font-semibold text-[#475569] mb-1.5 block">Hero Title (H1)</label>
            <input
              type="text"
              value={siteData.heroTitle}
              onChange={e => setSiteData({ ...siteData, heroTitle: e.target.value })}
              className="w-full px-4 py-2 text-sm rounded-lg border border-[#e2e8f0] focus:outline-none focus:border-[#2563eb]"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#475569] mb-1.5 block">Hero Subtitle</label>
            <textarea
              value={siteData.heroSubtitle}
              onChange={e => setSiteData({ ...siteData, heroSubtitle: e.target.value })}
              className="w-full px-4 py-2 text-sm rounded-lg border border-[#e2e8f0] focus:outline-none focus:border-[#2563eb] h-20 resize-none"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#475569] mb-1.5 block">About Section Text</label>
            <textarea
              value={siteData.aboutText}
              onChange={e => setSiteData({ ...siteData, aboutText: e.target.value })}
              className="w-full px-4 py-2 text-sm rounded-lg border border-[#e2e8f0] focus:outline-none focus:border-[#2563eb] h-28 resize-none"
            />
          </div>
        </div>
        
        <div className="space-y-5">
          <h4 className="text-sm font-semibold text-[#475569] border-b border-[#e2e8f0] pb-2">Services Section</h4>
          {siteData.services.map((svc, i) => (
            <div key={i} className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg">
              <input
                type="text"
                value={svc.name}
                onChange={e => {
                  const newSvcs = [...siteData.services];
                  newSvcs[i].name = e.target.value;
                  setSiteData({ ...siteData, services: newSvcs });
                }}
                className="w-full px-3 py-1.5 text-sm font-semibold rounded mb-2 border border-[#e2e8f0] focus:outline-none focus:border-[#2563eb]"
              />
              <input
                type="text"
                value={svc.desc}
                onChange={e => {
                  const newSvcs = [...siteData.services];
                  newSvcs[i].desc = e.target.value;
                  setSiteData({ ...siteData, services: newSvcs });
                }}
                className="w-full px-3 py-1.5 text-xs rounded border border-[#e2e8f0] focus:outline-none focus:border-[#2563eb]"
              />
            </div>
          ))}
          
          <div>
            <label className="text-sm font-semibold text-[#475569] mb-1.5 block mt-4">Call to Action Button Text</label>
            <input
              type="text"
              value={siteData.ctaText}
              onChange={e => setSiteData({ ...siteData, ctaText: e.target.value })}
              className="w-full px-4 py-2 text-sm rounded-lg border border-[#e2e8f0] focus:outline-none focus:border-[#2563eb]"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-12 text-center max-w-2xl mx-auto shadow-sm">
      <div className="w-20 h-20 rounded-full bg-[#10b981]/10 flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-10 h-10 text-[#10b981]" />
      </div>
      <h2 className="text-2xl font-bold text-[#0f172a] mb-2">Website Published Successfully!</h2>
      <p className="text-[#64748b] mb-8">
        Your SEO-friendly AI generated website is now live and connected to your Google Business Profile domain.
      </p>
      
      <div className="flex justify-center gap-4">
        <button className="bg-[#2563eb] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#1d4ed8] transition-colors">
          View Live Website
        </button>
        <button onClick={() => setStep(2)} className="bg-[#f1f5f9] text-[#0f172a] px-6 py-2.5 rounded-xl font-semibold hover:bg-[#e2e8f0] transition-colors">
          Back to Editor
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 p-6 animate-fade-in relative">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0f172a]">AI Website Generator</h1>
        <p className="text-muted-foreground text-sm">
          Generate a professional, SEO-optimized website based on your business info.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center max-w-2xl mx-auto mb-8">
        {[
          { num: 1, label: "Business Info" },
          { num: 2, label: "Edit Content" },
          { num: 3, label: "Publish" }
        ].map((s, i) => (
          <div key={s.num} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${step >= s.num ? "bg-[#2563eb] text-white" : "bg-[#f1f5f9] text-[#94a3b8]"}`}>
              {s.num}
            </div>
            <span className={`ml-2 text-sm font-semibold ${step >= s.num ? "text-[#0f172a]" : "text-[#94a3b8]"}`}>{s.label}</span>
            {i < 2 && <div className={`w-12 h-0.5 mx-4 ${step > s.num ? "bg-[#2563eb]" : "bg-[#f1f5f9]"}`} />}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}

      {/* Live Preview Modal Overlay */}
      {isPreviewMode && (
        <div className="fixed inset-0 bg-[#0f172a]/80 z-50 flex flex-col backdrop-blur-sm animate-fade-in">
          <div className="bg-white border-b border-[#e2e8f0] h-14 flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-2 text-sm font-bold text-[#0f172a]">
              <Eye className="w-4 h-4 text-[#2563eb]" /> Live Website Preview
            </div>
            <button 
              onClick={() => setIsPreviewMode(false)}
              className="bg-[#f1f5f9] text-[#0f172a] px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-[#e2e8f0] transition-colors flex items-center gap-2"
            >
              <Edit3 className="w-4 h-4" /> Return to Editor
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto bg-gray-100 p-8">
            {/* The generated website preview template */}
            <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden animate-fade-in border border-gray-200">
              {/* Header */}
              <header className="px-8 py-5 flex justify-between items-center border-b border-gray-100">
                <div className="text-xl font-black text-indigo-900">{businessName}</div>
                <nav className="flex gap-6 text-sm font-medium text-gray-600">
                  <span>Home</span>
                  <span>About</span>
                  <span>Services</span>
                  <span>Contact</span>
                </nav>
              </header>

              {/* Hero */}
              <section className="px-8 py-20 bg-indigo-50 text-center">
                <h1 className="text-5xl font-extrabold text-indigo-950 mb-6 max-w-3xl mx-auto leading-tight">{siteData.heroTitle}</h1>
                <p className="text-lg text-indigo-800 mb-10 max-w-2xl mx-auto">{siteData.heroSubtitle}</p>
                <button className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 shadow-lg transition-all">{siteData.ctaText}</button>
              </section>

              {/* About */}
              <section className="px-8 py-16 bg-white text-center max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">About Us</h2>
                <p className="text-gray-600 text-lg leading-relaxed">{siteData.aboutText}</p>
              </section>

              {/* Services */}
              <section className="px-8 py-16 bg-gray-50">
                <div className="max-w-5xl mx-auto">
                  <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Our Services</h2>
                  <div className="grid md:grid-cols-3 gap-8">
                    {siteData.services.map((svc, i) => (
                      <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="w-12 h-12 bg-indigo-100 rounded-xl mb-6"></div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{svc.name}</h3>
                        <p className="text-gray-600">{svc.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              
              {/* Footer */}
              <footer className="bg-gray-900 text-white py-10 text-center text-sm text-gray-400">
                &copy; {new Date().getFullYear()} {businessName}. All rights reserved.
              </footer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
