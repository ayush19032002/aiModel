import {
  kpiData as initialKpi,
  leadGrowthData as initialLeadGrowth,
  reviewGrowthData as initialReviewGrowth,
  visibilityData as initialVisibility,
  retentionData as initialRetention,
  rankingData as initialRanking,
  auditData as initialAudit,
  reviewsData as initialReviews,
  sentimentData as initialSentiment,
  leadsData as initialLeads,
  conversationsData as initialConversations,
  campaignPerformanceData as initialCampaigns,
  LeadStage
} from "./mock-data";

// Deep copy initial data to prevent mutating the original mock-data exports
let store = {
  kpiData: { ...initialKpi },
  leadGrowthData: [...initialLeadGrowth],
  reviewGrowthData: [...initialReviewGrowth],
  visibilityData: [...initialVisibility],
  retentionData: [...initialRetention],
  rankingData: [...initialRanking],
  auditData: { ...initialAudit },
  reviewsData: [...initialReviews],
  sentimentData: [...initialSentiment],
  leadsData: [...initialLeads],
  conversationsData: [...initialConversations],
  campaignPerformanceData: [...initialCampaigns]
};

// ─── Dashboard ───
export function getDashboardStats() {
  return {
    kpi: store.kpiData,
    leadGrowth: store.leadGrowthData,
    reviewGrowth: store.reviewGrowthData,
    visibility: store.visibilityData,
    retention: store.retentionData,
    ranking: store.rankingData
  };
}

// ─── GBP ───
export function getGbpAudit() {
  return store.auditData;
}

// ─── Analytics ───
export function getAnalytics() {
  return {
    sentiment: store.sentimentData,
    campaigns: store.campaignPerformanceData
  };
}

// ─── CRM (Leads) ───
export function getLeads() {
  return store.leadsData;
}

export function addLead(lead: any) {
  const newLead = {
    ...lead,
    id: Math.random().toString(36).substring(7),
    date: new Date()
  };
  store.leadsData = [newLead, ...store.leadsData];
  store.kpiData.monthlyLeads += 1;
  return newLead;
}

export function updateLead(id: string, updates: any) {
  store.leadsData = store.leadsData.map((l) =>
    l.id === id ? { ...l, ...updates } : l
  );
  return store.leadsData.find((l) => l.id === id);
}

export function deleteLead(id: string) {
  store.leadsData = store.leadsData.filter((l) => l.id !== id);
}

// ─── Reviews ───
export function getReviews() {
  return store.reviewsData;
}

export function replyToReview(id: string) {
  store.reviewsData = store.reviewsData.map((r) =>
    r.id === id ? { ...r, replied: true } : r
  );
  return store.reviewsData.find((r) => r.id === id);
}

// ─── WhatsApp ───
export function getConversations() {
  return store.conversationsData;
}

export function sendWhatsAppMessage(conversationId: string, text: string) {
  const convIndex = store.conversationsData.findIndex(c => c.id === conversationId);
  if (convIndex === -1) return null;

  const newMessage = {
    id: Math.random().toString(36).substring(7),
    from: "ai" as const, // Or business user
    text,
    time: new Date()
  };

  const conv = store.conversationsData[convIndex];
  const updatedConv = {
    ...conv,
    lastMessage: text,
    time: newMessage.time,
    messages: [...conv.messages, newMessage]
  };

  store.conversationsData[convIndex] = updatedConv;
  return updatedConv;
}
