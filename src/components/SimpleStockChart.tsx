"use client";

import React, { useState, useEffect } from 'react';
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

// Register Chart.js components
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

interface SimpleStockChartProps {
  symbol: string;
}

export function SimpleStockChart({ symbol }: SimpleStockChartProps) {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('1D');

  // Generate mock data
  const generateMockData = () => {
    const data = [];
    const labels = [];
    let basePrice = 185;
    
    for (let i = 0; i < 50; i++) {
      const time = new Date();
      time.setMinutes(time.getMinutes() - (50 - i));
      labels.push(time.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      }));
      
      basePrice += (Math.random() - 0.5) * 2;
      data.push(basePrice);
    }
    
    return { labels, data };
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const mockData = generateMockData();
  
  const chartData = {
    labels: mockData.labels,
    datasets: [
      {
        label: `${symbol} Price`,
        data: mockData.data,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: '#3B82F6',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 6,
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
  };

  const timeRanges = ['1D', '1W', '1M', '3M', '6M', '1Y'];

  if (loading) {
    return (
      <div className="bg-white rounded-lg border p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Price Chart</h2>
          <div className="flex space-x-1">
            {timeRanges.map(range => (
              <button
                key={range}
                className="px-3 py-1 text-sm rounded bg-gray-100 text-gray-500"
                disabled
              >
                {range}
              </button>
            ))}
          </div>
        </div>
        <div className="h-80 flex items-center justify-center">
          <div className="text-gray-500">Loading chart data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Advanced Chart</h2>
        <div className="flex space-x-1">
          {timeRanges.map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      <div className="h-80">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

export default SimpleStockChart;