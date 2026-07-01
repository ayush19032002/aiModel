"use client";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

function isValidEmail(email: string) {
  return /.+@.+\..+/.test(email);
}

export default function LoginPage() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    if (!isValidEmail(email) || password.length < 6) {
      setError("Please enter a valid email and a password with at least 6 characters.");
      return;
    }

    setLoading(true);
    setError(null);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error || "Unable to sign in.");
      return;
    }

    window.localStorage.setItem("gbp_token", data.token);
    router.push("/dashboard");
  };

  return (
    <div className="w-full max-w-md">
      {/* Logo */}
      <div className="flex justify-center mb-6 md:mb-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-[#2563eb] flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" fill="currentColor" />
          </div>
          <span className="text-[#0f172a] font-bold text-lg md:text-xl">
            GBP <span className="text-[#2563eb]">Growth Pro</span>
          </span>
        </Link>
      </div>

      <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg md:shadow-2xl">
        <h1 className="text-xl md:text-2xl font-bold text-[#0f172a] mb-2">Welcome back</h1>
        <p className="text-[#64748b] text-xs md:text-sm mb-6 md:mb-8">Sign in to your account to continue</p>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
          {error ? <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs md:text-sm text-red-600">{error}</p> : null}
          <div>
            <label className="block text-xs md:text-sm font-medium text-[#1e293b] mb-2" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue="demo@gbpgrowthpro.com"
              className="w-full px-4 py-2.5 md:py-3 text-sm rounded-lg md:rounded-xl"
              placeholder="you@business.com"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs md:text-sm font-medium text-[#1e293b]" htmlFor="password">
                Password
              </label>
              <Link href="#" className="text-xs text-[#7c3aed] hover:text-[#2563eb]">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={show ? "text" : "password"}
                defaultValue="demo123"
                className="w-full px-4 py-2.5 md:py-3 pr-11 text-sm rounded-lg md:rounded-xl"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#475569]"
                onClick={() => setShow(!show)}
              >
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold py-2.5 md:py-3 rounded-lg md:rounded-xl text-sm transition-all hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-4 md:my-6">
          <div className="flex-1 h-px bg-[#f1f5f9]" />
          <span className="text-[#64748b] text-xs">or</span>
          <div className="flex-1 h-px bg-[#f1f5f9]" />
        </div>

        <button className="w-full bg-[#ffffff] hover:bg-[#f1f5f9] border border-[#e2e8f0] text-[#1e293b] font-medium py-2.5 md:py-3 rounded-lg md:rounded-xl text-xs md:text-sm transition-all flex items-center justify-center gap-3">
          <svg viewBox="0 0 48 48" className="w-4 md:w-5 h-4 md:h-5">
            <path fill="#4285F4" d="M47.5 24c0-1.4-.1-2.7-.4-4H24v7.6h13.2c-.6 3-2.4 5.6-5 7.3v6h8.1C44.7 37 47.5 31 47.5 24z"/>
            <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-8.1-6c-2.1 1.4-4.8 2.3-7.8 2.3-6 0-11.1-4-12.9-9.4H2.8v6.2C6.7 42.9 14.8 48 24 48z"/>
            <path fill="#FBBC05" d="M11.1 28.9c-.5-1.4-.8-2.9-.8-4.9s.3-3.5.8-4.9v-6.2H2.8C1 16.4 0 20.1 0 24s1 7.6 2.8 10.9l8.3-6z"/>
            <path fill="#EA4335" d="M24 9.5c3.4 0 6.4 1.2 8.8 3.5l6.6-6.6C35.9 2.7 30.5.5 24 .5 14.8.5 6.7 5.1 2.8 12.1l8.3 6.2C12.9 13.5 18 9.5 24 9.5z"/>
          </svg>
          Continue with Google
        </button>

        <p className="text-center text-xs md:text-sm text-[#64748b] mt-4 md:mt-6">
          Don&apos;t have an account?{" "}
          <Link href="https://wa.me/911234567890?text=Hi!%20I%20want%20to%20grow%20my%20Google%20Business%20Profile%20and%20start%20my%20free%20audit." className="text-[#7c3aed] hover:text-[#2563eb] font-medium">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}
