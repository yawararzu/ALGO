
import React from 'react';

const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

interface PricingCardProps {
  plan: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, price, features, isPopular }) => (
  <div className={`relative flex flex-col p-6 bg-slate-800 rounded-lg shadow-lg border-2 ${isPopular ? 'border-cyan-400' : 'border-slate-700'}`}>
    {isPopular && (
      <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
        <span className="bg-cyan-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase">Most Popular</span>
      </div>
    )}
    <h3 className="text-2xl font-semibold text-white">{plan}</h3>
    <p className="mt-4 text-slate-300">
      <span className="text-4xl font-extrabold text-white">₹{price}</span>
      / month
    </p>
    <ul className="mt-6 space-y-4 flex-grow">
      {features.map((feature) => (
        <li key={feature} className="flex items-start">
          <CheckIcon className="flex-shrink-0 h-6 w-6 text-cyan-400 mr-3 mt-1" />
          <span className="text-slate-300">{feature}</span>
        </li>
      ))}
    </ul>
    <button className={`mt-8 w-full py-3 px-6 rounded-lg font-semibold transition-transform duration-200 ${isPopular ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:scale-105' : 'bg-slate-700 text-slate-200 hover:bg-slate-600'}`}>
      Choose Plan
    </button>
  </div>
);

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl w-full max-w-5xl m-4 p-8 relative transform transition-all duration-300 ease-out scale-95 opacity-0 animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'fade-in-scale 0.3s forwards' }}
      >
        <style>{`
          @keyframes fade-in-scale {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">&times;</button>
        <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Find the right plan for you</h2>
            <p className="mt-4 text-xl text-slate-400">Start with a 7-day free trial on any plan.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <PricingCard
            plan="Signal Only"
            price="999"
            features={['Live Trading Signals', 'Stock Watchlist', 'Trade History & PnL', 'Email & Telegram Notifications']}
          />
          <PricingCard
            plan="Auto-Trading"
            price="4,999"
            features={['All Signal features', 'Full Broker Integration', 'Auto-place Orders (SL & TP)', 'Advanced Analytics', 'Priority Support']}
            isPopular={true}
          />
          <PricingCard
            plan="Enterprise"
            price="Custom"
            features={['All Auto-Trading features', 'Hedge Fund & Prop Firm Ready', 'Dedicated Account Manager', 'Custom Strategy Integration']}
          />
        </div>
      </div>
    </div>
  );
};
