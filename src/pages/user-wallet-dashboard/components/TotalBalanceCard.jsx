import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TotalBalanceCard = ({ totalBalance, currency = 'USD', dailyChangePercent = 0 }) => {
  const [showBalance, setShowBalance] = useState(true);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const isPositive = Number(dailyChangePercent || 0) >= 0;

  return (
    <div className="bg-[#1E293B]/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/20 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <p className="text-sm text-slate-400 font-medium">Umumiy balans</p>
          <button onClick={() => setShowBalance(!showBalance)} className="text-slate-400 hover:text-white transition-colors">
            <Icon name={showBalance ? "Eye" : "EyeOff"} size={16} />
          </button>
        </div>
        
        <div className="flex items-end gap-3 mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            {showBalance ? formatCurrency(totalBalance) : '****.**'}
          </h1>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold mb-1 ${isPositive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
            <Icon name={isPositive ? 'TrendingUp' : 'TrendingDown'} size={12} />
            <span>{isPositive ? '+' : ''}{Number(dailyChangePercent || 0).toFixed(2)}%</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-primary/25">
            <Icon name="ArrowDownToLine" size={18} />
            To'ldirish
          </button>
          <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95">
            <Icon name="ArrowUpFromLine" size={18} />
            Yechish
          </button>
        </div>
      </div>
    </div>
  );
};

export default TotalBalanceCard;
