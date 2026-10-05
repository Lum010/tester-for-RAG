import React, { useState } from 'react';
import { SettlementPeriodData, CategoryTab } from '../types/nems';
import { RotateCcw } from 'lucide-react';

interface KeyMetricsProps {
  currentData: SettlementPeriodData;
  activePeriodData: SettlementPeriodData;
  category: CategoryTab;
  onResetToCurrent: () => void;
}

export const KeyMetrics: React.FC<KeyMetricsProps> = ({
  currentData,
  activePeriodData,
  category,
  onResetToCurrent,
}) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const isInspectingDifferentPeriod = activePeriodData.period !== currentData.period;

  // Tooltip content dictionary
  const tooltips: Record<string, string> = {
    usep: 'Uniform Singapore Energy Price (USEP): The market clearing price for energy in NEMS, representing the weighted average of nodal prices across all load withdrawal points.',
    demand: 'System Electricity Demand: Total instantaneous wholesale power consumed across Singapore, metered and scheduled by the Market Clearing Engine (MCE).',
    solar: 'Solar Photovoltaic Generation: Aggregate estimated real-time solar PV generation from rooftop and ground-mounted solar installations in Singapore.',
    vcp: 'Vesting Contract Price (VCP): A benchmark quarterly price determined by the Energy Market Authority (EMA) to allocate vesting contracts and hedge market exposure.',
    regulation: 'Regulation Reserve: Generating capacity equipped with AGC (Automatic Generation Control) that responds continuously to minute-by-minute system frequency fluctuations.',
    primaryReserve: 'Primary Reserve: Capacity that responds automatically within 9 seconds to arrest rapid frequency decline following unexpected generator outages.',
    secondaryReserve: 'Secondary Reserve: Spinning reserve capacity that responds within 30 seconds to restore system frequency back to the target operating range.',
    contingencyReserve: 'Contingency Reserve: Generating capacity or interruptible load that can be fully synchronized within 10 minutes to replenish spinning reserves.',
    ccgt: 'Combined Cycle Gas Turbine (CCGT): High-efficiency natural gas fired power plants providing the baseload of Singapore electricity generation (~85-90%).',
    ocgt: 'Open Cycle Gas Turbine (OCGT): Fast-ramping natural gas or diesel peaking turbines used during extreme demand spikes or unexpected unit trips.',
    wte: 'Waste-to-Energy (WTE): Incineration facilities that treat municipal solid waste while generating clean baseload electricity.',
    imports: 'Electricity Imports: Regional low-carbon electricity imported through regional subsea and land interconnectors into the Singapore grid.'
  };

  const renderTooltip = (key: string) => {
    if (activeTooltip !== key) return null;
    return (
      <div className="absolute bottom-full left-0 mb-2 w-64 p-2.5 bg-slate-900 text-white text-[11px] leading-relaxed rounded shadow-xl z-30 font-normal">
        {tooltips[key]}
        <div className="absolute top-full left-4 -mt-1 border-4 border-transparent border-t-slate-900"></div>
      </div>
    );
  };

  return (
    <div className="mb-8" data-purpose="metrics-summary">
      {isInspectingDifferentPeriod && (
        <div className="mb-3 flex items-center justify-between bg-blue-50/70 border border-blue-200/80 px-3 py-1.5 rounded text-xs text-blue-900">
          <span>
            Viewing <span className="font-semibold">Period {activePeriodData.period} ({activePeriodData.timeRange})</span>
          </span>
          <button
            onClick={onResetToCurrent}
            className="flex items-center gap-1 font-semibold text-[#0055b8] hover:underline cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Reset to Current (Period 25)
          </button>
        </div>
      )}

      {category === 'energy' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {/* USEP */}
          <div className="flex flex-col relative">
            <div className="flex items-center space-x-1.5 text-gray-700 font-semibold text-xs mb-1.5">
              <span>USEP</span>
              <button
                type="button"
                onMouseEnter={() => setActiveTooltip('usep')}
                onMouseLeave={() => setActiveTooltip(null)}
                onClick={() => setActiveTooltip(activeTooltip === 'usep' ? null : 'usep')}
                className="inline-flex items-center justify-center w-3.5 h-3.5 text-[10px] text-gray-500 border border-gray-400 rounded-full cursor-pointer hover:border-gray-600 focus:outline-none"
                aria-label="USEP info"
              >
                ?
              </button>
              {renderTooltip('usep')}
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="w-1.5 h-6 bg-[#0055b8] self-stretch rounded-xs shrink-0"></span>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 font-mono tabular-nums">
                  ${activePeriodData.usep.toFixed(2)}
                </span>
                <span className="text-xs text-gray-500 font-medium">($/MWh)</span>
              </div>
            </div>
          </div>

          {/* Demand */}
          <div className="flex flex-col relative">
            <div className="flex items-center space-x-1.5 text-gray-700 font-semibold text-xs mb-1.5">
              <span>Demand</span>
              <button
                type="button"
                onMouseEnter={() => setActiveTooltip('demand')}
                onMouseLeave={() => setActiveTooltip(null)}
                onClick={() => setActiveTooltip(activeTooltip === 'demand' ? null : 'demand')}
                className="inline-flex items-center justify-center w-3.5 h-3.5 text-[10px] text-gray-500 border border-gray-400 rounded-full cursor-pointer hover:border-gray-600 focus:outline-none"
                aria-label="Demand info"
              >
                ?
              </button>
              {renderTooltip('demand')}
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="w-1.5 h-6 bg-[#009ee0] self-stretch rounded-xs shrink-0"></span>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 font-mono tabular-nums">
                  {activePeriodData.demand.toLocaleString()}
                </span>
                <span className="text-xs text-gray-500 font-medium">(MW)</span>
              </div>
            </div>
          </div>

          {/* Solar */}
          <div className="flex flex-col relative">
            <div className="flex items-center space-x-1.5 text-gray-700 font-semibold text-xs mb-1.5">
              <span>Solar</span>
              <button
                type="button"
                onMouseEnter={() => setActiveTooltip('solar')}
                onMouseLeave={() => setActiveTooltip(null)}
                onClick={() => setActiveTooltip(activeTooltip === 'solar' ? null : 'solar')}
                className="inline-flex items-center justify-center w-3.5 h-3.5 text-[10px] text-gray-500 border border-gray-400 rounded-full cursor-pointer hover:border-gray-600 focus:outline-none"
                aria-label="Solar info"
              >
                ?
              </button>
              {renderTooltip('solar')}
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="w-1.5 h-6 bg-[#8bc34a] self-stretch rounded-xs shrink-0"></span>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 font-mono tabular-nums">
                  {activePeriodData.solar.toLocaleString()}
                </span>
                <span className="text-xs text-gray-500 font-medium">(MW)</span>
              </div>
            </div>
          </div>

          {/* VCP */}
          <div className="flex flex-col relative">
            <div className="flex items-center space-x-1.5 text-gray-700 font-semibold text-xs mb-1.5">
              <span>VCP</span>
              <button
                type="button"
                onMouseEnter={() => setActiveTooltip('vcp')}
                onMouseLeave={() => setActiveTooltip(null)}
                onClick={() => setActiveTooltip(activeTooltip === 'vcp' ? null : 'vcp')}
                className="inline-flex items-center justify-center w-3.5 h-3.5 text-[10px] text-gray-500 border border-gray-400 rounded-full cursor-pointer hover:border-gray-600 focus:outline-none"
                aria-label="VCP info"
              >
                ?
              </button>
              {renderTooltip('vcp')}
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="w-1.5 h-6 bg-[#0055b8] self-stretch rounded-xs shrink-0"></span>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 font-mono tabular-nums">
                  ${activePeriodData.vcp.toFixed(2)}
                </span>
                <span className="text-xs text-gray-500 font-medium">($/MWh)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {category === 'ancillary' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {/* Regulation */}
          <div className="flex flex-col relative">
            <div className="flex items-center space-x-1.5 text-gray-700 font-semibold text-xs mb-1.5">
              <span>Regulation</span>
              <button
                type="button"
                onMouseEnter={() => setActiveTooltip('regulation')}
                onMouseLeave={() => setActiveTooltip(null)}
                className="inline-flex items-center justify-center w-3.5 h-3.5 text-[10px] text-gray-500 border border-gray-400 rounded-full cursor-pointer"
              >
                ?
              </button>
              {renderTooltip('regulation')}
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="w-1.5 h-6 bg-[#8b5cf6] self-stretch rounded-xs shrink-0"></span>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 font-mono tabular-nums">
                  ${(activePeriodData.regulation ?? 14.2).toFixed(2)}
                </span>
                <span className="text-xs text-gray-500 font-medium">($/MWh)</span>
              </div>
            </div>
          </div>

          {/* Primary Reserve */}
          <div className="flex flex-col relative">
            <div className="flex items-center space-x-1.5 text-gray-700 font-semibold text-xs mb-1.5">
              <span>Primary Reserve</span>
              <button
                type="button"
                onMouseEnter={() => setActiveTooltip('primaryReserve')}
                onMouseLeave={() => setActiveTooltip(null)}
                className="inline-flex items-center justify-center w-3.5 h-3.5 text-[10px] text-gray-500 border border-gray-400 rounded-full cursor-pointer"
              >
                ?
              </button>
              {renderTooltip('primaryReserve')}
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="w-1.5 h-6 bg-[#3b82f6] self-stretch rounded-xs shrink-0"></span>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 font-mono tabular-nums">
                  ${(activePeriodData.primaryReserve ?? 4.2).toFixed(2)}
                </span>
                <span className="text-xs text-gray-500 font-medium">($/MWh)</span>
              </div>
            </div>
          </div>

          {/* Secondary Reserve */}
          <div className="flex flex-col relative">
            <div className="flex items-center space-x-1.5 text-gray-700 font-semibold text-xs mb-1.5">
              <span>Secondary Reserve</span>
              <button
                type="button"
                onMouseEnter={() => setActiveTooltip('secondaryReserve')}
                onMouseLeave={() => setActiveTooltip(null)}
                className="inline-flex items-center justify-center w-3.5 h-3.5 text-[10px] text-gray-500 border border-gray-400 rounded-full cursor-pointer"
              >
                ?
              </button>
              {renderTooltip('secondaryReserve')}
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="w-1.5 h-6 bg-[#06b6d4] self-stretch rounded-xs shrink-0"></span>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 font-mono tabular-nums">
                  ${(activePeriodData.secondaryReserve ?? 5.1).toFixed(2)}
                </span>
                <span className="text-xs text-gray-500 font-medium">($/MWh)</span>
              </div>
            </div>
          </div>

          {/* Contingency Reserve */}
          <div className="flex flex-col relative">
            <div className="flex items-center space-x-1.5 text-gray-700 font-semibold text-xs mb-1.5">
              <span>Contingency Reserve</span>
              <button
                type="button"
                onMouseEnter={() => setActiveTooltip('contingencyReserve')}
                onMouseLeave={() => setActiveTooltip(null)}
                className="inline-flex items-center justify-center w-3.5 h-3.5 text-[10px] text-gray-500 border border-gray-400 rounded-full cursor-pointer"
              >
                ?
              </button>
              {renderTooltip('contingencyReserve')}
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="w-1.5 h-6 bg-[#f59e0b] self-stretch rounded-xs shrink-0"></span>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 font-mono tabular-nums">
                  ${(activePeriodData.contingencyReserve ?? 6.9).toFixed(2)}
                </span>
                <span className="text-xs text-gray-500 font-medium">($/MWh)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {category === 'generation' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {/* CCGT Gas */}
          <div className="flex flex-col relative">
            <div className="flex items-center space-x-1.5 text-gray-700 font-semibold text-xs mb-1.5">
              <span>CCGT Gas</span>
              <button
                type="button"
                onMouseEnter={() => setActiveTooltip('ccgt')}
                onMouseLeave={() => setActiveTooltip(null)}
                className="inline-flex items-center justify-center w-3.5 h-3.5 text-[10px] text-gray-500 border border-gray-400 rounded-full cursor-pointer"
              >
                ?
              </button>
              {renderTooltip('ccgt')}
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="w-1.5 h-6 bg-[#0284c7] self-stretch rounded-xs shrink-0"></span>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 font-mono tabular-nums">
                  {(activePeriodData.ccgtGen ?? 4876).toLocaleString()}
                </span>
                <span className="text-xs text-gray-500 font-medium">(MW)</span>
              </div>
            </div>
          </div>

          {/* Solar PV */}
          <div className="flex flex-col relative">
            <div className="flex items-center space-x-1.5 text-gray-700 font-semibold text-xs mb-1.5">
              <span>Solar PV</span>
              <button
                type="button"
                onMouseEnter={() => setActiveTooltip('solar')}
                onMouseLeave={() => setActiveTooltip(null)}
                className="inline-flex items-center justify-center w-3.5 h-3.5 text-[10px] text-gray-500 border border-gray-400 rounded-full cursor-pointer"
              >
                ?
              </button>
              {renderTooltip('solar')}
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="w-1.5 h-6 bg-[#8bc34a] self-stretch rounded-xs shrink-0"></span>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 font-mono tabular-nums">
                  {activePeriodData.solar.toLocaleString()}
                </span>
                <span className="text-xs text-gray-500 font-medium">(MW)</span>
              </div>
            </div>
          </div>

          {/* OCGT Peaking */}
          <div className="flex flex-col relative">
            <div className="flex items-center space-x-1.5 text-gray-700 font-semibold text-xs mb-1.5">
              <span>OCGT Peakers</span>
              <button
                type="button"
                onMouseEnter={() => setActiveTooltip('ocgt')}
                onMouseLeave={() => setActiveTooltip(null)}
                className="inline-flex items-center justify-center w-3.5 h-3.5 text-[10px] text-gray-500 border border-gray-400 rounded-full cursor-pointer"
              >
                ?
              </button>
              {renderTooltip('ocgt')}
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="w-1.5 h-6 bg-[#ea580c] self-stretch rounded-xs shrink-0"></span>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 font-mono tabular-nums">
                  {(activePeriodData.ocgtGen ?? 337).toLocaleString()}
                </span>
                <span className="text-xs text-gray-500 font-medium">(MW)</span>
              </div>
            </div>
          </div>

          {/* Waste & Imports */}
          <div className="flex flex-col relative">
            <div className="flex items-center space-x-1.5 text-gray-700 font-semibold text-xs mb-1.5">
              <span>WTE & Imports</span>
              <button
                type="button"
                onMouseEnter={() => setActiveTooltip('wte')}
                onMouseLeave={() => setActiveTooltip(null)}
                className="inline-flex items-center justify-center w-3.5 h-3.5 text-[10px] text-gray-500 border border-gray-400 rounded-full cursor-pointer"
              >
                ?
              </button>
              {renderTooltip('wte')}
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="w-1.5 h-6 bg-[#10b981] self-stretch rounded-xs shrink-0"></span>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 font-mono tabular-nums">
                  {((activePeriodData.wasteToEnergy ?? 220) + (activePeriodData.imports ?? 100)).toLocaleString()}
                </span>
                <span className="text-xs text-gray-500 font-medium">(MW)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
