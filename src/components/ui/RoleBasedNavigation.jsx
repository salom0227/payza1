import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Icon from '../AppIcon';
import Button from './Button';
import { useAuth } from 'contexts/AuthContext';

const RoleBasedNavigation = ({ userRole = 'user' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout, user } = useAuth();
  const { t, i18n } = useTranslation();

  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setIsDark(true);
  }, []);

  const userNavItems = [
  { label: 'Dashboard', path: '/user-wallet-dashboard', icon: 'LayoutDashboard' },
  { label: 'Send Payment', path: '/send-payment', icon: 'Send' },
  { label: 'Link Accounts', path: '/link-cards-and-crypto', icon: 'Link' },
  { label: 'Convert Crypto', path: '/crypto-to-card-conversion', icon: 'ArrowLeftRight' }];


  const merchantNavItems = [
  { label: 'Merchant Dashboard', path: '/merchant-dashboard', icon: 'Store' }];


  const navItems = userRole === 'merchant' ? merchantNavItems : userNavItems;

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location?.pathname === path;

  return (
    <>
      <header className="nav-header">
        <div className="nav-header-logo">
          <div className="nav-header-brand">
            <Icon name="Wallet" size={24} color="#FFFFFF" />
          </div>
          <span className="nav-header-brand-text">PayZa</span>
        </div>

        <nav className="nav-header-menu">
          {navItems?.map((item) =>
          <button
            key={item?.path}
            onClick={() => handleNavigation(item?.path)}
            className={`nav-header-item ${isActive(item?.path) ? 'active' : ''}`}>

              <Icon name={item?.icon} size={18} />
              <span>{t(item?.label)}</span>
            </button>
          )}
        </nav>

        <div className="nav-header-actions">
          <select 
            value={i18n.language} 
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="hidden md:block bg-transparent text-sm font-medium border-none focus:ring-0 cursor-pointer text-muted-foreground outline-none p-0 pr-4 appearance-none"
            style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
          >
            <option value="uz">UZB</option>
            <option value="en">ENG</option>
            <option value="ru">RUS</option>
          </select>
          <Button
            variant="ghost"
            size="icon"
            iconName={isDark ? "Sun" : "Moon"}
            iconSize={20}
            onClick={() => setIsDark(!isDark)} />
          <Button
            variant="ghost"
            size="icon"
            iconName="Bell"
            iconSize={20}
            onClick={() => {}} />

          <Button
            variant="outline"
            size="sm"
            iconName="LogOut"
            iconPosition="left"
            onClick={handleLogout}
            className="hidden sm:flex"
          >
            {t("Logout")}
          </Button>

        </div>
      </header>
      <button
        className="nav-mobile-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle mobile menu">

        <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
      </button>
      {mobileMenuOpen &&
      <div className="nav-mobile-overlay">
          <div className="nav-mobile-header">
            <div className="nav-header-logo">
              <div className="nav-header-brand">
                <Icon name="Wallet" size={24} color="#FFFFFF" />
              </div>
              <span className="nav-header-brand-text">PayZa</span>
            </div>
          </div>

          <nav className="nav-mobile-menu">
            <div className="pb-4">
              <span className="text-muted-foreground text-sm font-medium uppercase tracking-wider px-4">
                Sozlamalar
              </span>
            </div>
              <div className="flex items-center gap-4 px-4 py-3 mb-2">
                <span className="text-muted-foreground text-sm font-medium uppercase tracking-wider w-16">
                  {t("Language")}
                </span>
                <select 
                  value={i18n.language} 
                  onChange={(e) => i18n.changeLanguage(e.target.value)}
                  className="bg-muted text-sm font-medium rounded p-1 w-full border-none focus:ring-0 cursor-pointer"
                >
                  <option value="uz">O'zbekcha</option>
                  <option value="en">English</option>
                  <option value="ru">Русский</option>
                </select>
              </div>
              <button className="nav-mobile-item w-full" onClick={() => setIsDark(!isDark)}>
                <Icon name={isDark ? "Sun" : "Moon"} size={24} />
                <span>{isDark ? "Kunduzgi mavzu" : "Tungi mavzu"}</span>
              </button>
              <button className="nav-mobile-item w-full">
                <Icon name="Bell" size={24} />
                <span>{t("Notifications")}</span>
              </button>
              <button className="nav-mobile-item w-full" onClick={handleLogout}>
                <Icon name="LogOut" size={24} />
                <span>{t("Logout")}</span>
              </button>
          </nav>
        </div>
      }

      {/* Mobile Bottom Navigation Bar - Native Style */}
      <nav className="nav-bottom-bar">
        {navItems?.slice(0, 2).map((item) => (
          <button
            key={item?.path}
            onClick={() => handleNavigation(item?.path)}
            className={`nav-bottom-item ${isActive(item?.path) ? 'active' : ''}`}
          >
            <Icon name={item?.icon} size={22} />
            <span className="nav-bottom-item-text">{t(item?.label)}</span>
          </button>
        ))}
        
        {/* Central Action Button */}
        <button 
          onClick={() => handleNavigation('/send-payment')}
          className="flex flex-col items-center justify-center -translate-y-4"
        >
          <div className="w-14 h-14 rounded-full bg-primary shadow-lg flex items-center justify-center text-white border-4 border-background active:scale-90 transition-transform">
             <Icon name="Send" size={24} />
          </div>
          <span className="text-[10px] font-bold text-primary mt-1">{t('Send')}</span>
        </button>

        {navItems?.slice(2, 4).map((item) => (
          <button
            key={item?.path}
            onClick={() => handleNavigation(item?.path)}
            className={`nav-bottom-item ${isActive(item?.path) ? 'active' : ''}`}
          >
            <Icon name={item?.icon} size={22} />
            <span className="nav-bottom-item-text">{t(item?.label)}</span>
          </button>
        ))}
      </nav>
    </>);

};

export default RoleBasedNavigation;
