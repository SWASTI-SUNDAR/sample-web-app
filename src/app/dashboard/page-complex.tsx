"use client";

import React, { useState, useEffect } from "react";
import StockHeader from "@/components/StockHeader";
import StockChart from "@/components/StockChart";
import CustomMetrics from "@/components/CustomMetrics";
import { fetchStockQuote, StockQuote } from "@/lib/stockData";

export default function DashboardPage() {
  const [stockQuote, setStockQuote] = useState<StockQuote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStockData() {
      try {
        const quote = await fetchStockQuote('AAPL');
        setStockQuote(quote);
      } catch (error) {
        console.error('Failed to load stock quote:', error);
      } finally {
        setLoading(false);
      }
    }

    loadStockData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  if (!stockQuote) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">Failed to load stock data</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Stock Header */}
      <StockHeader
        symbol={stockQuote.symbol}
        companyName="Apple Inc."
        price={stockQuote.price}
        change={stockQuote.change}
        changePercent={stockQuote.changesPercentage}
        dayHigh={stockQuote.dayHigh}
        dayLow={stockQuote.dayLow}
        marketCap={stockQuote.marketCap}
        sector="Utilities"
        industry="Independent Power Producers"
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Chart Section */}
          <StockChart symbol={stockQuote.symbol} />

          {/* Custom Metrics Section */}
          <CustomMetrics />
        </div>
      </div>
    </div>
  );
}
