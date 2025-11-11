import { Holding, PortfolioESGScores } from './types';

export const TEST_PORTFOLIO: Holding[] = [
  { ticker: 'AAPL', shares: 10 },
  { ticker: 'MSFT', shares: 15 },
  { ticker: 'TSLA', shares: 5 },
  { ticker: 'XOM', shares: 20 },
  { ticker: 'GOOGL', shares: 8 }
];

export const SP500_BENCHMARK: PortfolioESGScores = {
  totalESG: 23.5,
  environmentScore: 8.5,
  socialScore: 8.0,
  governanceScore: 7.0,
};

export const ESGU_BENCHMARK: PortfolioESGScores = {
  totalESG: 18.0,
  environmentScore: 5.0,
  socialScore: 6.5,
  governanceScore: 6.5,
};

export const SUSL_BENCHMARK: PortfolioESGScores = {
  totalESG: 16.2,
  environmentScore: 4.0,
  socialScore: 5.8,
  governanceScore: 6.4,
};

export const ESG_COLORS = {
  good: '#10b981',
  medium: '#f59e0b',
  poor: '#ef4444',
  environmental: '#22c55e',
  social: '#3b82f6',
  governance: '#8b5cf6',
  benchmark: '#6b7280',
};