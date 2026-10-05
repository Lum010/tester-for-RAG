import React, { useState } from 'react';
import { SettlementPeriodData, CategoryTab } from '../types/nems';
import { Search, Download, ArrowUpDown, Check } from 'lucide-react';

interface DataTableProps {
  periods: SettlementPeriodData[];
  selectedPeriod: SettlementPeriodData;
  onSelectPeriod: (period: SettlementPeriodData) => void;
  category: CategoryTab;
}

type SortField = 'period' | 'usep' | 'demand' | 'solar' | 'regulation';
type SortOrder = 'asc' | 'desc';

export const DataTable: React.FC<DataTableProps> = ({
  periods,
  selectedPeriod,
  onSelectPeriod,
  category,
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'past' | 'current' | 'future'>('all');
  const [sortField, setSortField] = useState<SortField>('period');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Filter
  const filtered = periods.filter((p) => {
    const matchesSearch =
      p.period.toString().includes(search) ||
      p.time.toLowerCase().includes(search.toLowerCase()) ||
      p.timeRange.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'past'
        ? p.isPast
        : statusFilter === 'current'
        ? p.isCurrent
        : p.isFuture;

    return matchesSearch && matchesStatus;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    let aVal = a[sortField] ?? 0;
    let bVal = b[sortField] ?? 0;
    if (sortField === 'regulation') {
      aVal = a.regulation ?? 0;
      bVal = b.regulation ?? 0;
    }
    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleExportCSV = () => {
    const headers = [
      'PERIOD',
      'TIME_START',
      'TIME_RANGE',
      'STATUS',
      'USEP_SGD_MWH',
      'DEMAND_MW',
      'SOLAR_MW',
      'VCP_SGD_MWH',
      'REGULATION_SGD_MWH',
      'PRIMARY_RESERVE_SGD_MWH',
      'SECONDARY_RESERVE_SGD_MWH',
      'CONTINGENCY_RESERVE_SGD_MWH',
      'CCGT_MW',
      'OCGT_MW',
      'WTE_MW',
    ];

    const rows = sorted.map((p) => [
      p.period,
      p.time,
      p.timeRange,
      p.isCurrent ? 'CURRENT' : p.isPast ? 'PAST' : 'FORECAST',
      p.usep.toFixed(2),
      p.demand,
      p.solar,
      p.vcp.toFixed(2),
      (p.regulation ?? 0).toFixed(2),
      (p.primaryReserve ?? 0).toFixed(2),
      (p.secondaryReserve ?? 0).toFixed(2),
      (p.contingencyReserve ?? 0).toFixed(2),
      p.ccgtGen ?? 0,
      p.ocgtGen ?? 0,
      p.wasteToEnergy ?? 0,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `NEMS_Settlement_Prices_05OCT2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="w-full bg-white p-4 rounded border border-gray-200 shadow-xs mb-6">
      {/* Table Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 flex-1 max-w-sm">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search period or time (e.g. 12:00, Period 25)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0055b8]"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Segmented Filter */}
          <div className="flex items-center p-0.5 bg-gray-100 rounded text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 font-medium rounded transition-colors cursor-pointer ${
                statusFilter === 'all' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All (48)
            </button>
            <button
              onClick={() => setStatusFilter('past')}
              className={`px-2.5 py-1 font-medium rounded transition-colors cursor-pointer ${
                statusFilter === 'past' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Past
            </button>
            <button
              onClick={() => setStatusFilter('future')}
              className={`px-2.5 py-1 font-medium rounded transition-colors cursor-pointer ${
                statusFilter === 'future' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Forecast
            </button>
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 bg-[#195bb2] hover:bg-blue-800 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors shadow-xs cursor-pointer"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Downloaded!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* High-Density Data Grid */}
      <div className="overflow-x-auto max-h-[500px] border border-gray-200 rounded">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold sticky top-0 z-10">
            <tr>
              <th
                onClick={() => toggleSort('period')}
                className="py-2.5 px-3 cursor-pointer hover:bg-gray-100 whitespace-nowrap"
              >
                <div className="flex items-center gap-1">
                  <span>Period</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-400" />
                </div>
              </th>
              <th className="py-2.5 px-3 whitespace-nowrap">Time Range</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Status</th>
              <th
                onClick={() => toggleSort('usep')}
                className="py-2.5 px-3 text-right cursor-pointer hover:bg-gray-100 whitespace-nowrap"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>USEP ($/MWh)</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-400" />
                </div>
              </th>
              <th
                onClick={() => toggleSort('demand')}
                className="py-2.5 px-3 text-right cursor-pointer hover:bg-gray-100 whitespace-nowrap"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Demand (MW)</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-400" />
                </div>
              </th>
              <th
                onClick={() => toggleSort('solar')}
                className="py-2.5 px-3 text-right cursor-pointer hover:bg-gray-100 whitespace-nowrap"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Solar (MW)</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-400" />
                </div>
              </th>
              <th className="py-2.5 px-3 text-right whitespace-nowrap">VCP ($/MWh)</th>
              {category === 'ancillary' && (
                <>
                  <th className="py-2.5 px-3 text-right whitespace-nowrap">Regulation</th>
                  <th className="py-2.5 px-3 text-right whitespace-nowrap">Primary Res</th>
                  <th className="py-2.5 px-3 text-right whitespace-nowrap">Contingency</th>
                </>
              )}
              {category === 'generation' && (
                <>
                  <th className="py-2.5 px-3 text-right whitespace-nowrap">CCGT (MW)</th>
                  <th className="py-2.5 px-3 text-right whitespace-nowrap">OCGT (MW)</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-mono text-[11px] tabular-nums">
            {sorted.map((item) => {
              const isSelected = selectedPeriod.period === item.period;
              const isCurrent = item.isCurrent;

              return (
                <tr
                  key={item.period}
                  onClick={() => onSelectPeriod(item)}
                  className={`cursor-pointer transition-colors ${
                    isCurrent
                      ? 'bg-blue-50/80 font-semibold'
                      : isSelected
                      ? 'bg-amber-50/70'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <td className="py-2 px-3 text-gray-900 font-medium">
                    <span className="font-sans">#{item.period}</span>
                  </td>
                  <td className="py-2 px-3 text-gray-600 font-sans">{item.timeRange}</td>
                  <td className="py-2 px-3 font-sans">
                    {isCurrent ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                        Current
                      </span>
                    ) : item.isPast ? (
                      <span className="text-[10px] text-gray-500">Past</span>
                    ) : (
                      <span className="text-[10px] text-cyan-700 font-medium">Forecast</span>
                    )}
                  </td>
                  <td className="py-2 px-3 text-right text-gray-900 font-medium">
                    ${item.usep.toFixed(2)}
                  </td>
                  <td className="py-2 px-3 text-right text-gray-800">
                    {item.demand.toLocaleString()}
                  </td>
                  <td className="py-2 px-3 text-right text-lime-700 font-medium">
                    {item.solar.toLocaleString()}
                  </td>
                  <td className="py-2 px-3 text-right text-gray-600">${item.vcp.toFixed(2)}</td>

                  {category === 'ancillary' && (
                    <>
                      <td className="py-2 px-3 text-right text-purple-700">
                        ${(item.regulation ?? 0).toFixed(2)}
                      </td>
                      <td className="py-2 px-3 text-right text-blue-700">
                        ${(item.primaryReserve ?? 0).toFixed(2)}
                      </td>
                      <td className="py-2 px-3 text-right text-amber-700">
                        ${(item.contingencyReserve ?? 0).toFixed(2)}
                      </td>
                    </>
                  )}

                  {category === 'generation' && (
                    <>
                      <td className="py-2 px-3 text-right text-sky-800">
                        {(item.ccgtGen ?? 0).toLocaleString()}
                      </td>
                      <td className="py-2 px-3 text-right text-orange-700">
                        {(item.ocgtGen ?? 0).toLocaleString()}
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
