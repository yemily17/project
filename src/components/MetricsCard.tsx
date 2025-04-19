import React, { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: number;
  change: number;
  icon: ReactNode;
  color: string;
}

const MetricsCard: React.FC<MetricsCardProps> = ({ title, value, change, icon, color }) => {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <span className={`p-2 rounded-full ${color}`}>
          {icon}
        </span>
      </div>
      
      <div className="flex items-baseline">
        <p className="text-2xl font-bold">{value}</p>
        <div className={`ml-3 flex items-center text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? (
            <TrendingUp className="h-4 w-4 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 mr-1" />
          )}
          <span>{isPositive ? '+' : ''}{change}</span>
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;