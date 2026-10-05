import React, { useState, useRef } from 'react';
import { SettlementPeriodData, CategoryTab } from '../types/nems';
import { Eye, EyeOff } from 'lucide-react';

interface RealtimeChartProps {
  periods: SettlementPeriodData[];
  selectedPeriod: SettlementPeriodData;
  onSelectPeriod: (period: SettlementPeriodData) => void;
  onOpenDisclaimer: () => void;
  onOpenGuide: () => void;
  category: CategoryTab;
}

export const RealtimeChart: React.FC<RealtimeChartProps> = ({
  periods,
  selectedPeriod,
  onSelectPeriod,
  onOpenDisclaimer,
  onOpenGuide,
  category,
}) => {
  const [hoveredPeriod, setHoveredPeriod] = useState<SettlementPeriodData | null>(null);
  const [showSolar, setShowSolar] = useState(true);
  const [showDemand, setShowDemand] = useState(true);
  const [showUsep, setShowUsep] = useState(true);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Coordinate calculations
  // X: 75 to 825 (width = 750)
  const getX = (pIndex: number) => {
    return 75 + (pIndex / 47) * 750;
  };

  // Y for Price ($100 to $900 -> Y 360 to 40)
  const getYPrice = (val: number) => {
    const clamped = Math.max(100, Math.min(900, val));
    return 360 - ((clamped - 100) / 800) * 320;
  };

  // Y for Demand (6,000 to 9,000 MW -> Y 360 to 40)
  const getYDemand = (val: number) => {
    const clamped = Math.max(6000, Math.min(9000, val));
    return 360 - ((clamped - 6000) / 3000) * 320;
  };

  // Y for Solar (0 to 1,800 MW -> Y 360 to 140)
  const getYSolar = (val: number) => {
    const clamped = Math.max(0, Math.min(1800, val));
    return 360 - (clamped / 1800) * 220;
  };

  // Past periods: 0 to 24 (Period 1 to 25)
  // Future periods: 24 to 47 (Period 25 to 48)
  const pastPeriods = periods.slice(0, 25);
  const futurePeriods = periods.slice(24);

  // SVG Paths
  const createPolylinePath = (
    pts: SettlementPeriodData[],
    startIndex: number,
    getYFn: (d: SettlementPeriodData) => number
  ) => {
    return pts
      .map((d, i) => {
        const x = getX(startIndex + i);
        const y = getYFn(d);
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  };

  // Solar Area Path
  const solarPath = () => {
    const points = periods.map((d, i) => `${getX(i).toFixed(1)},${getYSolar(d.solar).toFixed(1)}`);
    return `M 75,360 L ${points.join(' L ')} L 825,360 Z`;
  };

  // Demand Area Fill Path
  const demandAreaPath = () => {
    const points = periods.map((d, i) => `${getX(i).toFixed(1)},${getYDemand(d.demand).toFixed(1)}`);
    return `M 75,360 L ${points.join(' L ')} L 825,360 Z`;
  };

  // Paths
  const pastDemandPath = createPolylinePath(pastPeriods, 0, (d) => getYDemand(d.demand));
  const futureDemandPath = createPolylinePath(futurePeriods, 24, (d) => getYDemand(d.demand));

  const pastPricePath = createPolylinePath(pastPeriods, 0, (d) =>
    category === 'ancillary'
      ? getYPrice((d.regulation ?? 14) * 25)
      : category === 'generation'
      ? getYPrice((d.ccgtGen ?? 4800) / 10)
      : getYPrice(d.usep)
  );

  const futurePricePath = createPolylinePath(futurePeriods, 24, (d) =>
    category === 'ancillary'
      ? getYPrice((d.regulation ?? 14) * 25)
      : category === 'generation'
      ? getYPrice((d.ccgtGen ?? 4800) / 10)
      : getYPrice(d.usep)
  );

  // Current Period position (Period 25 index 24)
  const currentX = getX(24);
  const currentPriceY = getYPrice(periods[24].usep);
  const currentDemandY = getYDemand(periods[24].demand);

  // Mouse interaction
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const svgWidth = 900;
    const clickX = ((e.clientX - rect.left) / rect.width) * svgWidth;

    if (clickX >= 75 && clickX <= 825) {
      const ratio = (clickX - 75) / 750;
      const index = Math.round(ratio * 47);
      if (index >= 0 && index < periods.length) {
        setHoveredPeriod(periods[index]);
      }
    } else {
      setHoveredPeriod(null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredPeriod(null);
  };

  const handleClick = () => {
    if (hoveredPeriod) {
      onSelectPeriod(hoveredPeriod);
    }
  };

  const activeDisplayPeriod = hoveredPeriod || selectedPeriod;

  return (
    <div
      className="w-full bg-white p-2 sm:p-4 rounded border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)] mb-6"
      data-purpose="realtime-chart"
    >
      {/* Series Visibility Toggles & Quick Legend */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-2 pb-2 text-xs text-gray-600 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowUsep(!showUsep)}
            className={`flex items-center gap-1.5 font-medium transition-colors cursor-pointer ${
              showUsep ? 'text-[#164e63]' : 'text-gray-400 line-through'
            }`}
          >
            <span className="w-2.5 h-0.5 bg-[#164e63]"></span>
            <span>USEP ($/MWh)</span>
          </button>

          <button
            onClick={() => setShowDemand(!showDemand)}
            className={`flex items-center gap-1.5 font-medium transition-colors cursor-pointer ${
              showDemand ? 'text-[#009ee0]' : 'text-gray-400 line-through'
            }`}
          >
            <span className="w-2.5 h-0.5 bg-[#009ee0]"></span>
            <span>Demand (MW)</span>
          </button>

          <button
            onClick={() => setShowSolar(!showSolar)}
            className={`flex items-center gap-1.5 font-medium transition-colors cursor-pointer ${
              showSolar ? 'text-[#65a30d]' : 'text-gray-400 line-through'
            }`}
          >
            <span className="w-2.5 h-2 bg-[#dcedb9] border border-[#a3e635] rounded-xs"></span>
            <span>Solar PV</span>
          </button>
        </div>

        <div className="text-[11px] text-gray-500 font-medium">
          Hover across chart to inspect 48 settlement periods
        </div>
      </div>

      <div className="w-full overflow-x-auto relative">
        <div className="min-w-[760px] relative select-none">
          {/* Dual-axis SVG Interactive Presentation Chart */}
          <svg
            ref={svgRef}
            className="w-full h-auto text-gray-600 select-none font-sans cursor-crosshair"
            viewBox="0 0 900 420"
            xmlns="http://www.w3.org/2000/svg"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          >
            <defs>
              {/* Solar area gradient */}
              <linearGradient id="solarGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#dcedb9" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#f4f9e8" stopOpacity="0.08" />
              </linearGradient>

              {/* Demand area subtle gradient */}
              <linearGradient id="demandGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* Chart Horizontal Grid Lines */}
            <g stroke="#f0f2f5" strokeWidth="1">
              <line x1="75" x2="825" y1="40" y2="40" />
              <line x1="75" x2="825" y1="80" y2="80" />
              <line x1="75" x2="825" y1="120" y2="120" />
              <line x1="75" x2="825" y1="160" y2="160" />
              <line x1="75" x2="825" y1="200" y2="200" />
              <line x1="75" x2="825" y1="240" y2="240" />
              <line x1="75" x2="825" y1="280" y2="280" />
              <line x1="75" x2="825" y1="320" y2="320" />
              <line x1="75" x2="825" y1="360" y2="360" stroke="#e2e8f0" />
            </g>

            {/* Left Y-Axis (Price $/MWh) */}
            <text
              fill="#475569"
              fontSize="11"
              fontWeight="500"
              textAnchor="middle"
              transform="rotate(-90 32,200)"
              x="32"
              y="200"
            >
              Price ($/MWh)
            </text>
            <g fill="#64748b" fontSize="10" textAnchor="end">
              <text x="68" y="44">900</text>
              <text x="68" y="84">800</text>
              <text x="68" y="124">700</text>
              <text x="68" y="164">600</text>
              <text x="68" y="204">500</text>
              <text x="68" y="244">400</text>
              <text x="68" y="284">300</text>
              <text x="68" y="324">200</text>
              <text x="68" y="364">100</text>
            </g>

            {/* Right Y-Axis (Demand MW) */}
            <text
              fill="#475569"
              fontSize="11"
              fontWeight="500"
              textAnchor="middle"
              transform="rotate(90 868,200)"
              x="868"
              y="200"
            >
              Demand (MW)
            </text>
            <g fill="#64748b" fontSize="10" textAnchor="start">
              <text x="832" y="44">9,000</text>
              <text x="832" y="97">8,500</text>
              <text x="832" y="150">8,000</text>
              <text x="832" y="203">7,500</text>
              <text x="832" y="256">7,000</text>
              <text x="832" y="309">6,500</text>
              <text x="832" y="364">6,000</text>
            </g>

            {/* Solar Area Fill (Light Yellow-Green Bell curve) */}
            {showSolar && (
              <path
                d={solarPath()}
                fill="url(#solarGradient)"
                stroke="#a3e635"
                strokeWidth="1.2"
                strokeDasharray="2,2"
              />
            )}

            {/* Demand Area Fill & Curves */}
            {showDemand && (
              <>
                <path d={demandAreaPath()} fill="url(#demandGradient)" />
                {/* Past demand solid */}
                <path
                  d={pastDemandPath}
                  fill="none"
                  stroke="#009ee0"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                />
                {/* Future demand dotted */}
                <path
                  d={futureDemandPath}
                  fill="none"
                  stroke="#009ee0"
                  strokeDasharray="4,4"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                />
              </>
            )}

            {/* Price USEP Line (Navy / Dark Blue) */}
            {showUsep && (
              <>
                {/* Past USEP Solid */}
                <path
                  d={pastPricePath}
                  fill="none"
                  stroke="#164e63"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                />
                {/* Future USEP Dotted */}
                <path
                  d={futurePricePath}
                  fill="none"
                  stroke="#164e63"
                  strokeDasharray="3,3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                />
              </>
            )}

            {/* Vertical Current Time Indicator Line (at 12:00 / X=450) */}
            <line
              stroke="#94a3b8"
              strokeLinecap="round"
              strokeWidth="2.5"
              x1={currentX}
              x2={currentX}
              y1="40"
              y2="360"
            />
            {showUsep && <circle cx={currentX} cy={currentPriceY} fill="#164e63" r="4.5" />}
            {showDemand && <circle cx={currentX} cy={currentDemandY} fill="#009ee0" r="4.5" />}

            {/* Hovered Scrubber Line */}
            {hoveredPeriod && hoveredPeriod.period !== 25 && (
              <g pointerEvents="none">
                <line
                  stroke="#f59e0b"
                  strokeWidth="1.8"
                  strokeDasharray="3,3"
                  x1={getX(hoveredPeriod.period - 1)}
                  x2={getX(hoveredPeriod.period - 1)}
                  y1="40"
                  y2="360"
                />
                <circle
                  cx={getX(hoveredPeriod.period - 1)}
                  cy={getYPrice(hoveredPeriod.usep)}
                  fill="#f59e0b"
                  r="4"
                />
              </g>
            )}

            {/* X-Axis Labels (Time periods) */}
            <g fill="#64748b" fontSize="10" textAnchor="middle">
              <text x={getX(0)} y="380">00:00</text>
              <text x={getX(6)} y="380">03:00</text>
              <text x={getX(12)} y="380">06:00</text>
              <text x={getX(18)} y="380">09:00</text>
              <text
                fill="#1e293b"
                fontWeight="700"
                fontSize="11"
                x={getX(24)}
                y="380"
              >
                12:00
              </text>
              <text x={getX(30)} y="380">15:00</text>
              <text x={getX(36)} y="380">18:00</text>
              <text x={getX(42)} y="380">21:00</text>
            </g>

            {/* Legend Under Graph */}
            <g fill="#475569" fontSize="10" transform="translate(385, 398)">
              {/* Past Legend Item */}
              <line stroke="#009ee0" strokeLinecap="round" strokeWidth="2.5" x1="0" x2="16" y1="5" y2="5" />
              <text x="20" y="9">Past</text>
              {/* Current Legend Item */}
              <line stroke="#334155" strokeLinecap="round" strokeWidth="2.5" x1="50" x2="50" y1="1" y2="9" />
              <text x="56" y="9">Current</text>
              {/* Future Legend Item */}
              <line stroke="#009ee0" strokeDasharray="2,2" strokeLinecap="round" strokeWidth="2.5" x1="102" x2="118" y1="5" y2="5" />
              <text x="122" y="9">Future</text>
            </g>
          </svg>

          {/* Interactive Inspection Tooltip overlay */}
          {hoveredPeriod && (
            <div
              className="absolute top-4 pointer-events-none bg-slate-900/95 text-white p-2.5 rounded shadow-xl border border-slate-700 text-xs backdrop-blur-xs transition-all z-20"
              style={{
                left: `${Math.min(700, Math.max(100, getX(hoveredPeriod.period - 1)))}px`,
              }}
            >
              <div className="font-semibold text-amber-300 border-b border-slate-700 pb-1 mb-1.5 flex items-center justify-between gap-3">
                <span>Period {hoveredPeriod.period}</span>
                <span>{hoveredPeriod.timeRange}</span>
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
                <span className="text-gray-400">USEP:</span>
                <span className="font-mono font-bold text-white text-right">
                  ${hoveredPeriod.usep.toFixed(2)}/MWh
                </span>
                <span className="text-gray-400">Demand:</span>
                <span className="font-mono font-bold text-cyan-300 text-right">
                  {hoveredPeriod.demand.toLocaleString()} MW
                </span>
                <span className="text-gray-400">Solar PV:</span>
                <span className="font-mono font-bold text-lime-300 text-right">
                  {hoveredPeriod.solar.toLocaleString()} MW
                </span>
                <span className="text-gray-400">VCP:</span>
                <span className="font-mono font-bold text-white text-right">
                  ${hoveredPeriod.vcp.toFixed(2)}/MWh
                </span>
              </div>
              <div className="text-[10px] text-gray-400 mt-1.5 text-center italic">
                Click to inspect period in cards & table
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chart Metadata & Quick Help Links */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between text-xs gap-3">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 font-medium">
          <span className="text-[#0055b8] uppercase tracking-wider text-[11px]">
            CURRENT DATE/TIME:{' '}
            <span className="font-bold text-gray-800">05 OCT 2026 12:00-12:30</span>
          </span>
          <span className="text-[#0055b8] uppercase tracking-wider text-[11px]">
            LAST UPDATED:{' '}
            <span className="font-bold text-gray-800">05 OCT 2026 12:01</span>
          </span>
        </div>

        <div className="flex items-center space-x-6 text-[#0055b8] font-medium">
          <button
            onClick={onOpenDisclaimer}
            className="hover:underline flex items-center gap-1 cursor-pointer"
          >
            Disclaimer
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </button>
          <button
            onClick={onOpenGuide}
            className="hover:underline flex items-center gap-1 cursor-pointer"
          >
            Guide To Prices
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
