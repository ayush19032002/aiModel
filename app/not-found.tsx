import Link from "next/link";
import { Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center text-center p-6">
      <div className="w-16 h-16 rounded-2xl bg-[#2563eb]/20 border border-[#2563eb]/30 flex items-center justify-center mb-6">
        <Zap className="w-8 h-8 text-[#7c3aed]" />
      </div>
      <h1 className="text-8xl font-extrabold text-[#1f2937] mb-4">404</h1>
      <h2 className="text-2xl font-bold text-[#0f172a] mb-3">Page not found</h2>
      <p className="text-[#64748b] max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Link href="/dashboard" className="bg-[#2563eb] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#1d4ed8] transition-colors">
          Go to Dashboard
        </Link>
        <Link href="/" className="bg-[#ffffff] border border-[#e2e8f0] text-[#1e293b] px-6 py-3 rounded-xl font-semibold text-sm hover:border-[#cbd5e1] transition-colors">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
