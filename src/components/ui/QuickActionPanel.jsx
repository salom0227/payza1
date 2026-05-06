import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const QuickActionPanel = ({ userRole = 'user' }) => {
  const navigate = useNavigate();

  const services = [
    { id: 'mobile', title: 'Aloqa', icon: 'Smartphone', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: 'internet', title: 'Internet', icon: 'Wifi', color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { id: 'utilities', title: 'Kommunal', icon: 'Droplets', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 'gov', title: 'Davlat', icon: 'Landmark', color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { id: 'send', title: 'O\'tkazma', icon: 'Send', color: 'text-primary', bg: 'bg-primary/10', path: '/send-payment' },
    { id: 'receive', title: 'Qabul qilish', icon: 'Download', color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    { id: 'convert', title: 'Ayirboshlash', icon: 'ArrowLeftRight', color: 'text-warning', bg: 'bg-warning/10', path: '/crypto-to-card-conversion' },
    { id: 'more', title: 'Barchasi', icon: 'Grid2X2', color: 'text-muted-foreground', bg: 'bg-muted' }
  ];

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-foreground mb-4">Xizmatlar</h3>
      <div className="grid grid-cols-4 gap-4">
        {services.map((svc) => (
          <button 
            key={svc.id}
            onClick={() => svc.path && navigate(svc.path)}
            className="flex flex-col items-center justify-center gap-2 transition-all active:scale-95"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${svc.bg} ${svc.color} shadow-sm`}>
              <Icon name={svc.icon} size={24} />
            </div>
            <span className="text-[11px] font-medium text-foreground whitespace-nowrap">{svc.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionPanel;