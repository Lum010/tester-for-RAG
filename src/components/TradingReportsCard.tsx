import React from 'react';

interface TradingReportsCardProps {
  onOpenReports: () => void;
}

export const TradingReportsCard: React.FC<TradingReportsCardProps> = ({ onOpenReports }) => {
  return (
    <div id="reports-card" className="lg:col-span-4" data-purpose="side-promotions">
      <div className="bg-[#f0f6fc] border border-[#d6e4f3] rounded-lg p-6 relative flex flex-col justify-between h-auto shadow-xs">
        <div>
          <h3 className="text-base font-bold text-[#0055b8] mb-3">Market Trading Reports</h3>
          <p className="text-xs text-gray-700 leading-relaxed mb-6">
            The Market Trading Reports are available to the public on a daily and monthly frequency.
            For Market Trading Reports with commentary, please visit our data subscription page.
          </p>
        </div>
        <div className="flex justify-end pt-2">
          <button
            onClick={onOpenReports}
            className="inline-flex items-center justify-center text-[#0055b8] hover:text-blue-800 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-full"
            title="View Market Trading Reports"
            aria-label="View Market Trading Reports"
          >
            <svg
              className="w-7 h-7 text-[#0055b8] hover:scale-105 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
              <path
                d="M10 8l4 4-4 4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
