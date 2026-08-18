"use client";
import { useState, useEffect } from "react";
import { MessageSquare, CheckCircle2, Copy, RefreshCw, Smartphone, Key, Settings, AlertCircle } from "lucide-react";

export default function ConnectionPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showWebhook, setShowWebhook] = useState(false);

  const webhookUrl = "https://api.gbpgrowthpro.com/webhooks/whatsapp/v1";
  const webhookVerifyToken = "gbp_wa_v1_8f92jks0";
  const [phoneNumberId, setPhoneNumberId] = useState("");
  const [metaBusinessId, setMetaBusinessId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  
  useEffect(() => {
    fetch('/api/whatsapp/accounts')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0 && data[0].isActive) {
          setIsConnected(true);
        }
      })
      .catch(console.error);
  }, []);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const response = await fetch('/api/whatsapp/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumberId,
          metaBusinessId,
          metaBusinessName: "My Business",
          accessToken
        })
      });

      if (response.ok) {
        setIsConnected(true);
      } else {
        alert("Failed to connect account.");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting.");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await fetch('/api/whatsapp/accounts/mock-wa-1', { method: 'DELETE' });
    } catch (e) {
      console.error(e);
    }
    setIsConnected(false);
    setShowWebhook(false);
  };

  return (
    <div className="space-y-6 animate-fade-in p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-[#0f172a]">WhatsApp API Connection</h1>
        <p className="text-muted-foreground text-sm">
          Connect your Official WhatsApp Business account to enable AI chatbots, broadcasts, and automations.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Connection Status Card */}
        <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-8 shadow-sm">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${isConnected ? "bg-[#10b981]/10" : "bg-[#f1f5f9]"}`}>
                <MessageSquare className={`w-7 h-7 ${isConnected ? "text-[#10b981]" : "text-[#94a3b8]"}`} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0f172a]">WhatsApp Business API</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-[#10b981]" : "bg-[#94a3b8]"}`} />
                  <span className="text-sm font-medium text-[#64748b]">
                    {isConnected ? "Connected & Verified" : "Not Connected"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {!isConnected ? (
            <div className="space-y-4">
              <p className="text-sm text-[#475569] leading-relaxed">
                Unlock the power of conversational commerce. Enter your Meta App credentials below.
              </p>
              
              <div>
                <label className="text-xs font-semibold text-[#475569] mb-1.5 block">Phone Number ID</label>
                <input 
                  type="text" 
                  value={phoneNumberId} 
                  onChange={e => setPhoneNumberId(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#e2e8f0] focus:outline-none focus:border-[#2563eb]"
                  placeholder="e.g. 10123456789"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#475569] mb-1.5 block">Meta Business ID</label>
                <input 
                  type="text" 
                  value={metaBusinessId} 
                  onChange={e => setMetaBusinessId(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#e2e8f0] focus:outline-none focus:border-[#2563eb]"
                  placeholder="e.g. 20123456789"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#475569] mb-1.5 block">System User Access Token</label>
                <input 
                  type="password" 
                  value={accessToken} 
                  onChange={e => setAccessToken(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#e2e8f0] focus:outline-none focus:border-[#2563eb]"
                  placeholder="EAAL..."
                />
              </div>

              <button
                onClick={handleConnect}
                disabled={isConnecting || !phoneNumberId || !accessToken}
                className="w-full flex items-center justify-center gap-2 bg-[#2563eb] text-white px-6 py-3.5 rounded-xl font-bold hover:bg-[#1d4ed8] transition-colors disabled:opacity-70 mt-4"
              >
                {isConnecting ? (
                  <><RefreshCw className="w-5 h-5 animate-spin" /> Saving Credentials...</>
                ) : (
                  <><MessageSquare className="w-5 h-5" /> Connect Account</>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-4">
                  <p className="text-xs text-[#64748b] mb-1 font-medium">Business Name</p>
                  <p className="text-sm font-bold text-[#0f172a]">Sharma Dental Clinic</p>
                </div>
                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-4">
                  <p className="text-xs text-[#64748b] mb-1 font-medium">Phone Number</p>
                  <p className="text-sm font-bold text-[#0f172a]">+1 (555) 123-4567</p>
                </div>
                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-4">
                  <p className="text-xs text-[#64748b] mb-1 font-medium">Quality Rating</p>
                  <p className="text-sm font-bold text-[#10b981]">High (Green)</p>
                </div>
                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-4">
                  <p className="text-xs text-[#64748b] mb-1 font-medium">Messaging Limit</p>
                  <p className="text-sm font-bold text-[#0f172a]">Tier 1 (1k/day)</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowWebhook(!showWebhook)}
                  className="flex-1 bg-[#ffffff] border border-[#e2e8f0] text-[#0f172a] px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#f8fafc] transition-colors"
                >
                  Webhook Configuration
                </button>
                <button
                  onClick={handleDisconnect}
                  className="bg-[#ef4444]/10 text-[#ef4444] px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#ef4444]/20 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Setup Guide / Webhook Panel */}
        <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-8 shadow-sm">
          {!showWebhook ? (
            <div>
              <h3 className="font-semibold text-[#0f172a] mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#2563eb]" /> Connection Steps
              </h3>
              
              <div className="space-y-6">
                {[
                  { icon: Smartphone, title: "1. Prepare Phone Number", desc: "Ensure you have a clean phone number that is able to receive SMS or calls for verification." },
                  { icon: Key, title: "2. Authenticate with Meta", desc: "Log in with your Facebook account and select your Meta Business Manager." },
                  { icon: CheckCircle2, title: "3. Verify & Connect", desc: "Verify your number via the PIN code sent by Meta. Your account will then be linked." }
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#f1f5f9] flex items-center justify-center shrink-0">
                      <step.icon className="w-5 h-5 text-[#475569]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0f172a] mb-1">{step.title}</p>
                      <p className="text-sm text-[#64748b]">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-fade-in">
              <h3 className="font-semibold text-[#0f172a] mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#2563eb]" /> Webhook Configuration
              </h3>
              <p className="text-sm text-[#475569] mb-6 leading-relaxed">
                If you created a custom Meta App, configure the WhatsApp webhook in your App Dashboard using the details below. (If you used the Embedded Signup flow, this is handled automatically).
              </p>

              <div className="space-y-5">
                <div>
                  <label className="text-xs font-semibold text-[#475569] mb-1.5 block">Callback URL</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      readOnly
                      value={webhookUrl}
                      className="w-full px-4 py-2.5 text-sm rounded-l-xl border border-[#e2e8f0] bg-[#f8fafc] text-[#0f172a]"
                    />
                    <button className="bg-[#2563eb] text-white px-4 py-2.5 rounded-r-xl border border-[#2563eb] hover:bg-[#1d4ed8] transition-colors">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#475569] mb-1.5 block">Verify Token</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      readOnly
                      value={webhookVerifyToken}
                      className="w-full px-4 py-2.5 text-sm rounded-l-xl border border-[#e2e8f0] bg-[#f8fafc] text-[#0f172a]"
                    />
                    <button className="bg-[#2563eb] text-white px-4 py-2.5 rounded-r-xl border border-[#2563eb] hover:bg-[#1d4ed8] transition-colors">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-3 mt-4">
                  <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-yellow-800">Required Subscriptions</p>
                    <p className="text-xs text-yellow-700 mt-1">Make sure to subscribe to the <strong>messages</strong> and <strong>message_template_status_update</strong> webhook fields in your Meta App.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
