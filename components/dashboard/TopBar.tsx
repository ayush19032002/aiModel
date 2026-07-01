"use client";
import { Bell, Search, Settings, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close menu when navigation happens
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="h-14 border-b border-[#e2e8f0] bg-[#f8fafc]/80 backdrop-blur-sm flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 -ml-2 text-[#475569] hover:bg-[#f1f5f9] rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>

        {/* Title */}
        <div className="flex items-center gap-2">
          <h1 className="text-[#0f172a] font-semibold text-sm md:text-base truncate">{title}</h1>
        </div>

        {/* Right */}
        <div className="flex items-center gap-1 md:gap-2">
          {/* Search - hidden on mobile */}
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

          {/* Settings - hidden on small mobile */}
          <Link
            href="/settings"
            className="hidden sm:flex w-9 h-9 rounded-lg bg-[#ffffff] border border-[#e2e8f0] items-center justify-center text-[#64748b] hover:text-[#1e293b] hover:border-[#cbd5e1] transition-all"
          >
            <Settings className="w-4 h-4" />
          </Link>

          {/* Avatar */}
          <button className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2563eb] to-[#3b82f6] flex items-center justify-center text-white text-xs font-bold">
            A
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 md:hidden z-20">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Sidebar overlay */}
          <div className="absolute inset-y-14 left-0 w-60 bg-[#ffffff] border-r border-[#e2e8f0] overflow-y-auto">
            <Sidebar />
          </div>
        </div>
      )}
    </>
  );
}
