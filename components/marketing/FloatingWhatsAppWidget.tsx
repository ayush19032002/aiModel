"use client";
import { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import WhatsAppSimulator from "../shared/WhatsAppSimulator";

export default function FloatingWhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [unread, setUnread] = useState(true);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    setUnread(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Simulation Chat Box */}
      {isOpen && (
        <div className="w-[360px] sm:w-[380px] h-[550px] bg-[#0b141a] border border-[#222d34] shadow-2xl rounded-2xl overflow-hidden mb-4 animate-fade-in flex flex-col relative">
          
          {/* Close button absolute wrapper for quick exit */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-14 z-20 text-[#8696a0] hover:text-white p-1 hover:bg-[#2a3942] rounded-lg transition-colors"
            title="Minimize Chat"
          >
            <X className="w-4.5 h-4.5" />
          </button>

          <div className="flex-1 min-h-0">
            <WhatsAppSimulator isCompact={true} />
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={handleOpen}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-white cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 relative ${
          isOpen ? "bg-[#ef4444] hover:bg-[#dc2626]" : "bg-[#00a884] hover:bg-[#008f70] hover:scale-105"
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative">
            <svg
              className="w-7 h-7 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45 5.58-.003 10.118-4.542 10.12-10.125.002-2.702-1.047-5.245-2.954-7.155C16.637 1.413 14.097.361 11.4.36 5.816.362 1.278 4.905 1.276 10.49c-.001 1.702.463 3.364 1.34 4.819L1.62 20.91l5.027-1.756z" />
            </svg>
            {unread && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#ef4444] border-2 border-[#00a884] rounded-full animate-bounce" />
            )}
          </div>
        )}
      </button>
      
      {/* Tooltip hint */}
      {!isOpen && unread && (
        <div className="absolute right-16 bottom-3 bg-[#202c33] text-white text-xs px-3 py-1.5 rounded-lg border border-[#2a3942] shadow-md select-none pointer-events-none whitespace-nowrap animate-fade-in font-medium">
          Try Grexa-style Audit! 🚀
        </div>
      )}
    </div>
  );
}
