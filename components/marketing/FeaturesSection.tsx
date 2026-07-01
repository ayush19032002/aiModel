import {
  Search,
  Star,
  TrendingUp,
  MessageSquare,
  Globe,
  BarChart3,
  Users,
  QrCode,
  Zap,
  FileText,
  MapPin,
  Bell,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "AI GBP Audit",
    description:
      "40+ point audit that scores your profile and gives you an exact action plan to outrank competitors.",
    size: "large",
    color: "#2563eb",
  },
  {
    icon: Star,
    title: "Review Automation",
    description: "Collect, monitor, and auto-reply to reviews with AI-generated personalized responses.",
    size: "normal",
    color: "#f59e0b",
  },
  {
    icon: QrCode,
    title: "Review QR Generator",
    description: "Generate branded QR codes customers scan to leave Google reviews instantly.",
    size: "normal",
    color: "#10b981",
  },
  {
    icon: TrendingUp,
    title: "Keyword & SEO Ranking",
    description: "Track your local keyword positions daily with AI-suggested optimizations.",
    size: "normal",
    color: "#3b82f6",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp AI Agent",
    description: "24/7 intelligent agent that replies, books appointments, and qualifies leads automatically.",
    size: "large",
    color: "#10b981",
  },
  {
    icon: BarChart3,
    title: "Competitor Intelligence",
    description: "Compare your profile against top local competitors side-by-side.",
    size: "normal",
    color: "#ef4444",
  },
  {
    icon: Users,
    title: "CRM & Pipeline",
    description: "Kanban-based lead management with activity timeline and task automation.",
    size: "normal",
    color: "#2563eb",
  },
  {
    icon: Globe,
    title: "AI Website Builder",
    description: "Generate a complete SEO-optimized business website in under 2 minutes.",
    size: "normal",
    color: "#3b82f6",
  },
  {
    icon: Zap,
    title: "Marketing Automation",
    description: "Create WhatsApp, email & SMS campaigns with visual flow builders.",
    size: "normal",
    color: "#f59e0b",
  },
  {
    icon: MapPin,
    title: "Local Pack Rankings",
    description: "Visual map showing your position in Google local search results.",
    size: "normal",
    color: "#10b981",
  },
  {
    icon: FileText,
    title: "Automated Reports",
    description: "White-label PDF reports delivered to your inbox on schedule.",
    size: "normal",
    color: "#6b7280",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Get notified instantly about new reviews, ranking changes, or lead activity.",
    size: "normal",
    color: "#2563eb",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="section bg-[#ffffff]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold text-[#2563eb] bg-[#2563eb]/10 border border-[#2563eb]/20 px-3 py-1 rounded-full mb-4">
            Platform Features
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="gradient-text">Dominate Local Search</span>
          </h2>
          <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
            A complete growth stack for local businesses — from visibility and
            reviews to conversations, leads, and revenue.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            const isLarge = f.size === "large";
            return (
              <div
                key={f.title}
                className={`group bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-6 card-hover cursor-default ${
                  isLarge ? "md:col-span-1 md:row-span-2" : ""
                } ${i === 0 ? "md:col-span-1" : ""}`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                  style={{ background: `${f.color}18` }}
                >
                  <Icon className="w-6 h-6" style={{ color: f.color }} />
                </div>
                <h3 className="text-[#0f172a] font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-[#64748b] text-sm leading-relaxed">{f.description}</p>
                {isLarge && (
                  <div
                    className="mt-6 px-4 py-3 rounded-xl border text-xs font-medium"
                    style={{
                      background: `${f.color}10`,
                      borderColor: `${f.color}30`,
                      color: f.color,
                    }}
                  >
                    Used by 5,000+ businesses →
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
