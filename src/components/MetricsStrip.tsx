"use client";

import React, { useRef, useEffect } from 'react';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';

interface MetricData {
  id: string;
  name: string;
  value: string | number;
  delta?: number;
  sparklineData?: number[];
  description?: string;
}

interface MetricsStripProps {
  metrics: MetricData[];
  onClickMetric?: (metric: MetricData) => void;
  className?: string;
}

// Simple sparkline component
function Sparkline({ data, className = "" }: { data: number[], className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!svgRef.current || !data.length) return;
    
    const svg = svgRef.current;
    const width = 60;
    const height = 20;
    
    const minVal = Math.min(...data);
    const maxVal = Math.max(...data);
    const range = maxVal - minVal || 1;
    
    const points = data.map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - ((val - minVal) / range) * height;
      return `${x},${y}`;
    }).join(' ');
    
    svg.innerHTML = `
      <polyline
        points="${points}"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        vector-effect="non-scaling-stroke"
      />
    `;
  }, [data]);
  
  return (
    <svg
      ref={svgRef}
      width="60"
      height="20"
      viewBox="0 0 60 20"
      className={className}
    />
  );
}

export function MetricsStrip({ metrics, onClickMetric, className = "" }: MetricsStripProps) {
  return (
    <div className={`bg-white rounded-lg border p-3 ${className}`}>
      {/* Responsive grid that adapts to screen size */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.id}
            metric={metric}
            onClick={() => onClickMetric?.(metric)}
          />
        ))}
      </div>
    </div>
  );
}

function MetricCard({ metric, onClick }: { metric: MetricData; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="bg-gray-50 rounded-lg p-2 cursor-pointer hover:bg-gray-100 transition-colors border text-center"
    >
      <div className="text-xs font-medium text-gray-800 mb-1">
        {metric.name}
      </div>
      
      <div className="text-sm font-bold text-gray-900">
        {metric.value}
      </div>
    </div>
  );
}

export default MetricsStrip;

// Add this to globals.css for scroll behavior
/*
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
*/