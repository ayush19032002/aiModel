"use client";
import { Bell, Search, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const breadcrumbMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/gbp/audit": "GBP Audit",
  "/gbp/reviews": "Reviews",
  "/gbp/rankings": "Rankings",
  "/gbp/competitors": "Competitors",
  "/gbp/posts": "Posts",
  "/gbp/seo": "SEO Suggestions",
  "/ai/chatbot": "AI Chatbot",
  "/ai/lead-generation": "Lead Generation",
  "/automations/workflows": "Workflows",
  "/marketing/content": "Content AI",
  "/whatsapp/conversations": "Conversations",
  "/whatsapp/automations": "Automations",
  "/whatsapp/templates": "Templates",
  "/crm/leads": "Leads",
  "/crm/customers": "Customers",
  "/crm/pipeline": "Pipeline",
  "/website": "Website Builder",
  "/marketing": "Marketing",
  "/analytics": "Analytics",
  "/reports": "Reports",
  "/settings": "Settings",
};

export function TopBar() {
  const pathname = usePathname();
  const title = breadcrumbMap[pathname] ?? "Dashboard";

  return (
    <header className="h-14 border-b border-[#e2e8f0] bg-[#f8fafc]/80 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-20">
      {/* Title */}
      <div className="flex items-center gap-2">
        <h1 className="text-[#0f172a] font-semibold text-base">{title}</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <button className="hidden md:flex items-center gap-2 bg-[#ffffff] border border-[#e2e8f0] hover:border-[#cbd5e1] text-[#64748b] hover:text-[#475569] text-sm px-3 py-1.5 rounded-lg transition-all">
          <Search className="w-4 h-4" />
          <span className="text-xs">Search...</span>
          <span className="hidden lg:block ml-2 text-[10px] bg-[#f1f5f9] text-[#64748b] px-1.5 py-0.5 rounded">⌘K</span>
        </button>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-lg bg-[#ffffff] border border-[#e2e8f0] flex items-center justify-center text-[#64748b] hover:text-[#1e293b] hover:border-[#cbd5e1] transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ef4444] rounded-full border-2 border-[#09090b]" />
        </button>

        {/* Settings */}
        <Link
          href="/settings"
          className="w-9 h-9 rounded-lg bg-[#ffffff] border border-[#e2e8f0] flex items-center justify-center text-[#64748b] hover:text-[#1e293b] hover:border-[#cbd5e1] transition-all"
        >
          <Settings className="w-4 h-4" />
        </Link>

        {/* Avatar */}
        <button className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2563eb] to-[#3b82f6] flex items-center justify-center text-white text-xs font-bold">
          A
        </button>
      </div>
    </header>
  );
}
