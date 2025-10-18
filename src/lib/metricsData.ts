// Static metrics data matching the provided JSON structure
export interface MetricData {
  id: string;
  label: string;
  value: string | number;
  change?: number;
  changePercent?: number;
  category: 'market' | 'fundamentals' | 'technical' | 'volume' | 'momentum' | 'analyst';
  description?: string;
}

export const STOCK_DATA = {
  "stock_symbol": "ADANIPOWER",
  "company_name": "Adani Power Ltd", 
  "exchange": "NSE",
  "market_data": {
    "last_price": 330.25,
    "open": 325.50,
    "high": 335.00,
    "low": 323.75,
    "previous_close": 328.00,
    "52_week_high": 450.00,
    "52_week_low": 280.00,
    "volume": 2500000,
    "average_volume": 2000000
  },
  "fundamentals": {
    "market_cap": 150000000000,
    "pe_ratio": 12.5,
    "pb_ratio": 1.8,
    "eps": 26.4,
    "dividend_yield": 0.8,
    "roe": 14.5,
    "debt_to_equity": 1.2,
    "revenue": 110000000000,
    "profit": 15000000000
  },
  "technical_indicators": {
    "moving_averages": {
      "ma_20": 328.0,
      "ma_50": 322.5,
      "ma_100": 315.0,
      "ma_200": 300.0
    },
    "rsi_14": 55.0,
    "macd": {
      "macd_value": 5.2,
      "signal": 3.5,
      "histogram": 1.7
    },
    "bollinger_bands": {
      "upper_band": 340.0,
      "middle_band": 330.0,
      "lower_band": 320.0
    }
  },
  "volume_analysis": {
    "average_5_day_volume": 2300000,
    "average_10_day_volume": 2200000,
    "volume_spike": true
  },
  "momentum": {
    "atr_14": 8.5,
    "adx_14": 22.0,
    "stochastic_k": 70.0,
    "stochastic_d": 65.0
  },
  "analyst_ratings": {
    "buy": 8,
    "hold": 6,
    "sell": 2,
    "target_price": 360.0
  }
};

export const ALL_METRICS: MetricData[] = [
  // Market Data
  { id: 'last_price', label: 'Last Price', value: '₹330.25', category: 'market' },
  { id: 'open', label: 'Open', value: '₹325.50', category: 'market' },
  { id: 'high', label: 'Day High', value: '₹335.00', category: 'market' },
  { id: 'low', label: 'Day Low', value: '₹323.75', category: 'market' },
  { id: '52_week_high', label: '52W High', value: '₹450.00', category: 'market' },
  { id: '52_week_low', label: '52W Low', value: '₹280.00', category: 'market' },
  { id: 'volume', label: 'Volume', value: '2.5M', category: 'market' },
  { id: 'avg_volume', label: 'Avg Volume', value: '2.0M', category: 'market' },
  
  // Fundamentals
  { id: 'market_cap', label: 'Market Cap', value: '₹150B', category: 'fundamentals' },
  { id: 'pe_ratio', label: 'P/E Ratio', value: '12.5', category: 'fundamentals' },
  { id: 'pb_ratio', label: 'P/B Ratio', value: '1.8', category: 'fundamentals' },
  { id: 'eps', label: 'EPS', value: '₹26.4', category: 'fundamentals' },
  { id: 'dividend_yield', label: 'Dividend Yield', value: '0.8%', category: 'fundamentals' },
  { id: 'roe', label: 'ROE', value: '14.5%', category: 'fundamentals' },
  { id: 'debt_to_equity', label: 'D/E Ratio', value: '1.2', category: 'fundamentals' },
  
  // Technical Indicators
  { id: 'ma_20', label: 'MA 20', value: '₹328.0', category: 'technical' },
  { id: 'ma_50', label: 'MA 50', value: '₹322.5', category: 'technical' },
  { id: 'ma_200', label: 'MA 200', value: '₹300.0', category: 'technical' },
  { id: 'rsi_14', label: 'RSI (14)', value: '55.0', category: 'technical' },
  { id: 'macd', label: 'MACD', value: '5.2', category: 'technical' },
  
  // Momentum
  { id: 'atr_14', label: 'ATR (14)', value: '8.5', category: 'momentum' },
  { id: 'adx_14', label: 'ADX (14)', value: '22.0', category: 'momentum' },
  { id: 'stochastic_k', label: 'Stoch %K', value: '70.0', category: 'momentum' },
  
  // Analyst
  { id: 'buy_rating', label: 'Buy Ratings', value: '8', category: 'analyst' },
  { id: 'target_price', label: 'Target Price', value: '₹360.0', category: 'analyst' }
];

export const DEFAULT_METRICS = [
  'last_price',
  'pe_ratio', 
  'market_cap',
  'volume',
  'ma_20',
  'rsi_14',
  'roe',
  'target_price'
];

// LocalStorage utilities
export function getSelectedMetrics(): string[] {
  if (typeof window === 'undefined') return DEFAULT_METRICS;
  
  const stored = localStorage.getItem('selectedMetrics');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return DEFAULT_METRICS;
    }
  }
  return DEFAULT_METRICS;
}

export function saveSelectedMetrics(metricIds: string[]) {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('selectedMetrics', JSON.stringify(metricIds));
}

export function getMetricById(id: string): MetricData | undefined {
  return ALL_METRICS.find(metric => metric.id === id);
}