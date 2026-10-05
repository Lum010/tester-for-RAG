import React, { useState } from 'react';
import { ChevronDown, Menu, X, ExternalLink, Zap } from 'lucide-react';

interface HeaderProps {
  onNavigateHome: () => void;
  onOpenGlossary: () => void;
  onOpenGuide: () => void;
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigateHome,
  onOpenGlossary,
  onOpenGuide,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* EMC Logo */}
          <button
            onClick={onNavigateHome}
            className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded cursor-pointer"
            aria-label="EMC Energy Market Company Home"
          >
            <img
              alt="EMC Energy Market Company - Forging A Resilient Energy Market"
              className="h-11 sm:h-12 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1XXR5qzy-tb0V_VB84KOW68yom-RAlWp6EUO48b9tG1xaF2OVjTAhoJO20BOqgzI3LU66m9JgtE9Bc5n6Klp6BWxQPbdlTGuN0BkeYc04GUtAEuYGMfkQVGPyyp6MGf8ZOrtAReJw0ze4aq0qVSezmTR-S4OzAKJZ0LoSr-Z-SaoY2JCRh25rzt7sXtz8ebMLfUAMHBRBfXL6u_dysQUdf5aZ322iMS2Ce6vMAg-ivBTLIjC4lAJrcI7NQ"
              referrerPolicy="no-referrer"
            />
          </button>

          {/* Desktop Navigation Bar */}
          <nav
            className="hidden lg:flex items-center space-x-1 font-medium text-sm text-gray-700"
            aria-label="Primary Navigation"
          >
            {/* About the Market */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('about-market')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => toggleDropdown('about-market')}
                className="px-3 py-7 flex items-center hover:text-[#0055b8] transition-colors cursor-pointer text-gray-700"
              >
                About the Market
                <ChevronDown className="ml-1 w-3.5 h-3.5 text-gray-500" />
              </button>
              {activeDropdown === 'about-market' && (
                <div className="absolute top-full left-0 w-64 bg-white border border-gray-200 rounded-b shadow-lg py-2 z-50">
                  <button
                    onClick={() => {
                      onOpenGuide();
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#0055b8]"
                  >
                    Singapore Electricity Market Structure
                  </button>
                  <button
                    onClick={() => {
                      onOpenGuide();
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#0055b8]"
                  >
                    Market Rules & Governance
                  </button>
                  <button
                    onClick={() => {
                      onOpenGlossary();
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#0055b8]"
                  >
                    Market Terminology & Glossary
                  </button>
                </div>
              )}
            </div>

            {/* NEMS Market Data (ACTIVE TAB) */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('market-data')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => toggleDropdown('market-data')}
                className="px-3 py-7 flex items-center text-[#0055b8] border-b-2 border-[#e30613] font-semibold transition-colors cursor-pointer"
              >
                NEMS Market Data
                <ChevronDown className="ml-1 w-3.5 h-3.5 text-[#0055b8]" />
              </button>
              {activeDropdown === 'market-data' && (
                <div className="absolute top-full left-0 w-64 bg-white border border-gray-200 rounded-b shadow-lg py-2 z-50">
                  <a
                    href="#realtime-pricing"
                    onClick={() => setActiveDropdown(null)}
                    className="block px-4 py-2 text-xs font-semibold text-[#0055b8] bg-blue-50/50"
                  >
                    NEMS Prices (USEP & Demand)
                  </a>
                  <a
                    href="#download-section"
                    onClick={() => setActiveDropdown(null)}
                    className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#0055b8]"
                  >
                    Market Data Download (D, D+6, D+10)
                  </a>
                  <button
                    onClick={() => {
                      onOpenGuide();
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#0055b8]"
                  >
                    Guide To Price Determination
                  </button>
                </div>
              )}
            </div>

            {/* Market Registration */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('registration')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => toggleDropdown('registration')}
                className="px-3 py-7 flex items-center hover:text-[#0055b8] transition-colors cursor-pointer text-gray-700"
              >
                Market Registration
                <ChevronDown className="ml-1 w-3.5 h-3.5 text-gray-500" />
              </button>
              {activeDropdown === 'registration' && (
                <div className="absolute top-full left-0 w-64 bg-white border border-gray-200 rounded-b shadow-lg py-2 z-50">
                  <span className="block px-4 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                    Registration Tracks
                  </span>
                  <a href="#overview" onClick={() => setActiveDropdown(null)} className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#0055b8]">
                    Generation & Solar Facility Registration
                  </a>
                  <a href="#overview" onClick={() => setActiveDropdown(null)} className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#0055b8]">
                    Wholesale Consumer & Retailer Access
                  </a>
                </div>
              )}
            </div>

            {/* Services */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => toggleDropdown('services')}
                className="px-3 py-7 flex items-center hover:text-[#0055b8] transition-colors cursor-pointer text-gray-700"
              >
                Services
                <ChevronDown className="ml-1 w-3.5 h-3.5 text-gray-500" />
              </button>
              {activeDropdown === 'services' && (
                <div className="absolute top-full left-0 w-56 bg-white border border-gray-200 rounded-b shadow-lg py-2 z-50">
                  <a href="#download-section" onClick={() => setActiveDropdown(null)} className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#0055b8]">
                    Data API & Feeds
                  </a>
                  <button onClick={() => { onOpenContact(); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#0055b8]">
                    Market Operations Support
                  </button>
                </div>
              )}
            </div>

            {/* Publications */}
            <a
              href="#reports-card"
              className="px-3 py-7 hover:text-[#0055b8] transition-colors text-gray-700"
            >
              Publications
            </a>

            {/* About EMC */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('about-emc')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => toggleDropdown('about-emc')}
                className="px-3 py-7 flex items-center hover:text-[#0055b8] transition-colors cursor-pointer text-gray-700"
              >
                About EMC
                <ChevronDown className="ml-1 w-3.5 h-3.5 text-gray-500" />
              </button>
              {activeDropdown === 'about-emc' && (
                <div className="absolute top-full right-0 w-56 bg-white border border-gray-200 rounded-b shadow-lg py-2 z-50">
                  <button onClick={() => { onOpenGuide(); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#0055b8]">
                    About Energy Market Company
                  </button>
                  <button onClick={() => { onOpenContact(); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#0055b8]">
                    Contact Market Operations
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          <button
            onClick={() => {
              onNavigateHome();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-semibold text-[#0055b8] border-l-4 border-[#e30613] pl-3 bg-blue-50/40"
          >
            NEMS Prices & Market Data
          </button>
          <button
            onClick={() => {
              onOpenGuide();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-gray-700 hover:text-[#0055b8] pl-4"
          >
            About the Market & Guide
          </button>
          <button
            onClick={() => {
              onOpenGlossary();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-gray-700 hover:text-[#0055b8] pl-4"
          >
            Glossary of NEMS Terms
          </button>
          <a
            href="#download-section"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-gray-700 hover:text-[#0055b8] pl-4"
          >
            Market Data Download
          </a>
          <a
            href="#reports-card"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-gray-700 hover:text-[#0055b8] pl-4"
          >
            Trading Reports
          </a>
          <button
            onClick={() => {
              onOpenContact();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-gray-700 hover:text-[#0055b8] pl-4"
          >
            Contact EMC
          </button>
        </div>
      )}
    </header>
  );
};
