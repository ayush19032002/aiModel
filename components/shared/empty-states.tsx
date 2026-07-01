import React from "react";
import { MessageSquare, Star, Megaphone, Inbox, Plus } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyReviews({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border border-[#e2e8f0] border-dashed rounded-2xl bg-[#ffffff]/20">
      <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center text-[#f59e0b] mb-4">
        <Star className="w-6 h-6" fill="currentColor" />
      </div>
      <h3 className="text-base font-semibold text-[#0f172a] mb-1">{title}</h3>
      <p className="text-sm text-[#64748b] max-w-sm mb-6">{description}</p>
      {actionLabel && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-1.5 bg-[#2563eb] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#1d4ed8] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export function EmptyLeads({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border border-[#e2e8f0] border-dashed rounded-2xl bg-[#ffffff]/20">
      <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center text-[#10b981] mb-4">
        <Inbox className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-[#0f172a] mb-1">{title}</h3>
      <p className="text-sm text-[#64748b] max-w-sm mb-6">{description}</p>
      {actionLabel && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-1.5 bg-[#2563eb] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#1d4ed8] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export function EmptyConversations({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border border-[#e2e8f0] border-dashed rounded-2xl bg-[#ffffff]/20">
      <div className="w-12 h-12 rounded-xl bg-[#2563eb]/10 border border-[#2563eb]/20 flex items-center justify-center text-[#2563eb] mb-4">
        <MessageSquare className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-[#0f172a] mb-1">{title}</h3>
      <p className="text-sm text-[#64748b] max-w-sm mb-6">{description}</p>
      {actionLabel && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-1.5 bg-[#2563eb] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#1d4ed8] transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export function EmptyCampaigns({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border border-[#e2e8f0] border-dashed rounded-2xl bg-[#ffffff]/20">
      <div className="w-12 h-12 rounded-xl bg-[#a855f7]/10 border border-[#a855f7]/20 flex items-center justify-center text-[#2563eb] mb-4">
        <Megaphone className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-[#0f172a] mb-1">{title}</h3>
      <p className="text-sm text-[#64748b] max-w-sm mb-6">{description}</p>
      {actionLabel && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-1.5 bg-[#2563eb] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#1d4ed8] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          {actionLabel}
        </button>
      )}
    </div>
  );
}
