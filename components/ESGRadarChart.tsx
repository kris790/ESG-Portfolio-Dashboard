import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PortfolioESGScores } from '../types';
import { ESG_COLORS, SP500_BENCHMARK } from '../constants';
import CustomTooltip from './CustomTooltip';

interface ESGRadarChartProps {
  portfolioScores: PortfolioESGScores;
}

const ESGRadarChart: React.FC<ESGRadarChartProps> = ({ portfolioScores }) => {
  const data = [
    { subject: 'Environmental', 'Portfolio': portfolioScores.environmentScore, 'S&P 500': SP500_BENCHMARK.environmentScore, fullMark: 25 },
    { subject: 'Social', 'Portfolio': portfolioScores.socialScore, 'S&P 500': SP500_BENCHMARK.socialScore, fullMark: 25 },
    { subject: 'Governance', 'Portfolio': portfolioScores.governanceScore, 'S&P 500': SP500_BENCHMARK.governanceScore, fullMark: 25 },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-96 print-container">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">ESG Category Breakdown</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 25]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Radar name="Portfolio" dataKey="Portfolio" stroke={ESG_COLORS.social} fill={ESG_COLORS.social} fillOpacity={0.6} />
          <Radar name="S&P 500" dataKey="S&P 500" stroke={ESG_COLORS.benchmark} fill={ESG_COLORS.benchmark} fillOpacity={0.4} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ESGRadarChart;
