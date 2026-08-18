"use client";
import { useState, useEffect } from "react";
import { Send, Bot, User, Search, Phone, Info, Check } from "lucide-react";
import { timeAgo } from "@/lib/utils";

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Note state
  const [notes, setNotes] = useState<Record<string, string>>({
    "0": "Customer looking to connect their GBP account to set up automatic review replies. Interested in the Growth plan.",
    "1": "Needs dental appointment scheduling details.",
  });
  const [currentNote, setCurrentNote] = useState("");

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const res = await fetch("/api/whatsapp/conversations");
      const data = await res.json();
      const parsedData = data.map((c: any) => ({
        id: c.id,
        contact: c.contact?.name || c.customerPhone,
        phone: c.customerPhone,
        status: c.status === "ACTIVE" ? "lead" : "customer",
        time: new Date(c.lastMessageAt),
        unread: 0,
        lastMessage: c.messages?.[0]?.content || "No messages yet.",
        messages: c.messages?.map((m: any) => ({
          id: m.id,
          from: m.direction === 'INCOMING' ? 'customer' : 'ai',
          text: m.content,
          time: new Date(m.sentAt)
        })) || []
      }));
      setConversations(parsedData);
      if (!selectedId && parsedData.length > 0) {
        setSelectedId(parsedData[0].id);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const selected = conversations.find(c => c.id === selectedId) || conversations[0];

  const filteredConversations = conversations.filter(c => 
    c.contact.toLowerCase().includes(search.toLowerCase()) || 
    c.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  const handleSend = async () => {
    if (!input.trim() || !selectedId) return;

    const textSent = input;
    setInput("");

    // Optimistically update
    const newMessage = {
      id: `temp-${Date.now()}`,
      from: "ai" as const,
      text: textSent,
      time: new Date(),
    };

    setConversations(prev =>
      prev.map(c => {
        if (c.id === selectedId) {
          return {
            ...c,
            lastMessage: textSent,
            time: new Date(),
            messages: [...c.messages, newMessage],
          };
        }
        return c;
      })
    );

    // Call API
    await fetch(`/api/whatsapp/${selectedId}/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: textSent })
    });
    
    // Refetch to sync state
    fetchConversations();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleSaveNote = () => {
    if (!currentNote.trim() || !selected) return;
    setNotes(prev => ({
      ...prev,
      [selected.id]: currentNote
    }));
    setCurrentNote("");
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-112px)] bg-[#ffffff] border border-[#e2e8f0] rounded-2xl overflow-hidden shadow-sm items-center justify-center">
        <p className="text-[#64748b]">Loading conversations...</p>
      </div>
    );
  }

  if (!selected) return null;

  return (
    <div className="flex h-[calc(100vh-112px)] bg-[#ffffff] border border-[#e2e8f0] rounded-2xl overflow-hidden shadow-sm animate-fade-in">
      {/* Left: Conversation list */}
      <div className="w-80 shrink-0 border-r border-[#e2e8f0] flex flex-col bg-white">
        <div className="p-4 border-b border-[#e2e8f0]">
          <h3 className="font-semibold text-[#0f172a] mb-3">WhatsApp Inbox</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
            <input
              type="text"
              placeholder="Search chats..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-[#e2e8f0] focus:outline-none"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-[#e2e8f0]">
          {filteredConversations.map(c => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedId(c.id);
                // Mark as read
                setConversations(prev => prev.map(con => con.id === c.id ? { ...con, unread: 0 } : con));
              }}
              className={`w-full text-left p-4 hover:bg-[#f8fafc] transition-colors flex items-center gap-3 ${selected.id === c.id ? "bg-[#2563eb]/5 border-l-4 border-l-[#2563eb]" : "border-l-4 border-l-transparent"}`}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2563eb] to-[#3b82f6] flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm">
                {c.contact.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-[#0f172a] truncate">{c.contact}</p>
                  <p className="text-[10px] text-[#64748b] shrink-0 ml-2">{timeAgo(c.time)}</p>
                </div>
                <p className="text-xs text-[#64748b] truncate mt-0.5">{c.lastMessage}</p>
              </div>
              {c.unread > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#2563eb] text-white text-[10px] flex items-center justify-center shrink-0 font-semibold shadow-sm">
                  {c.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Center: Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#f8fafc]">
        {/* Chat header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#e2e8f0] bg-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2563eb] to-[#3b82f6] flex items-center justify-center text-white text-sm font-bold shadow-sm">
              {selected.contact.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-[#0f172a] text-sm">{selected.contact}</p>
              <p className="text-xs text-[#10b981] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" /> AI Autopilot Active
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-lg bg-[#ffffff] border border-[#e2e8f0] flex items-center justify-center text-[#64748b] hover:text-[#0f172a] hover:border-[#cbd5e1] shadow-sm">
              <Phone className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-lg bg-[#ffffff] border border-[#e2e8f0] flex items-center justify-center text-[#64748b] hover:text-[#0f172a] hover:border-[#cbd5e1] shadow-sm">
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {selected.messages.map((msg: any) => (
            <div key={msg.id} className={`flex ${msg.from === "customer" ? "justify-start" : "justify-end"}`}>
              <div className={`flex items-end gap-2.5 max-w-[75%] ${msg.from === "customer" ? "" : "flex-row-reverse"}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.from === "customer" ? "bg-[#e2e8f0]" : "bg-[#2563eb]"} shadow-sm`}>
                  {msg.from === "customer" ? <User className="w-3.5 h-3.5 text-[#475569]" /> : <Bot className="w-3.5 h-3.5 text-white" />}
                </div>
                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${msg.from === "customer" ? "bg-[#ffffff] text-[#334155] border border-[#e2e8f0] rounded-tl-sm" : "bg-[#2563eb] text-white rounded-tr-sm"}`}>
                  {msg.text}
                  <p className={`text-[9px] mt-1.5 font-medium ${msg.from === "customer" ? "text-[#64748b]" : "text-[#dbeafe]"}`}>
                    {timeAgo(msg.time)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Suggestion Chips */}
        <div className="px-5 py-3 border-t border-[#e2e8f0] bg-[#ffffff] shadow-inner">
          <p className="text-[10px] font-bold text-[#2563eb] mb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <Bot className="w-3.5 h-3.5" /> Autopilot Suggestions
          </p>
          <div className="flex gap-2 flex-wrap">
            {[
              "Saturday 10am works best for slot booking!",
              "Hamara pricing ₹2,999/month se start hota hai.",
              "Main team contact details connect kar deta hoon."
            ].map(s => (
              <button
                key={s}
                onClick={() => setInput(s)}
                className="text-xs bg-[#2563eb]/10 text-[#2563eb] border border-[#2563eb]/20 px-3 py-1.5 rounded-full hover:bg-[#2563eb]/20 transition-colors cursor-pointer font-medium"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-[#e2e8f0] flex gap-3 bg-white shadow-sm">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message to client (simulates AI reply)..."
            className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-[#e2e8f0] focus:outline-none focus:border-[#2563eb]"
          />
          <button
            onClick={handleSend}
            className="w-10 h-10 bg-[#2563eb] rounded-xl flex items-center justify-center text-white hover:bg-[#1d4ed8] transition-colors shrink-0 shadow-md cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right Sidebar: Customer Profile Summary */}
      <div className="w-72 shrink-0 border-l border-[#e2e8f0] p-5 overflow-y-auto bg-white flex flex-col justify-between">
        <div>
          <h4 className="text-xs font-bold text-[#0f172a] uppercase tracking-wider mb-4">Customer Details</h4>
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2563eb] to-[#3b82f6] flex items-center justify-center text-white text-xl font-bold mx-auto mb-2 shadow-sm">
              {selected.contact.charAt(0)}
            </div>
            <p className="font-bold text-[#0f172a] text-sm">{selected.contact}</p>
            <p className="text-xs text-[#64748b]">{selected.phone}</p>
            <span className={`inline-block mt-2 text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${selected.status === "lead" ? "bg-[#f59e0b]/10 text-[#f59e0b]" : "bg-[#10b981]/10 text-[#10b981]"}`}>
              {selected.status}
            </span>
          </div>
          <div className="space-y-3.5 text-xs border-t border-[#e2e8f0] pt-4">
            {[
              { label: "Total Messages", value: selected.messages.length },
              { label: "First Contact", value: "Jul 12, 2026" },
              { label: "Channel Source", value: "WhatsApp API" },
            ].map(item => (
              <div key={item.label} className="flex justify-between">
                <span className="text-[#64748b]">{item.label}</span>
                <span className="text-[#0f172a] font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#e2e8f0] space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[#0f172a] uppercase tracking-wider">Internal Notes</span>
          </div>
          
          {/* Note content */}
          {notes[selected.id] && (
            <div className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-xs text-[#475569] leading-relaxed italic">
              {notes[selected.id]}
            </div>
          )}
          
          <div className="space-y-2">
            <textarea
              placeholder="Add or overwrite note..."
              value={currentNote}
              onChange={e => setCurrentNote(e.target.value)}
              className="w-full text-xs rounded-xl px-3 py-2 h-16 resize-none border border-[#e2e8f0] bg-[#ffffff] focus:outline-none focus:border-[#2563eb]"
            />
            <button
              onClick={handleSaveNote}
              className="w-full bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#1e293b] text-xs font-bold py-1.5 rounded-lg border border-[#e2e8f0] transition-colors cursor-pointer"
            >
              Save Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
