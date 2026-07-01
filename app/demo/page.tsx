"use client";
import WhatsAppSimulator from "@/components/shared/WhatsAppSimulator";
import Link from "next/link";
import { ArrowLeft, Zap, ShieldCheck } from "lucide-react";

export default function DemoPage() {
  return (
    <div className="relative min-h-screen bg-[#0b141a] flex flex-col items-center justify-center font-sans overflow-hidden">
      
      {/* WhatsApp Web Brand Top Band */}
      <div className="absolute top-0 left-0 w-full h-[120px] bg-[#00a884] z-0 hidden md:block" />

      {/* Floating Helper Banner (Only visible on desktop/tablet) */}
      <div className="relative z-10 w-full max-w-[1200px] flex items-center justify-between px-6 pt-4 pb-2 md:text-white text-[#8696a0]">
        <div className="flex items-center gap-3">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold md:hover:text-[#e9edef] hover:text-[#00a884] transition-colors bg-white/10 md:bg-white/15 px-3 py-1.5 rounded-lg border border-white/5 backdrop-blur-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-white/80 bg-white/10 px-2.5 py-1.5 rounded-lg border border-white/5 backdrop-blur-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00a884]" fill="currentColor" />
            Interactive Simulation Onboarding
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#2563eb] flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" fill="currentColor" />
          </div>
          <span className="font-extrabold text-sm tracking-tight text-white hidden md:inline">
            GBP <span className="text-[#2563eb]">Growth Pro</span>
          </span>
        </div>
      </div>

      {/* Main Container mimicking the WhatsApp Web layout */}
      <div className="relative z-10 w-full max-w-[1200px] h-[calc(100vh-80px)] md:h-[calc(100vh-130px)] px-0 md:px-6 pb-4 flex items-center justify-center flex-1">
        <div className="w-full h-full md:rounded-xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.6)] border border-[#222d34]/60 bg-[#0b141a]">
          <WhatsAppSimulator isCompact={false} />
        </div>
      </div>

      {/* Footer message / info */}
      <div className="relative z-10 pb-3 text-center text-[11px] text-[#8696a0] select-none px-4 hidden md:block">
        This is a live interactive simulation of the GBP Growth Pro AI Bot onboarding process. Click options to proceed.
      </div>
    </div>
  );
}
