"use client";

import React, { useState } from 'react';
import { TrendingUp, TrendingDown, ShoppingCart, DollarSign, Activity, Target } from 'lucide-react';

interface TradeCardProps {
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  avgPrice?: number;
  lastTraded?: string;
  investedAmount?: number;
  avgInvestedPrice?: number;
  currentValue?: number;
  profitLoss?: number;
  profitLossPercent?: number;
  dayHigh?: number;
  dayLow?: number;
  openPrice?: number;
  previousClose?: number;
  onBuy?: (quantity: number, orderType: string) => void;
  onSell?: (quantity: number, orderType: string) => void;
  onAddToCart?: (quantity: number) => void;
}

export function TradeCard({
  price,
  change,
  changePercent,
  volume,
  avgPrice,
  lastTraded,
  investedAmount = 10000,
  avgInvestedPrice = 180.25,
  currentValue = 10540.50,
  profitLoss = 540.50,
  profitLossPercent = 5.41,
  dayHigh = 187.32,
  dayLow = 183.15,
  openPrice = 184.20,
  previousClose = 183.40,
  onBuy,
  onSell,
  onAddToCart
}: TradeCardProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const isPositive = change >= 0;

  const quickPercentages = [25, 50, 75, 100];

  const handleQuantityChange = (percentage: number) => {
    // In real app, this would calculate based on available funds
    const baseQuantity = 100;
    setQuantity(Math.floor((baseQuantity * percentage) / 100));
  };

  const formatVolume = (vol: number) => {
    if (vol >= 1000000) return `${(vol / 1000000).toFixed(1)}M`;
    if (vol >= 1000) return `${(vol / 1000).toFixed(1)}K`;
    return vol.toString();
  };

  return (
    <div className="bg-white rounded-lg border p-4 h-full overflow-y-auto">
      {/* Current Price & Change */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-gray-900">
              ${price.toFixed(2)}
            </span>
            <div className={`flex items-center space-x-1 ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {isPositive ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span className="text-sm font-medium">
                {isPositive ? '+' : ''}{change.toFixed(2)}
              </span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                isPositive 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-700">
          Last traded: {lastTraded || 'Just now'}
        </div>
      </div>

      {/* Price Details Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-800">Open:</span>
            <span className="font-medium text-gray-900">${openPrice?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-800">High:</span>
            <span className="font-medium text-green-600">${dayHigh?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-800">Volume:</span>
            <span className="font-medium text-gray-900">{formatVolume(volume)}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-800">Prev Close:</span>
            <span className="font-medium text-gray-900">${previousClose?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-800">Low:</span>
            <span className="font-medium text-red-600">${dayLow?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-800">Avg Price:</span>
            <span className="font-medium text-gray-900">${avgPrice?.toFixed(2)}</span>
          </div>
        </div>
      </div>

      

      {/* Estimated Cost */}
      <div className="bg-blue-50 rounded-lg p-3 mb-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-800">Estimated Cost:</span>
          <span className="font-bold text-blue-600">${price.toFixed(2)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => onAddToCart?.(1)}
          className="flex items-center justify-center space-x-1 bg-cyan-500 hover:bg-cyan-700 text-white font-medium py-3 px-2 text-sm rounded-lg transition-colors"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>Cart</span>
        </button>
        <button
          onClick={() => onBuy?.(1, 'market')}
          className="flex items-center justify-center space-x-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-2 text-sm rounded-lg transition-colors"
        >
          <Target className="h-4 w-4" />
          <span>Buy</span>
        </button>
        <button
          onClick={() => onSell?.(1, 'market')}
          className="flex items-center justify-center space-x-1 bg-red-500 hover:bg-red-700 text-white font-medium py-3 px-2 text-sm rounded-lg transition-colors"
        >
          <Activity className="h-4 w-4" />
          <span>Sell</span>
        </button>
      </div>
    </div>
  );
}

export default TradeCard;