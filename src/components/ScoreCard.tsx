"use client";

import React, { useRef, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ScoreCardProps {
  title: string;
  value: string | number;
  description?: string;
  sparklineData?: number[];
  tag?: {
    label: string;
    color: 'green' | 'red' | 'yellow' | 'blue' | 'gray';
  };
  trend?: 'up' | 'down' | 'neutral';
  onClick?: () => void;
  className?: string;
}

// Reusable Sparkline component
function Sparkline({ data, trend = 'neutral' }: { 
  data: number[]; 
  trend?: 'up' | 'down' | 'neutral';
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!svgRef.current || !data.length) return;
    
    const svg = svgRef.current;
    const width = 80;
    const height = 24;
    
    const minVal = Math.min(...data);
    const maxVal = Math.max(...data);
    const range = maxVal - minVal || 1;
    
    const points = data.map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - ((val - minVal) / range) * height;
      return `${x},${y}`;
    }).join(' ');
    
    const strokeColor = 
      trend === 'up' ? '#10B981' :
      trend === 'down' ? '#EF4444' : '#6B7280';
    
    svg.innerHTML = `
      <defs>
        <linearGradient id="sparklineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${strokeColor};stop-opacity:0.3" />
          <stop offset="100%" style="stop-color:${strokeColor};stop-opacity:0" />
        </linearGradient>
      </defs>
      <polygon
        points="${points} ${width},${height} 0,${height}"
        fill="url(#sparklineGrad)"
      />
      <polyline
        points="${points}"
        fill="none"
        stroke="${strokeColor}"
        stroke-width="2"
        vector-effect="non-scaling-stroke"
      />
    `;
  }, [data, trend]);
  
  return (
    <svg
      ref={svgRef}
      width="80"
      height="24"
      viewBox="0 0 80 24"
      className="flex-shrink-0"
    />
  );
}

export function ScoreCard({
  title,
  value,
  description,
  sparklineData,
  tag,
  trend = 'neutral',
  onClick,
  className = ""
}: ScoreCardProps) {
  const getTagColors = (color: string) => {
    const colors = {
      green: 'bg-green-100 text-green-800',
      red: 'bg-red-100 text-red-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      blue: 'bg-blue-100 text-blue-800',
      gray: 'bg-gray-100 text-gray-800'
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg border p-4 transition-all hover:shadow-md ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="text-sm font-medium text-gray-700 mb-1">
            {title}
          </h4>
          {description && (
            <p className="text-xs text-gray-500 line-clamp-2">
              {description}
            </p>
          )}
        </div>
        
        {trend !== 'neutral' && (
          <div className={`flex items-center ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend === 'up' ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
          </div>
        )}
      </div>

      {/* Value */}
      <div className="mb-3">
        <div className="text-2xl font-bold text-gray-900 mb-1">
          {value}
        </div>
        
        {tag && (
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
            getTagColors(tag.color)
          }`}>
            {tag.label}
          </span>
        )}
      </div>

      {/* Sparkline */}
      {sparklineData && sparklineData.length > 0 && (
        <div className="flex justify-center">
          <Sparkline data={sparklineData} trend={trend} />
        </div>
      )}
    </div>
  );
}

// Preset score cards for the dashboard
export function PerformanceCard({ onClick }: { onClick?: () => void }) {
  const sparklineData = [45, 52, 48, 65, 69, 72, 75, 78, 82, 85];
  
  return (
    <ScoreCard
      title="Performance"
      value="85"
      description="12-month price performance vs benchmark"
      sparklineData={sparklineData}
      tag={{ label: "Strong", color: "green" }}
      trend="up"
      onClick={onClick}
    />
  );
}

export function ValuationCard({ onClick }: { onClick?: () => void }) {
  const sparklineData = [75, 72, 68, 65, 62, 58, 55, 52, 48, 45];
  
  return (
    <ScoreCard
      title="Valuation"
      value="45"
      description="Price relative to intrinsic value metrics"
      sparklineData={sparklineData}
      tag={{ label: "Expensive", color: "red" }}
      trend="down"
      onClick={onClick}
    />
  );
}

export function GrowthCard({ onClick }: { onClick?: () => void }) {
  const sparklineData = [60, 58, 62, 68, 72, 75, 78, 82, 85, 88];
  
  return (
    <ScoreCard
      title="Growth"
      value="88"
      description="Revenue and earnings growth trajectory"
      sparklineData={sparklineData}
      tag={{ label: "High Growth", color: "blue" }}
      trend="up"
      onClick={onClick}
    />
  );
}

export default ScoreCard;