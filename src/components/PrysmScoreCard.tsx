"use client";

import React, { useRef, useEffect } from 'react';
import { Trophy, TrendingUp } from 'lucide-react';

interface PrysmScoreCardProps {
  score: number;
  percentile: number;
  rank: number;
  totalStocks?: number;
  polygonData?: {
    labels: string[];
    values: number[];
  };
  className?: string;
}

// Simple radar/polygon chart component
function RadarChart({ data, className = "" }: { 
  data: { labels: string[]; values: number[] };
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current || !data.labels.length) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background circles
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, (radius * i) / 5, 0, 2 * Math.PI);
      ctx.stroke();
    }
    
    // Draw axes
    const angleStep = (2 * Math.PI) / data.labels.length;
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < data.labels.length; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    
    // Draw data polygon
    ctx.strokeStyle = '#3B82F6';
    ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    for (let i = 0; i < data.values.length; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const value = Math.max(0, Math.min(1, data.values[i] / 100)); // Normalize to 0-1
      const x = centerX + radius * value * Math.cos(angle);
      const y = centerY + radius * value * Math.sin(angle);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Draw labels
    ctx.fillStyle = '#374151';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    for (let i = 0; i < data.labels.length; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const labelRadius = radius + 15;
      const x = centerX + labelRadius * Math.cos(angle);
      const y = centerY + labelRadius * Math.sin(angle);
      
      ctx.fillText(data.labels[i], x, y);
    }
    
  }, [data]);
  
  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={200}
      className={className}
    />
  );
}

export function PrysmScoreCard({
  score,
  percentile,
  rank,
  totalStocks = 5000,
  polygonData,
  className = ""
}: PrysmScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-blue-100';
    if (score >= 40) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const defaultPolygonData = {
    labels: ['Value', 'Growth', 'Momentum', 'Quality', 'Size'],
    values: [75, 60, 85, 70, 55]
  };

  const chartData = polygonData || defaultPolygonData;

  return (
    <div className={`bg-white rounded-lg border p-3 ${className}`}>
      {/* Header and Score in one row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full text-lg font-bold ${
            getScoreBgColor(score)
          } ${getScoreColor(score)}`}>
            {score}
          </div>
          <div>
            <h3 className="text-sm font-semibold">Prysm Score</h3>
            <p className="text-xs text-gray-600">
              Better than {percentile}% | Rank {rank.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-amber-600">
          <Trophy className="h-3 w-3" />
        </div>
      </div>
    </div>
  );
}

export default PrysmScoreCard;