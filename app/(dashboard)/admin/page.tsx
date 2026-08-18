"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Users, CreditCard, Activity, TrendingUp, ShieldAlert,
  Settings, Zap
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = window.localStorage.getItem("gbp_token");
        const res = await fetch("/api/admin/dashboard", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Failed to fetch admin data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-[#64748b]">Loading admin dashboard...</div>;
  }

  if (!data) {
    return <div className="p-8 text-center text-red-500">Failed to load admin data.</div>;
  }

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-[#0f172a]">SuperAdmin Dashboard</h2>
        <p className="text-sm text-[#64748b] mt-0.5">Platform-wide overview and management</p>
      </motion.div>

      {/* KPI Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: data.totalUsers, icon: Users, color: "#2563eb", trend: "+12%" },
          { label: "Active Subscriptions", value: data.activeSubscriptions, icon: Zap, color: "#10b981", trend: "+4%" },
          { label: "Total Revenue", value: `₹${data.totalRevenue.toLocaleString()}`, icon: CreditCard, color: "#f59e0b", trend: "+8%" },
          { label: "API Requests (30d)", value: data.apiUsage.toLocaleString(), icon: Activity, color: "#7c3aed", trend: "+24%" }
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-5 card-hover">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-[#64748b] font-medium">{kpi.label}</p>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${kpi.color}15` }}>
                  <Icon className="w-4 h-4" style={{ color: kpi.color }} />
                </div>
              </div>
              <div className="flex items-end gap-2">
                <p className="text-2xl font-bold text-[#0f172a]">{kpi.value}</p>
                <span className="text-xs font-semibold text-[#10b981] mb-1">{kpi.trend}</span>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Main Content Area */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Users Table */}
        <div className="lg:col-span-2 bg-[#ffffff] border border-[#e2e8f0] rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-[#e2e8f0] flex justify-between items-center">
            <h3 className="font-semibold text-[#0f172a]">Recent Signups</h3>
            <button className="text-sm text-[#2563eb] hover:underline font-medium">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8fafc] text-xs uppercase text-[#64748b] border-b border-[#e2e8f0]">
                  <th className="px-5 py-3 font-medium">User</th>
                  <th className="px-5 py-3 font-medium">Plan</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody className="text-sm text-[#1e293b]">
                {[
                  { name: "Arjun Sharma", email: "arjun@dental.com", plan: "Growth", status: "Active", date: "Today" },
                  { name: "Priya Patel", email: "priya@cafe.in", plan: "Pro", status: "Active", date: "Yesterday" },
                  { name: "Rahul Verma", email: "rahul@plumbing.in", plan: "Starter", status: "Trial", date: "2 days ago" },
                  { name: "Neha Singh", email: "neha@boutique.in", plan: "Growth", status: "Active", date: "3 days ago" },
                ].map((user, i) => (
                  <tr key={i} className="border-b border-[#f1f5f9] last:border-0 hover:bg-[#f8fafc] transition-colors">
                    <td className="px-5 py-3">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-[#64748b]">{user.email}</p>
                    </td>
                    <td className="px-5 py-3">
                      <span className="bg-[#2563eb]/10 text-[#2563eb] px-2 py-1 rounded-md text-xs font-semibold">{user.plan}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-[#10b981]' : 'bg-[#f59e0b]'}`} />
                        {user.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-[#64748b] text-xs">{user.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Health */}
        <div className="space-y-6">
          <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-5">
            <h3 className="font-semibold text-[#0f172a] mb-4">System Health</h3>
            <div className="space-y-4">
              {[
                { label: "Database Load", value: "24%", status: "healthy", color: "bg-[#10b981]" },
                { label: "Redis Cache", value: "48%", status: "healthy", color: "bg-[#10b981]" },
                { label: "Worker Queue", value: `${data.queueStatus} jobs`, status: "idle", color: "bg-[#64748b]" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <p className="text-sm text-[#475569]">{item.label}</p>
                  </div>
                  <p className="text-sm font-semibold text-[#0f172a]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Admin Actions */}
          <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-5">
            <h3 className="font-semibold text-[#0f172a] mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-center gap-2 bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#0f172a] px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
                <Settings className="w-4 h-4" /> Platform Settings
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-[#fef2f2] hover:bg-[#fee2e2] text-[#ef4444] px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
                <ShieldAlert className="w-4 h-4" /> View Audit Logs
              </button>
            </div>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
}
