import React from 'react';

interface StockHeaderProps {
  symbol: string;
  companyName: string;
  price: number;
  change: number;
  changePercent: number;
  dayHigh: number;
  dayLow: number;
  marketCap: number;
  sector: string;
  industry: string;
}

export function StockHeader({
  symbol,
  companyName, 
  price,
  change,
  changePercent,
  dayHigh,
  dayLow,
  marketCap,
  sector,
  industry
}: StockHeaderProps) {
  const isPositive = change >= 0;
  const formatMarketCap = (value: number) => {
    if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
    return value.toString();
  };

  return (
    <div className="bg-white border-b  ">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left side - Stock info */}
        <div className="flex flex-col space-y-2 mt-10 lg:mt-10  ">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-gray-900">{companyName}</h1>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {symbol}
            </span>
          </div>
          
          <div className="flex items-baseline space-x-3">
            <span className="text-3xl font-bold text-gray-900">
              ${price.toFixed(2)}
            </span>
            <span className={`text-lg font-medium ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {isPositive ? '+' : ''}{change.toFixed(2)}
            </span>
            <span className={`text-sm px-2 py-1 rounded ${
              isPositive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
            </span>
          </div>

          <div className="text-sm text-gray-600">
            <span>52W Low: ${dayLow.toFixed(2)}</span>
            <span className="mx-2">•</span>
            <span>52W High: ${dayHigh.toFixed(2)}</span>
          </div>
        </div>

        {/* Right side - Company details */}
        <div className="flex flex-col lg:items-end space-y-2 text-sm text-gray-600">
          <div className="flex flex-col lg:text-right">
            <span className="font-medium">Large Cap</span>
            <span>${formatMarketCap(marketCap)} Cr</span>
          </div>
          <div className="flex flex-col lg:text-right">
            <span>Sector: {sector}</span>
            <span>Industry: {industry}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockHeader;