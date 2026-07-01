import { Search, Phone, Mail, Star } from "lucide-react";

const customers = [
  { id: 1, name: "Rahul Mehta", business: "Personal", email: "rahul@email.com", phone: "+91 87654 32109", visits: 8, ltv: "₹24K", rating: 5, lastVisit: "Jul 8" },
  { id: 2, name: "Priya Sharma", business: "Personal", email: "priya@email.com", phone: "+91 98765 43210", visits: 12, ltv: "₹36K", rating: 5, lastVisit: "Jul 10" },
  { id: 3, name: "Kavita Desai", business: "Personal", email: "kavita@email.com", phone: "+91 76543 21098", visits: 5, ltv: "₹15K", rating: 4, lastVisit: "Jul 1" },
  { id: 4, name: "Anil Shah", business: "Shah Corp", email: "anil@shahcorp.in", phone: "+91 65432 10987", visits: 3, ltv: "₹9K", rating: 4, lastVisit: "Jun 25" },
];

export default function CustomersPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#0f172a]">Customers</h2>
          <p className="text-sm text-[#64748b] mt-0.5">{customers.length} active customers</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
        <input type="text" placeholder="Search customers..." className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl max-w-sm" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {customers.map(c => (
          <div key={c.id} className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-5 card-hover">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2563eb] to-[#3b82f6] flex items-center justify-center text-white font-bold shrink-0">
                {c.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#0f172a]">{c.name}</p>
                <p className="text-xs text-[#64748b]">{c.business}</p>
                <div className="flex mt-1">{Array.from({length: c.rating}).map((_,i) => <Star key={i} className="w-3 h-3 text-[#f59e0b]" fill="currentColor" />)}</div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-[#10b981]">{c.ltv}</p>
                <p className="text-xs text-[#64748b]">lifetime value</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4 text-center">
              {[
                { label: "Visits", value: c.visits },
                { label: "Last Visit", value: c.lastVisit },
                { label: "Rating", value: `${c.rating}★` },
              ].map(s => (
                <div key={s.label} className="bg-[#ffffff] rounded-lg p-2">
                  <p className="text-sm font-bold text-[#0f172a]">{s.value}</p>
                  <p className="text-[10px] text-[#64748b]">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 text-xs bg-[#ffffff] border border-[#e2e8f0] text-[#1e293b] py-2 rounded-lg hover:border-[#cbd5e1]">
                <Phone className="w-3.5 h-3.5" /> Call
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 text-xs bg-[#ffffff] border border-[#e2e8f0] text-[#1e293b] py-2 rounded-lg hover:border-[#cbd5e1]">
                <Mail className="w-3.5 h-3.5" /> Email
              </button>
              <button className="flex-1 text-xs bg-[#2563eb]/10 text-[#2563eb] border border-[#2563eb]/20 py-2 rounded-lg hover:bg-[#2563eb]/20">
                WhatsApp
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
