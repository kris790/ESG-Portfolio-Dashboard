import { ESGScore } from '../types';

// Consolidated mock data simulating a real API response
const MOCK_STOCK_DATA: { [key: string]: { esg: Omit<ESGScore, 'ticker'>, price: number } } = {
  'AAPL': {
    esg: { totalESG: 16.8, environmentScore: 0.7, socialScore: 6.2, governanceScore: 9.9, highestControversy: 3, esgPerformance: 'LEADER' },
    price: 170.5
  },
  'MSFT': {
    esg: { totalESG: 15.3, environmentScore: 1.5, socialScore: 7.0, governanceScore: 6.8, highestControversy: 2, esgPerformance: 'LEADER' },
    price: 420.0
  },
  'TSLA': {
    esg: { totalESG: 28.6, environmentScore: 7.1, socialScore: 13.5, governanceScore: 8.0, highestControversy: 4, esgPerformance: 'AVERAGE' },
    price: 180.2
  },
  'XOM': {
    esg: { totalESG: 36.2, environmentScore: 18.5, socialScore: 10.1, governanceScore: 7.6, highestControversy: 5, esgPerformance: 'LAGGARD' },
    price: 115.8
  },
  'GOOGL': {
    esg: { totalESG: 25.1, environmentScore: 5.5, socialScore: 10.6, governanceScore: 9.0, highestControversy: 4, esgPerformance: 'AVERAGE' },
    price: 175.4
  },
  'NVDA': {
    esg: { totalESG: 19.0, environmentScore: 3.0, socialScore: 8.0, governanceScore: 8.0, highestControversy: 2, esgPerformance: 'LEADER' },
    price: 1200.0
  },
  'AMZN': {
    esg: { totalESG: 29.8, environmentScore: 6.0, socialScore: 15.0, governanceScore: 8.8, highestControversy: 4, esgPerformance: 'AVERAGE' },
    price: 185.1
  },
  'JPM': {
    esg: { totalESG: 32.1, environmentScore: 10.2, socialScore: 13.5, governanceScore: 8.4, highestControversy: 3, esgPerformance: 'LAGGARD' },
    price: 200.3
  },
  'V': {
    esg: { totalESG: 22.3, environmentScore: 4.1, socialScore: 9.8, governanceScore: 8.4, highestControversy: 1, esgPerformance: 'AVERAGE' },
    price: 275.9
  },
};

interface StockData {
  esg: ESGScore;
  price: number;
}

// This function simulates fetching comprehensive data (ESG + Price) for a ticker.
// In a real application, this would call a backend endpoint that sources this data.
export const fetchStockData = (ticker: string): Promise<StockData | null> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const upperTicker = ticker.toUpperCase();
      const data = MOCK_STOCK_DATA[upperTicker];

      if (data) {
        resolve({
          esg: { ticker: upperTicker, ...data.esg },
          price: data.price
        });
      } else {
        // Simulate a "not found" scenario with random data for demonstration
        const randomEsg: ESGScore = {
          ticker: upperTicker,
          totalESG: Math.random() * 40 + 5,
          environmentScore: Math.random() * 20,
          socialScore: Math.random() * 15,
          governanceScore: Math.random() * 10,
          highestControversy: Math.floor(Math.random() * 5),
          esgPerformance: 'UNKNOWN',
        };
        const randomPrice = Math.random() * 500 + 50;
        resolve({ esg: randomEsg, price: randomPrice });
      }
    }, 500 + Math.random() * 500);
  });
};
