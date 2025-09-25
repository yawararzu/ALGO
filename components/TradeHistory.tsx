
import React from 'react';
import { DashboardCard } from './DashboardCard';
import type { Trade } from '../types';
import { SignalType } from '../types';

const HistoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
);

interface TradeHistoryProps {
  trades: Trade[];
}

export const TradeHistory: React.FC<TradeHistoryProps> = ({ trades }) => {
  return (
    <DashboardCard title="Trade History" icon={<HistoryIcon className="h-6 w-6 text-purple-400" />}>
      <div className="overflow-x-auto max-h-[400px] lg:max-h-[calc(100vh-600px)]">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs text-gray-400 uppercase bg-slate-900/50 sticky top-0">
            <tr>
              <th scope="col" className="px-4 py-3">Symbol</th>
              <th scope="col" className="px-4 py-3">Type</th>
              <th scope="col" className="px-4 py-3">Entry</th>
              <th scope="col" className="px-4 py-3">P&L</th>
              <th scope="col" className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {trades.length === 0 && (
                <tr>
                    <td colSpan={5} className="text-center py-4 text-slate-400">No trades executed yet.</td>
                </tr>
            )}
            {trades.map((trade) => {
              const pnlColor = trade.pnl >= 0 ? 'text-green-400' : 'text-red-400';
              const typeColor = trade.type === SignalType.BUY ? 'text-green-400' : 'text-red-400';
              return (
                <tr key={trade.id} className="hover:bg-slate-700/50">
                  <td className="px-4 py-3 font-semibold text-gray-100">{trade.stockSymbol}</td>
                  <td className={`px-4 py-3 font-semibold ${typeColor}`}>{trade.type}</td>
                  <td className="px-4 py-3 font-mono">{trade.entryPrice.toFixed(2)}</td>
                  <td className={`px-4 py-3 font-mono ${pnlColor}`}>{trade.pnl.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${trade.status === 'OPEN' ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-600 text-slate-300'}`}>
                      {trade.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
};
