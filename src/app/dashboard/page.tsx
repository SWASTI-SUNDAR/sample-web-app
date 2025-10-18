"use client";

import React, { useState } from "react";
import StockHeaderCard from "@/components/StockHeaderCard";
import TradeCard from "@/components/TradeCard";
import MetricsStrip from "@/components/MetricsStrip";
import ChartArea from "@/components/ChartArea";
import PrysmScoreCard from "@/components/PrysmScoreCard";
import { PerformanceCard, ValuationCard, GrowthCard } from "@/components/ScoreCard";
import FooterActions from "@/components/FooterActions";

export default function DashboardPage() {
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [activeTimeframe, setActiveTimeframe] = useState('1D');
  const [activeIndicators, setActiveIndicators] = useState<string[]>(['MA20']);

  // Mock data
  const stockData = {
    symbol: "AAPL",
    name: "Apple Inc.",
    subtitle: "NASDAQ: AAPL",
    price: 185.75,
    change: 2.35,
    changePercent: 1.28,
    volume: 45623000,
    avgPrice: 182.45,
    lastTraded: "Just now",
    dayRange: { low: 183.50, high: 187.25 },
    industry: "Consumer Electronics",
    sector: "Technology",
    cagr: 12.5,
    sipReturns: 15.8,
    // Additional price details
    investedAmount: 15000,
    avgInvestedPrice: 178.30,
    currentValue: 16842.50,
    profitLoss: 1842.50,
    profitLossPercent: 12.28,
    dayHigh: 187.25,
    dayLow: 183.50,
    openPrice: 184.20,
    previousClose: 183.40,
    latestNews: [
      {
        title: "Apple announces new iPhone 16 with AI capabilities, stock rises 3%",
        impact: "high" as const,
        timestamp: "2 hours ago"
      },
      {
        title: "Q4 earnings beat expectations, revenue up 8% YoY",
        impact: "high" as const,
        timestamp: "1 day ago"
      }
    ],
    tags: [
      { label: "Large Cap", color: "bg-blue-100 text-blue-800" },
      { label: "Technology", color: "bg-purple-100 text-purple-800" },
      { label: "S&P 500", color: "bg-green-100 text-green-800" }
    ],
    metadata: [
      { label: "52W Low", value: "$164.08" },
      { label: "52W High", value: "$199.62" },
      { label: "Market Cap", value: "$2.88T" },
      { label: "P/E Ratio", value: "28.5" }
    ]
  };

  const metricsData = [
    { id: 'pe', name: 'P/E', value: '28.5', delta: -2.1, sparklineData: [30, 29, 28.5, 28, 28.5] },
    { id: 'peg', name: 'PEG', value: '1.8', delta: 0.3, sparklineData: [1.6, 1.7, 1.8, 1.9, 1.8] },
    { id: 'roe', name: 'ROE', value: '33.2%', delta: 1.5, sparklineData: [31, 32, 33.2, 33.5, 33.2] },
    { id: 'debt_eq', name: 'D/E', value: '1.73', delta: -0.2, sparklineData: [1.8, 1.75, 1.73, 1.7, 1.73] },
    { id: 'current', name: 'Current', value: '0.98', delta: 0.1, sparklineData: [0.9, 0.95, 0.98, 1.0, 0.98] },
    { id: 'quick', name: 'Quick', value: '0.82', delta: 0.05, sparklineData: [0.8, 0.81, 0.82, 0.83, 0.82] },
    { id: 'revenue_growth', name: 'Rev Growth', value: '8.1%', delta: 1.2, sparklineData: [6, 7, 8.1, 8.5, 8.1] },
    { id: 'margin', name: 'Margin', value: '23.8%', delta: -0.5, sparklineData: [24.5, 24, 23.8, 23.5, 23.8] }
  ];

  const chartData = {
    labels: Array.from({ length: 50 }, (_, i) => {
      const date = new Date();
      date.setMinutes(date.getMinutes() - (50 - i));
      return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    }),
    datasets: [
      {
        label: 'AAPL Price',
        data: Array.from({ length: 50 }, () => 185 + (Math.random() - 0.5) * 8),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.1
      }
    ]
  };

  const timeframes = ['1D', '1W', '1M', '3M', '6M', '1Y'];

  const handleMetricClick = (metric: any) => {
    console.log('Metric clicked:', metric);
    // Could open a modal with detailed metric info
  };

  const handleBuy = (quantity: number, orderType: string) => {
    console.log(`Buy ${quantity} shares as ${orderType} order`);
    // Implement buy logic
  };

  const handleSell = (quantity: number, orderType: string) => {
    console.log(`Sell ${quantity} shares as ${orderType} order`);
    // Implement sell logic
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4 max-w-7xl">
        
        {/* Header Section - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {/* Stock Info Card */}
          <div className="lg:col-span-2">
            <StockHeaderCard
              name={stockData.name}
              subtitle={stockData.subtitle}
              tags={stockData.tags}
              metadata={stockData.metadata}
              dayRange={stockData.dayRange}
              industry={stockData.industry}
              sector={stockData.sector}
              latestNews={stockData.latestNews}
              cagr={stockData.cagr}
              sipReturns={stockData.sipReturns}
              onWatchlist={() => setIsWatchlisted(!isWatchlisted)}
              onShare={() => console.log('Share clicked')}
              onChat={() => console.log('Chat clicked')}
              onTools={() => console.log('Tools clicked')}
              isWatchlisted={isWatchlisted}
            />
          </div>
          
          {/* Trade Card */}
          <div className="lg:col-span-1">
            <TradeCard
              price={stockData.price}
              change={stockData.change}
              changePercent={stockData.changePercent}
              volume={stockData.volume}
              avgPrice={stockData.avgPrice}
              lastTraded={stockData.lastTraded}
              investedAmount={stockData.investedAmount}
              avgInvestedPrice={stockData.avgInvestedPrice}
              currentValue={stockData.currentValue}
              profitLoss={stockData.profitLoss}
              profitLossPercent={stockData.profitLossPercent}
              dayHigh={stockData.dayHigh}
              dayLow={stockData.dayLow}
              openPrice={stockData.openPrice}
              previousClose={stockData.previousClose}
              onBuy={handleBuy}
              onSell={handleSell}
              onAddToCart={(quantity) => console.log(`Added ${quantity} shares to cart`)}
            />
          </div>
        </div>

        {/* Metrics Strip */}
        <div className="mb-4">
          <MetricsStrip
            metrics={metricsData}
            onClickMetric={handleMetricClick}
          />
        </div>

        {/* Main Content Area - Responsive Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
          {/* Chart Area */}
          <div className="xl:col-span-3">
            <ChartArea
              symbol={stockData.symbol}
              data={chartData}
              timeframes={timeframes}
              activeTimeframe={activeTimeframe}
              onChangeTimeframe={setActiveTimeframe}
              indicators={activeIndicators}
              onToggleIndicator={(indicator) => {
                setActiveIndicators(prev => 
                  prev.includes(indicator) 
                    ? prev.filter(i => i !== indicator)
                    : [...prev, indicator]
                );
              }}
              onExport={() => console.log('Export chart')}
              onCompare={() => console.log('Compare stocks')}
            />
          </div>

          {/* Right Sidebar - Scores & Analysis */}
          <div className="xl:col-span-1 space-y-4">
            {/* Prysm Score Card */}
            <PrysmScoreCard
              score={80}
              percentile={85}
              rank={750}
              totalStocks={5000}
            />

            {/* Score Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-4">
              <PerformanceCard onClick={() => console.log('Performance clicked')} />
              <ValuationCard onClick={() => console.log('Valuation clicked')} />
              <GrowthCard onClick={() => console.log('Growth clicked')} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}