import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Send, Check } from 'lucide-react';

interface MarketOperationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MarketOperationsModal: React.FC<MarketOperationsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [subject, setSubject] = useState('Data Download Enquiry');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#0055b8]" />
            <h3 className="text-base font-bold text-gray-900">Contact Market Operations Team</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-blue-50/60 rounded border border-blue-100 text-gray-700">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#0055b8] shrink-0" />
              <span>marketoperations@emcsg.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#0055b8] shrink-0" />
              <span>+65 6779 3000 (Market Helpdesk)</span>
            </div>
            <div className="flex items-center gap-2 sm:col-span-2 text-[11px] text-gray-500">
              <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span>2 Shenton Way, SGX Centre 1, Singapore 068804</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Enquiry Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full text-xs text-gray-700 bg-white border border-gray-300 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#0055b8]"
              >
                <option>Data Download Enquiry</option>
                <option>Historical Settlement API Access</option>
                <option>Nodal Marginal Pricing Question</option>
                <option>Vesting Contract Reference Verification</option>
                <option>General Operational Query</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Your Corporate Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full text-xs text-gray-700 bg-white border border-gray-300 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#0055b8]"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Message</label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your market data enquiry or date range requirement..."
                className="w-full text-xs text-gray-700 bg-white border border-gray-300 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#0055b8]"
              ></textarea>
            </div>

            <div className="pt-1 flex items-center justify-between">
              <span className="text-[11px] text-gray-500">
                Operating Hours: Mon - Fri, 08:30 - 17:30 SGT
              </span>
              <button
                type="submit"
                disabled={sent}
                className="flex items-center gap-1.5 bg-[#0055b8] hover:bg-blue-800 text-white font-semibold text-xs px-4 py-2 rounded transition-colors cursor-pointer"
              >
                {sent ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
