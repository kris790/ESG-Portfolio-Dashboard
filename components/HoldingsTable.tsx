
import React from 'react';
import { Holding, ESGScore } from '../types';
import { TrashIcon } from './icons';
import Spinner from './Spinner';

interface HoldingsTableProps {
  holdings: Holding[];
  esgData: Map<string, ESGScore>;
  onRemoveHolding: (ticker: string) => void;
  loadingTickers: Set<string>;
}

const HoldingsTable: React.FC<HoldingsTableProps> = ({ holdings, esgData, onRemoveHolding, loadingTickers }) => {
  const getRatingClass = (performance: ESGScore['esgPerformance']) => {
    switch (performance) {
      case 'LEADER': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
      case 'AVERAGE': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
      case 'LAGGARD': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md print-container">
       <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Portfolio Holdings</h3>
       <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ticker</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Shares</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Market Value</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total ESG</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rating</th>
              <th scope="col" className="relative px-6 py-3 no-print">
                <span className="sr-only">Remove</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {holdings.map((holding) => {
              const esg = esgData.get(holding.ticker);
              const isLoading = loadingTickers.has(holding.ticker);
              return (
                <tr key={holding.ticker}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{holding.ticker}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{holding.shares}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{holding.marketValue ? `$${holding.marketValue.toFixed(2)}` : '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {isLoading ? <Spinner className="w-4 h-4" /> : esg ? esg.totalESG.toFixed(2) : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {esg ? <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRatingClass(esg.esgPerformance)}`}>{esg.esgPerformance}</span> : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium no-print">
                    <button onClick={() => onRemoveHolding(holding.ticker)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              )
            })}
             {holdings.length === 0 && (
                <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500 dark:text-gray-400">
                        Your portfolio is empty. Add a holding to get started.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
       </div>
    </div>
  );
};

export default HoldingsTable;
