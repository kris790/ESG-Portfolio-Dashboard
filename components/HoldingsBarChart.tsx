import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ESGScore } from '../types';
import { ESG_COLORS } from '../constants';
import CustomTooltip from './CustomTooltip';

interface HoldingsBarChartProps {
  esgData: ESGScore[];
  onBarClick: (ticker: string) => void;
  highlightedTicker: string | null;
}

const HoldingsBarChart: React.FC<HoldingsBarChartProps> = ({ esgData, onBarClick, highlightedTicker }) => {
  const getBarColor = (value: number) => {
    if (value < 20) return ESG_COLORS.good;
    if (value < 30) return ESG_COLORS.medium;
    return ESG_COLORS.poor;
  };

  const sortedData = [...esgData].sort((a, b) => a.totalESG - b.totalESG);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-96 print-container">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Holdings ESG Risk Score (Lower is Better)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={sortedData} 
          layout="vertical" 
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
          <XAxis type="number" stroke="#9ca3af" />
          <YAxis dataKey="ticker" type="category" stroke="#9ca3af" width={60} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(75, 85, 99, 0.2)' }} />
          {/* FIX: The onClick handler for a Bar in recharts receives an object where the original data is in the `payload` property. */}
          <Bar dataKey="totalESG" name="Total ESG Score" background={{ fill: '#374151' }} onClick={(data) => onBarClick(data.payload.ticker)}>
            {sortedData.map((entry) => (
              <Cell 
                key={`cell-${entry.ticker}`} 
                fill={getBarColor(entry.totalESG)}
                className="cursor-pointer"
                opacity={highlightedTicker === null || highlightedTicker === entry.ticker ? 1 : 0.4} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HoldingsBarChart;