import { Holding, ESGScore, PortfolioESGScores } from '../types';

export const calculatePortfolioMetrics = (
  holdings: Holding[],
  esgData: Map<string, ESGScore>,
  prices: Map<string, number>
): {
  portfolioWithMarketValue: Holding[];
  totalMarketValue: number;
  weightedScores: PortfolioESGScores;
} => {
  let totalMarketValue = 0;
  
  const portfolioWithMarketValue = holdings.map(h => {
    const price = prices.get(h.ticker.toUpperCase()) || 0;
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
