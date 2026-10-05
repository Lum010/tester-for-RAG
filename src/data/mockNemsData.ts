import { SettlementPeriodData, MarketReport, GlossaryTerm } from '../types/nems';

// Helper to format half-hour periods
function formatPeriodTime(period: number): { time: string; timeRange: string } {
  const totalMinutes = (period - 1) * 30;
  const startHours = Math.floor(totalMinutes / 60);
  const startMins = totalMinutes % 60;
  const endMinutes = totalMinutes + 30;
  const endHours = Math.floor(endMinutes / 60);
  const endMins = endMinutes % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');
  const time = `${pad(startHours)}:${pad(startMins)}`;
  const timeRange = `${pad(startHours)}:${pad(startMins)}-${pad(endHours)}:${pad(endMins)}`;
  return { time, timeRange };
}

// Generate the 48 settlement periods for 05 Oct 2026
// Current period is Period 25 (12:00 - 12:30)
export const initialSettlementPeriods: SettlementPeriodData[] = [
  { p: 1, usep: 320.40, demand: 6680, solar: 0, reg: 18.2, pr: 5.4, sr: 6.2, cr: 8.5 },
  { p: 2, usep: 780.10, demand: 6540, solar: 0, reg: 22.0, pr: 5.8, sr: 6.5, cr: 9.1 },
  { p: 3, usep: 825.50, demand: 6410, solar: 0, reg: 24.5, pr: 6.0, sr: 7.0, cr: 9.5 },
  { p: 4, usep: 690.20, demand: 6320, solar: 0, reg: 19.8, pr: 5.2, sr: 6.1, cr: 8.2 },
  { p: 5, usep: 575.80, demand: 6250, solar: 0, reg: 16.4, pr: 4.8, sr: 5.5, cr: 7.6 },
  { p: 6, usep: 576.00, demand: 6190, solar: 0, reg: 15.0, pr: 4.5, sr: 5.2, cr: 7.1 },
  { p: 7, usep: 480.30, demand: 6150, solar: 0, reg: 14.2, pr: 4.2, sr: 5.0, cr: 6.8 },
  { p: 8, usep: 450.00, demand: 6140, solar: 0, reg: 13.8, pr: 4.0, sr: 4.8, cr: 6.5 },
  { p: 9, usep: 440.60, demand: 6150, solar: 0, reg: 13.5, pr: 3.9, sr: 4.6, cr: 6.4 },
  { p: 10, usep: 472.00, demand: 6200, solar: 5, reg: 14.1, pr: 4.1, sr: 4.9, cr: 6.7 },
  { p: 11, usep: 320.10, demand: 6310, solar: 24, reg: 15.6, pr: 4.4, sr: 5.3, cr: 7.2 },
  { p: 12, usep: 360.50, demand: 6490, solar: 80, reg: 17.2, pr: 4.7, sr: 5.8, cr: 7.9 },
  { p: 13, usep: 400.20, demand: 6650, solar: 195, reg: 19.0, pr: 5.1, sr: 6.4, cr: 8.5 },
  { p: 14, usep: 398.80, demand: 6810, solar: 360, reg: 21.4, pr: 5.5, sr: 6.9, cr: 9.3 },
  { p: 15, usep: 405.00, demand: 6990, solar: 580, reg: 23.0, pr: 5.9, sr: 7.4, cr: 9.8 },
  { p: 16, usep: 412.30, demand: 7150, solar: 820, reg: 25.1, pr: 6.2, sr: 7.9, cr: 10.4 },
  { p: 17, usep: 480.90, demand: 7280, solar: 1040, reg: 28.0, pr: 6.7, sr: 8.5, cr: 11.2 },
  { p: 18, usep: 540.20, demand: 7390, solar: 1250, reg: 31.5, pr: 7.2, sr: 9.2, cr: 12.0 },
  { p: 19, usep: 440.00, demand: 7460, solar: 1390, reg: 27.0, pr: 6.5, sr: 8.3, cr: 10.9 },
  { p: 20, usep: 320.70, demand: 7490, solar: 1460, reg: 22.4, pr: 5.7, sr: 7.1, cr: 9.5 },
  { p: 21, usep: 240.50, demand: 7450, solar: 1490, reg: 18.0, pr: 5.0, sr: 6.2, cr: 8.3 },
  { p: 22, usep: 230.10, demand: 7380, solar: 1500, reg: 16.5, pr: 4.8, sr: 5.9, cr: 7.8 },
  { p: 23, usep: 200.40, demand: 7250, solar: 1505, reg: 15.2, pr: 4.5, sr: 5.6, cr: 7.4 },
  { p: 24, usep: 180.00, demand: 7000, solar: 1510, reg: 14.8, pr: 4.3, sr: 5.4, cr: 7.1 },
  // Current Period: Period 25 (12:00 - 12:30)
  { p: 25, usep: 145.85, demand: 6740, solar: 1507, reg: 14.2, pr: 4.2, sr: 5.1, cr: 6.9 },
  // Future Periods: Forecasts
  { p: 26, usep: 110.20, demand: 6620, solar: 1480, reg: 12.5, pr: 3.8, sr: 4.7, cr: 6.2 },
  { p: 27, usep: 135.40, demand: 6590, solar: 1420, reg: 13.0, pr: 3.9, sr: 4.9, cr: 6.5 },
  { p: 28, usep: 150.00, demand: 6650, solar: 1330, reg: 14.2, pr: 4.1, sr: 5.2, cr: 7.0 },
  { p: 29, usep: 162.80, demand: 6780, solar: 1180, reg: 15.7, pr: 4.5, sr: 5.7, cr: 7.6 },
  { p: 30, usep: 175.50, demand: 6940, solar: 980, reg: 17.5, pr: 4.9, sr: 6.3, cr: 8.4 },
  { p: 31, usep: 188.00, demand: 7120, solar: 740, reg: 19.8, pr: 5.3, sr: 6.9, cr: 9.2 },
  { p: 32, usep: 195.20, demand: 7290, solar: 490, reg: 22.0, pr: 5.8, sr: 7.5, cr: 10.0 },
  { p: 33, usep: 200.00, demand: 7410, solar: 240, reg: 24.5, pr: 6.3, sr: 8.1, cr: 10.8 },
  { p: 34, usep: 200.50, demand: 7490, solar: 70, reg: 25.8, pr: 6.6, sr: 8.5, cr: 11.3 },
  { p: 35, usep: 201.00, demand: 7520, solar: 10, reg: 26.5, pr: 6.8, sr: 8.8, cr: 11.6 },
  { p: 36, usep: 265.40, demand: 7550, solar: 0, reg: 28.9, pr: 7.2, sr: 9.3, cr: 12.2 },
  { p: 37, usep: 290.80, demand: 7560, solar: 0, reg: 31.0, pr: 7.6, sr: 9.8, cr: 12.9 },
  { p: 38, usep: 295.00, demand: 7540, solar: 0, reg: 30.5, pr: 7.5, sr: 9.7, cr: 12.7 },
  { p: 39, usep: 298.20, demand: 7510, solar: 0, reg: 29.8, pr: 7.3, sr: 9.4, cr: 12.3 },
  { p: 40, usep: 305.60, demand: 7450, solar: 0, reg: 28.2, pr: 7.0, sr: 9.0, cr: 11.8 },
  { p: 41, usep: 300.00, demand: 7350, solar: 0, reg: 26.4, pr: 6.6, sr: 8.5, cr: 11.2 },
  { p: 42, usep: 298.50, demand: 7210, solar: 0, reg: 24.0, pr: 6.1, sr: 7.8, cr: 10.3 },
  { p: 43, usep: 299.10, demand: 7040, solar: 0, reg: 21.8, pr: 5.6, sr: 7.1, cr: 9.4 },
  { p: 44, usep: 285.00, demand: 6860, solar: 0, reg: 19.5, pr: 5.1, sr: 6.4, cr: 8.5 },
  { p: 45, usep: 260.40, demand: 6690, solar: 0, reg: 17.2, pr: 4.7, sr: 5.8, cr: 7.7 },
  { p: 46, usep: 310.80, demand: 6550, solar: 0, reg: 18.0, pr: 4.8, sr: 6.0, cr: 8.0 },
  { p: 47, usep: 180.20, demand: 6420, solar: 0, reg: 15.5, pr: 4.3, sr: 5.3, cr: 7.1 },
  { p: 48, usep: 230.00, demand: 6300, solar: 0, reg: 16.0, pr: 4.4, sr: 5.5, cr: 7.3 },
].map((item) => {
  const { time, timeRange } = formatPeriodTime(item.p);
  const isPast = item.p < 25;
  const isCurrent = item.p === 25;
  const isFuture = item.p > 25;
  
  // Total gas generation = demand - solar - small imports
  const ccgt = Math.round(item.demand * 0.88 - item.solar * 0.7);
  const ocgt = Math.max(50, Math.round(item.demand * 0.05));
  const wte = 220;
  const imp = 100;

  return {
    period: item.p,
    time,
    timeRange,
    usep: item.usep,
    demand: item.demand,
    solar: item.solar,
    vcp: 225.90, // Benchmark VCP
    isPast,
    isCurrent,
    isFuture,
    regulation: item.reg,
    primaryReserve: item.pr,
    secondaryReserve: item.sr,
    contingencyReserve: item.cr,
    ccgtGen: ccgt,
    ocgtGen: ocgt,
    wasteToEnergy: wte,
    imports: imp,
  };
});

export const sampleReports: MarketReport[] = [
  {
    id: 'rep-01',
    title: 'Daily Market Summary - 05 Oct 2026',
    category: 'Daily',
    date: '05 Oct 2026',
    fileSize: '482 KB',
    type: 'PDF',
    description: 'Operational summary of demand, USEP, solar penetration, and reserve clearance across all 48 settlement periods.',
  },
  {
    id: 'rep-02',
    title: 'Weekly Market Assessment (Week 40, 2026)',
    category: 'Weekly',
    date: '02 Oct 2026',
    fileSize: '1.2 MB',
    type: 'PDF',
    description: 'Weekly analysis of gas fuel prices, reserve requirements, outage impacts, and vesting cover ratio.',
  },
  {
    id: 'rep-03',
    title: 'Monthly Market Performance Report (September 2026)',
    category: 'Monthly',
    date: '01 Oct 2026',
    fileSize: '3.4 MB',
    type: 'PDF',
    description: 'Comprehensive review of wholesale market outcomes, MEUC settlement, nodal price differentials, and capacity margin.',
  },
  {
    id: 'rep-04',
    title: 'Quarterly Capacity & Reserve Margin Review (Q3 2026)',
    category: 'Quarterly',
    date: '30 Sep 2026',
    fileSize: '4.8 MB',
    type: 'PDF',
    description: 'In-depth assessment of generation system adequacy, reserve margin compliance, and long-term supply projections by EMC.',
  },
  {
    id: 'rep-05',
    title: 'Settlement Data Archive - Sep 2026 (Half-Hourly)',
    category: 'Monthly',
    date: '30 Sep 2026',
    fileSize: '8.2 MB',
    type: 'CSV',
    description: 'Complete 30-day raw settlement dataset covering USEP, nodal energy prices, reserve clearances, and MEUC.',
  }
];

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'Uniform Singapore Energy Price',
    abbreviation: 'USEP',
    category: 'Pricing',
    definition: 'The market clearing price for energy in the National Electricity Market of Singapore (NEMS), representing the weighted average of nodal prices across all withdrawal nodes in the system for each half-hour settlement period.'
  },
  {
    term: 'Vesting Contract Price',
    abbreviation: 'VCP',
    category: 'Contracts',
    definition: 'A benchmark electricity tariff set quarterly by the Energy Market Authority (EMA) to curb the exercise of market power by generation companies in Singapore.'
  },
  {
    term: 'Monthly Energy Uplift Charge',
    abbreviation: 'MEUC',
    category: 'Pricing',
    definition: 'A charge levied to recover the net costs of operating the market, including ancillary services, system security costs, and transmission loss adjustments not recovered via energy prices.'
  },
  {
    term: 'Market Clearing Engine',
    abbreviation: 'MCE',
    category: 'Market System',
    definition: 'The core optimization software operated by EMC that co-optimizes energy, reserve, and regulation dispatch every 30 minutes to maximize economic efficiency while maintaining power system security.'
  },
  {
    term: 'Combined Cycle Gas Turbine',
    abbreviation: 'CCGT',
    category: 'Operations',
    definition: 'High-efficiency natural gas power plants that generate over 90% of Singapore electricity by utilizing both gas combustion turbines and steam turbines.'
  },
  {
    term: 'Contingency Reserve',
    abbreviation: 'CR',
    category: 'Pricing',
    definition: 'Generating capacity or demand response that can be brought online within 10 minutes to restore system frequency following the sudden loss of a generating unit or interconnector.'
  },
  {
    term: 'Power System Operator',
    abbreviation: 'PSO',
    category: 'Operations',
    definition: 'A division of the Energy Market Authority (EMA) responsible for maintaining real-time reliability and security of the transmission grid.'
  },
  {
    term: 'Temporary Price Cap',
    abbreviation: 'TPC',
    category: 'Pricing',
    definition: 'A regulatory mechanism established by the EMA to cap extreme price spikes in wholesale electricity during unforeseen gas supply disruptions.'
  }
];

export const faqs = [
  {
    q: 'What is USEP and how is it determined?',
    a: 'USEP stands for Uniform Singapore Energy Price. It is calculated every 30 minutes by the Market Clearing Engine (MCE) as the volume-weighted average of the nodal marginal prices for all offtake nodes across Singapore.'
  },
  {
    q: 'How frequently are NEMS prices updated on this portal?',
    a: 'Real-time prices and demand figures are updated every half hour (settlement period), typically available 1 minute past the half-hour mark (e.g. 12:01 for the 12:00–12:30 period).'
  },
  {
    q: 'What is the meaning of D + 6 and D + 10 in data availability?',
    a: '"D" represents the trading day. "D + 6" indicates final preliminary settlement data verified 6 business days following the trading date. "D + 10" represents final settled financial figures with adjustments.'
  },
  {
    q: 'Why does the solar generation curve peak around 12:00-13:00?',
    a: 'Solar photovoltaic (PV) generation correlates with peak solar irradiance in equatorial Singapore. The peak solar generation currently exceeds 1,500 MW, significantly softening wholesale daytime peak prices.'
  },
  {
    q: 'How do I download historical pricing data in CSV?',
    a: 'Use the "Market Data Download" section below. Select your data stream, specify either a custom date range (up to 31 days per batch) or select by calendar year, then click "Download" to generate the CSV.'
  }
];
