// Stock data service for Financial Modeling Prep API
export interface StockPrice {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changesPercentage: number;
  dayLow: number;
  dayHigh: number;
  yearHigh: number;
  yearLow: number;
  marketCap: number;
  priceAvg50: number;
  priceAvg200: number;
  volume: number;
  avgVolume: number;
  pe: number;
  eps: number;
}

// Free API endpoint for AAPL stock data
const API_BASE = 'https://financialmodelingprep.com/api/v3';

export async function fetchIntradayData(symbol: string = 'AAPL'): Promise<StockPrice[]> {
  try {
    const response = await fetch(
      `${API_BASE}/historical-chart/1min/${symbol}?apikey=demo`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch stock data');
    }
    
    const data = await response.json();
    
    // Return last 100 data points for performance
    return data.slice(0, 100).map((item: {
      date: string;
      open: number;
      high: number;
      low: number;
      close: number;
      volume: number;
    }) => ({
      date: item.date,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
      volume: item.volume
    }));
  } catch (error) {
    console.error('Error fetching stock data:', error);
    // Return mock data if API fails
    return generateMockData();
  }
}

export async function fetchStockQuote(symbol: string = 'AAPL'): Promise<StockQuote> {
  try {
    const response = await fetch(
      `${API_BASE}/quote/${symbol}?apikey=demo`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch quote');
    }
    
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error('Error fetching quote:', error);
    // Return mock data if API fails
    return {
      symbol: 'AAPL',
      price: 185.75,
      change: 2.35,
      changesPercentage: 1.28,
      dayLow: 184.20,
      dayHigh: 186.90,
      yearHigh: 199.62,
      yearLow: 164.08,
      marketCap: 2884000000000,
      priceAvg50: 182.45,
      priceAvg200: 175.32,
      volume: 45623000,
      avgVolume: 52000000,
      pe: 28.5,
      eps: 6.52
    };
  }
}

function generateMockData(): StockPrice[] {
  const data: StockPrice[] = [];
  let basePrice = 185;
  const now = new Date();
  
  for (let i = 99; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 60000); // 1 minute intervals
    const change = (Math.random() - 0.5) * 2; // Random change ±1
    basePrice += change;
    
    data.push({
      date: date.toISOString(),
      open: basePrice,
      high: basePrice + Math.random() * 1,
      low: basePrice - Math.random() * 1,
      close: basePrice,
      volume: Math.floor(Math.random() * 1000000) + 500000
    });
  }
  
  return data;
}