import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xl overflow-hidden border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-bold text-gray-900">Regulatory Disclaimer</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5 max-h-[60vh] overflow-y-auto space-y-4 text-xs text-gray-600 leading-relaxed">
          <p>
            The market prices, demand schedules, and generation telemetry published on this website
            are provided for informational purposes only. Real-time prices displayed prior to the
            issuance of the D + 6 preliminary settlement statements are provisional and subject to
            routine audit, transmission network telemetry revisions, and recalculation by the Market
            Clearing Engine (MCE).
          </p>
          <p>
            Energy Market Company Pte Ltd (EMC) makes no representations or warranties of any kind,
            express or implied, about the completeness, accuracy, reliability, or suitability of the
            data. Any reliance you place on such information for financial contracts, derivative trading,
            or operational dispatch is strictly at your own risk.
          </p>
          <p>
            In no event will EMC or its affiliates be liable for any loss or damage including without
            limitation, indirect or consequential loss or damage, arising out of or in connection with the
            use of this market data portal.
          </p>
        </div>

        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded font-medium text-xs transition-colors cursor-pointer"
          >
            I Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};
