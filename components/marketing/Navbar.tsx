"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/testimonials", label: "Customers" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#f8fafc]/90 backdrop-blur-xl border-b border-[#e2e8f0]"
          : "bg-transparent"
      }`}
    >
      <nav className="container-custom flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-[#2563eb] flex items-center justify-center shadow-lg group-hover:shadow-md transition-shadow">
            <Zap className="w-4 h-4 text-white" fill="currentColor" />
          </div>
          <span className="text-[#0f172a] font-bold text-lg tracking-tight">
            GBP <span className="text-[#2563eb]">Growth Pro</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm text-[#475569] hover:text-[#0f172a] transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="https://wa.me/911234567890?text=Hi!%20I%20want%20to%20sign%20in%20to%20my%20GBP%20Growth%20Pro%20account."
            className="text-sm text-[#475569] hover:text-[#0f172a] transition-colors px-3 py-2"
          >
            Sign in
          </Link>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:shadow-md"
          >
            Start Free Audit
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-[#475569] hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#ffffff] border-b border-[#e2e8f0] px-6 py-4 space-y-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block text-[#475569] hover:text-[#0f172a] py-2 transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-3">
            <Link href="https://wa.me/911234567890?text=Hi!%20I%20want%20to%20sign%20in%20to%20my%20GBP%20Growth%20Pro%20account." className="text-center text-[#475569] py-2 border border-[#e2e8f0] rounded-lg hover:border-[#cbd5e1] transition-colors">
              Sign in
            </Link>
            <Link href="/demo" className="text-center bg-[#2563eb] text-white py-2 rounded-lg font-semibold" onClick={() => setOpen(false)}>
              Start Free Audit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
