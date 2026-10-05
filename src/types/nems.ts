export interface SettlementPeriodData {
  period: number; // 1 to 48
  time: string; // e.g., "12:00"
  timeRange: string; // e.g., "12:00-12:30"
  usep: number; // $/MWh
  demand: number; // MW
  solar: number; // MW
  vcp: number; // $/MWh
  isPast: boolean;
  isCurrent: boolean;
  isFuture: boolean;
  
  // Ancillary prices
  regulation?: number; // $/MWh
  primaryReserve?: number; // $/MWh
  secondaryReserve?: number; // $/MWh
  contingencyReserve?: number; // $/MWh

  // Generation mix (MW)
  ccgtGen?: number; // Combined Cycle Gas Turbine
  ocgtGen?: number; // Open Cycle Gas Turbine
  wasteToEnergy?: number;
  imports?: number;
}

export type CategoryTab = 'energy' | 'ancillary' | 'generation';

export interface MarketReport {
  id: string;
  title: string;
  category: 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly';
  date: string;
  fileSize: string;
  type: 'PDF' | 'CSV';
  description: string;
}

export interface GlossaryTerm {
  term: string;
  abbreviation?: string;
  definition: string;
  category: 'Pricing' | 'Market System' | 'Operations' | 'Contracts';
}
