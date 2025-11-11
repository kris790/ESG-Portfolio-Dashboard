
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ESGScore } from '../types';
import { ESG_COLORS } from '../constants';

interface HoldingsBarChartProps {
  esgData: ESGScore[];
}

const HoldingsBarChart: React.FC<HoldingsBarChartProps> = ({ esgData }) => {
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
        <BarChart data={sortedData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
          <XAxis type="number" stroke="#9ca3af" />
          <YAxis dataKey="ticker" type="category" stroke="#9ca3af" width={60} />
          <Tooltip
            cursor={{ fill: 'rgba(75, 85, 99, 0.2)' }}
            contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', border: 'none', borderRadius: '0.5rem' }}
            labelStyle={{ color: '#f9fafb' }}
          />
          <Legend />
          <Bar dataKey="totalESG" name="Total ESG Score" fill={ESG_COLORS.social} background={{ fill: '#374151' }}>
            {sortedData.map((entry, index) => (
              <rect key={`cell-${index}`} fill={getBarColor(entry.totalESG)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HoldingsBarChart;
