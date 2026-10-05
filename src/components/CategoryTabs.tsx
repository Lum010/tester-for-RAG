import React from 'react';
import { CategoryTab } from '../types/nems';

interface CategoryTabsProps {
  activeTab: CategoryTab;
  onSelectTab: (tab: CategoryTab) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeTab,
  onSelectTab,
}) => {
  return (
    <div className="border-b border-gray-200 mb-8" data-purpose="tab-navigation">
      <div className="flex space-x-6 sm:space-x-8 -mb-px overflow-x-auto no-scrollbar">
        <button
          onClick={() => onSelectTab('energy')}
          className={`pb-3 px-1 text-sm font-semibold transition-colors flex items-center whitespace-nowrap cursor-pointer ${
            activeTab === 'energy'
              ? 'text-gray-900 border-b-2 border-[#e30613]'
              : 'text-gray-600 hover:text-[#0055b8] border-b-2 border-transparent'
          }`}
        >
          Energy Prices and Demand
        </button>

        <button
          onClick={() => onSelectTab('ancillary')}
          className={`pb-3 px-1 text-sm font-semibold transition-colors flex items-center whitespace-nowrap cursor-pointer ${
            activeTab === 'ancillary'
              ? 'text-gray-900 border-b-2 border-[#e30613]'
              : 'text-gray-600 hover:text-[#0055b8] border-b-2 border-transparent'
          }`}
        >
          Ancillary Service Prices
        </button>

        <button
          onClick={() => onSelectTab('generation')}
          className={`pb-3 px-1 text-sm font-semibold transition-colors flex items-center whitespace-nowrap cursor-pointer ${
            activeTab === 'generation'
              ? 'text-gray-900 border-b-2 border-[#e30613]'
              : 'text-gray-600 hover:text-[#0055b8] border-b-2 border-transparent'
          }`}
        >
          Market Generation
        </button>
      </div>
    </div>
  );
};
