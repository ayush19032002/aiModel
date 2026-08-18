"use client";
import { useState } from "react";
import { Users, Plus, Edit2, Trash2, Search, CheckCircle2, XCircle, AlertTriangle, AlertCircle } from "lucide-react";

type Contact = {
  id: string;
  name: string;
  countryCode: string;
  phone: string;
  status: "Valid" | "Invalid";
  optedIn: boolean;
};

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: "1", name: "John Doe", countryCode: "+1", phone: "5551234567", status: "Valid", optedIn: true },
    { id: "2", name: "Jane Smith", countryCode: "+44", phone: "7700900123", status: "Valid", optedIn: true },
    { id: "3", name: "Invalid User", countryCode: "+1", phone: "555000000", status: "Invalid", optedIn: false },
  ]);
  
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    countryCode: "+1",
    phone: "",
  });

  const handleOpenAdd = () => {
    setEditId(null);
    setFormData({ name: "", countryCode: "+1", phone: "" });
    setErrorMsg("");
    setShowModal(true);
  };

  const handleOpenEdit = (c: Contact) => {
    setEditId(c.id);
    setFormData({ name: c.name, countryCode: c.countryCode, phone: c.phone });
    setErrorMsg("");
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      setContacts(contacts.filter(c => c.id !== id));
    }
  };

  const handleSave = () => {
    setErrorMsg("");
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg("Name and phone number are required.");
      return;
    }

    // Check duplicates
    const isDuplicate = contacts.some(
      c => c.countryCode === formData.countryCode && c.phone === formData.phone && c.id !== editId
    );

    if (isDuplicate) {
      setErrorMsg("A contact with this WhatsApp number already exists.");
      return;
    }

    if (editId) {
      setContacts(contacts.map(c => 
        c.id === editId ? { ...c, ...formData } : c
      ));
    } else {
      setContacts([{
        id: Date.now().toString(),
        ...formData,
        status: "Valid",
        optedIn: true
      }, ...contacts]);
    }
    setShowModal(false);
  };

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.phone.includes(search)
  );

  return (
    <div className="space-y-6 animate-fade-in p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0f172a]">Manual Contacts</h1>
          <p className="text-muted-foreground text-sm">
            Manually add and manage WhatsApp contacts for broadcasts and automated messages.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-[#2563eb] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1d4ed8] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Contact
        </button>
      </div>

      <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#e2e8f0] bg-[#f8fafc] flex items-center justify-between">
          <div className="relative w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-[#e2e8f0] focus:outline-none focus:border-[#2563eb]"
            />
          </div>
          <div className="text-sm font-semibold text-[#64748b]">
            Total: {contacts.length}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f1f5f9] text-[#475569] font-semibold border-b border-[#e2e8f0]">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">WhatsApp Number</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Opt-in</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-[#64748b]">
                    <Users className="w-10 h-10 mx-auto text-[#cbd5e1] mb-3" />
                    <p>No contacts found.</p>
                  </td>
                </tr>
              ) : (
                filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-[#f8fafc] transition-colors">
                    <td className="px-6 py-4 font-medium text-[#0f172a]">{contact.name}</td>
                    <td className="px-6 py-4 text-[#475569] font-mono text-xs">
                      {contact.countryCode} {contact.phone}
                    </td>
                    <td className="px-6 py-4">
                      {contact.status === "Valid" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#10b981]/10 text-[#10b981] uppercase tracking-wide">
                          <CheckCircle2 className="w-3 h-3" /> Valid
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#ef4444]/10 text-[#ef4444] uppercase tracking-wide">
                          <XCircle className="w-3 h-3" /> Invalid
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {contact.optedIn ? (
                        <span className="text-[#10b981] text-xs font-semibold">Yes</span>
                      ) : (
                        <span className="text-[#94a3b8] text-xs font-semibold">No</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button 
                        onClick={() => handleOpenEdit(contact)}
                        className="p-1.5 text-[#64748b] hover:text-[#2563eb] hover:bg-[#2563eb]/10 rounded transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(contact.id)}
                        className="p-1.5 text-[#64748b] hover:text-[#ef4444] hover:bg-[#ef4444]/10 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-[#0f172a]/50 flex items-center justify-center z-50 p-4 animate-fade-in backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-[#e2e8f0] flex items-center justify-between">
              <h3 className="font-bold text-[#0f172a] text-lg">
                {editId ? "Edit Contact" : "Add Manual Contact"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-[#94a3b8] hover:text-[#0f172a]">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              {errorMsg && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm flex items-center gap-2 border border-red-200">
                  <AlertTriangle className="w-4 h-4 shrink-0" /> {errorMsg}
                </div>
              )}

              <div>
                <label className="text-sm font-semibold text-[#475569] mb-1.5 block">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#e2e8f0] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#2563eb]"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-[#475569] mb-1.5 block">WhatsApp Number</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="+1"
                    value={formData.countryCode}
                    onChange={e => setFormData({...formData, countryCode: e.target.value})}
                    className="w-24 px-4 py-2.5 text-sm rounded-xl border border-[#e2e8f0] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#2563eb]"
                  />
                  <input
                    type="text"
                    placeholder="5551234567"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})}
                    className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-[#e2e8f0] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#2563eb]"
                  />
                </div>
                <p className="text-xs text-[#64748b] mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Numbers only, no spaces or dashes.
                </p>
              </div>
            </div>

            <div className="px-6 py-4 bg-[#f8fafc] border-t border-[#e2e8f0] flex justify-end gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-[#475569] hover:bg-[#e2e8f0] transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition-colors"
              >
                Save Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
