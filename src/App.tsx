/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryTabs } from './components/CategoryTabs';
import { KeyMetrics } from './components/KeyMetrics';
import { RealtimeChart } from './components/RealtimeChart';
import { DataTable } from './components/DataTable';
import { MarketDataDownload } from './components/MarketDataDownload';
import { TradingReportsCard } from './components/TradingReportsCard';
import { Footer } from './components/Footer';
import { ChatAssistant } from './components/ChatAssistant';

import { GuideToPricesModal } from './components/GuideToPricesModal';
import { DisclaimerModal } from './components/DisclaimerModal';
import { GlossaryModal } from './components/GlossaryModal';
import { MarketOperationsModal } from './components/MarketOperationsModal';
import { TradingReportsModal } from './components/TradingReportsModal';

import { initialSettlementPeriods } from './data/mockNemsData';
import { SettlementPeriodData, CategoryTab } from './types/nems';
import { Download, BarChart2, Table as TableIcon, Check } from 'lucide-react';

export default function App() {
  const [category, setCategory] = useState<CategoryTab>('energy');
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [subView, setSubView] = useState('Real-time Energy Prices and Demand');
  
  // Period 25 is the current period in the screenshot (12:00 - 12:30)
  const currentPeriod = initialSettlementPeriods[24];
  const [activePeriod, setActivePeriod] = useState<SettlementPeriodData>(currentPeriod);

  // Modals state
  const [guideOpen, setGuideOpen] = useState(false);
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Top action "Download" button handler
  const handleQuickDownload = () => {
    showToast('Exporting Real-time NEMS Prices dataset (CSV)...');

    const headers = [
      'TRADING_DAY',
      'PERIOD',
      'TIME_INTERVAL',
      'USEP_SGD_MWH',
      'DEMAND_MW',
      'SOLAR_MW',
      'VCP_SGD_MWH',
      'STATUS',
    ];

    const rows = initialSettlementPeriods.map((p) => [
      '05/10/2026',
      p.period,
      `"${p.timeRange}"`,
      p.usep.toFixed(2),
      p.demand,
      p.solar,
      p.vcp.toFixed(2),
      p.isCurrent ? '"CURRENT"' : p.isPast ? '"PAST"' : '"FORECAST"',
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [`# NEMS Real-time Energy Prices & Demand`, headers.join(','), ...rows.map((r) => r.join(','))].join(
        '\n'
      );

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `EMC_RealTime_NEMS_05OCT2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetToCurrent = () => {
    setActivePeriod(currentPeriod);
  };

  return (
    <div className="bg-white text-gray-800 flex flex-col min-h-screen relative font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        onNavigateHome={() => {
          setCategory('energy');
          setViewMode('chart');
          handleResetToCurrent();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenGlossary={() => setGlossaryOpen(true)}
        onOpenGuide={() => setGuideOpen(true)}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Hero Banner */}
      <HeroBanner
        onBreadcrumbHome={() => {
          setCategory('energy');
          handleResetToCurrent();
        }}
      />

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* Category Tabs Navigation */}
        <CategoryTabs
          activeTab={category}
          onSelectTab={(tab) => {
            setCategory(tab);
            if (tab === 'ancillary') {
              setSubView('Ancillary Service Regulation & Reserves');
            } else if (tab === 'generation') {
              setSubView('Fuel Mix and Registered Generation');
            } else {
              setSubView('Real-time Energy Prices and Demand');
            }
          }}
        />

        {/* Controls Row: Selector and View Toggle Actions */}
        <div
          id="realtime-pricing"
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
          data-purpose="chart-controls"
        >
          {/* Dropdown selector */}
          <div className="relative w-full sm:w-80">
            <select
              value={subView}
              onChange={(e) => setSubView(e.target.value)}
              className="w-full text-xs sm:text-sm font-normal text-gray-700 bg-white border border-gray-300 rounded px-3 py-2 pr-8 shadow-xs focus:outline-none focus:ring-1 focus:ring-[#0055b8] focus:border-[#0055b8] appearance-none cursor-pointer"
            >
              {category === 'energy' && (
                <>
                  <option>Real-time Energy Prices and Demand</option>
                  <option>Half-Hourly Pricing &amp; Schedule (USEP)</option>
                  <option>Day-Ahead Advisory (DAA) Forecast</option>
                  <option>Pre-Dispatch (PD) Schedule</option>
                </>
              )}
              {category === 'ancillary' && (
                <>
                  <option>Ancillary Service Regulation &amp; Reserves</option>
                  <option>Primary &amp; Secondary Spinning Reserves</option>
                  <option>Contingency Reserve Clearing Prices</option>
                </>
              )}
              {category === 'generation' && (
                <>
                  <option>Fuel Mix and Registered Generation</option>
                  <option>CCGT Gas vs Solar PV Dispatch</option>
                  <option>Registered Facility Maximum Capacity</option>
                </>
              )}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleQuickDownload}
              className="bg-[#195bb2] hover:bg-blue-800 text-white text-xs font-semibold px-4 py-2 rounded transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>

            <button
              onClick={() => setViewMode('chart')}
              className={`text-xs font-medium px-3.5 py-2 rounded flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'chart'
                  ? 'bg-blue-50 text-[#0055b8] border border-blue-300 font-semibold'
                  : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Chart</span>
            </button>

            <button
              onClick={() => setViewMode('table')}
              className={`text-xs font-medium px-3.5 py-2 rounded flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-blue-50 text-[#0055b8] border border-blue-300 font-semibold'
                  : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <KeyMetrics
          currentData={currentPeriod}
          activePeriodData={activePeriod}
          category={category}
          onResetToCurrent={handleResetToCurrent}
        />

        {/* Chart View or Table View Toggle */}
        {viewMode === 'chart' ? (
          <RealtimeChart
            periods={initialSettlementPeriods}
            selectedPeriod={activePeriod}
            onSelectPeriod={(p) => setActivePeriod(p)}
            onOpenDisclaimer={() => setDisclaimerOpen(true)}
            onOpenGuide={() => setGuideOpen(true)}
            category={category}
          />
        ) : (
          <DataTable
            periods={initialSettlementPeriods}
            selectedPeriod={activePeriod}
            onSelectPeriod={(p) => setActivePeriod(p)}
            category={category}
          />
        )}

        {/* Market Data Download & Reports Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 pt-6">
          {/* Left Column: Market Data Download Form & Overview */}
          <MarketDataDownload onContactOperations={() => setContactOpen(true)} />

          {/* Right Column: Market Trading Reports Card */}
          <TradingReportsCard onOpenReports={() => setReportsOpen(true)} />
        </div>
      </main>

      {/* Main Footer */}
      <Footer
        onOpenDisclaimer={() => setDisclaimerOpen(true)}
        onOpenGlossary={() => setGlossaryOpen(true)}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Floating Chat Assistant Widget */}
      <ChatAssistant
        onOpenGuide={() => setGuideOpen(true)}
        onOpenGlossary={() => setGlossaryOpen(true)}
      />

      {/* Modals */}
      <GuideToPricesModal isOpen={guideOpen} onClose={() => setGuideOpen(false)} />
      <DisclaimerModal isOpen={disclaimerOpen} onClose={() => setDisclaimerOpen(false)} />
      <GlossaryModal isOpen={glossaryOpen} onClose={() => setGlossaryOpen(false)} />
      <MarketOperationsModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <TradingReportsModal isOpen={reportsOpen} onClose={() => setReportsOpen(false)} />
    </div>
  );
}
