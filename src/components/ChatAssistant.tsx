import React, { useState } from 'react';
import { faqs } from '../data/mockNemsData';
import { X, Send, Bot, HelpCircle, Sparkles } from 'lucide-react';

interface ChatAssistantProps {
  onOpenGuide: () => void;
  onOpenGlossary: () => void;
}

interface Message {
  sender: 'bot' | 'user';
  text: string;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({
  onOpenGuide,
  onOpenGlossary,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Hello! I am the EMC Market Helper. How can I assist you with NEMS electricity prices, demand forecasts, or data downloads today?',
    },
  ]);

  const handleSend = (textToSend?: string) => {
    const q = (textToSend || inputVal).trim();
    if (!q) return;

    const newMsgs: Message[] = [...messages, { sender: 'user', text: q }];
    setMessages(newMsgs);
    if (!textToSend) setInputVal('');

    // Instant smart response based on domain knowledge
    setTimeout(() => {
      let reply = '';
      const lower = q.toLowerCase();

      if (lower.includes('usep') || lower.includes('price')) {
        reply =
          'USEP (Uniform Singapore Energy Price) is the uniform market clearing price cleared every 30 minutes by the Market Clearing Engine (MCE). In Period 25 (12:00-12:30), USEP is currently $145.85/MWh.';
      } else if (lower.includes('demand')) {
        reply =
          'System electricity demand is currently 6,740 MW. Daily peak demand typically reaches around 7,500-7,600 MW during late afternoon and early evening hours.';
      } else if (lower.includes('solar')) {
        reply =
          'Solar generation is currently peaking at 1,507 MW under peak midday irradiance. This midday solar generation reduces the need for peaking fossil fuel generators.';
      } else if (lower.includes('vcp') || lower.includes('vesting')) {
        reply =
          'VCP (Vesting Contract Price) is set quarterly by the Energy Market Authority (EMA) as a reference benchmark, currently at $225.90/MWh.';
      } else if (lower.includes('download') || lower.includes('csv') || lower.includes('d+6')) {
        reply =
          'You can download official 31-day batches in CSV format in the "Market Data Download" section below. Final preliminary settlement is released at D + 6 business days.';
      } else {
        reply =
          'For detailed tariff clearing and market design, you can check our "Guide To Prices" or search our comprehensive "Market Glossary". You can also email the Market Operations team directly.';
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
    }, 400);
  };

  if (isDismissed) {
    return (
      <button
        onClick={() => setIsDismissed(false)}
        className="fixed bottom-6 right-6 z-40 bg-[#0055b8] text-white p-3 rounded-full shadow-lg hover:bg-blue-800 transition-all cursor-pointer"
        title="Open Market Helper"
        aria-label="Open Market Helper"
      >
        <Bot className="w-5 h-5" />
      </button>
    );
  }

  return (
    <>
      {/* Floating Pill Widget Matching Screenshot */}
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center shadow-lg rounded-full bg-white border border-gray-200 pl-4 pr-1 py-1 cursor-pointer hover:shadow-xl transition-shadow select-none"
          data-purpose="chat-assistant"
        >
          <div className="relative flex items-center mr-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsDismissed(true);
              }}
              className="absolute -top-3 -left-3 text-gray-400 hover:text-gray-600 bg-white rounded-full p-0.5 border border-gray-200 shadow-xs cursor-pointer"
              title="Close"
              aria-label="Dismiss chat widget"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-semibold text-gray-700">May I help you?</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-200">
            <svg
              className="w-6 h-6 text-[#0055b8]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.942A4.5 4.5 0 0115.908 17H8.092a4.5 4.5 0 01-2.322-.642L5 15.3M19.8 15.3A2.25 2.25 0 0021 13.37v-1.12c0-.986-.642-1.854-1.574-2.146M5 14.5A2.25 2.25 0 013 12.57v-1.12c0-.986.642-1.854 1.574-2.146"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Expanded Interactive Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-300 overflow-hidden flex flex-col max-h-[520px] animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-[#0055b8] text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight">EMC Market Assistant</h4>
                <p className="text-[10px] text-blue-100">National Electricity Market Support</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Minimize"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick FAQ Prompts */}
          <div className="p-2.5 bg-gray-50 border-b border-gray-200 overflow-x-auto whitespace-nowrap space-x-1.5 text-[11px] no-scrollbar">
            <button
              onClick={() => handleSend('What is USEP?')}
              className="inline-block px-2.5 py-1 bg-white border border-gray-200 rounded text-gray-700 hover:border-[#0055b8] hover:text-[#0055b8] transition-colors cursor-pointer"
            >
              What is USEP?
            </button>
            <button
              onClick={() => handleSend('How does solar affect prices?')}
              className="inline-block px-2.5 py-1 bg-white border border-gray-200 rounded text-gray-700 hover:border-[#0055b8] hover:text-[#0055b8] transition-colors cursor-pointer"
            >
              Solar impact
            </button>
            <button
              onClick={() => handleSend('What is D+6 settlement?')}
              className="inline-block px-2.5 py-1 bg-white border border-gray-200 rounded text-gray-700 hover:border-[#0055b8] hover:text-[#0055b8] transition-colors cursor-pointer"
            >
              D + 6 timing
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2.5 max-h-64 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-2.5 rounded-lg max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#0055b8] text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Guides Bar */}
          <div className="px-3 py-1.5 bg-blue-50/70 border-t border-gray-100 flex items-center justify-between text-[11px] text-[#0055b8]">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenGuide();
              }}
              className="hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              <HelpCircle className="w-3 h-3" />
              Guide To Prices
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenGlossary();
              }}
              className="hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              <Sparkles className="w-3 h-3" />
              Market Glossary
            </button>
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2 border-t border-gray-200 flex items-center gap-1.5 bg-white"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask about NEMS prices or demand..."
              className="flex-1 text-xs text-gray-800 px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0055b8]"
            />
            <button
              type="submit"
              className="p-1.5 bg-[#0055b8] hover:bg-blue-800 text-white rounded transition-colors cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
