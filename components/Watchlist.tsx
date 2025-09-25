
import React from 'react';
import { DashboardCard } from './DashboardCard';
import type { Stock } from '../types';

const EyeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);

interface WatchlistProps {
  stocks: Stock[];
  onStockSelect: (stock: Stock) => void;
}

export const Watchlist: React.FC<WatchlistProps> = ({ stocks, onStockSelect }) => {
  return (
    <DashboardCard title="Stock Universe" icon={<EyeIcon className="h-6 w-6 text-cyan-400" />}>
      <div className="overflow-x-auto max-h-[400px] lg:max-h-[calc(100vh-600px)]">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs text-gray-400 uppercase bg-slate-900/50 sticky top-0">
            <tr>
              <th scope="col" className="px-4 py-3">Symbol</th>
              <th scope="col" className="px-4 py-3">LTP</th>
              <th scope="col" className="px-4 py-3">Chg%</th>
              <th scope="col" className="px-4 py-3">VWAP</th>
              <th scope="col" className="px-4 py-3">ATR</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {stocks.map((stock) => {
              const changeColor = stock.change >= 0 ? 'text-green-400' : 'text-red-400';
              return (
                <tr key={stock.symbol} className="hover:bg-slate-700/50 cursor-pointer" onClick={() => onStockSelect(stock)}>
                  <td className="px-4 py-3 font-semibold text-gray-100">{stock.symbol}</td>
                  <td className={`px-4 py-3 font-mono ${changeColor}`}>{stock.ltp.toFixed(2)}</td>
                  <td className={`px-4 py-3 font-mono ${changeColor}`}>{stock.changePercent.toFixed(2)}%</td>
                  <td className="px-4 py-3 font-mono text-cyan-300">{stock.vwap.toFixed(2)}</td>
                  <td className="px-4 py-3 font-mono text-gray-400">{stock.atr.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
};
