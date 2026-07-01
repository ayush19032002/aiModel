// ─── Dashboard KPI Mock Data ───────────────────────────────────────────────

export const kpiData = {
  gbpScore: 78,
  visibilityScore: 84,
  monthlyLeads: 247,
  reviewGrowth: 32,
  keywordRankings: 18,
  whatsappConversations: 1240,
  customerRetention: 73,
  revenueImpact: 482000,
};

export const leadGrowthData = [
  { month: "Jan", leads: 80 },
  { month: "Feb", leads: 105 },
  { month: "Mar", leads: 92 },
  { month: "Apr", leads: 140 },
  { month: "May", leads: 178 },
  { month: "Jun", leads: 210 },
  { month: "Jul", leads: 247 },
];

export const reviewGrowthData = [
  { month: "Jan", reviews: 12, rating: 4.1 },
  { month: "Feb", reviews: 18, rating: 4.2 },
  { month: "Mar", reviews: 15, rating: 4.3 },
  { month: "Apr", reviews: 24, rating: 4.4 },
  { month: "May", reviews: 30, rating: 4.5 },
  { month: "Jun", reviews: 28, rating: 4.6 },
  { month: "Jul", reviews: 35, rating: 4.7 },
];

export const visibilityData = [
  { month: "Jan", score: 55 },
  { month: "Feb", score: 60 },
  { month: "Mar", score: 63 },
  { month: "Apr", score: 70 },
  { month: "May", score: 76 },
  { month: "Jun", score: 80 },
  { month: "Jul", score: 84 },
];

export const retentionData = [
  { name: "Retained", value: 73, color: "#10B981" },
  { name: "Churned", value: 27, color: "#1F2937" },
];

export const rankingData = [
  { keyword: "dental clinic near me", position: 2, change: 1, volume: 4400 },
  { keyword: "best dentist mumbai", position: 4, change: -1, volume: 2900 },
  { keyword: "teeth whitening service", position: 1, change: 3, volume: 1800 },
  { keyword: "orthodontist near me", position: 6, change: 2, volume: 3200 },
  { keyword: "emergency dentist", position: 3, change: 0, volume: 5100 },
];

// ─── GBP Audit Mock Data ────────────────────────────────────────────────────

export const auditData = {
  overallScore: 78,
  sections: [
    { name: "Business Name", score: 100, status: "complete" as const },
    { name: "Category & Services", score: 80, status: "needs_improvement" as const },
    { name: "Business Description", score: 65, status: "needs_improvement" as const },
    { name: "Photos & Videos", score: 55, status: "incomplete" as const },
    { name: "Business Hours", score: 100, status: "complete" as const },
    { name: "Contact Information", score: 90, status: "complete" as const },
    { name: "Attributes", score: 45, status: "incomplete" as const },
    { name: "Q&A Section", score: 30, status: "incomplete" as const },
    { name: "Posts Activity", score: 60, status: "needs_improvement" as const },
    { name: "Review Response Rate", score: 70, status: "needs_improvement" as const },
  ],
  competitors: [
    { name: "Smile Dental Clinic", score: 82, reviews: 312, rating: 4.7 },
    { name: "City Dental Care", score: 75, reviews: 248, rating: 4.5 },
    { name: "Pearl Dental Studio", score: 71, reviews: 189, rating: 4.6 },
  ],
  recommendations: [
    { priority: "high" as const, title: "Add at least 10 more photos", impact: "+8 score" },
    { priority: "high" as const, title: "Complete Q&A section with 5+ answers", impact: "+6 score" },
    { priority: "medium" as const, title: "Add all available service attributes", impact: "+4 score" },
    { priority: "medium" as const, title: "Improve business description with keywords", impact: "+3 score" },
    { priority: "low" as const, title: "Create weekly GBP posts", impact: "+2 score" },
  ],
};

// ─── Reviews Mock Data ───────────────────────────────────────────────────────

export const reviewsData = [
  {
    id: "1",
    author: "Priya Sharma",
    rating: 5,
    text: "Absolutely brilliant service! The team at this clinic made my experience stress-free. Highly recommend to everyone in the area.",
    date: new Date("2024-07-10"),
    replied: false,
    sentiment: "positive" as const,
  },
  {
    id: "2",
    author: "Rahul Mehta",
    rating: 4,
    text: "Good experience overall. The staff was friendly and professional. Waiting time was a bit long but the treatment was excellent.",
    date: new Date("2024-07-08"),
    replied: true,
    sentiment: "positive" as const,
  },
  {
    id: "3",
    author: "Anita Patel",
    rating: 3,
    text: "Average experience. The facility is clean but I expected better communication about treatment costs beforehand.",
    date: new Date("2024-07-05"),
    replied: false,
    sentiment: "neutral" as const,
  },
  {
    id: "4",
    author: "Vikram Singh",
    rating: 2,
    text: "Not satisfied with the appointment scheduling system. Had to wait 30 mins past my appointment time with no explanation.",
    date: new Date("2024-07-03"),
    replied: false,
    sentiment: "negative" as const,
  },
  {
    id: "5",
    author: "Kavita Desai",
    rating: 5,
    text: "Dr. Sharma is exceptional! Explained everything clearly and made sure I was comfortable throughout. Best dental visit I've had.",
    date: new Date("2024-07-01"),
    replied: true,
    sentiment: "positive" as const,
  },
];

export const sentimentData = [
  { month: "Jan", positive: 72, neutral: 18, negative: 10 },
  { month: "Feb", positive: 75, neutral: 15, negative: 10 },
  { month: "Mar", positive: 70, neutral: 20, negative: 10 },
  { month: "Apr", positive: 78, neutral: 15, negative: 7 },
  { month: "May", positive: 80, neutral: 14, negative: 6 },
  { month: "Jun", positive: 82, neutral: 13, negative: 5 },
  { month: "Jul", positive: 85, neutral: 11, negative: 4 },
];

// ─── CRM Leads Mock Data ─────────────────────────────────────────────────────

export type LeadStage = "new_lead" | "contacted" | "interested" | "followup" | "proposal" | "won" | "lost";

export const leadsData = [
  { id: "1", name: "Sunita Rao", business: "Rao Pharma", phone: "+91 98765 43210", source: "GBP", stage: "new_lead" as LeadStage, value: 15000, date: new Date("2024-07-12"), assignee: "Arjun" },
  { id: "2", name: "Deepak Verma", business: "Verma Electronics", phone: "+91 87654 32109", source: "WhatsApp", stage: "contacted" as LeadStage, value: 28000, date: new Date("2024-07-11"), assignee: "Priya" },
  { id: "3", name: "Meena Krishnan", business: "MK Interiors", phone: "+91 76543 21098", source: "Website", stage: "interested" as LeadStage, value: 45000, date: new Date("2024-07-10"), assignee: "Arjun" },
  { id: "4", name: "Rajan Iyer", business: "Iyer Catering", phone: "+91 65432 10987", source: "GBP", stage: "followup" as LeadStage, value: 12000, date: new Date("2024-07-09"), assignee: "Rahul" },
  { id: "5", name: "Pooja Agarwal", business: "Agarwal Jewellers", phone: "+91 54321 09876", source: "Referral", stage: "proposal" as LeadStage, value: 75000, date: new Date("2024-07-08"), assignee: "Priya" },
  { id: "6", name: "Kiran Shah", business: "Shah Builders", phone: "+91 43210 98765", source: "WhatsApp", stage: "won" as LeadStage, value: 120000, date: new Date("2024-07-05"), assignee: "Rahul" },
  { id: "7", name: "Nanda Pillai", business: "Pillai Textiles", phone: "+91 32109 87654", source: "GBP", stage: "lost" as LeadStage, value: 35000, date: new Date("2024-07-03"), assignee: "Arjun" },
  { id: "8", name: "Ashok Tiwari", business: "Tiwari Auto", phone: "+91 21098 76543", source: "Website", stage: "new_lead" as LeadStage, value: 22000, date: new Date("2024-07-12"), assignee: "Priya" },
];

// ─── WhatsApp Conversations Mock Data ────────────────────────────────────────

export const conversationsData = [
  {
    id: "0",
    contact: "Karan",
    phone: "+91 91234 56789",
    lastMessage: "Agar aap review reply post karna chahte hain, toh bas apna GBP connect karein. Main link bhejoon?",
    time: new Date(Date.now() - 10 * 60 * 1000),
    unread: 1,
    status: "lead" as const,
    messages: [
      { id: "dm1", from: "customer", text: "Hi, I want to boost my Google Business Profile!", time: new Date(Date.now() - 40 * 60 * 1000) },
      {
        id: "dm2",
        from: "ai",
        text: "Hello Business Owner 👋,\n\nWant upto 200% more calls from Google? We provide these 4 things instantly & completely FREE ⬇️\n\n1️⃣ Free SEO Audit\n2️⃣ Your Own Website (Forever Free)\n3️⃣ Free AI reply to google reviews\n4️⃣ Google Review QR Code to increase reviews\n\n🚀 Built by GBP Growth Pro, founded by IITians, who have helped 📈 3,60,000+ businesses get 50% more calls from Google!\n\nShould we start?",
        time: new Date(Date.now() - 39 * 60 * 1000)
      },
      { id: "dm3", from: "customer", text: "Let's start", time: new Date(Date.now() - 38 * 60 * 1000) },
      { id: "dm4", from: "ai", text: "Great! Let's start. To generate your free reports, do you have any active marketing subscriptions currently?", time: new Date(Date.now() - 35 * 60 * 1000) },
      { id: "dm5", from: "customer", text: "do u have any subscriptions?", time: new Date(Date.now() - 18 * 60 * 1000) },
      {
        id: "dm6",
        from: "ai",
        text: "Haan Karan, hamara Grexa Marketing AI Platform aapke business ko autopilot par grow karne mein madad karta hai.\n\nIsmein aapko ek advanced report milti hai jo aapke competitors aur ranking badhane ke exact tarike batati hai.\n\nKya aap ye report dekhna chahenge?\nhttps://booster.grexa.ai/grexa-shop/296101/",
        time: new Date(Date.now() - 17 * 60 * 1000)
      },
      {
        id: "dm7",
        from: "ai",
        text: "Karan, kya aapne platform check kiya?\n\nWahan aapko apni advanced report aur growth tools mil jayenge.\n\nAgar aap review reply post karna chahte hain, toh bas apna GBP connect karein. Main link bhejoon?",
        time: new Date(Date.now() - 10 * 60 * 1000)
      }
    ]
  },
  {
    id: "1",
    contact: "Priya Sharma",
    phone: "+91 98765 43210",
    lastMessage: "Can I book an appointment for Saturday?",
    time: new Date(Date.now() - 2 * 60 * 1000),
    unread: 2,
    status: "lead" as const,
    messages: [
      { id: "m1", from: "customer", text: "Hi, I need to book a dental appointment", time: new Date(Date.now() - 10 * 60 * 1000) },
      { id: "m2", from: "ai", text: "Hello! I'd be happy to help you book an appointment. What date works best for you?", time: new Date(Date.now() - 9 * 60 * 1000) },
      { id: "m3", from: "customer", text: "Can I book an appointment for Saturday?", time: new Date(Date.now() - 2 * 60 * 1000) },
    ],
  },
  {
    id: "2",
    contact: "Rahul Mehta",
    phone: "+91 87654 32109",
    lastMessage: "Thank you, see you at 3pm!",
    time: new Date(Date.now() - 30 * 60 * 1000),
    unread: 0,
    status: "customer" as const,
    messages: [
      { id: "m1", from: "customer", text: "Is Dr. Sharma available today?", time: new Date(Date.now() - 60 * 60 * 1000) },
      { id: "m2", from: "ai", text: "Yes! Dr. Sharma has a slot at 3:00 PM today. Shall I confirm?", time: new Date(Date.now() - 55 * 60 * 1000) },
      { id: "m3", from: "customer", text: "Thank you, see you at 3pm!", time: new Date(Date.now() - 30 * 60 * 1000) },
    ],
  },
  {
    id: "3",
    contact: "Anita Patel",
    phone: "+91 76543 21098",
    lastMessage: "What are your charges for teeth cleaning?",
    time: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unread: 1,
    status: "lead" as const,
    messages: [
      { id: "m1", from: "customer", text: "What are your charges for teeth cleaning?", time: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    ],
  },
];

// ─── Analytics Mock Data ──────────────────────────────────────────────────────

export const campaignPerformanceData = [
  { name: "Jan Festival", sent: 500, delivered: 488, opened: 310, clicked: 89 },
  { name: "Feb Offer", sent: 620, delivered: 601, opened: 390, clicked: 112 },
  { name: "Mar Review Req", sent: 380, delivered: 375, opened: 280, clicked: 145 },
  { name: "Apr Re-engage", sent: 290, delivered: 278, opened: 156, clicked: 43 },
  { name: "May Promotion", sent: 750, delivered: 730, opened: 485, clicked: 178 },
  { name: "Jun Followup", sent: 440, delivered: 432, opened: 298, clicked: 96 },
];

// ─── Pricing Plans ────────────────────────────────────────────────────────────

export const pricingPlans = [
  {
    name: "Starter",
    price: { monthly: 2999, yearly: 2399 },
    description: "Perfect for solo business owners getting started with GBP.",
    features: [
      "GBP Audit (1 location)",
      "Review monitoring & AI replies",
      "Basic keyword tracking (10 keywords)",
      "Review QR generator",
      "WhatsApp AI (500 msgs/month)",
      "CRM (up to 100 leads)",
      "Basic analytics",
      "Email support",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Growth",
    price: { monthly: 7999, yearly: 6399 },
    description: "For growing businesses that want full AI-powered automation.",
    features: [
      "GBP Audit (3 locations)",
      "Advanced review management",
      "Keyword tracking (50 keywords)",
      "Competitor analysis (5 competitors)",
      "WhatsApp AI (5,000 msgs/month)",
      "CRM (unlimited leads)",
      "Marketing automation",
      "Website builder",
      "Advanced analytics & reports",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: { monthly: 19999, yearly: 15999 },
    description: "For agencies and multi-location businesses at scale.",
    features: [
      "Unlimited GBP locations",
      "White-label reports",
      "Unlimited keyword tracking",
      "Full competitor intelligence",
      "WhatsApp AI (unlimited)",
      "CRM + pipeline automation",
      "Multi-channel marketing",
      "Custom website templates",
      "API access",
      "Dedicated account manager",
      "Custom onboarding",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const testimonials = [
  {
    name: "Dr. Ramesh Patel",
    business: "Patel Dental Clinic, Ahmedabad",
    quote: "GBP Growth Pro helped us go from 4.1 to 4.8 stars in just 3 months. Our phone calls increased by 60% after the audit.",
    rating: 5,
    industry: "Healthcare",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=256&h=256&q=80",
  },
  {
    name: "Sunita Verma",
    business: "Verma Sweets, Jaipur",
    quote: "The WhatsApp AI handles all our customer queries automatically. We saved 4 hours daily and captured 3x more leads.",
    rating: 5,
    industry: "Food & Beverage",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80",
  },
  {
    name: "Anil Krishnamurthy",
    business: "AK Motors, Bangalore",
    quote: "From position 12 to position 2 for 'car service near me' in 6 weeks. The ROI has been exceptional.",
    rating: 5,
    industry: "Automotive",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80",
  },
  {
    name: "Meena Shah",
    business: "Shah Boutique, Mumbai",
    quote: "The review QR codes at our counter have doubled our Google reviews. Customers love how easy it is.",
    rating: 4,
    industry: "Retail",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&h=256&q=80",
  },
  {
    name: "Praveen Nair",
    business: "Nair Law Associates, Kochi",
    quote: "Our website generated by GBP Growth Pro ranks on page 1. The professional look built instant trust with clients.",
    rating: 5,
    industry: "Legal",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80",
  },
  {
    name: "Lakshmi Rao",
    business: "LR Coaching Centre, Hyderabad",
    quote: "Marketing automation for our student enrollment campaigns brought 45% more inquiries than last year.",
    rating: 5,
    industry: "Education",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&h=256&q=80",
  },
];

export const industries = [
  { name: "Healthcare & Dental", icon: "🏥" },
  { name: "Restaurants & Cafes", icon: "🍽️" },
  { name: "Retail & Fashion", icon: "🛍️" },
  { name: "Automotive", icon: "🚗" },
  { name: "Real Estate", icon: "🏠" },
  { name: "Education & Coaching", icon: "📚" },
  { name: "Beauty & Wellness", icon: "💅" },
  { name: "Legal & Finance", icon: "⚖️" },
  { name: "Hotels & Hospitality", icon: "🏨" },
  { name: "Fitness & Gyms", icon: "💪" },
  { name: "Photography", icon: "📸" },
  { name: "Home Services", icon: "🔧" },
];

export const faqItems = [
  {
    q: "What is Google Business Profile (GBP) and why does it matter?",
    a: "Google Business Profile is a free tool that lets businesses manage their online presence across Google Search and Maps. An optimized GBP profile can significantly increase your local search visibility, drive more calls and visits, and help you collect and manage reviews."
  },
  {
    q: "How does the AI GBP Audit work?",
    a: "Our AI analyzes 40+ factors across your GBP profile — including completeness, review quality, keyword optimization, photo count, post frequency, and competitor comparison — to give you a score out of 100 and a prioritized action plan."
  },
  {
    q: "Is the WhatsApp AI agent connected to my actual WhatsApp?",
    a: "Yes. We integrate with WhatsApp Business API. Your AI agent handles incoming customer messages 24/7, books appointments, answers FAQs, qualifies leads, and escalates to a human when needed."
  },
  {
    q: "Can I manage multiple business locations?",
    a: "Absolutely. Growth plan supports 3 locations, Enterprise supports unlimited. You can switch between locations from the workspace switcher in the top navigation."
  },
  {
    q: "How long does it take to see results?",
    a: "Most businesses see measurable improvements in GBP visibility within 2-4 weeks after completing the audit and implementing recommendations. Review growth and lead generation typically improve within the first 30 days."
  },
  {
    q: "Do you offer a free trial?",
    a: "Yes — all plans include a 14-day free trial with full access to all features. No credit card required to start."
  },
  {
    q: "What kind of support do you provide?",
    a: "Starter plans get email support with 24-hour response. Growth plans get priority support with live chat. Enterprise plans get a dedicated account manager and phone support."
  },
];
