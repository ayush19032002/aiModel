"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, Search, Star, TrendingUp, Users, MessageSquare,
  Zap, BarChart3, Globe, Megaphone, FileText, Settings, Bell, ChevronLeft,
  ChevronRight, Building2, Bot, ChevronsUpDown, ExternalLink, Sparkles, Workflow
} from "lucide-react";

import { motion } from "framer-motion";

const navGroups = [
  {
    label: "Overview",
    items: [
      { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    ],
  },
  {
    label: "Google Business Profile",
    items: [
      { href: "/gbp/scoring", icon: Search, label: "Profile Scoring" },
      { href: "/gbp/reviews", icon: Star, label: "AI Review Reply" },
      { href: "/gbp/media", icon: FileText, label: "AI Media Upload" },
      { href: "/gbp/rankings", icon: TrendingUp, label: "Ranking Tracking" },
      { href: "/gbp/competitors", icon: Users, label: "Competitor Analysis" },
    ],
  },
  {
    label: "AI Features",
    items: [
      { href: "/ai/website", icon: Globe, label: "AI Website Generator" },
      { href: "/ai/lead-generation", icon: Sparkles, label: "Lead Generation" },
    ],
  },
  {
    label: "WhatsApp Automation",
    items: [
      { href: "/whatsapp/connection", icon: MessageSquare, label: "Connection" },
      { href: "/whatsapp/contacts", icon: Users, label: "Manual Contacts" },
      { href: "/whatsapp/broadcasts", icon: Megaphone, label: "Broadcasts" },
      { href: "/whatsapp/bookings", icon: Bot, label: "Auto Bookings" },
      { href: "/whatsapp/catalog", icon: Building2, label: "Catalog Upload" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`relative flex flex-col bg-[#ffffff] border-r border-[#e2e8f0] h-screen sticky top-0 transition-all duration-300 shrink-0 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Logo */}
      <div className={`flex items-center h-14 border-b border-[#e2e8f0] px-4 ${collapsed ? "justify-center" : "gap-2"}`}>
        <div className="w-7 h-7 rounded-lg bg-[#2563eb] flex items-center justify-center shrink-0">
          <Zap className="w-3.5 h-3.5 text-white" fill="currentColor" />
        </div>
        {!collapsed && (
          <span className="text-[#0f172a] font-bold text-sm">
            GBP <span className="text-[#2563eb]">Growth Pro</span>
          </span>
        )}
      </div>

      {/* Workspace switcher */}
      {!collapsed && (
        <div className="px-3 py-3 border-b border-[#e2e8f0]">
          <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-[#ffffff] border border-[#e2e8f0] hover:border-[#cbd5e1] transition-colors text-left">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-[#2563eb] to-[#3b82f6] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
              S
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-[#0f172a] truncate">Sharma Dental</p>
              <p className="text-[10px] text-[#64748b]">Growth Plan</p>
            </div>
            <ChevronsUpDown className="w-3.5 h-3.5 text-[#64748b] shrink-0" />
          </button>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 space-y-5 px-3">
        {navGroups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#4b5563] px-2 mb-2">
                {group.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active =
                  pathname === item.href ||
                  (item.href !== "/dashboard" && pathname.startsWith(item.href));
                return (
                  <motion.li 
                    key={item.href}
                    whileHover={{ scale: 1.02, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={item.href}
                      title={collapsed ? item.label : undefined}
                      className={`flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm transition-all ${
                        active
                          ? "bg-[#2563eb]/15 text-[#3b82f6] font-medium border-r-2 border-[#2563eb]"
                          : "text-[#64748b] hover:text-[#1e293b] hover:bg-[#ffffff]"
                      } ${collapsed ? "justify-center" : ""}`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${active ? "text-[#2563eb]" : ""}`} />
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-[#e2e8f0] p-3 space-y-1">
        <Link
          href="/admin"
          className={`flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm text-[#2563eb] bg-[#2563eb]/10 hover:bg-[#2563eb]/20 transition-all font-medium ${collapsed ? "justify-center" : ""}`}
        >
          <Settings className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Admin Panel</span>}
        </Link>
        <Link
          href="/settings"
          className={`flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm text-[#64748b] hover:text-[#1e293b] hover:bg-[#ffffff] transition-all ${collapsed ? "justify-center" : ""}`}
        >
          <Settings className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Settings</span>}
        </Link>
        {!collapsed && (
          <div className="flex items-center gap-2.5 px-2.5 py-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2563eb] to-[#3b82f6] flex items-center justify-center text-white text-xs font-bold shrink-0">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-[#0f172a] truncate">Arjun Sharma</p>
              <p className="text-[10px] text-[#64748b] truncate">arjun@dental.com</p>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-[#4b5563]" />
          </div>
        )}
      </div>

      {/* Collapse toggle - hidden on mobile */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden md:flex absolute -right-3 top-20 w-6 h-6 bg-[#f1f5f9] border border-[#cbd5e1] rounded-full items-center justify-center hover:bg-[#374151] transition-colors z-10"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3 text-[#475569]" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-[#475569]" />
        )}
      </button>
    </aside>
  );
}
