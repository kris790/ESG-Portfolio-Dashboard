
import { Holding, ESGScore, PortfolioESGScores } from '../types';

// Mock price data for calculating market value
const MOCK_PRICES: { [key: string]: number } = {
  'AAPL': 170.5,
  'MSFT': 420.0,
  'TSLA': 180.2,
  'XOM': 115.8,
  'GOOGL': 175.4,
  'NVDA': 1200.0,
  'AMZN': 185.1,
  'JPM': 200.3,
  'V': 275.9,
};

export const calculatePortfolioMetrics = (holdings: Holding[], esgData: Map<string, ESGScore>): {
  portfolioWithMarketValue: Holding[];
  totalMarketValue: number;
  weightedScores: PortfolioESGScores;
} => {
  let totalMarketValue = 0;
  
  const portfolioWithMarketValue = holdings.map(h => {
    const price = MOCK_PRICES[h.ticker.toUpperCase()] || Math.random() * 500 + 50; // Use mock price or random
    const marketValue = h.shares * price;
    totalMarketValue += marketValue;
    return { ...h, marketValue };
  });

  if (totalMarketValue === 0) {
    return {
      portfolioWithMarketValue,
      totalMarketValue,
      weightedScores: { totalESG: 0, environmentScore: 0, socialScore: 0, governanceScore: 0 },
    };
  }

  const initialScores: PortfolioESGScores = { totalESG: 0, environmentScore: 0, socialScore: 0, governanceScore: 0 };

  const weightedScores = portfolioWithMarketValue.reduce((acc, holding) => {
    const esg = esgData.get(holding.ticker);
    if (holding.marketValue && esg) {
      const weight = holding.marketValue / totalMarketValue;
      acc.totalESG += esg.totalESG * weight;
      acc.environmentScore += esg.environmentScore * weight;
      acc.socialScore += esg.socialScore * weight;
      acc.governanceScore += esg.governanceScore * weight;
    }
    return acc;
  }, initialScores);
  
  return { portfolioWithMarketValue, totalMarketValue, weightedScores };
};
