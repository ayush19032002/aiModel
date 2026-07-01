"use client";
import { useState } from "react";
import { Zap, Send, Calendar, Image } from "lucide-react";

const posts = [
  { id: 1, title: "Teeth Whitening Special Offer", type: "Offer", date: "Jul 10", status: "published" },
  { id: 2, title: "Meet Our New Orthodontist", type: "Update", date: "Jul 5", status: "published" },
  { id: 3, title: "Back-to-School Dental Checkup", type: "Event", date: "Aug 1", status: "scheduled" },
];

export default function PostsPage() {
  const [topic, setTopic] = useState("");
  const [generated, setGenerated] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generate = () => {
    if (!topic.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setGenerated(`🦷 ${topic}\n\nAt Sharma Dental Clinic, we believe everyone deserves a healthy, beautiful smile. Our expert team uses the latest technology to ensure your comfort while delivering outstanding results.\n\n✅ Experienced specialists\n✅ Modern equipment\n✅ Patient-first approach\n\nBook your appointment today! 📞 +91 98765 43210\n\n#DentalCare #${topic.replace(/\s/g, "")} #MumbaiDentist`);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-[#0f172a]">GBP Posts</h2>
        <p className="text-sm text-[#64748b] mt-0.5">Create and schedule posts for your Google Business Profile</p>
      </div>

      {/* AI Generator */}
      <div className="bg-[#ffffff] border border-[#2563eb]/30 rounded-2xl p-6">
        <h3 className="font-semibold text-[#0f172a] mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-[#7c3aed]" />
          AI Post Generator
        </h3>
        <div className="flex gap-3 mb-4">
          <input
            value={topic}
            onChange={e => setTopic(e.target.value)}
            placeholder="Enter a topic (e.g. 'Teeth whitening offer' or 'New service launch')"
            className="flex-1 px-4 py-3 text-sm rounded-xl"
          />
          <button
            onClick={generate}
            disabled={loading || !topic.trim()}
            className="inline-flex items-center gap-2 bg-[#2563eb] text-white px-5 py-3 rounded-xl font-semibold text-sm hover:bg-[#1d4ed8] transition-all disabled:opacity-50"
          >
            <Zap className="w-4 h-4" />
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>

        {generated && (
          <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-xl p-4">
            <p className="text-xs text-[#2563eb] font-semibold mb-3">AI Generated Post</p>
            <p className="text-sm text-[#1e293b] whitespace-pre-line leading-relaxed">{generated}</p>
            <div className="flex gap-3 mt-4">
              <button className="inline-flex items-center gap-2 bg-[#2563eb] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#1d4ed8]">
                <Send className="w-4 h-4" /> Publish Now
              </button>
              <button className="inline-flex items-center gap-2 bg-[#ffffff] border border-[#e2e8f0] text-[#1e293b] px-4 py-2 rounded-lg text-sm hover:border-[#cbd5e1]">
                <Calendar className="w-4 h-4" /> Schedule
              </button>
              <button className="inline-flex items-center gap-2 bg-[#ffffff] border border-[#e2e8f0] text-[#1e293b] px-4 py-2 rounded-lg text-sm hover:border-[#cbd5e1]">
                <Image className="w-4 h-4" /> Add Image
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Posts List */}
      <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-6">
        <h3 className="font-semibold text-[#0f172a] mb-4">Published & Scheduled Posts</h3>
        <div className="space-y-3">
          {posts.map(p => (
            <div key={p.id} className="flex items-center gap-4 p-4 bg-[#ffffff] border border-[#e2e8f0] rounded-xl">
              <div className="w-10 h-10 bg-[#2563eb]/20 rounded-lg flex items-center justify-center shrink-0">
                <Send className="w-4 h-4 text-[#7c3aed]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#0f172a]">{p.title}</p>
                <p className="text-xs text-[#64748b]">{p.type} · {p.date}</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${p.status === "published" ? "bg-[#10b981]/15 text-[#10b981]" : "bg-[#f59e0b]/15 text-[#f59e0b]"}`}>
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
