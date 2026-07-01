"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, Check, ArrowRight, Star, Search, Link2 } from "lucide-react";

const steps = [
  {
    icon: Link2,
    title: "Connect Google Business Profile",
    description: "Link your GBP so we can start analyzing your current performance.",
    action: "Connect GBP",
  },
  {
    icon: Search,
    title: "Run Your First AI Audit",
    description: "Our AI will analyze 40+ factors and score your profile instantly.",
    action: "Run Audit",
  },
  {
    icon: Star,
    title: "Set Up Review Collection",
    description: "Generate your first review QR code and start collecting 5-star reviews.",
    action: "Set Up Reviews",
  },
  {
    icon: Zap,
    title: "Activate WhatsApp AI Agent",
    description: "Connect your WhatsApp number so the AI can start handling customer queries.",
    action: "Activate Agent",
  },
];

export default function OnboardingPage() {
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState<number[]>([]);
  const router = useRouter();

  const handleStep = () => {
    if (current < steps.length - 1) {
      setDone([...done, current]);
      setCurrent(current + 1);
    } else {
      setDone([...done, current]);
      setTimeout(() => router.push("/dashboard"), 500);
    }
  };

  const skip = () => router.push("/dashboard");

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-12">
        <div className="w-9 h-9 rounded-xl bg-[#2563eb] flex items-center justify-center">
          <Zap className="w-4 h-4 text-white" fill="currentColor" />
        </div>
        <span className="text-[#0f172a] font-bold text-xl">
          GBP <span className="text-[#2563eb]">Growth Pro</span>
        </span>
      </div>

      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[#0f172a] mb-3">
            Let&apos;s get you set up 🚀
          </h1>
          <p className="text-[#64748b]">
            Complete these steps to unlock the full power of GBP Growth Pro.
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-[#64748b] mb-2">
            <span>{done.length} of {steps.length} completed</span>
            <span>{Math.round((done.length / steps.length) * 100)}%</span>
          </div>
          <div className="h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] rounded-full transition-all duration-500"
              style={{ width: `${(done.length / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3 mb-10">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isDone = done.includes(i);
            const isActive = i === current;

            return (
              <div
                key={i}
                className={`flex items-center gap-5 p-5 rounded-2xl border transition-all ${
                  isActive
                    ? "bg-[#2563eb]/10 border-[#2563eb]/40"
                    : isDone
                    ? "bg-[#10b981]/5 border-[#10b981]/20"
                    : "bg-[#ffffff] border-[#e2e8f0] opacity-50"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    isDone ? "bg-[#10b981]" : isActive ? "bg-[#2563eb]" : "bg-[#f1f5f9]"
                  }`}
                >
                  {isDone ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <Icon className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h3
                    className={`font-semibold mb-0.5 ${
                      isActive || isDone ? "text-[#0f172a]" : "text-[#64748b]"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#64748b]">{step.description}</p>
                </div>
                {isDone && (
                  <span className="text-[#10b981] text-sm font-semibold shrink-0">Done!</span>
                )}
                {isActive && (
                  <button
                    onClick={handleStep}
                    className="shrink-0 inline-flex items-center gap-1.5 bg-[#2563eb] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#1d4ed8] transition-colors"
                  >
                    {step.action}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button onClick={skip} className="text-sm text-[#64748b] hover:text-[#475569] transition-colors">
            Skip setup and go to dashboard →
          </button>
        </div>
      </div>
    </div>
  );
}
