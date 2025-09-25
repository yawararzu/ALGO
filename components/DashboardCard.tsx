
import React from 'react';

interface DashboardCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ title, icon, children, className }) => {
  return (
    <div className={`bg-slate-800/50 rounded-xl shadow-lg border border-slate-700/50 backdrop-blur-sm overflow-hidden h-full flex flex-col ${className}`}>
      <div className="p-4 border-b border-slate-700/50 flex items-center space-x-3">
        {icon}
        <h2 className="text-lg font-semibold text-gray-100">{title}</h2>
      </div>
      <div className="p-4 flex-grow overflow-y-auto">
        {children}
      </div>
    </div>
  );
};
