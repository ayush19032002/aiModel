"use client";
import { useState } from "react";
import { X, Smartphone, Monitor, Star, Clock, MapPin, Phone, CheckCircle2 } from "lucide-react";

interface MockWebsitePreviewProps {
  businessName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function MockWebsitePreview({
  businessName,
  isOpen,
  onClose,
}: MockWebsitePreviewProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [appointmentBooked, setAppointmentBooked] = useState(false);

  if (!isOpen) return null;

  // Clean business name and create domain
  const cleanName = businessName || "Sharma Dental Clinic";
  const subdomain = cleanName.toLowerCase().replace(/[^a-z0-9]/g, "");
  const domain = `${subdomain || "mybusiness"}.gbpgrowthpro.com`;

  // Detect category to show customized template
  const isBakery = cleanName.toLowerCase().includes("bakery") || cleanName.toLowerCase().includes("cake") || cleanName.toLowerCase().includes("sweet");
  const isLaw = cleanName.toLowerCase().includes("law") || cleanName.toLowerCase().includes("legal") || cleanName.toLowerCase().includes("chamber") || cleanName.toLowerCase().includes("advocate");

  let themeColor = "bg-[#2563eb]"; // blue for dentist
  let textColor = "text-[#2563eb]";
  let hoverColor = "hover:bg-[#1d4ed8]";
  let accentBg = "bg-[#2563eb]/10";
  let heroTitle = "Complete Dental Care for Your Family";
  let heroSubtitle = "State-of-the-art treatments delivered with absolute comfort and personalized care.";
  let services = [
    { title: "Teeth Whitening", desc: "Advanced laser whitening for a bright, confident smile." },
    { title: "Root Canal Therapy", desc: "Painless, expert root canal procedures to save your teeth." },
    { title: "Dental Implants", desc: "Permanent, natural-looking replacement of missing teeth." },
    { title: "Orthodontics", desc: "Modern braces and clear aligners to perfect your alignment." },
  ];
  let categoryLabel = "Clinic";

  if (isBakery) {
    themeColor = "bg-[#ea580c]"; // orange for bakery
    textColor = "text-[#ea580c]";
    hoverColor = "hover:bg-[#c2410c]";
    accentBg = "bg-[#ea580c]/10";
    heroTitle = "Freshly Baked Happiness, Every Single Day";
    heroSubtitle = "Crafting delicious artisanal breads, designer cakes, and delightful pastries with love.";
    services = [
      { title: "Custom Cakes", desc: "Beautiful and mouth-watering cakes customized for your celebrations." },
      { title: "Artisanal Breads", desc: "Fresh sourdough, baguettes, and multigrain breads baked daily." },
      { title: "Pastries & Cookies", desc: "Sweet, buttery delights perfect for your teatime or daily treats." },
      { title: "Event Catering", desc: "High-quality dessert spreads and snack platters for all occasions." },
    ];
    categoryLabel = "Bakery";
  } else if (isLaw) {
    themeColor = "bg-[#1e293b]"; // slate/navy for law
    textColor = "text-[#1e293b]";
    hoverColor = "hover:bg-[#0f172a]";
    accentBg = "bg-[#1e293b]/10";
    heroTitle = "Dedicated to Justice, Focused on Results";
    heroSubtitle = "Providing expert legal advice and robust representation across corporate, civil, and criminal law.";
    services = [
      { title: "Corporate Counsel", desc: "Comprehensive legal guidance for business setups, contracts, and compliance." },
      { title: "Property & Civil Disputes", desc: "Strong legal defense and conflict resolution for real estate and civil matters." },
      { title: "Criminal Defense", desc: "Dedicated advocacy and trial representation protecting your constitutional rights." },
      { title: "Family & Estate Planning", desc: "Compassionate counsel for wills, trusts, inheritance, and family disputes." },
    ];
    categoryLabel = "Law Chambers";
  }

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setAppointmentBooked(true);
    setTimeout(() => {
      setAppointmentBooked(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0f172a]/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#ffffff] w-full max-w-5xl h-[90vh] rounded-2xl border border-[#e2e8f0] shadow-2xl flex flex-col overflow-hidden">
        
        {/* Browser Topbar Controls */}
        <div className="bg-[#f8fafc] border-b border-[#e2e8f0] px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            {/* Window controls */}
            <div className="flex gap-1.5">
              <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#ef4444] hover:opacity-80 transition-opacity" title="Close" />
              <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
              <div className="w-3 h-3 rounded-full bg-[#10b981]" />
            </div>
            {/* Desktop / Mobile Switcher */}
            <div className="flex bg-[#e2e8f0] rounded-lg p-0.5 text-xs">
              <button
                onClick={() => setIsMobile(false)}
                className={`flex items-center gap-1 px-3 py-1 rounded-md transition-colors ${!isMobile ? "bg-white text-[#0f172a] font-semibold shadow-sm" : "text-[#64748b]"}`}
              >
                <Monitor className="w-3.5 h-3.5" />
                Desktop
              </button>
              <button
                onClick={() => setIsMobile(true)}
                className={`flex items-center gap-1 px-3 py-1 rounded-md transition-colors ${isMobile ? "bg-white text-[#0f172a] font-semibold shadow-sm" : "text-[#64748b]"}`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                Mobile
              </button>
            </div>
          </div>

          {/* Browser Address Bar */}
          <div className="flex-1 max-w-md mx-6 bg-[#ffffff] border border-[#e2e8f0] rounded-lg px-3 py-1.5 text-xs text-[#475569] flex items-center gap-2 shadow-inner">
            <span className="text-[#10b981]">🔒</span>
            <span className="truncate">{domain}</span>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[#e2e8f0] text-[#64748b] hover:text-[#0f172a] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Browser viewport simulation */}
        <div className="flex-1 bg-[#f1f5f9] overflow-y-auto flex justify-center p-6">
          <div
            className={`bg-white transition-all duration-300 border border-[#e2e8f0] shadow-sm rounded-xl overflow-y-auto flex flex-col ${
              isMobile ? "w-[375px] h-full" : "w-full"
            }`}
          >
            
            {/* ─── WEB PAGE HEADER ─── */}
            <header className="border-b border-[#f1f5f9] px-6 py-4 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
              <span className="font-extrabold text-lg tracking-tight text-[#0f172a]">
                {cleanName}
              </span>
              {!isMobile && (
                <nav className="flex items-center gap-6 text-sm text-[#475569] font-medium">
                  <a href="#home" className="hover:text-[#0f172a]">Home</a>
                  <a href="#services" className="hover:text-[#0f172a]">Services</a>
                  <a href="#reviews" className="hover:text-[#0f172a]">Reviews</a>
                  <a href="#contact" className="hover:text-[#0f172a]">Contact</a>
                  <a href="#contact" className={`px-4 py-2 text-white rounded-lg text-xs font-bold transition-colors ${themeColor} ${hoverColor}`}>
                    Book Now
                  </a>
                </nav>
              )}
            </header>

            {/* ─── WEB PAGE HERO ─── */}
            <section id="home" className={`py-12 px-6 border-b border-[#f1f5f9] ${accentBg}`}>
              <div className="max-w-2xl mx-auto text-center">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 ${themeColor}/10 ${textColor}`}>
                  Welcome to our {categoryLabel}
                </span>
                <h1 className="text-2xl md:text-3xl font-extrabold text-[#0f172a] leading-tight mb-4">
                  {heroTitle}
                </h1>
                <p className="text-sm text-[#475569] leading-relaxed mb-6">
                  {heroSubtitle}
                </p>
                <div className="flex justify-center gap-3">
                  <a href="#contact" className={`px-5 py-2.5 text-white font-bold rounded-lg text-sm transition-colors ${themeColor} ${hoverColor}`}>
                    Get in Touch
                  </a>
                  <a href="#services" className="px-5 py-2.5 bg-white border border-[#e2e8f0] text-[#0f172a] font-bold rounded-lg text-sm hover:bg-[#f8fafc] transition-colors">
                    Explore Services
                  </a>
                </div>
              </div>
            </section>

            {/* ─── QUICK METRICS ─── */}
            <section className="py-6 px-6 border-b border-[#f1f5f9] grid grid-cols-3 gap-2 text-center bg-white">
              <div>
                <p className="text-xl font-bold text-[#0f172a]">4.9 ★</p>
                <p className="text-[10px] text-[#64748b] uppercase font-semibold">Google Rating</p>
              </div>
              <div className="border-x border-[#e2e8f0]">
                <p className="text-xl font-bold text-[#0f172a]">100%</p>
                <p className="text-[10px] text-[#64748b] uppercase font-semibold">Satisfied</p>
              </div>
              <div>
                <p className="text-xl font-bold text-[#0f172a]">10+</p>
                <p className="text-[10px] text-[#64748b] uppercase font-semibold">Years Exp.</p>
              </div>
            </section>

            {/* ─── SERVICES ─── */}
            <section id="services" className="py-10 px-6 bg-white">
              <h2 className="text-center font-bold text-xl text-[#0f172a] mb-6">Our Core Services</h2>
              <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-2"}`}>
                {services.map((s) => (
                  <div key={s.title} className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl hover:border-[#cbd5e1] transition-colors">
                    <h3 className="font-bold text-sm text-[#0f172a] mb-1">{s.title}</h3>
                    <p className="text-xs text-[#64748b] leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ─── MOCK GOOGLE REVIEWS ─── */}
            <section id="reviews" className={`py-10 px-6 border-y border-[#f1f5f9] ${accentBg}`}>
              <div className="max-w-3xl mx-auto">
                <h2 className="text-center font-bold text-xl text-[#0f172a] mb-6">What Our Customers Say</h2>
                <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-3"}`}>
                  {[
                    { name: "Amit K.", quote: "Very professional staff, quick turnaround and absolutely beautiful results.", stars: 5 },
                    { name: "Rahul S.", quote: "Excellent service. They are extremely careful and explain everything in detail.", stars: 5 },
                    { name: "Priya M.", quote: "Best experience in town! Friendly atmosphere and really fair pricing.", stars: 5 }
                  ].map((r) => (
                    <div key={r.name} className="bg-white p-4 rounded-xl border border-[#e2e8f0] shadow-sm flex flex-col justify-between">
                      <p className="text-xs text-[#475569] italic mb-3">"{r.quote}"</p>
                      <div>
                        <div className="flex gap-0.5 mb-1.5">
                          {Array.from({ length: r.stars }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-[#f59e0b]" fill="currentColor" />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-[#0f172a]">{r.name}</span>
                        <span className="text-[10px] text-[#10b981] ml-1.5 font-medium">Verified Customer</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ─── CONTACT / BOOKING FORM ─── */}
            <section id="contact" className="py-12 px-6 bg-white flex-1">
              <div className={`max-w-3xl mx-auto grid gap-8 ${isMobile ? "grid-cols-1" : "grid-cols-2"}`}>
                
                {/* Contact details */}
                <div>
                  <h2 className="font-bold text-lg text-[#0f172a] mb-4">Get In Touch</h2>
                  <p className="text-xs text-[#64748b] leading-relaxed mb-6">
                    Have any questions? Drop us a message or request a consultation. Our team will get back to you shortly.
                  </p>
                  
                  <div className="space-y-3.5 text-xs text-[#475569]">
                    <div className="flex items-center gap-3">
                      <Phone className={`w-4 h-4 ${textColor}`} />
                      <span>+91 91234 56789</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className={`w-4 h-4 ${textColor}`} />
                      <span>123 Main St, Sector 15, Gurgaon, HR</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className={`w-4 h-4 ${textColor}`} />
                      <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
                    </div>
                  </div>
                </div>

                {/* Booking Form */}
                <div className="bg-[#f8fafc] border border-[#e2e8f0] p-5 rounded-xl">
                  {appointmentBooked ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-6">
                      <CheckCircle2 className="w-12 h-12 text-[#10b981] mb-3 animate-bounce" />
                      <h3 className="font-bold text-sm text-[#0f172a] mb-1">Booking Request Received!</h3>
                      <p className="text-xs text-[#64748b]">We will call you on your number shortly to confirm your slot.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleBook} className="space-y-3">
                      <h3 className="font-bold text-sm text-[#0f172a] mb-2">Request Consultation</h3>
                      <div>
                        <label className="block text-[10px] font-semibold text-[#475569] mb-1">YOUR NAME</label>
                        <input
                          required
                          type="text"
                          placeholder="John Doe"
                          className="w-full text-xs px-3 py-2 border border-[#e2e8f0] bg-white rounded-lg focus:outline-none focus:border-[#2563eb]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-[#475569] mb-1">PHONE NUMBER</label>
                        <input
                          required
                          type="tel"
                          placeholder="+91 98765 43210"
                          className="w-full text-xs px-3 py-2 border border-[#e2e8f0] bg-white rounded-lg focus:outline-none focus:border-[#2563eb]"
                        />
                      </div>
                      <button
                        type="submit"
                        className={`w-full py-2 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer ${themeColor} ${hoverColor}`}
                      >
                        Submit Request
                      </button>
                    </form>
                  )}
                </div>

              </div>
            </section>

            {/* ─── WEB PAGE FOOTER ─── */}
            <footer className="border-t border-[#f1f5f9] px-6 py-6 text-center text-[10px] text-[#64748b] bg-[#f8fafc]">
              <p>© 2026 {cleanName}. All rights reserved.</p>
              <p className="mt-1">Generated instantly by GBP Growth Pro.</p>
            </footer>

          </div>
        </div>

      </div>
    </div>
  );
}
