"use client";

import React from 'react';
import { Star, Download, ExternalLink, Plus } from 'lucide-react';

interface FooterActionsProps {
  onAddWatchlist?: () => void;
  onExport?: () => void;
  onOpenReport?: () => void;
  isWatchlisted?: boolean;
  className?: string;
}

export function FooterActions({
  onAddWatchlist,
  onExport,
  onOpenReport,
  isWatchlisted = false,
  className = ""
}: FooterActionsProps) {
  return (
    <div className={`bg-white rounded-lg border p-4 ${className}`}>
      <h4 className="text-sm font-medium text-gray-700 mb-4">Quick Actions</h4>
      
      <div className="space-y-3">
        {/* Add to Watchlist */}
        <button
          onClick={onAddWatchlist}
          className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            isWatchlisted
              ? 'bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100'
              : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
          }`}
        >
          <Star className={`h-4 w-4 ${isWatchlisted ? 'fill-current' : ''}`} />
          <span className="text-sm font-medium">
            {isWatchlisted ? 'In Watchlist' : 'Add to Watchlist'}
          </span>
        </button>

        {/* Export Data */}
        <button
          onClick={onExport}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Download className="h-4 w-4" />
          <span className="text-sm font-medium">Export Data</span>
        </button>

        {/* Open Full Report */}
        <button
          onClick={onOpenReport}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          <span className="text-sm font-medium">Full Report</span>
        </button>
      </div>

      {/* Key Stats Summary */}
      <div className="mt-6 pt-4 border-t">
        <h5 className="text-xs font-medium text-gray-600 mb-3 uppercase tracking-wide">
          Key Numbers
        </h5>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-500">Market Cap</span>
            <div className="font-medium">$2.88T</div>
          </div>
          <div>
            <span className="text-gray-500">P/E Ratio</span>
            <div className="font-medium">28.5</div>
          </div>
          <div>
            <span className="text-gray-500">Dividend</span>
            <div className="font-medium">0.52%</div>
          </div>
          <div>
            <span className="text-gray-500">Beta</span>
            <div className="font-medium">1.24</div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-4 pt-3 border-t text-center">
        <p className="text-xs text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  );
}

// Alternative compact version for mobile
export function CompactFooterActions({
  onAddWatchlist,
  onExport,
  onOpenReport,
  isWatchlisted = false,
  className = ""
}: FooterActionsProps) {
  return (
    <div className={`bg-white rounded-lg border p-3 ${className}`}>
      <div className="flex items-center justify-between space-x-2">
        <button
          onClick={onAddWatchlist}
          className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-lg text-sm transition-colors ${
            isWatchlisted
              ? 'bg-yellow-50 text-yellow-700'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Star className={`h-4 w-4 ${isWatchlisted ? 'fill-current' : ''}`} />
          <span>Watch</span>
        </button>

        <button
          onClick={onExport}
          className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm"
        >
          <Download className="h-4 w-4" />
          <span>Export</span>
        </button>

        <button
          onClick={onOpenReport}
          className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          <ExternalLink className="h-4 w-4" />
          <span>Report</span>
        </button>
      </div>
    </div>
  );
}

export default FooterActions;