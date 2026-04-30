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
              <span className="nav-header-brand-text">FinPay</span>
            </div>
          </div>

          <nav className="nav-mobile-menu">
            {navItems?.map((item) =>
          <button
            key={item?.path}
            onClick={() => handleNavigation(item?.path)}
            className={`nav-mobile-item ${isActive(item?.path) ? 'active' : ''}`}>

                <Icon name={item?.icon} size={24} />
                <span>{t(item?.label)}</span>
              </button>
          )}

            <div className="border-t border-border mt-4 pt-4">
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
            </div>
          </nav>
        </div>
      }
    </>);

};

export default RoleBasedNavigation;
