import Link from "next/link";
import { Zap, Share2, Link2, PlayCircle, Mail } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "GBP Audit", href: "/gbp/audit" },
    { label: "Review Management", href: "/gbp/reviews" },
    { label: "WhatsApp AI", href: "/whatsapp/conversations" },
    { label: "CRM & Pipeline", href: "/crm/pipeline" },
    { label: "Marketing Automation", href: "/marketing" },
    { label: "Website Builder", href: "/website" },
    { label: "Analytics", href: "/analytics" },
    { label: "Pricing", href: "/pricing" },
  ],
  Solutions: [
    { label: "Healthcare & Dental", href: "#" },
    { label: "Restaurants & Cafes", href: "#" },
    { label: "Retail & Fashion", href: "#" },
    { label: "Real Estate", href: "#" },
    { label: "Automotive", href: "#" },
    { label: "Education", href: "#" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press Kit", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "GDPR", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#f8fafc] border-t border-[#e2e8f0]">
      <div className="container-custom py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand col */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#2563eb] flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" fill="currentColor" />
              </div>
              <span className="text-[#0f172a] font-bold text-lg">
                GBP <span className="text-[#2563eb]">Growth Pro</span>
              </span>
            </Link>
            <p className="text-[#64748b] text-sm leading-relaxed mb-6">
              The most advanced AI platform for Google Business Profile
              optimization, review management, and local business growth.
            </p>
            <div className="flex gap-4">
              {[Share2, Link2, PlayCircle, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-[#ffffff] border border-[#e2e8f0] flex items-center justify-center text-[#64748b] hover:text-[#2563eb] hover:border-[#2563eb] transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-[#0f172a] font-semibold text-sm mb-4">{group}</h4>
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[#64748b] hover:text-[#475569] text-sm transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[#e2e8f0] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#64748b] text-sm">
            © 2024 GBP Growth Pro. All rights reserved.
          </p>
          <p className="text-[#64748b] text-sm">
            Trusted by <span className="text-[#2563eb] font-semibold">5,000+</span> businesses across India
          </p>
        </div>
      </div>
    </footer>
  );
}
