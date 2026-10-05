import React from 'react';

interface HeroBannerProps {
  onBreadcrumbHome: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onBreadcrumbHome }) => {
  return (
    <section
      className="hero-banner w-full py-14 sm:py-16 px-4 sm:px-6 lg:px-8 text-white shadow-inner relative"
      data-purpose="hero-section"
    >
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="text-xs text-white/90 mb-5 font-normal tracking-wide flex items-center space-x-1.5"
        >
          <button
            onClick={onBreadcrumbHome}
            className="hover:underline focus:outline-none cursor-pointer"
          >
            Home
          </button>
          <span className="text-white/60">›</span>
          <span className="text-white/90 font-medium">Nems Prices</span>
        </nav>

        {/* Main Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-sm">
            NEMS Prices
          </h1>
          <div className="flex items-center gap-2 text-xs text-blue-100 font-medium bg-black/25 backdrop-blur-xs py-1.5 px-3 rounded-full border border-white/15 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>National Electricity Market of Singapore (NEMS) Live</span>
          </div>
        </div>
      </div>
    </section>
  );
};
