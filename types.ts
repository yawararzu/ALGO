
export enum SignalType {
  BUY = 'BUY',
  SELL = 'SELL'
}

export interface Stock {
  symbol: string;
  name: string;
  ltp: number;
  open: number;
  change: number;
  changePercent: number;
  volume: number;
  avgVolume: number;
  vwap: number;
  atr: number;
}

export interface Signal {
  id: number;
  stockSymbol: string;
  type: SignalType;
  price: number;
  timestamp: Date;
  reason: string;
}

export interface Trade {
  id: number;
  stockSymbol: string;
  type: SignalType;
  entryPrice: number;
  exitPrice: number | null;
  status: 'OPEN' | 'CLOSED';
  pnl: number;
  timestamp: Date;
}

export interface ChartData {
    time: string;
    price: number;
    vwap: number;
}
