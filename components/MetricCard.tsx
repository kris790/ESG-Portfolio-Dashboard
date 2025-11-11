
import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  colorClass: string;
  printBorderClass: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, colorClass, printBorderClass }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md print-container metric-card-print ${printBorderClass}`}>
      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{title}</h4>
      <p className={`mt-2 text-4xl font-bold ${colorClass}`}>{value}</p>
    </div>
  );
};

export default MetricCard;