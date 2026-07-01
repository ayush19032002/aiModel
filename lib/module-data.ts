export type LeadSearchResult = {
  id: string;
  name: string;
  category: string;
  address: string;
  phone: string;
  email?: string;
  website?: string;
  socials?: string[];
  rating: number;
  reviews: number;
  score: number;
  suggestions: string[];
  duplicateOf?: string;
};

export const leadSearchResults: LeadSearchResult[] = [
  {
    id: "lead-1",
    name: "SmileCraft Dental Studio",
    category: "Dentist",
    address: "Andheri West, Mumbai",
    phone: "+91 98765 43210",
    email: "care@smilecraft.in",
    website: "https://smilecraft.in",
    socials: ["@smilecraft", "linkedin.com/company/smilecraft"],
    rating: 4.7,
    reviews: 184,
    score: 92,
    suggestions: ["Offer a free whitening consultation", "Send a review request follow-up"],
  },
  {
    id: "lead-2",
    name: "BrightSmile Orthodontics",
    category: "Orthodontist",
    address: "Bandra, Mumbai",
    phone: "+91 87654 32109",
    email: "hello@brightsmile.in",
    website: "https://brightsmile.in",
    socials: ["@brightsmile"],
    rating: 4.4,
    reviews: 112,
    score: 86,
    suggestions: ["Introduce a premium Invisalign campaign", "Share a local SEO audit"],
  },
  {
    id: "lead-3",
    name: "Luxe Dental Lounge",
    category: "Cosmetic Dentistry",
    address: "Pune",
    phone: "+91 76543 21098",
    website: "https://luxedental.com",
    rating: 4.8,
    reviews: 231,
    score: 89,
    suggestions: ["Promote smile makeovers", "Run a WhatsApp re-engagement sequence"],
    duplicateOf: "SmileCraft Dental Studio",
  },
];

export const chatbotThreads = [
  {
    id: "thread-1",
    title: "Website inquiry from Sharma Dental",
    channel: "website",
    status: "active",
    lastMessage: "Can I book an appointment for Saturday?",
    leadCaptured: true,
  },
  {
    id: "thread-2",
    title: "WhatsApp follow-up",
    channel: "whatsapp",
    status: "handoff",
    lastMessage: "Customer asked for human support",
    leadCaptured: false,
  },
];

export const automationWorkflows = [
  {
    id: "wf-1",
    name: "Review request follow-up",
    trigger: "Positive review received",
    status: "active",
    executions: 128,
  },
  {
    id: "wf-2",
    name: "Lead nurture via WhatsApp",
    trigger: "New lead captured",
    status: "paused",
    executions: 56,
  },
];
