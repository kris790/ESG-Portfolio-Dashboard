import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Holding, ESGScore, PortfolioESGScores } from './types';
import { TEST_PORTFOLIO, ESG_COLORS } from './constants';
import { fetchESGScore } from './services/esgService';
import { calculatePortfolioMetrics } from './services/portfolioService';
import PortfolioInput from './components/PortfolioInput';
import HoldingsTable from './components/HoldingsTable';
import MetricCard from './components/MetricCard';
import ESGRadarChart from './components/ESGRadarChart';
import HoldingsBarChart from './components/HoldingsBarChart';
import ChatPanel from './components/InsightsPanel';
import Spinner from './components/Spinner';
import { PrinterIcon } from './components/icons';
import Welcome from './components/Welcome';
import BenchmarkComparison from './components/BenchmarkComparison';

const App: React.FC = () => {
    const [holdings, setHoldings] = useState<Holding[]>(TEST_PORTFOLIO);
    const [esgData, setEsgData] = useState<Map<string, ESGScore>>(new Map());
    const [loadingTickers, setLoadingTickers] = useState<Set<string>>(new Set());
    const [reportDate, setReportDate] = useState('');

    const existingTickers = useMemo(() => new Set(holdings.map(h => h.ticker)), [holdings]);

    const handlePrint = () => {
        const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        setReportDate(date);
        setTimeout(() => {
            window.print();
        }, 100);
    };

    const fetchAllEsgScores = useCallback(async (currentHoldings: Holding[]) => {
        const newLoadingTickers = new Set<string>();
        currentHoldings.forEach(h => {
            if (!esgData.has(h.ticker)) {
                newLoadingTickers.add(h.ticker);
            }
        });

        if (newLoadingTickers.size === 0) return;

        setLoadingTickers(prev => new Set([...prev, ...newLoadingTickers]));

        const promises = Array.from(newLoadingTickers).map(ticker => fetchESGScore(ticker));
        const results = await Promise.all(promises);

        setEsgData(prev => {
            const newMap = new Map(prev);
            results.forEach(score => {
                if (score) {
                    newMap.set(score.ticker, score);
                }
            });
            return newMap;
        });

        setLoadingTickers(prev => {
            const newSet = new Set(prev);
            newLoadingTickers.forEach(ticker => newSet.delete(ticker));
            return newSet;
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        fetchAllEsgScores(holdings);
    }, [holdings, fetchAllEsgScores]);
    
    const { portfolioWithMarketValue, weightedScores } = useMemo(() => {
        return calculatePortfolioMetrics(holdings, esgData);
    }, [holdings, esgData]);

    const addHolding = (holding: Holding) => {
        setHoldings(prev => [...prev, holding]);
    };

    const removeHolding = (ticker: string) => {
        setHoldings(prev => prev.filter(h => h.ticker !== ticker));
        setEsgData(prev => {
            const newMap = new Map(prev);
            newMap.delete(ticker);
            return newMap;
        });
    };
    
    const getScoreColor = (score: number) => {
        if (score < 20) return 'text-emerald-500';
        if (score < 30) return 'text-amber-500';
        return 'text-red-500';
    };

    const getPrintBorderColor = (score: number) => {
        if (score < 20) return 'print-border-emerald-500';
        if (score < 30) return 'print-border-amber-500';
        return 'print-border-red-500';
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
            <main className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-8 print:mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">My Portfolio ESG Dashboard</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1 no-print">Monitor the sustainability of your investments.</p>
                        <p className="text-gray-500 dark:text-gray-400 mt-1 hidden print:block">ESG Performance Report as of {reportDate}</p>
                    </div>
                    <button onClick={handlePrint} className="no-print p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" title="Export as PDF / Print Report">
                        <PrinterIcon/>
                    </button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column / Sidebar */}
                    <aside className="lg:col-span-1 space-y-8 no-print">
                        <PortfolioInput onAddHolding={addHolding} existingTickers={existingTickers} />
                        <ChatPanel
                            holdings={portfolioWithMarketValue}
                            esgData={esgData}
                        />
                    </aside>

                    {/* Right Column / Main Content */}
                    <div className="lg:col-span-2 space-y-8 print-container">
                        {holdings.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 print:grid-cols-2">
                                    <MetricCard title="Portfolio ESG Score" value={weightedScores.totalESG.toFixed(2)} colorClass={getScoreColor(weightedScores.totalESG)} printBorderClass={getPrintBorderColor(weightedScores.totalESG)} />
                                    <MetricCard title="Environmental Risk" value={weightedScores.environmentScore.toFixed(2)} colorClass="text-green-500" printBorderClass="print-border-green-500" />
                                    <MetricCard title="Social Risk" value={weightedScores.socialScore.toFixed(2)} colorClass="text-blue-500" printBorderClass="print-border-blue-500" />
                                    <MetricCard title="Governance Risk" value={weightedScores.governanceScore.toFixed(2)} colorClass="text-purple-500" printBorderClass="print-border-purple-500" />
                                </div>
                                
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 print-chart-container">
                                    <ESGRadarChart portfolioScores={weightedScores} />
                                    <HoldingsBarChart esgData={Array.from(esgData.values())} />
                                </div>

                                <BenchmarkComparison portfolioScores={weightedScores} />

                                <HoldingsTable
                                    holdings={portfolioWithMarketValue}
                                    esgData={esgData}
                                    onRemoveHolding={removeHolding}
                                    loadingTickers={loadingTickers}
                                />
                            </>
                        ) : (
                            <Welcome />
                        )}
                    </div>
                </div>
            </main>
            <footer className="hidden print:block print-footer">
                <span>ESG Performance Report | {reportDate}</span>
                <span className="page-number"></span>
            </footer>
        </div>
    );
};

export default App;