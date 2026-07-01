"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Send, Smile, Paperclip, Mic, Search, MoreVertical, Phone, Video, CheckCheck, MapPin, ExternalLink, QrCode, Globe, Check } from "lucide-react";
import MockWebsitePreview from "./MockWebsitePreview";

interface Message {
  id: string;
  from: "user" | "bot";
  text?: string;
  type?: "text" | "map" | "audit" | "website" | "qr" | "loading";
  time: string;
  buttons?: string[];
  meta?: any;
}

export default function WhatsAppSimulator({ isCompact = false }: { isCompact?: boolean }) {
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(0); // Onboarding step state
  const [businessName, setBusinessName] = useState("");
  const [isWebsiteOpen, setIsWebsiteOpen] = useState(false);
  const [loadingStepText, setLoadingStepText] = useState("");

  const formatTime = () => {
    const d = new Date();
    let hours = d.getHours();
    const minutes = d.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  };

  // Initial message load
  useEffect(() => {
    const time = formatTime();
    setMessages([
      {
        id: "msg-0",
        from: "user",
        text: "Hi, I want to boost my Google Business Profile!",
        time: time,
      },
      {
        id: "msg-1",
        from: "bot",
        text: `Hello Business Owner 👋,\n\nWant upto 200% more calls from Google? We provide these 4 things instantly & completely FREE ⬇️\n\n1️⃣ Free SEO Audit\n2️⃣ Your Own Website (Forever Free)\n3️⃣ Free AI reply to google reviews\n4️⃣ Google Review QR Code to increase reviews\n\n🚀 Built by GBP Growth Pro, founded by IITians, who have helped 📈 3,60,000+ businesses get 50% more calls from Google!\n\nShould we start?`,
        time: time,
        buttons: ["Let's start", "Shuru karte hain"],
      }
    ]);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const addMessage = (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  };

  // Process Bot Responses based on current step
  const triggerBotResponse = (userText: string, currentStep: number) => {
    setIsTyping(true);
    const time = formatTime();

    if (currentStep === 0) {
      // User clicked "Let's start" or "Shuru karte hain"
      setTimeout(() => {
        setIsTyping(false);
        addMessage({
          id: `bot-${Date.now()}`,
          from: "bot",
          text: `Awesome! Let's get started. 🚀\n\nPlease type your **Business Name** exactly as it appears on Google.\n\n*(Or click one of these popular options to test immediately!)*`,
          time: formatTime(),
          buttons: ["Sharma Dental Clinic", "Verma Bakery", "Goel Law Chambers"],
        });
        setStep(1);
      }, 1000);

    } else if (currentStep === 1) {
      // User typed or clicked a business name
      setBusinessName(userText);
      setTimeout(() => {
        setIsTyping(false);
        addMessage({
          id: `bot-${Date.now()}`,
          from: "bot",
          type: "map",
          text: `Searching Google Maps... 🔍\n\nI found a matching profile on Google Maps. Is this your business?`,
          time: formatTime(),
          meta: { name: userText, address: "123 Main St, Sector 15, Gurgaon, Haryana 122001" },
          buttons: ["Yes, this is mine", "No, search again"],
        });
        setStep(2);
      }, 1200);

    } else if (currentStep === 2) {
      // User confirmed location "Yes, this is mine"
      if (userText.toLowerCase().includes("yes")) {
        // Run audit loader sequence
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-load-${Date.now()}`,
            from: "bot",
            type: "loading",
            time: formatTime(),
          }
        ]);

        const runAuditSteps = async () => {
          const delays = [800, 1500, 2200];
          const messagesText = [
            "⚙️ Analyzing profile completeness...",
            "⚙️ Checking review response rates...",
            "⚙️ Fetching keyword visibility trends..."
          ];

          for (let i = 0; i < messagesText.length; i++) {
            await new Promise((resolve) => {
              setTimeout(() => {
                setLoadingStepText(messagesText[i]);
                resolve(null);
              }, 700);
            });
          }

          // Remove loading message and add final audit card
          setMessages((prev) => prev.filter(m => m.type !== "loading"));
          setIsTyping(false);
          addMessage({
            id: `bot-audit-${Date.now()}`,
            from: "bot",
            type: "audit",
            time: formatTime(),
            buttons: ["Yes, create website!", "Tell me more"],
          });
          setStep(3);
        };

        runAuditSteps();
      } else {
        setTimeout(() => {
          setIsTyping(false);
          addMessage({
            id: `bot-${Date.now()}`,
            from: "bot",
            text: "No worries! Please type the correct name of your business and I'll search again.",
            time: formatTime(),
          });
          setStep(1);
        }, 1000);
      }

    } else if (currentStep === 3) {
      // User clicked "Yes, create website!"
      setTimeout(() => {
        addMessage({
          id: `bot-build-${Date.now()}`,
          from: "bot",
          text: "Generating your SEO-optimized website... 🛠️",
          time: formatTime(),
        });
        
        setTimeout(() => {
          setIsTyping(false);
          const name = businessName || "Sharma Dental Clinic";
          const subdomain = name.toLowerCase().replace(/[^a-z0-9]/g, "") || "mybusiness";
          addMessage({
            id: `bot-web-${Date.now()}`,
            from: "bot",
            type: "website",
            text: `Done! Your brand new, forever-free website is live! 🎉\n\n👉 **${subdomain}.gbpgrowthpro.com** (Click to preview website)\n\nIt includes:\n✅ Dynamic reviews synced from Google\n✅ Custom booking widget\n✅ Local keywords optimized automatically\n✅ Sleek mobile-responsive design\n\nNow, let's generate your custom review collection QR code and set up AI replies.`,
            time: formatTime(),
            meta: { subdomain },
            buttons: ["Yes, set up reviews & QR", "Preview Website"],
          });
          setStep(4);
        }, 1500);
      }, 500);

    } else if (currentStep === 4) {
      // User clicked "Yes, set up reviews & QR" or "Preview Website"
      if (userText === "Preview Website") {
        setIsTyping(false);
        setIsWebsiteOpen(true);
        // Keep step at 4, but show helpful prompt
        addMessage({
          id: `bot-${Date.now()}`,
          from: "bot",
          text: "I've opened the website preview. Once you review it, click 'Yes, set up reviews & QR' to generate your custom QR code!",
          time: formatTime(),
          buttons: ["Yes, set up reviews & QR"],
        });
      } else {
        setTimeout(() => {
          setIsTyping(false);
          addMessage({
            id: `bot-qr-${Date.now()}`,
            from: "bot",
            type: "qr",
            time: formatTime(),
            buttons: ["Go to Dashboard", "Connect to Expert"],
          });
          setStep(5);
        }, 1500);
      }
    } else if (currentStep === 5) {
      // Redirect or talk to expert
      if (userText === "Go to Dashboard") {
        setTimeout(() => {
          setIsTyping(false);
          addMessage({
            id: `bot-redirect-${Date.now()}`,
            from: "bot",
            text: "Redirecting you to your business dashboard... 🚀",
            time: formatTime(),
          });
          setTimeout(() => {
            router.push("/dashboard");
          }, 1000);
        }, 800);
      } else {
        setTimeout(() => {
          setIsTyping(false);
          addMessage({
            id: `bot-expert-${Date.now()}`,
            from: "bot",
            text: "Connecting you to our team expert. Please click here to open a direct WhatsApp chat:\nhttps://wa.me/911234567890?text=Hi!%20I%20have%20completed%20the%20onboarding%20demo%20and%20want%20to%20speak%20to%20a%20human%20expert.",
            time: formatTime(),
            buttons: ["Go to Dashboard"],
          });
        }, 800);
      }
    }
  };

  const handleSendText = (text: string) => {
    if (!text.trim()) return;

    const time = formatTime();
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      from: "user",
      text: text,
      time: time,
    };

    addMessage(userMessage);
    setInput("");

    // Trigger AI typing
    triggerBotResponse(text, step);
  };

  const handleButtonClick = (buttonText: string) => {
    // Treat button click as user sending that text
    handleSendText(buttonText);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendText(input);
    }
  };

  return (
    <div className={`flex flex-col bg-[#0b141a] text-[#e9edef] rounded-2xl overflow-hidden border border-[#222d34] shadow-2xl h-full animate-fade-in`}>
      {/* ─── WHATSAPP HEADER ─── */}
      <div className="bg-[#202c33] px-4 py-3 flex items-center justify-between border-b border-[#2a3942] shrink-0">
        <div className="flex items-center gap-3">
          {/* Mock avatar */}
          <div className="w-10 h-10 rounded-full bg-[#00a884] flex items-center justify-center text-white font-extrabold text-sm shadow-md select-none">
            G
          </div>
          <div>
            <h4 className="font-semibold text-sm text-[#e9edef]">Grexa AI GBP Booster</h4>
            <p className="text-[11px] text-[#8696a0] hover:underline cursor-pointer">click here for contact info</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[#aebac1]">
          <Phone className="w-4 h-4 cursor-pointer hover:text-[#e9edef] transition-colors" />
          <Search className="w-4 h-4 cursor-pointer hover:text-[#e9edef] transition-colors" />
          <MoreVertical className="w-4 h-4 cursor-pointer hover:text-[#e9edef] transition-colors" />
        </div>
      </div>

      {/* ─── MESSAGES CONTAINER WITH DOODLE STYLE BACKGROUND ─── */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-3 relative"
        style={{
          backgroundColor: "#0b141a",
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "20px 20px"
        }}
      >
        {/* Date badge */}
        <div className="flex justify-center my-2">
          <span className="text-[10px] bg-[#182229] px-3 py-1.5 rounded-lg text-[#8696a0] font-medium uppercase select-none">
            Today
          </span>
        </div>

        {messages.map((msg) => {
          const isUser = msg.from === "user";

          return (
            <div key={msg.id} className={`flex flex-col ${isUser ? "items-end" : "items-start"} space-y-1.5`}>
              {/* Message bubble */}
              <div
                className={`max-w-[85%] rounded-lg px-3.5 py-2 shadow-md relative group flex flex-col ${
                  isUser
                    ? "bg-[#005c4b] text-[#e9edef] rounded-tr-none"
                    : "bg-[#202c33] text-[#e9edef] rounded-tl-none border border-[#2a3942]"
                }`}
              >
                {/* Custom Content rendering */}
                {msg.type === "map" ? (
                  <div className="space-y-3">
                    <p className="text-xs leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    
                    {/* Mock map widget */}
                    <div className="border border-[#2a3942] rounded-lg overflow-hidden bg-[#182229] p-3 flex gap-3 items-center">
                      <div className="w-10 h-10 rounded bg-[#00a884]/20 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-[#00a884]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-white truncate">{msg.meta.name}</p>
                        <p className="text-[10px] text-[#8696a0] truncate mt-0.5">{msg.meta.address}</p>
                      </div>
                    </div>
                  </div>
                ) : msg.type === "audit" ? (
                  <div className="space-y-3 w-72">
                    <div className="flex items-center justify-between pb-2 border-b border-[#2a3942]">
                      <span className="font-bold text-xs text-white">Google Profile Audit</span>
                      <span className="text-[10px] bg-[#ef4444]/20 text-[#ef4444] font-semibold px-2 py-0.5 rounded">
                        Action Required
                      </span>
                    </div>

                    <div className="flex items-center gap-4 py-1">
                      <div className="relative w-14 h-14 shrink-0 flex items-center justify-center rounded-full bg-[#182229] border-2 border-dashed border-[#f59e0b]">
                        <span className="text-sm font-extrabold text-[#f59e0b]">72%</span>
                      </div>
                      <div>
                        <p className="text-[11px] text-[#8696a0]">Sharma Dental Clinic</p>
                        <p className="text-xs font-bold text-white mt-0.5">Critical issues found: 3</p>
                      </div>
                    </div>

                    <div className="space-y-2 text-[11px] text-[#e9edef] bg-[#182229] p-2.5 rounded-lg border border-[#2a3942]">
                      <div className="flex gap-2">
                        <span className="text-[#ef4444]">⚠️</span>
                        <span>**Missing Website URL**: Business has no website listed on Google.</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-[#ef4444]">⚠️</span>
                        <span>**Low Response Rate (24%)**: Customers are waiting for replies.</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-[#f59e0b]">⚠️</span>
                        <span>**Keywords Weak**: Lacks local ranking keywords.</span>
                      </div>
                    </div>

                    <p className="text-xs leading-relaxed text-white font-medium">
                      Let's fix these instantly! Shall we generate your free website and activate review autopilots?
                    </p>
                  </div>
                ) : msg.type === "website" ? (
                  <div className="space-y-3 w-72">
                    <p className="text-xs leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    
                    {/* Website mock link preview */}
                    <div className="border border-[#2a3942] rounded-lg overflow-hidden bg-[#182229]">
                      <div className="bg-[#2a3942] p-2 flex items-center justify-between text-[10px] text-[#8696a0]">
                        <span>Mock Browser Link</span>
                        <Globe className="w-3.5 h-3.5 text-[#00a884]" />
                      </div>
                      <div className="p-3">
                        <p className="text-xs font-bold text-white truncate">{businessName || "Sharma Dental Clinic"}</p>
                        <p className="text-[10px] text-[#00a884] font-medium mt-0.5 truncate">
                          {msg.meta.subdomain}.gbpgrowthpro.com
                        </p>
                        <button
                          onClick={() => setIsWebsiteOpen(true)}
                          className="mt-3 w-full bg-[#00a884] hover:bg-[#018669] text-white py-1.5 rounded text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                        >
                          Preview Website
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : msg.type === "qr" ? (
                  <div className="space-y-3 w-72">
                    <p className="text-xs leading-relaxed">Here is your custom Google Review QR Code! When customers scan this, they will be taken straight to write a review.</p>
                    
                    {/* Custom QR Code Card */}
                    <div className="border border-[#2a3942] rounded-lg bg-[#182229] p-4 flex flex-col items-center justify-center text-center">
                      <div className="p-3 bg-white rounded-lg shadow-sm">
                        <QrCode className="w-28 h-28 text-black" />
                      </div>
                      <p className="text-[10px] text-[#8696a0] mt-3 uppercase font-semibold">Scan to review</p>
                      <p className="text-xs font-bold text-white mt-1">{businessName || "Sharma Dental Clinic"}</p>
                    </div>

                    <div className="bg-[#182229] p-3 rounded-lg border border-[#2a3942] text-[11px] space-y-2">
                      <p className="font-bold text-white flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00a884]" /> AI Reply Autopilot
                      </p>
                      <div className="text-xs text-[#8696a0] border-l-2 border-[#00a884] pl-2 leading-relaxed">
                        <span className="font-bold text-white block">Review from Amit:</span>
                        "Great experience! Dr. Sharma was very gentle."
                        <span className="font-bold text-white block mt-1">AI Auto-Reply:</span>
                        "Thank you Amit for your wonderful review! We are committed to providing gentle, high-quality care."
                      </div>
                    </div>
                  </div>
                ) : msg.type === "loading" ? (
                  <div className="flex flex-col space-y-2 w-60 py-1">
                    <div className="flex items-center gap-2 text-xs text-[#8696a0]">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#00a884] animate-ping" />
                      <span>{loadingStepText || "Initiating Business Scan..."}</span>
                    </div>
                    <div className="w-full bg-[#182229] h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-[#00a884] rounded-full animate-pulse-glow" style={{ width: "60%" }} />
                    </div>
                  </div>
                ) : (
                  <p className="text-xs leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                )}

                {/* Bubble Timestamp */}
                <div className="flex justify-end items-center gap-1 mt-1 text-[9px] text-[#8696a0] select-none self-end">
                  <span>{msg.time}</span>
                  {isUser && <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />}
                </div>
              </div>

              {/* Quick reply buttons (WhatsApp message-level action options) */}
              {!isUser && msg.buttons && msg.buttons.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1 max-w-[85%]">
                  {msg.buttons.map((b) => (
                    <button
                      key={b}
                      onClick={() => handleButtonClick(b)}
                      className="text-xs bg-[#202c33] border border-[#2a3942] text-[#00a884] font-semibold px-4 py-2 rounded-lg hover:bg-[#2a3942] transition-colors cursor-pointer"
                    >
                      {b}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* AI Typing Indicator */}
        {isTyping && (
          <div className="flex items-start gap-2 animate-pulse">
            <div className="bg-[#202c33] border border-[#2a3942] rounded-lg px-4 py-2 rounded-tl-none">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-[#8696a0] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-[#8696a0] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-[#8696a0] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ─── CHAT COMPOSER BAR ─── */}
      <div className="bg-[#202c33] px-3 py-2 flex items-center gap-3 border-t border-[#2a3942] shrink-0">
        <div className="flex items-center gap-2.5 text-[#aebac1]">
          <Smile className="w-5 h-5 cursor-pointer hover:text-[#e9edef] transition-colors" />
          <Paperclip className="w-5 h-5 cursor-pointer hover:text-[#e9edef] transition-colors" />
        </div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message"
          className="flex-1 bg-[#2a3942] border-0 text-sm text-[#e9edef] placeholder-[#8696a0] rounded-lg px-3 py-2.5 focus:outline-none focus:ring-0 focus:shadow-none"
        />
        {input.trim() ? (
          <button
            onClick={() => handleSendText(input)}
            className="w-9 h-9 bg-[#00a884] rounded-full flex items-center justify-center text-white hover:bg-[#008f70] transition-colors shrink-0 cursor-pointer"
          >
            <Send className="w-4.5 h-4.5" />
          </button>
        ) : (
          <Mic className="w-5 h-5 text-[#aebac1] cursor-pointer hover:text-[#e9edef] transition-colors" />
        )}
      </div>

      {/* ─── WEB PREVIEW MODAL ─── */}
      <MockWebsitePreview
        businessName={businessName}
        isOpen={isWebsiteOpen}
        onClose={() => setIsWebsiteOpen(false)}
      />
    </div>
  );
}
