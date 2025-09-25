
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { DashboardCard } from './DashboardCard';
import type { ChartData } from '../types';

const ActivityIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
);

interface StockChartProps {
  data: ChartData[];
  stockSymbol: string;
}

export const StockChart: React.FC<StockChartProps> = ({ data, stockSymbol }) => {
  return (
    <DashboardCard title={`${stockSymbol} 1-Min Chart`} icon={<ActivityIcon className="h-6 w-6 text-green-400" />}>
      <div className="h-[400px] lg:h-[calc(100vh-280px)] w-full p-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 2', 'dataMax + 2']} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(30, 41, 59, 0.8)',
                borderColor: '#475569',
                borderRadius: '0.5rem',
              }}
              labelStyle={{ color: '#cbd5e1' }}
            />
            <Legend wrapperStyle={{fontSize: '14px'}}/>
            <Line type="monotone" dataKey="price" stroke="#22c55e" strokeWidth={2} dot={false} name="Price" />
            <Line type="monotone" dataKey="vwap" stroke="#38bdf8" strokeWidth={2} dot={false} name="VWAP"/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};
