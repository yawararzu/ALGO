
import React from 'react';

const ChartBarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 3v18h18" />
    <path d="M7 12h4" />
    <path d="M12 8h4" />
    <path d="M17 16h4" />
  </svg>
);

const CrownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
  </svg>
);

interface HeaderProps {
  onPricingClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onPricingClick }) => {
  return (
    <header className="bg-slate-950/70 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <ChartBarIcon className="h-8 w-8 text-cyan-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-100 tracking-tight">
              VWAP Precision Algo
            </h1>
          </div>
          <div className="flex items-center space-x-4">
             <div className="flex items-center space-x-2">
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-green-400 hidden sm:block">NSE Market: OPEN</span>
             </div>
             <button
              onClick={onPricingClick}
              className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <CrownIcon className="h-5 w-5" />
              <span>Upgrade Plan</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
