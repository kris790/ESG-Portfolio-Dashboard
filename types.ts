
export interface Holding {
  ticker: string;
  shares: number;
  marketValue?: number;
}

export interface ESGScore {
  ticker: string;
  totalESG: number;
  environmentScore: number;
  socialScore: number;
  governanceScore: number;
  highestControversy: number;
  esgPerformance: 'LEADER' | 'AVERAGE' | 'LAGGARD' | 'UNKNOWN';
}

export interface PortfolioESGScores {
  totalESG: number;
  environmentScore: number;
  socialScore: number;
  governanceScore: number;
}
