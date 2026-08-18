"use client";
import { useState } from "react";
import { Building2, Plus, Image as ImageIcon, CheckCircle2, UploadCloud, RefreshCw } from "lucide-react";

export default function CatalogPage() {
  const [products, setProducts] = useState([
    { id: 1, title: "General Checkup & Cleaning", desc: "Comprehensive dental exam, x-rays, and professional cleaning.", price: "99.00", currency: "USD", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=300&q=80" },
    { id: 2, title: "Teeth Whitening Session", desc: "Professional laser teeth whitening for a brighter smile in one hour.", price: "199.00", currency: "USD", image: "https://images.unsplash.com/photo-1598256989800-fea5ce5146f2?auto=format&fit=crop&w=300&q=80" }
  ]);

  const [isSyncing, setIsSyncing] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 2000);
  };

  const handleAdd = () => {
    if(!newTitle || !newPrice) return;
    setProducts([...products, {
      id: Date.now(),
      title: newTitle,
      desc: newDesc,
      price: newPrice,
      currency: "USD",
      image: ""
    }]);
    setShowAdd(false);
    setNewTitle("");
    setNewDesc("");
    setNewPrice("");
  };

  return (
    <div className="space-y-6 animate-fade-in p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0f172a]">WhatsApp Catalog</h1>
          <p className="text-muted-foreground text-sm">
            Manage products/services and sync them to your WhatsApp Business Catalog.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 bg-[#ffffff] border border-[#e2e8f0] text-[#0f172a] px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#f8fafc] transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Item
          </button>
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="flex items-center gap-2 bg-[#2563eb] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1d4ed8] transition-colors disabled:opacity-70"
          >
            {isSyncing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            Sync to WhatsApp
          </button>
        </div>
      </div>

      {showAdd && (
        <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-6 shadow-inner animate-fade-in mb-6">
          <h3 className="font-bold text-[#0f172a] mb-4">Add New Catalog Item</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#475569] mb-1.5 block">Product/Service Name</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2 text-sm rounded-lg border border-[#e2e8f0] bg-white focus:outline-none focus:border-[#2563eb]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#475569] mb-1.5 block">Price (USD)</label>
                <input
                  type="number"
                  value={newPrice}
                  onChange={e => setNewPrice(e.target.value)}
                  className="w-full px-4 py-2 text-sm rounded-lg border border-[#e2e8f0] bg-white focus:outline-none focus:border-[#2563eb]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#475569] mb-1.5 block">Description</label>
                <textarea
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  className="w-full px-4 py-2 text-sm rounded-lg border border-[#e2e8f0] bg-white focus:outline-none focus:border-[#2563eb] h-20 resize-none"
                />
              </div>
            </div>
            
            <div>
              <label className="text-xs font-semibold text-[#475569] mb-1.5 block">Image</label>
              <div className="w-full h-44 border-2 border-dashed border-[#cbd5e1] rounded-xl flex flex-col items-center justify-center bg-white hover:border-[#2563eb] hover:bg-[#f8fafc] transition-colors cursor-pointer">
                <UploadCloud className="w-8 h-8 text-[#94a3b8] mb-2" />
                <span className="text-sm font-semibold text-[#2563eb]">Upload Image</span>
                <span className="text-xs text-[#64748b] mt-1">Recommended 500x500px</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button onClick={handleAdd} className="bg-[#2563eb] text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-[#1d4ed8]">Save Item</button>
            <button onClick={() => setShowAdd(false)} className="bg-white border border-[#e2e8f0] text-[#64748b] px-5 py-2 rounded-lg font-medium text-sm hover:bg-[#f1f5f9]">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p.id} className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl overflow-hidden shadow-sm hover:border-[#cbd5e1] transition-colors group">
            <div className="h-48 bg-[#f1f5f9] relative border-b border-[#e2e8f0]">
              {p.image ? (
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-10 h-10 text-[#cbd5e1]" />
                </div>
              )}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-[#0f172a] px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                ${p.price}
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-[#0f172a] mb-1.5 text-lg leading-tight">{p.title}</h3>
              <p className="text-sm text-[#475569] leading-relaxed line-clamp-2">{p.desc}</p>
              
              <div className="mt-5 pt-4 border-t border-[#e2e8f0] flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-[#10b981]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Synced to WhatsApp
                </span>
                <button className="text-xs font-bold text-[#2563eb] hover:underline">Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
