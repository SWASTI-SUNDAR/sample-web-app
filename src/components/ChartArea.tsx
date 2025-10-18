"use client";

import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Download, Plus, Settings, Maximize2 } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    borderWidth?: number;
    fill?: boolean;
    tension?: number;
  }>;
}

interface ChartAreaProps {
  symbol: string;
  data: ChartData;
  timeframes: string[];
  activeTimeframe: string;
  onChangeTimeframe: (timeframe: string) => void;
  indicators?: string[];
  onToggleIndicator?: (indicator: string) => void;
  onExport?: () => void;
  onCompare?: () => void;
  loading?: boolean;
}

export function ChartArea({
  symbol,
  data,
  timeframes,
  activeTimeframe,
  onChangeTimeframe,
  indicators = [],
  onToggleIndicator,
  onExport,
  onCompare,
  loading = false
}: ChartAreaProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: data.datasets.length > 1,
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: '#3B82F6',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: $${context.parsed.y.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 8,
          color: '#6B7280',
        },
      },
      y: {
        display: true,
        position: 'right' as const,
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
        ticks: {
          color: '#6B7280',
          callback: function(value: string | number) {
            return '$' + Number(value).toFixed(2);
          },
        },
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    elements: {
      point: {
        radius: 0,
        hoverRadius: 4,
      },
    },
  };

  const availableIndicators = [
    'MA20', 'MA50', 'RSI', 'MACD', 'Bollinger Bands', 'Volume'
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-lg border p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Price Chart</h2>
          <div className="flex space-x-2">
            {timeframes.map(tf => (
              <div key={tf} className="px-3 py-1 bg-gray-100 rounded animate-pulse h-8 w-12" />
            ))}
          </div>
        </div>
        <div className="h-80 lg:h-96 flex items-center justify-center bg-gray-50 rounded animate-pulse">
          <div className="text-gray-500">Loading chart data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border h-full flex flex-col">
      <div className="p-3 flex-1 flex flex-col">
        {/* Chart Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">{symbol} Chart</h2>
          
          {/* Timeframe buttons */}
          <div className="flex space-x-1 bg-gray-100 rounded p-1">
            {timeframes.map(tf => (
              <button
                key={tf}
                onClick={() => onChangeTimeframe(tf)}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  activeTimeframe === tf
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="flex-1 min-h-0">
          <Line data={data} options={options} />
        </div>

        {/* Chart Footer */}
        <div className="mt-2 text-xs text-gray-500 text-center">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}

export default ChartArea;