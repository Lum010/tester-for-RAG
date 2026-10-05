import React, { useState } from 'react';
import { glossaryTerms } from '../data/mockNemsData';
import { X, Search, BookMarked } from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = glossaryTerms.filter(
    (t) =>
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      (t.abbreviation && t.abbreviation.toLowerCase().includes(search.toLowerCase())) ||
      t.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-[#0055b8]" />
            <h3 className="text-base font-bold text-gray-900">NEMS Market Glossary</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search terms or abbreviations (e.g. USEP, MEUC, VCP)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0055b8]"
            />
          </div>
        </div>

        <div className="px-6 py-4 max-h-[60vh] overflow-y-auto space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-xs text-gray-500">
              No matching terms found for "{search}".
            </div>
          ) : (
            filtered.map((item, i) => (
              <div key={i} className="border-b border-gray-100 pb-3 last:border-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <h4 className="text-xs font-bold text-[#0055b8]">{item.term}</h4>
                  {item.abbreviation && (
                    <span className="text-[11px] font-mono font-semibold text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">
                      {item.abbreviation}
                    </span>
                  )}
                  <span className="text-[10px] text-gray-400 font-medium ml-auto">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{item.definition}</p>
              </div>
            ))
          )}
        </div>

        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#0055b8] hover:bg-blue-800 text-white rounded font-medium text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
