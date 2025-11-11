import React from 'react';
import { PortfolioESGScores } from '../types';
import { SP500_BENCHMARK, ESGU_BENCHMARK, SUSL_BENCHMARK } from '../constants';

interface BenchmarkComparisonProps {
  portfolioScores: PortfolioESGScores;
}

const BenchmarkComparison: React.FC<BenchmarkComparisonProps> = ({ portfolioScores }) => {
  const comparisonData = [
    {
      metric: 'Total ESG Score',
      portfolio: portfolioScores.totalESG,
      sp500: SP500_BENCHMARK.totalESG,
      esgu: ESGU_BENCHMARK.totalESG,
      susl: SUSL_BENCHMARK.totalESG,
    },
    {
      metric: 'Environmental Risk',
      portfolio: portfolioScores.environmentScore,
      sp500: SP500_BENCHMARK.environmentScore,
      esgu: ESGU_BENCHMARK.environmentScore,
      susl: SUSL_BENCHMARK.environmentScore,
    },
    {
      metric: 'Social Risk',
      portfolio: portfolioScores.socialScore,
      sp500: SP500_BENCHMARK.socialScore,
      esgu: ESGU_BENCHMARK.socialScore,
      susl: SUSL_BENCHMARK.socialScore,
    },
    {
      metric: 'Governance Risk',
      portfolio: portfolioScores.governanceScore,
      sp500: SP500_BENCHMARK.governanceScore,
      esgu: ESGU_BENCHMARK.governanceScore,
      susl: SUSL_BENCHMARK.governanceScore,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md print-container">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Benchmark Comparison</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Metric</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Your Portfolio</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">S&P 500</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ESGU ETF</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">SUSL ETF</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {comparisonData.map((row) => (
              <tr key={row.metric}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{row.metric}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 font-bold">{row.portfolio.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{row.sp500.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{row.esgu.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{row.susl.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">ESGU: iShares ESG Aware MSCI USA ETF. SUSL: iShares MSCI USA ESG Leaders ETF. Lower scores are better.</p>
    </div>
  );
};

export default BenchmarkComparison;