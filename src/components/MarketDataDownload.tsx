import React, { useState } from 'react';
import { Download, Check, AlertCircle } from 'lucide-react';

interface MarketDataDownloadProps {
  onContactOperations: () => void;
}

export const MarketDataDownload: React.FC<MarketDataDownloadProps> = ({
  onContactOperations,
}) => {
  const [selectedDataset, setSelectedDataset] = useState(
    'Uniform Singapore Energy Price and Demand Forecast'
  );
  const [downloadMode, setDownloadMode] = useState<'date-range' | 'year'>('date-range');
  const [fromDate, setFromDate] = useState('08/28/2026');
  const [toDate, setToDate] = useState('09/27/2026');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);

  const handleDownload = () => {
    setIsDownloading(true);
    setDownloadStatus('Preparing official NEMS data package...');

    setTimeout(() => {
      // Generate synthetic authentic NEMS CSV file
      const headers = [
        'DATA_STREAM',
        'TRADING_DATE',
        'SETTLEMENT_PERIOD',
        'TIME_INTERVAL',
        'USEP_SGD_PER_MWH',
        'DEMAND_FORECAST_MW',
        'ACTUAL_DEMAND_MW',
        'SOLAR_EST_MW',
        'STATUS',
      ];

      const rows: string[] = [];
      const targetLabel = selectedDataset.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase();

      // Generate 48 periods of realistic records
      for (let p = 1; p <= 48; p++) {
        const totalMin = (p - 1) * 30;
        const sh = String(Math.floor(totalMin / 60)).padStart(2, '0');
        const sm = String(totalMin % 60).padStart(2, '0');
        const eh = String(Math.floor((totalMin + 30) / 60)).padStart(2, '0');
        const em = String((totalMin + 30) % 60).padStart(2, '0');
        const timeRange = `${sh}:${sm}-${eh}:${em}`;

        const baseDemand = 6400 + Math.round(Math.sin((p / 48) * Math.PI * 2 - Math.PI / 2) * 1100);
        const solar = p >= 14 && p <= 36 ? Math.round(1500 * Math.sin(((p - 14) / 22) * Math.PI)) : 0;
        const usep = (130 + Math.random() * 80 + (p >= 17 && p <= 20 ? 120 : 0)).toFixed(2);

        rows.push(
          [
            `"${selectedDataset}"`,
            downloadMode === 'date-range' ? fromDate : `01/01/${selectedYear}`,
            p,
            `"${timeRange}"`,
            usep,
            baseDemand + Math.round(Math.random() * 50),
            baseDemand,
            solar,
            '"FINAL_D_PLUS_6"',
          ].join(',')
        );
      }

      const csvContent =
        'data:text/csv;charset=utf-8,\uFEFF' +
        [
          `# NEMS Official Market Data Download - Energy Market Company`,
          `# Dataset: ${selectedDataset}`,
          `# Scope: ${downloadMode === 'date-range' ? `${fromDate} to ${toDate}` : `Year ${selectedYear}`}`,
          `# Timestamp: 05-OCT-2026 12:01 SGT`,
          headers.join(','),
          ...rows,
        ].join('\n');

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      const filename = `EMC_${targetLabel}_${downloadMode === 'date-range' ? 'Range' : selectedYear}.csv`;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsDownloading(false);
      setDownloadStatus(`Successfully downloaded ${filename}`);
      setTimeout(() => setDownloadStatus(null), 4000);
    }, 600);
  };

  return (
    <div id="download-section" className="lg:col-span-8" data-purpose="market-data-download">
      <h2 className="text-2xl font-bold text-[#0055b8] mb-6">Market Data Download</h2>

      <div className="space-y-5 mb-8">
        {/* Selection Filter: Category */}
        <div>
          <label className="block text-xs font-semibold text-gray-800 mb-1.5">
            Final Prices and Information on Registered Facilities
          </label>
          <div className="relative max-w-lg">
            <select
              value={selectedDataset}
              onChange={(e) => setSelectedDataset(e.target.value)}
              className="w-full text-xs sm:text-sm text-gray-700 bg-white border border-gray-300 rounded px-3 py-2 pr-8 shadow-xs focus:outline-none focus:ring-1 focus:ring-[#0055b8] focus:border-[#0055b8] appearance-none cursor-pointer"
            >
              <option>Uniform Singapore Energy Price and Demand Forecast</option>
              <option>Nodal Energy Prices (D + 6)</option>
              <option>Regulation Prices (D + 6)</option>
              <option>Wholesale Electricity Prices (D + 10)</option>
              <option>Vesting Contract Reference Prices (D + 10)</option>
              <option>Metered Generation by Facility Type (D + 10)</option>
              <option>Capacity for Registered Facilities (D)</option>
              <option>Monthly Energy Uplift Charge (MEUC) Monthly Statements</option>
              <option>Temporary Price Cap (TPC) Parameters from EMA</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>

        {/* Radio 1: By Date Range */}
        <div className="space-y-3">
          <div className="flex items-center">
            <input
              checked={downloadMode === 'date-range'}
              onChange={() => setDownloadMode('date-range')}
              className="h-4 w-4 text-[#0055b8] focus:ring-blue-500 border-gray-300 cursor-pointer"
              id="by-date-range"
              name="download-range-type"
              type="radio"
            />
            <label
              className="ml-2 text-xs font-semibold text-gray-800 cursor-pointer"
              htmlFor="by-date-range"
            >
              By Date Range
            </label>
          </div>

          {/* Date Inputs */}
          <div
            className={`flex flex-wrap items-center gap-4 pl-6 text-xs text-gray-700 transition-opacity ${
              downloadMode !== 'date-range' ? 'opacity-40 pointer-events-none' : ''
            }`}
          >
            <div className="flex items-center gap-2">
              <span>From</span>
              <input
                className="border border-gray-300 rounded px-2.5 py-1.5 text-xs text-gray-700 w-32 focus:outline-none focus:ring-1 focus:ring-[#0055b8]"
                type="text"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                placeholder="MM/DD/YYYY"
              />
            </div>
            <div className="flex items-center gap-2">
              <span>To</span>
              <input
                className="border border-gray-300 rounded px-2.5 py-1.5 text-xs text-gray-700 w-32 focus:outline-none focus:ring-1 focus:ring-[#0055b8]"
                type="text"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                placeholder="MM/DD/YYYY"
              />
            </div>
            <span className="text-[11px] text-gray-500 italic">(Max 31 days per batch)</span>
          </div>
        </div>

        {/* Radio 2: By Year */}
        <div className="space-y-3">
          <div className="flex items-center">
            <input
              checked={downloadMode === 'year'}
              onChange={() => setDownloadMode('year')}
              className="h-4 w-4 text-[#0055b8] focus:ring-blue-500 border-gray-300 cursor-pointer"
              id="by-year"
              name="download-range-type"
              type="radio"
            />
            <label
              className="ml-2 text-xs font-semibold text-gray-800 cursor-pointer"
              htmlFor="by-year"
            >
              By Year
            </label>
          </div>

          <div
            className={`pl-6 transition-opacity ${
              downloadMode !== 'year' ? 'opacity-40 pointer-events-none' : ''
            }`}
          >
            <div className="relative w-28">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full text-xs text-gray-700 bg-white border border-gray-300 rounded px-3 py-1.5 pr-8 shadow-xs focus:outline-none focus:ring-1 focus:ring-[#0055b8] appearance-none cursor-pointer"
              >
                <option>2026</option>
                <option>2025</option>
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Form Download Button */}
        <div className="pt-2 flex items-center gap-3">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="bg-[#195bb2] hover:bg-blue-800 disabled:bg-blue-300 text-white text-xs font-semibold px-5 py-2 rounded shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isDownloading ? 'Generating...' : 'Download'}</span>
          </button>

          {downloadStatus && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>{downloadStatus}</span>
            </div>
          )}
        </div>
      </div>

      {/* Overview Information */}
      <div id="overview" className="mt-8 pt-4 border-t border-gray-100" data-purpose="overview-text">
        <h3 className="text-base font-bold text-gray-900 mb-3">Overview</h3>
        <p className="text-xs text-gray-600 leading-relaxed mb-3">
          The data availability is denoted in the bracket, where D is the trading day followed by the
          number of business days. Data can be downloaded in CSV format for periods covering up to 31
          days per file. All market data download are available for download for a five-year rolling
          period.
        </p>
        <p className="text-xs text-gray-600 leading-relaxed mb-5">
          For enquiries on the market data download, please email to{' '}
          <button
            onClick={onContactOperations}
            className="text-[#0055b8] hover:underline font-medium cursor-pointer"
          >
            Market Operations team
          </button>
          .
        </p>
        <h4 className="text-xs font-bold text-gray-800 mb-3">
          The following pricing data (final) are available for download.
        </h4>
        <ul className="text-xs text-gray-700 space-y-2 pl-2">
          <li className="flex items-start">
            <span className="text-[#e30613] font-bold mr-2 text-sm leading-none">•</span>
            <span>Uniform Singapore Energy Price (USEP) and Demand Forecast (D + 6)</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#e30613] font-bold mr-2 text-sm leading-none">•</span>
            <span>Nodal Energy Prices (D + 6)</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#e30613] font-bold mr-2 text-sm leading-none">•</span>
            <span>Regulation Prices (D + 6)</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#e30613] font-bold mr-2 text-sm leading-none">•</span>
            <span>Wholesale Electricity Prices (D + 10)</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#e30613] font-bold mr-2 text-sm leading-none">•</span>
            <span>Vesting Contract Reference Prices (D + 10)</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#e30613] font-bold mr-2 text-sm leading-none">•</span>
            <span>Metered Generation by Facility Type (D + 10)</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#e30613] font-bold mr-2 text-sm leading-none">•</span>
            <span>Capacity for Registered Facilities (D)</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#e30613] font-bold mr-2 text-sm leading-none">•</span>
            <span>
              Monthly Energy Uplift Charge (MEUC) Monthly Statements (1st Business Day following end of
              month)
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-[#e30613] font-bold mr-2 text-sm leading-none">•</span>
            <span>Temporary Price Cap (TPC) Parameters from EMA</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
