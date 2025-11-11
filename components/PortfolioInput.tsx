
import React, { useState } from 'react';
import { PlusIcon } from './icons';
import { Holding } from '../types';

interface PortfolioInputProps {
  onAddHolding: (holding: Holding) => void;
  existingTickers: Set<string>;
}

const PortfolioInput: React.FC<PortfolioInputProps> = ({ onAddHolding, existingTickers }) => {
  const [ticker, setTicker] = useState('');
  const [shares, setShares] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const upperTicker = ticker.trim().toUpperCase();
    if (!/^[A-Z]{1,5}$/.test(upperTicker)) {
      setError('Ticker must be 1-5 uppercase letters.');
      return;
    }

    if (existingTickers.has(upperTicker)) {
      setError('This ticker is already in your portfolio.');
      return;
    }

    const sharesNum = parseFloat(shares);
    if (isNaN(sharesNum) || sharesNum <= 0) {
      setError('Shares must be a positive number.');
      return;
    }
    
    onAddHolding({ ticker: upperTicker, shares: sharesNum });
    setTicker('');
    setShares('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md no-print">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Add Holding</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="ticker" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ticker</label>
          <input
            id="ticker"
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            placeholder="e.g., AAPL"
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="shares" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Shares</label>
          <input
            id="shares"
            type="number"
            value={shares}
            onChange={(e) => setShares(e.target.value)}
            placeholder="e.g., 10"
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-white"
          />
        </div>
        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        <button type="submit" className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
          <PlusIcon /> Add to Portfolio
        </button>
      </form>
    </div>
  );
};

export default PortfolioInput;
