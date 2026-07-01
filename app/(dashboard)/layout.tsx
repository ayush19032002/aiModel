import type { Metadata } from "next";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { AuthGuard } from "@/components/shared/AuthGuard";

export const metadata: Metadata = {
  title: { default: "Dashboard", template: "%s | GBP Growth Pro" },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
        {/* Desktop Sidebar - hidden on mobile */}
        <div className="hidden md:flex">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
