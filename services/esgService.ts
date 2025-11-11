
import { ESGScore } from '../types';

// Mock data to simulate API responses for specific tickers
const MOCK_ESG_DATA: { [key: string]: Omit<ESGScore, 'ticker'> } = {
  'AAPL': { totalESG: 16.8, environmentScore: 0.7, socialScore: 6.2, governanceScore: 9.9, highestControversy: 3, esgPerformance: 'LEADER' },
  'MSFT': { totalESG: 15.3, environmentScore: 1.5, socialScore: 7.0, governanceScore: 6.8, highestControversy: 2, esgPerformance: 'LEADER' },
  'TSLA': { totalESG: 28.6, environmentScore: 7.1, socialScore: 13.5, governanceScore: 8.0, highestControversy: 4, esgPerformance: 'AVERAGE' },
  'XOM': { totalESG: 36.2, environmentScore: 18.5, socialScore: 10.1, governanceScore: 7.6, highestControversy: 5, esgPerformance: 'LAGGARD' },
  'GOOGL': { totalESG: 25.1, environmentScore: 5.5, socialScore: 10.6, governanceScore: 9.0, highestControversy: 4, esgPerformance: 'AVERAGE' },
  'NVDA': { totalESG: 19.0, environmentScore: 3.0, socialScore: 8.0, governanceScore: 8.0, highestControversy: 2, esgPerformance: 'LEADER' },
  'AMZN': { totalESG: 29.8, environmentScore: 6.0, socialScore: 15.0, governanceScore: 8.8, highestControversy: 4, esgPerformance: 'AVERAGE' },
  'JPM': { totalESG: 32.1, environmentScore: 10.2, socialScore: 13.5, governanceScore: 8.4, highestControversy: 3, esgPerformance: 'LAGGARD' },
  'V': { totalESG: 22.3, environmentScore: 4.1, socialScore: 9.8, governanceScore: 8.4, highestControversy: 1, esgPerformance: 'AVERAGE' },
};

// This function simulates fetching ESG data for a given stock ticker.
// In a real application, this would make an HTTP request to an API like Yahoo Finance.
export const fetchESGScore = (ticker: string): Promise<ESGScore | null> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const upperTicker = ticker.toUpperCase();
      if (MOCK_ESG_DATA[upperTicker]) {
        resolve({
          ticker: upperTicker,
          ...MOCK_ESG_DATA[upperTicker],
        });
      } else {
        // Simulate a "not found" scenario with some random-ish data
        resolve({
          ticker: upperTicker,
          totalESG: Math.random() * 40 + 5,
          environmentScore: Math.random() * 20,
          socialScore: Math.random() * 15,
          governanceScore: Math.random() * 10,
          highestControversy: Math.floor(Math.random() * 5),
          esgPerformance: 'UNKNOWN',
        });
      }
    }, 500 + Math.random() * 500);
  });
};
