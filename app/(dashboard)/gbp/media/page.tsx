"use client";
import { useState } from "react";
import { UploadCloud, FileImage, FileVideo, Sparkles, Check, X, AlertCircle, FileText } from "lucide-react";

export default function MediaUploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [published, setPublished] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      const type = file.type.startsWith("video") ? "video" : "image";
      setMediaType(type);
      
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setPublished(false);
    }
  };

  const handleAIOptimize = async () => {
    setIsOptimizing(true);
    
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentType: "description",
          businessName: "Sharma Dental Clinic",
          businessType: "Dental Clinic",
          tone: "professional",
          additionalContext: "Write a short title and description for a media upload for this business profile. Return them separated by a newline."
        })
      });
      const data = await res.json();
      
      const parts = data.content ? data.content.split('\n').filter((p: string) => p.trim() !== '') : [];
      setTitle(parts[0] || "Premium Dental Checkup & Consultation");
      setDescription(parts.slice(1).join('\n') || "Experience top-tier dental care with our comprehensive checkup and consultation. Book your appointment today for a brighter, healthier smile! #DentalCare #HealthySmile #Dentist");
    } catch (e) {
      console.error(e);
      setTitle("Premium Dental Checkup & Consultation");
      setDescription("Experience top-tier dental care with our comprehensive checkup and consultation. Book your appointment today for a brighter, healthier smile! #DentalCare #HealthySmile #Dentist");
    } finally {
      setIsOptimizing(false);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    // In a real app we'd upload the file to S3/Cloudinary and then publish to GBP API
    // For Phase 3, we mock the success
    setTimeout(() => {
      setIsPublishing(false);
      setPublished(true);
    }, 1500);
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setMediaType(null);
    setTitle("");
    setDescription("");
    setPublished(false);
  };

  return (
    <div className="space-y-6 animate-fade-in p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-[#0f172a]">AI Media Upload</h1>
        <p className="text-muted-foreground text-sm">
          Upload images or videos to your Google Business Profile. Let AI generate optimized titles and descriptions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-[#0f172a] mb-4 flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-[#2563eb]" />
            Upload Media
          </h3>
          
          {!previewUrl ? (
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-[#cbd5e1] rounded-xl bg-[#f8fafc] hover:bg-[#f1f5f9] hover:border-[#2563eb] transition-all cursor-pointer group">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadCloud className="w-10 h-10 text-[#94a3b8] mb-3 group-hover:text-[#2563eb] transition-colors" />
                <p className="mb-2 text-sm text-[#475569] font-medium">
                  <span className="text-[#2563eb] font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-[#64748b]">SVG, PNG, JPG, MP4 or WebM (MAX. 800x400px)</p>
              </div>
              <input type="file" className="hidden" accept="image/*,video/*" onChange={handleFileChange} />
            </label>
          ) : (
            <div className="space-y-4">
              <div className="relative w-full h-64 bg-black/5 rounded-xl overflow-hidden flex items-center justify-center border border-[#e2e8f0]">
                {mediaType === "image" ? (
                  <img src={previewUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
                ) : (
                  <video src={previewUrl} controls className="max-w-full max-h-full" />
                )}
                <button 
                  onClick={clearSelection}
                  className="absolute top-2 right-2 bg-white text-black p-1.5 rounded-full shadow-md hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-[#f8fafc] rounded-lg border border-[#e2e8f0]">
                <div className="p-2 bg-white rounded-md border border-[#e2e8f0]">
                  {mediaType === "image" ? <FileImage className="w-5 h-5 text-[#2563eb]" /> : <FileVideo className="w-5 h-5 text-[#2563eb]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#0f172a] truncate">{selectedFile?.name}</p>
                  <p className="text-xs text-[#64748b]">{(selectedFile!.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Details & AI Section */}
        <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-6 shadow-sm flex flex-col">
          <h3 className="font-semibold text-[#0f172a] mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#2563eb]" />
            Media Details
          </h3>

          <div className="flex-1 space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#475569] mb-1.5 block">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title for this media"
                disabled={!selectedFile || published}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#e2e8f0] bg-white focus:outline-none focus:border-[#2563eb] disabled:opacity-50"
              />
            </div>
            
            <div>
              <label className="text-xs font-semibold text-[#475569] mb-1.5 block">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a description"
                rows={4}
                disabled={!selectedFile || published}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#e2e8f0] bg-white focus:outline-none focus:border-[#2563eb] disabled:opacity-50 resize-none"
              />
            </div>

            {selectedFile && !published && (
              <button
                onClick={handleAIOptimize}
                disabled={isOptimizing}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 text-indigo-700 px-4 py-2.5 rounded-xl text-sm font-semibold hover:from-indigo-100 hover:to-purple-100 transition-colors disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                {isOptimizing ? "Optimizing with AI..." : "AI Optimize Content"}
              </button>
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-[#e2e8f0]">
            {published ? (
              <div className="bg-[#10b981]/10 border border-[#10b981]/20 rounded-xl p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#10b981] flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#065f46]">Successfully Published!</p>
                  <p className="text-xs text-[#065f46]/80">This {mediaType} is now live on your Google Business Profile.</p>
                </div>
              </div>
            ) : (
              <button
                onClick={handlePublish}
                disabled={!selectedFile || !title || isPublishing}
                className="w-full flex items-center justify-center gap-2 bg-[#2563eb] text-white px-4 py-3 rounded-xl text-sm font-semibold hover:bg-[#1d4ed8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPublishing ? "Publishing to GBP..." : "Publish to Google Business Profile"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
