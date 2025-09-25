
import React from 'react';
import { DashboardCard } from './DashboardCard';
import type { Signal } from '../types';
import { SignalType } from '../types';

const ZapIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
);

interface SignalFeedProps {
  signals: Signal[];
}

export const SignalFeed: React.FC<SignalFeedProps> = ({ signals }) => {
  return (
    <DashboardCard title="Live Signals" icon={<ZapIcon className="h-6 w-6 text-yellow-400" />}>
      <div className="space-y-3 max-h-[400px] lg:max-h-[calc(100vh-280px)] overflow-y-auto pr-2">
        {signals.length === 0 && <p className="text-slate-400 text-center py-4">Awaiting signals...</p>}
        {signals.map((signal) => (
          <div key={signal.id} className="p-3 rounded-lg bg-slate-700/50 border border-slate-600/50">
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-100">{signal.stockSymbol}</span>
              <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${signal.type === SignalType.BUY ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {signal.type}
              </span>
            </div>
            <p className="text-sm text-gray-300 mt-1">
              @ {signal.price.toFixed(2)}
            </p>
             <p className="text-xs text-slate-400 mt-1">
              {signal.reason}
            </p>
            <p className="text-xs text-slate-500 mt-2 text-right">
              {signal.timestamp.toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};
