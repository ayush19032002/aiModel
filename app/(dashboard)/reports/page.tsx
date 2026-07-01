import { FileText, Download, Clock, Send } from "lucide-react";

const reports = [
  { name: "Monthly GBP Performance", desc: "Full GBP audit, rankings, and review summary", schedule: "Monthly", lastGenerated: "Jul 1, 2024" },
  { name: "Review Analytics Report", desc: "Sentiment analysis, response rate, and trend charts", schedule: "Weekly", lastGenerated: "Jul 10, 2024" },
  { name: "Lead Generation Summary", desc: "Lead sources, conversion rates, and pipeline value", schedule: "Monthly", lastGenerated: "Jul 1, 2024" },
  { name: "Campaign Performance", desc: "Open rates, click rates, and ROI by campaign", schedule: "On demand", lastGenerated: "Jul 5, 2024" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-[#0f172a]">Reports</h2>
        <p className="text-sm text-[#64748b] mt-0.5">Generate and schedule professional PDF reports</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {reports.map(r => (
          <div key={r.name} className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-5 card-hover">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-11 h-11 bg-[#2563eb]/15 rounded-xl flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-[#7c3aed]" />
              </div>
              <div>
                <h4 className="font-semibold text-[#0f172a] text-sm">{r.name}</h4>
                <p className="text-xs text-[#64748b] mt-0.5">{r.desc}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-[#64748b] mb-4">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {r.schedule}</span>
              <span>Last: {r.lastGenerated}</span>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 text-xs bg-[#2563eb] text-white py-2 rounded-lg hover:bg-[#1d4ed8]">
                <Download className="w-3.5 h-3.5" /> Generate PDF
              </button>
              <button className="flex items-center gap-1.5 text-xs bg-[#ffffff] border border-[#e2e8f0] text-[#1e293b] px-3 py-2 rounded-lg hover:border-[#cbd5e1]">
                <Send className="w-3.5 h-3.5" /> Email
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
