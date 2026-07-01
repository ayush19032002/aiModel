import CTASection from "@/components/marketing/CTASection";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] pt-24 pb-16 text-[#0f172a]">
      <div className="container-custom grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-3xl border border-[#e2e8f0] bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2563eb]">Contact us</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">Let’s talk about your growth goals.</h1>
          <p className="mt-4 text-lg text-[#475569]">
            Reach out for a product walkthrough, pricing help, or to get started with a free audit.
          </p>
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 text-[#475569]">
              <Mail className="h-5 w-5 text-[#2563eb]" />
              <span>hello@gbpgrowthpro.com</span>
            </div>
            <div className="flex items-center gap-3 text-[#475569]">
              <Phone className="h-5 w-5 text-[#2563eb]" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3 text-[#475569]">
              <MapPin className="h-5 w-5 text-[#2563eb]" />
              <span>Mumbai, India</span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[#e2e8f0] bg-white p-8 shadow-sm">
          <form className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input className="w-full rounded-xl border border-[#e2e8f0] px-4 py-3" placeholder="Your name" />
              <input className="w-full rounded-xl border border-[#e2e8f0] px-4 py-3" placeholder="Your email" />
            </div>
            <input className="w-full rounded-xl border border-[#e2e8f0] px-4 py-3" placeholder="Business name" />
            <textarea className="min-h-36 w-full rounded-xl border border-[#e2e8f0] px-4 py-3" placeholder="Tell us about your goals" />
            <button className="rounded-xl bg-[#2563eb] px-5 py-3 font-semibold text-white">Send message</button>
          </form>
        </div>
      </div>

      <CTASection />
    </div>
  );
}
