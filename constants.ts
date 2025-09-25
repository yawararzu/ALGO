
import type { Stock, ChartData } from './types';

export const initialStocks: Stock[] = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', ltp: 2850.55, open: 2840.00, change: 10.55, changePercent: 0.37, volume: 4500000, avgVolume: 3000000, vwap: 2852.10, atr: 28.5 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', ltp: 1650.20, open: 1645.00, change: 5.20, changePercent: 0.32, volume: 8900000, avgVolume: 6000000, vwap: 1651.50, atr: 16.5 },
  { symbol: 'INFY', name: 'Infosys', ltp: 1510.75, open: 1515.00, change: -4.25, changePercent: -0.28, volume: 6200000, avgVolume: 4500000, vwap: 1509.80, atr: 22.1 },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', ltp: 1150.90, open: 1148.00, change: 2.90, changePercent: 0.25, volume: 12500000, avgVolume: 9000000, vwap: 1151.30, atr: 14.8 },
  { symbol: 'TCS', name: 'Tata Consultancy', ltp: 3850.40, open: 3860.00, change: -9.60, changePercent: -0.25, volume: 3100000, avgVolume: 2000000, vwap: 3848.70, atr: 35.2 },
  { symbol: 'SBIN', name: 'State Bank of India', ltp: 830.15, open: 825.00, change: 5.15, changePercent: 0.62, volume: 15000000, avgVolume: 11000000, vwap: 831.00, atr: 9.7 },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel', ltp: 1390.80, open: 1395.00, change: -4.20, changePercent: -0.30, volume: 4800000, avgVolume: 3500000, vwap: 1389.50, atr: 19.3 },
];

export const initialChartData: ChartData[] = Array.from({ length: 60 }, (_, i) => {
    const basePrice = 2850;
    const price = basePrice + (Math.random() - 0.5) * 20;
    const vwap = price - (Math.random()) * 5;
    const now = new Date();
    now.setSeconds(now.getSeconds() - (60 - i));
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    return { time, price: parseFloat(price.toFixed(2)), vwap: parseFloat(vwap.toFixed(2)) };
});
