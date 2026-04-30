import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      Dashboard: "Dashboard",
      "Send Payment": "Send Payment",
      "Link Accounts": "Link Accounts",
      "Convert Crypto": "Convert Crypto",
      "Merchant Dashboard": "Merchant Dashboard",
      "Logout": "Logout",
      "Notifications": "Notifications"
    }
  },
  ru: {
    translation: {
      Dashboard: "Главная",
      "Send Payment": "Отправить платеж",
      "Link Accounts": "Привязать счета",
      "Convert Crypto": "Обмен Криптовалют",
      "Merchant Dashboard": "Панель мерчанта",
      "Logout": "Выйти",
      "Notifications": "Уведомления"
    }
  },
  uz: {
    translation: {
      Dashboard: "Asosiy oyna",
      "Send Payment": "To'lov yuborish",
      "Link Accounts": "Hisoblarni ulash",
      "Convert Crypto": "Kripto ayirboshlash",
      "Merchant Dashboard": "Sotuvchi paneli",
      "Logout": "Chiqish",
      "Notifications": "Bildirishnomalar"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "uz", // Boshlang'ich til o'zbek tili
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
