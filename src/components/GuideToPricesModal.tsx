import React from 'react';
import { X, HelpCircle, BookOpen, Layers, BarChart2, ShieldAlert } from 'lucide-react';

interface GuideToPricesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideToPricesModal: React.FC<GuideToPricesModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#0055b8]" />
            <h3 className="text-base font-bold text-gray-900">Guide to NEMS Price Determination</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 max-h-[70vh] overflow-y-auto space-y-6 text-xs text-gray-700 leading-relaxed">
          {/* Section 1 */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-[#0055b8] flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-[#0055b8]" />
              1. What is the Uniform Singapore Energy Price (USEP)?
            </h4>
            <p>
              The <strong>Uniform Singapore Energy Price (USEP)</strong> is the uniform wholesale price
              paid by electricity retailers and contestable wholesale consumers for energy purchased in the
              National Electricity Market of Singapore (NEMS).
            </p>
            <p>
              Every 30 minutes, the <strong>Market Clearing Engine (MCE)</strong> operated by EMC co-optimizes
              energy dispatch, regulation, and reserve clearance to meet Singapore's electricity demand at
              the lowest total system cost, subject to power transmission security constraints.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-2 bg-blue-50/50 p-3.5 rounded border border-blue-100">
            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#0055b8]" />
              2. Nodal Marginal Pricing & Transmission Loss Factors (TLF)
            </h4>
            <p>
              Singapore's transmission system is divided into nodal injection and withdrawal points. The
              MCE solves for the marginal cost of supplying one additional megawatt-hour (MWh) of electricity
              at each node:
            </p>
            <div className="bg-white p-2.5 rounded font-mono text-[11px] text-gray-800 border border-gray-200">
              USEP = Σ (Nodal Price_i × Withdrawal Quantity_i) / Total Withdrawal
            </div>
            <p className="text-[11px] text-gray-600">
              Generators are paid their respective nodal marginal price (NMP), reflecting their transmission
              loss factor (TLF) relative to the reference node (Jurong 400kV substation).
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-[#0055b8] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#0055b8]" />
              3. The 48 Half-Hour Settlement Periods
            </h4>
            <p>
              A NEMS trading day begins at 00:00:00 SGT and concludes at 24:00:00 SGT, structured into
              48 discrete half-hour settlement periods:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li><strong>Period 1:</strong> 00:00 – 00:30 (Early morning off-peak)</li>
              <li><strong>Period 24:</strong> 11:30 – 12:00 (Pre-noon industrial ramp)</li>
              <li><strong>Period 25:</strong> 12:00 – 12:30 (Solar peak generation window)</li>
              <li><strong>Period 37:</strong> 18:00 – 18:30 (Evening commercial peak)</li>
              <li><strong>Period 48:</strong> 23:30 – 24:00 (End of trading day)</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-[#0055b8] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#0055b8]" />
              4. Price Safeguards & Temporary Price Cap (TPC)
            </h4>
            <p>
              To protect market participants from extreme unhedged volatility caused by global gas disruptions,
              the Energy Market Authority (EMA) implemented the <strong>Temporary Price Cap (TPC)</strong>.
              When triggered, wholesale prices cannot exceed the combined long-run marginal cost (LRMC) of
              peaking gas generation.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#0055b8] hover:bg-blue-800 text-white rounded font-medium text-xs transition-colors cursor-pointer"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
