"use client";
import { useState, useEffect } from "react";
import { sentimentData } from "@/lib/mock-data";
import { Star, Copy, QrCode, Filter, BarChart3, Bot, Check, Trash2, ArrowRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { timeAgo } from "@/lib/utils";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unreplied" | "positive" | "negative">("all");
  const [showQR, setShowQR] = useState(false);
  
  // QR states
  const [businessName, setBusinessName] = useState("Sharma Dental Clinic");
  const [placeId, setPlaceId] = useState("ChIJu0G1Z-5v5zsR6y4mX16R4eY");
  const [qrUrl, setQrUrl] = useState(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://search.google.com/local/writereview?placeid=ChIJu0G1Z-5v5zsR6y4mX16R4eY`);
  const [copied, setCopied] = useState(false);

  // AI Reply states
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [generatedText, setGeneratedText] = useState("");
  const [selectedTone, setSelectedTone] = useState<"professional" | "friendly" | "apologetic">("professional");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const res = await fetch("/api/reviews");
    const data = await res.json();
    const parsedData = data.map((r: any) => ({
      ...r,
      date: new Date(r.date),
      replyText: r.replied ? "Thank you for your feedback! We look forward to serving you again." : ""
    }));
    setReviews(parsedData);
    setLoading(false);
  };

  const filtered = reviews.filter(r => {
    if (filter === "unreplied") return !r.replied;
    if (filter === "positive") return r.sentiment === "positive";
    if (filter === "negative") return r.sentiment === "negative";
    return true;
  });

  const handleGenerateQR = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPlaceId = placeId.trim() || "ChIJu0G1Z-5v5zsR6y4mX16R4eY";
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://search.google.com/local/writereview?placeid=${cleanPlaceId}`;
    setQrUrl(url);
  };

  const handleCopyLink = () => {
    const link = `https://search.google.com/local/writereview?placeid=${placeId}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateReply = (review: typeof reviews[0], tone: "professional" | "friendly" | "apologetic") => {
    setSelectedTone(tone);
    setActiveReplyId(review.id);
    
    const authorName = review.author.split(" ")[0];
    const replies = {
      professional: `Dear ${authorName}, thank you for your feedback. We value your support and are dedicated to providing the highest quality care. Best regards, ${businessName}.`,
      friendly: `Hi ${authorName}! Thanks so much for the wonderful review. 😊 The team loved reading this, and we can't wait to see you again soon!`,
      apologetic: `Dear ${authorName}, we sincerely apologize for not meeting your expectations during your visit. We would love to make this right. Please call us directly so we can resolve this personally.`,
    };
    
    setGeneratedText(replies[tone]);
  };

  const handlePublishReply = async (id: string) => {
    // Optimistic update
    setReviews(prev =>
      prev.map(r => (r.id === id ? { ...r, replied: true, replyText: generatedText } : r))
    );
    setActiveReplyId(null);
    setGeneratedText("");

    // API call
    await fetch(`/api/reviews/${id}/reply`, { method: "POST" });
  };

  const handleDeleteReply = (id: string) => {
    setReviews(prev =>
      prev.map(r => (r.id === id ? { ...r, replied: false, replyText: "" } : r))
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#0f172a]">Review Management</h2>
          <p className="text-sm text-[#64748b]">256 total reviews · 4.7★ average</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowQR(!showQR)}
            className="inline-flex items-center gap-2 bg-[#ffffff] border border-[#e2e8f0] text-[#1e293b] text-sm px-4 py-2 rounded-lg hover:border-[#cbd5e1] hover:bg-[#f1f5f9] transition-all cursor-pointer font-medium"
          >
            <QrCode className="w-4 h-4 text-[#2563eb]" />
            {showQR ? "Hide QR Panel" : "Review QR Link"}
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Reviews", value: "256", color: "#2563eb" },
          { label: "Avg Rating", value: "4.7★", color: "#f59e0b" },
          { label: "Response Rate", value: `${Math.round((reviews.filter(r => r.replied).length / reviews.length) * 100)}%`, color: "#10b981" },
          { label: "Unreplied", value: `${reviews.filter(r => !r.replied).length}`, color: "#ef4444" },
        ].map(s => (
          <div key={s.label} className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-5 shadow-sm">
            <p className="text-xs text-[#64748b] mb-1 font-medium">{s.label}</p>
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* QR Generator Panel */}
      {showQR && (
        <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-6 shadow-sm animate-fade-in">
          <h3 className="font-semibold text-[#0f172a] mb-4 flex items-center gap-2">
            <QrCode className="w-5 h-5 text-[#2563eb]" />
            Google Review QR Code Generator
          </h3>
          <div className="flex flex-col md:flex-row gap-8 items-stretch">
            <form onSubmit={handleGenerateQR} className="flex-1 space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#475569] mb-1.5 block">Business Name</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#e2e8f0] bg-white focus:outline-none"
                  placeholder="e.g. Sharma Dental Clinic"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#475569] mb-1.5 block">Google Place ID</label>
                <input
                  type="text"
                  value={placeId}
                  onChange={(e) => setPlaceId(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#e2e8f0] bg-white focus:outline-none"
                  placeholder="e.g. ChIJxxxxxxxx"
                  required
                />
                <span className="text-[10px] text-[#64748b] mt-1 block">
                  Find your Place ID using Google Map developers page.
                </span>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-[#2563eb] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1d4ed8] transition-colors cursor-pointer"
                >
                  Generate QR
                </button>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="bg-[#ffffff] border border-[#e2e8f0] hover:bg-[#f1f5f9] text-[#1e293b] px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-4 h-4 text-[#10b981]" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Link Copied!" : "Copy Review Link"}
                </button>
              </div>
            </form>

            <div className="border-l border-[#e2e8f0] hidden md:block" />

            {/* QR Preview Area */}
            <div className="flex flex-col items-center justify-center bg-[#f8fafc] rounded-2xl p-6 border border-[#e2e8f0] min-w-[220px]">
              <div className="w-36 h-36 bg-[#ffffff] border border-[#e2e8f0] rounded-xl flex items-center justify-center p-2 shadow-inner">
                <img
                  src={qrUrl}
                  alt="Review QR Code"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-xs font-semibold text-[#0f172a] mt-4 text-center">{businessName}</p>
              <a
                href={qrUrl}
                download={`${businessName.replace(/\s+/g, '-').toLowerCase()}-qr.png`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#2563eb] bg-[#2563eb]/10 px-4 py-2 rounded-lg font-semibold mt-3 hover:bg-[#2563eb]/20 transition-colors"
              >
                Open Full Image
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Sentiment Chart */}
      <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
        <h3 className="font-semibold text-[#0f172a] mb-5 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#2563eb]" />
          Review Sentiment Timeline
        </h3>
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={sentimentData}>
            <defs>
              <linearGradient id="posGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 8, color: "#0f172a" }} />
            <Area type="monotone" dataKey="positive" stroke="#10b981" fill="url(#posGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Reviews List */}
      <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <h3 className="font-semibold text-[#0f172a]">Reviews Feed</h3>
          <div className="flex gap-2">
            {(["all", "unreplied", "positive", "negative"] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs px-3 py-2 rounded-lg transition-all capitalize font-medium flex items-center gap-1 cursor-pointer ${
                  filter === f
                    ? "bg-[#2563eb] text-white"
                    : "bg-[#ffffff] border border-[#e2e8f0] text-[#64748b] hover:text-[#1e293b] hover:bg-[#f8fafc]"
                }`}
              >
                <Filter className="w-3 h-3" />
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-[#e2e8f0] rounded-2xl bg-[#f8fafc]/50">
              <p className="text-sm text-[#64748b]">No reviews match this filter.</p>
            </div>
          ) : (
            filtered.map(r => (
              <div key={r.id} className="border border-[#e2e8f0] rounded-2xl p-5 hover:border-[#cbd5e1] transition-all">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2563eb] to-[#3b82f6] flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {r.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0f172a]">{r.author}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {Array.from({ length: r.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-[#f59e0b]" fill="currentColor" />
                          ))}
                        </div>
                        <span className="text-xs text-[#64748b]">{timeAgo(r.date)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 shrink-0">
                    {!r.replied && activeReplyId !== r.id && (
                      <button
                        onClick={() => handleGenerateReply(r, "professional")}
                        className="inline-flex items-center gap-1.5 text-xs bg-[#2563eb]/10 text-[#2563eb] border border-[#2563eb]/20 px-3 py-1.5 rounded-lg hover:bg-[#2563eb]/20 transition-all font-semibold cursor-pointer"
                      >
                        <Bot className="w-3.5 h-3.5" />
                        AI Reply
                      </button>
                    )}
                    {r.replied && (
                      <button
                        onClick={() => handleDeleteReply(r.id)}
                        className="inline-flex items-center gap-1.5 text-xs bg-[#ef4444]/5 text-[#ef4444] border border-[#ef4444]/10 px-3 py-1.5 rounded-lg hover:bg-[#ef4444]/10 transition-all font-medium cursor-pointer"
                        title="Delete reply"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete Reply
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-sm text-[#475569] leading-relaxed">{r.text}</p>

                {/* Published Reply text */}
                {r.replied && r.replyText && (
                  <div className="mt-4 p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-lg bg-[#10b981]/10 flex items-center justify-center shrink-0 text-[#10b981]">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] text-[#10b981] font-bold uppercase tracking-wider mb-1">Reply Published</p>
                      <p className="text-xs text-[#475569] leading-relaxed">{r.replyText}</p>
                    </div>
                  </div>
                )}

                {/* AI Reply generator editor panel */}
                {activeReplyId === r.id && (
                  <div className="mt-4 p-5 bg-[#2563eb]/5 border border-[#2563eb]/20 rounded-xl space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-[11px] text-[#2563eb] font-bold uppercase tracking-wider flex items-center gap-1">
                        <Bot className="w-4 h-4" /> AI Generated draft
                      </span>
                      
                      {/* Tone selectors */}
                      <div className="flex gap-1.5 bg-[#ffffff] border border-[#e2e8f0] rounded-lg p-0.5 shadow-sm">
                        {(["professional", "friendly", "apologetic"] as const).map(t => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => handleGenerateReply(r, t)}
                            className={`text-[10px] px-2.5 py-1 rounded transition-all capitalize font-semibold cursor-pointer ${
                              selectedTone === t ? "bg-[#2563eb] text-white" : "text-[#64748b] hover:text-[#0f172a]"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <textarea
                      value={generatedText}
                      onChange={(e) => setGeneratedText(e.target.value)}
                      className="w-full text-xs rounded-xl p-3 h-24 border border-[#e2e8f0] bg-white text-[#0f172a] focus:outline-none"
                    />

                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePublishReply(r.id)}
                        className="text-xs bg-[#2563eb] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#1d4ed8] transition-colors cursor-pointer"
                      >
                        Publish Reply
                      </button>
                      <button
                        onClick={() => {
                          setActiveReplyId(null);
                          setGeneratedText("");
                        }}
                        className="text-xs border border-[#e2e8f0] hover:bg-[#f1f5f9] text-[#64748b] px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer bg-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
