
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { PnLSummary } from './components/PnLSummary';
import { SignalFeed } from './components/SignalFeed';
import { Watchlist } from './components/Watchlist';
import { TradeHistory } from './components/TradeHistory';
import { StockChart } from './components/StockChart';
import { PricingModal } from './components/PricingModal';
import { initialStocks, initialChartData } from './constants';
import type { Stock, Signal, Trade, ChartData } from './types';
import { SignalType } from './types';

const App: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>(initialStocks);
  const [signals, setSignals] = useState<Signal[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>(initialChartData);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [activeStock, setActiveStock] = useState<Stock>(initialStocks[0]);

  const generateSignalAndTrade = useCallback((stock: Stock, newPrice: number) => {
    const isHighVolume = stock.volume > stock.avgVolume * 1.5;
    const isSufficientlyVolatile = stock.atr > stock.ltp * 0.004; // ATR is at least 0.4% of price
    const lastPrice = stock.ltp;
    const vwap = stock.vwap;

    let signalType: SignalType | null = null;
    if (lastPrice <= vwap && newPrice > vwap && isHighVolume && isSufficientlyVolatile) {
      signalType = SignalType.BUY;
    } else if (lastPrice >= vwap && newPrice < vwap && isHighVolume && isSufficientlyVolatile) {
      signalType = SignalType.SELL;
    }

    if (signalType) {
      const newSignal: Signal = {
        id: Date.now() + Math.random(),
        stockSymbol: stock.symbol,
        type: signalType,
        price: newPrice,
        timestamp: new Date(),
        reason: 'VWAP Crossover + High Vol + ATR'
      };
      setSignals(prev => [newSignal, ...prev].slice(0, 20));

      const newTrade: Trade = {
        id: Date.now() + Math.random(),
        stockSymbol: stock.symbol,
        type: signalType,
        entryPrice: newPrice,
        exitPrice: null,
        status: 'OPEN',
        pnl: 0,
        timestamp: new Date()
      };
      setTrades(prev => [newTrade, ...prev]);
    }
  }, []);

  useEffect(() => {
    const simulationInterval = setInterval(() => {
      // Update Stocks
      setStocks(prevStocks => prevStocks.map(stock => {
        const changePercent = (Math.random() - 0.5) * 0.005; // smaller, more realistic fluctuations
        const newPrice = parseFloat((stock.ltp * (1 + changePercent)).toFixed(2));
        const priceChange = newPrice - stock.open;
        const newVolume = stock.volume + Math.floor(Math.random() * 5000);

        generateSignalAndTrade(stock, newPrice);

        return {
          ...stock,
          ltp: newPrice,
          change: parseFloat(priceChange.toFixed(2)),
          changePercent: parseFloat(((priceChange / stock.open) * 100).toFixed(2)),
          volume: newVolume,
          vwap: parseFloat((stock.vwap * (1 + (Math.random() - 0.5) * 0.001)).toFixed(2)), // VWAP also moves slightly
          atr: parseFloat((stock.atr * (1 + (Math.random() - 0.5) * 0.002)).toFixed(2)) // ATR also moves slightly
        };
      }));

      // Update Active Stock Chart
      setChartData(prevData => {
         const lastDataPoint = prevData[prevData.length - 1];
         const newPrice = parseFloat((lastDataPoint.price * (1 + (Math.random() - 0.5) * 0.005)).toFixed(2));
         const newVwap = parseFloat((lastDataPoint.vwap * (1 + (Math.random() - 0.5) * 0.001)).toFixed(2));
         
         const now = new Date();
         const newTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

         const newPoint: ChartData = { time: newTime, price: newPrice, vwap: newVwap };
         return [...prevData.slice(1), newPoint];
      });

      // Update Trades P&L and potentially close them
      setTrades(prevTrades => prevTrades.map(trade => {
        if (trade.status === 'OPEN') {
          const currentStock = stocks.find(s => s.symbol === trade.stockSymbol);
          if (!currentStock) return trade;

          const pnl = trade.type === SignalType.BUY
            ? (currentStock.ltp - trade.entryPrice)
            : (trade.entryPrice - currentStock.ltp);
          
          const pnlPercent = (pnl / trade.entryPrice);

          // Exit conditions
          const takeProfit = 0.005; // 0.5%
          const stopLoss = -0.003; // -0.3%
          if (pnlPercent >= takeProfit || pnlPercent <= stopLoss) {
            return {
              ...trade,
              exitPrice: currentStock.ltp,
              status: 'CLOSED',
              pnl: parseFloat(pnl.toFixed(2))
            };
          }
          return { ...trade, pnl: parseFloat(pnl.toFixed(2)) };
        }
        return trade;
      }));
    }, 2000);

    return () => clearInterval(simulationInterval);
  }, [stocks, generateSignalAndTrade]);

  const totalPnl = trades.reduce((acc, trade) => acc + trade.pnl, 0);

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 font-sans">
      <Header onPricingClick={() => setIsPricingModalOpen(true)} />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <PnLSummary totalPnl={totalPnl} />
          </div>

          <div className="col-span-12 lg:col-span-3">
            <SignalFeed signals={signals} />
          </div>
          
          <div className="col-span-12 lg:col-span-9">
            <StockChart data={chartData} stockSymbol={activeStock.symbol} />
          </div>
          
          <div className="col-span-12 lg:col-span-5">
            <Watchlist stocks={stocks} onStockSelect={setActiveStock}/>
          </div>
          
          <div className="col-span-12 lg:col-span-7">
            <TradeHistory trades={trades} />
          </div>
        </div>
      </main>
      <PricingModal isOpen={isPricingModalOpen} onClose={() => setIsPricingModalOpen(false)} />
    </div>
  );
};

export default App;
