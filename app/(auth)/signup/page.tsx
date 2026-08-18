"use client";
import Link from "next/link";
import { useState } from "react";
import { Zap, ArrowRight, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const steps = ["Account", "Business", "Goals", "Done"];

export default function SignupPage() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) { setStep(step + 1); return; }
    
    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name: `${firstName} ${lastName}` }),
      });
      
      const data = await response.json();
      if (response.ok) {
        window.localStorage.setItem("gbp_token", data.token);
        toast.success("Account created successfully!");
        router.push("/onboarding");
      } else {
        toast.error(data.error || "Registration failed");
      }
    } catch (err) {
      toast.error("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-center mb-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-[#2563eb] flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" fill="currentColor" />
          </div>
          <span className="text-[#0f172a] font-bold text-xl">
            GBP <span className="text-[#2563eb]">Growth Pro</span>
          </span>
        </Link>
      </div>

      <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-8 shadow-2xl">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1 last:flex-none">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                i < step ? "bg-[#10b981] text-white" :
                i === step ? "bg-[#2563eb] text-white" :
                "bg-[#f1f5f9] text-[#64748b]"
              }`}>
                {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span className={`text-xs font-medium ${i === step ? "text-[#0f172a]" : "text-[#64748b]"}`}>{s}</span>
              {i < steps.length - 1 && <div className={`flex-1 h-px ${i < step ? "bg-[#10b981]" : "bg-[#f1f5f9]"}`} />}
            </div>
          ))}
        </div>

        <h1 className="text-2xl font-bold text-[#0f172a] mb-2">
          {step === 0 && "Create your account"}
          {step === 1 && "Tell us about your business"}
          {step === 2 && "What's your main goal?"}
        </h1>
        <p className="text-[#64748b] text-sm mb-8">
          {step === 0 && "Start your 14-day free trial — no credit card required"}
          {step === 1 && "This helps us personalize your experience"}
          {step === 2 && "We'll set up your platform based on your priority"}
        </p>

        <form onSubmit={handleNext} className="space-y-5">
          {step === 0 && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1e293b] mb-2">First name</label>
                  <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full px-4 py-3 text-sm rounded-xl" placeholder="Arjun" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1e293b] mb-2">Last name</label>
                  <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="w-full px-4 py-3 text-sm rounded-xl" placeholder="Sharma" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1e293b] mb-2">Email address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 text-sm rounded-xl" placeholder="you@business.com" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1e293b] mb-2">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 text-sm rounded-xl" placeholder="Min 8 characters" required />
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-medium text-[#1e293b] mb-2">Business name</label>
                <input type="text" className="w-full px-4 py-3 text-sm rounded-xl" placeholder="Sharma Dental Clinic" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1e293b] mb-2">Industry</label>
                <select className="w-full px-4 py-3 text-sm rounded-xl">
                  <option>Healthcare & Dental</option>
                  <option>Restaurant & Cafe</option>
                  <option>Retail & Fashion</option>
                  <option>Automotive</option>
                  <option>Real Estate</option>
                  <option>Education</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1e293b] mb-2">City</label>
                <input type="text" className="w-full px-4 py-3 text-sm rounded-xl" placeholder="Mumbai" required />
              </div>
            </>
          )}

          {step === 2 && (
            <div className="space-y-3">
              {[
                { id: "reviews", label: "Get more Google reviews" },
                { id: "ranking", label: "Rank higher on Google Maps" },
                { id: "leads", label: "Generate more leads" },
                { id: "automate", label: "Automate WhatsApp responses" },
              ].map((g) => (
                <label key={g.id} className="flex items-center gap-3 p-4 bg-[#ffffff] border border-[#e2e8f0] rounded-xl cursor-pointer hover:border-[#2563eb]/40 transition-colors">
                  <input type="radio" name="goal" value={g.id} className="accent-[#7c3aed]" defaultChecked={g.id === "reviews"} />
                  <span className="text-sm text-[#1e293b]">{g.label}</span>
                </label>
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? "Setting up..." : step === 2 ? "Launch My Platform" : "Continue"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-sm text-[#64748b] mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-[#7c3aed] hover:text-[#2563eb] font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
