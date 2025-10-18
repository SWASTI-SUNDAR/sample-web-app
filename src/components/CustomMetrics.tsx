"use client";

import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { 
  ALL_METRICS, 
  getSelectedMetrics, 
  saveSelectedMetrics, 
  getMetricById,
  MetricData 
} from '@/lib/metricsData';

interface CustomMetricsProps {
  className?: string;
}

export function CustomMetrics({ className = '' }: CustomMetricsProps) {
  const [selectedMetricIds, setSelectedMetricIds] = useState<string[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = getSelectedMetrics();
    setSelectedMetricIds(stored);
  }, []);

  const handleAddMetric = (metricId: string) => {
    if (!selectedMetricIds.includes(metricId)) {
      const newMetrics = [...selectedMetricIds, metricId];
      setSelectedMetricIds(newMetrics);
      saveSelectedMetrics(newMetrics);
    }
    setShowAddDialog(false);
  };

  const handleRemoveMetric = (metricId: string) => {
    const newMetrics = selectedMetricIds.filter(id => id !== metricId);
    setSelectedMetricIds(newMetrics);
    saveSelectedMetrics(newMetrics);
  };

  const selectedMetrics = selectedMetricIds
    .map(id => getMetricById(id))
    .filter(Boolean) as MetricData[];

  const availableMetrics = ALL_METRICS.filter(
    metric => !selectedMetricIds.includes(metric.id)
  );

  if (!mounted) {
    return (
      <div className={`bg-white rounded-lg border p-6 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Custom Metrics</h2>
        </div>
        <div className="text-center text-gray-500 py-8">Loading metrics...</div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Custom Metrics</h2>
        <button
          onClick={() => setShowAddDialog(true)}
          className="flex items-center space-x-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Metric</span>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {selectedMetrics.map((metric) => (
          <div
            key={metric.id}
            className="relative group bg-gray-50 border rounded-lg p-4 hover:shadow-sm transition-shadow"
          >
            <button
              onClick={() => handleRemoveMetric(metric.id)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </button>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">
                {metric.label}
              </h3>
              <div className="text-2xl font-bold text-gray-900">
                {metric.value}
              </div>
              {metric.change !== undefined && (
                <div className={`text-sm ${
                  metric.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change >= 0 ? '+' : ''}{metric.change}
                  {metric.changePercent && ` (${metric.changePercent}%)`}
                </div>
              )}
              <div className="text-xs text-gray-500 capitalize">
                {metric.category}
              </div>
            </div>
          </div>
        ))}

        {/* Add metric placeholder */}
        {selectedMetrics.length < 12 && (
          <button
            onClick={() => setShowAddDialog(true)}
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center space-y-2 text-gray-500 hover:text-blue-600"
          >
            <Plus className="h-8 w-8" />
            <span className="text-sm font-medium">Add Metric</span>
          </button>
        )}
      </div>

      {/* Add Metric Dialog */}
      {showAddDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Add Custom Metric</h3>
                <button
                  onClick={() => setShowAddDialog(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-96">
              <div className="space-y-4">
                {Object.entries(
                  availableMetrics.reduce((acc, metric) => {
                    acc[metric.category] = acc[metric.category] || [];
                    acc[metric.category].push(metric);
                    return acc;
                  }, {} as Record<string, MetricData[]>)
                ).map(([category, metrics]) => (
                  <div key={category}>
                    <h4 className="text-sm font-medium text-gray-700 mb-2 capitalize">
                      {category.replace('_', ' ')}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {metrics.map((metric) => (
                        <button
                          key={metric.id}
                          onClick={() => handleAddMetric(metric.id)}
                          className="text-left p-3 border rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-colors"
                        >
                          <div className="font-medium text-sm">{metric.label}</div>
                          <div className="text-lg font-bold text-gray-900">
                            {metric.value}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomMetrics;
