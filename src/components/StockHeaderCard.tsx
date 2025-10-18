"use client";

import React from 'react';
import { Star, Share2, BarChart3, TrendingUp, MessageCircle, Settings, Newspaper, Calendar, Building, TrendingDown, PiggyBank, Calculator } from 'lucide-react';

interface StockHeaderCardProps {
  logoUrl?: string;
  name: string;
  subtitle: string;
  tags: Array<{ label: string; color?: string }>;
  metadata: Array<{ label: string; value: string }>;
  dayRange?: { low: number; high: number };
  industry?: string;
  sector?: string;
  latestNews?: Array<{ title: string; impact: 'high' | 'medium' | 'low'; timestamp: string }>;
  cagr?: number;
  sipReturns?: number;
  onWatchlist?: () => void;
  onCompare?: () => void;
  onShare?: () => void;
  onChat?: () => void;
  onTools?: () => void;
  isWatchlisted?: boolean;
}

export function StockHeaderCard({
  logoUrl,
  name,
  subtitle,
  tags,
  metadata,
  dayRange,
  industry,
  sector,
  latestNews,
  cagr,
  sipReturns,
  onWatchlist,
  onCompare,
  onShare,
  onChat,
  onTools,
  isWatchlisted = false
}: StockHeaderCardProps) {
  return (
    <div className="bg-white rounded-lg border p-4 lg:p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {logoUrl ? (
            <img src={logoUrl} alt={name} className="w-10 h-10 rounded-lg" />
          ) : (
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold text-lg">
                {name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{name}</h1>
            <p className="text-sm text-gray-600">{subtitle}</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-1">
          <button
            onClick={onWatchlist}
            className={`p-2 rounded-lg transition-colors ${
              isWatchlisted
                ? "bg-yellow-100 text-yellow-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            title="Favorite"
          >
            <Star
              className={`h-4 w-4 ${isWatchlisted ? "fill-current" : ""}`}
            />
          </button>
          <button
            onClick={onShare}
            className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            title="Share"
          >
            <Share2 className="h-4 w-4" />
          </button>
          <button
            onClick={onChat}
            className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            title="Chat"
          >
            <MessageCircle className="h-4 w-4" />
          </button>
          <button
            onClick={onTools}
            className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            title="Tools"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Info Tags Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {/* Day's Range */}
        {dayRange && (
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center space-x-1 mb-1">
              <BarChart3 className="h-3 w-3 text-gray-600" />
              <span className="text-xs text-gray-700">Day&apos;s Range</span>
            </div>
            <div className="text-sm font-medium text-gray-800">
              ${dayRange.low} - ${dayRange.high}
            </div>
          </div>
        )}

        {/* Industry */}
        {industry && (
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center space-x-1 mb-1">
              <Building className="h-3 w-3 text-gray-600" />
              <span className="text-xs text-gray-700">Industry</span>
            </div>
            <div className="text-sm font-medium text-gray-800">{industry}</div>
          </div>
        )}

        {/* CAGR */}
        {cagr && (
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center space-x-1 mb-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-xs text-gray-700">CAGR</span>
            </div>
            <div className="text-sm font-medium text-green-600">{cagr}%</div>
          </div>
        )}

        {/* SIP Returns */}
        {sipReturns && (
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center space-x-1 mb-1">
              <PiggyBank className="h-3 w-3 text-blue-500" />
              <span className="text-xs text-gray-700">SIP Returns</span>
            </div>
            <div className="text-sm font-medium text-blue-600">
              {sipReturns}%
            </div>
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`px-3 py-1 text-sm font-medium rounded-full ${
              tag.color || "bg-blue-100 text-blue-800"
            }`}
          >
            {tag.label}
          </span>
        ))}

        {/* Latest News as Tags */}
        {latestNews && latestNews.length > 0 && (
          <span className="px-3 py-1 text-sm font-medium rounded-full bg-red-100 text-red-800 flex items-center space-x-1">
            <Newspaper className="h-3 w-3" />
            <span>Latest News</span>
          </span>
        )}
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
        {metadata.map((item, index) => (
          <div key={index} className="space-y-1">
            <span className="text-gray-700 block">{item.label}</span>
            <div className="font-semibold text-gray-900">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StockHeaderCard;