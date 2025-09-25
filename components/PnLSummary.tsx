
import React from 'react';

const TrendingUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

interface PnLSummaryProps {
  totalPnl: number;
}

export const PnLSummary: React.FC<PnLSummaryProps> = ({ totalPnl }) => {
  const isProfit = totalPnl >= 0;
  const pnlColor = isProfit ? 'text-green-400' : 'text-red-400';
  const bgColor = isProfit ? 'bg-green-500/10' : 'bg-red-500/10';
  const borderColor = isProfit ? 'border-green-500/30' : 'border-red-500/30';

  return (
    <div className={`rounded-xl p-6 shadow-lg border ${bgColor} ${borderColor} backdrop-blur-sm flex items-center justify-between`}>
      <div>
        <h2 className="text-sm font-medium text-gray-400">TODAY'S P&L</h2>
        <p className={`text-4xl font-bold ${pnlColor} mt-1`}>
          {isProfit ? '+' : ''}₹{totalPnl.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>
      <div className={`p-4 rounded-full ${bgColor}`}>
        <TrendingUpIcon className={`h-8 w-8 ${pnlColor}`} />
      </div>
    </div>
  );
};
