import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      brand: "Kisan Setu",
      tagline: "Connecting Farmers to Prosperity",
      hero_subtitle: "Your digital bridge to better prices, weather intel, and government schemes",
      check_crops: "Check My Crops",
      find_buyers: "Find Buyers",
      weather: "Weather",
      mandi_prices: "Mandi Prices",
      schemes: "Schemes",
      community: "Community",
      my_farm: "My Farm",
      home: "Home",
      search_crop: "Search crop name...",
      search_state: "Select State",
      search_district: "Select District",
      price_per_quintal: "₹/quintal",
      today_price: "Today's Price",
      min_price: "Min",
      max_price: "Max",
      last_updated: "Last Updated",
      price_trend: "30-Day Price Trend",
      top_crops: "Top 10 Crops Today",
      compare_crops: "Compare Crops",
      set_alert: "Set Price Alert",
      weather_center: "Weather Intelligence",
      buyer_market: "Direct Buyer Market",
      govt_schemes: "Government Schemes",
      crop_advisor: "Crop Advisor",
      forum: "Farmer Forum",
      dashboard: "My Farm Dashboard",
      rain_alert: "Rain Alert",
      buyers_looking: "buyers looking for",
      near_you: "near you",
      loading: "Loading Kisan Setu...",
    }
  },
  hi: {
    translation: {
      brand: "किसान सेतु",
      tagline: "किसानों को समृद्धि से जोड़ना",
      hero_subtitle: "बेहतर दाम, मौसम जानकारी और सरकारी योजनाओं का डिजिटल पुल",
      check_crops: "फसल जाँचें",
      find_buyers: "खरीदार खोजें",
      weather: "मौसम",
      mandi_prices: "मंडी भाव",
      schemes: "योजनाएं",
      community: "समुदाय",
      my_farm: "मेरा खेत",
      home: "होम",
      search_crop: "फसल का नाम खोजें...",
      search_state: "राज्य चुनें",
      search_district: "जिला चुनें",
      price_per_quintal: "₹/क्विंटल",
      today_price: "आज का भाव",
      min_price: "न्यूनतम",
      max_price: "अधिकतम",
      last_updated: "अंतिम अपडेट",
      price_trend: "30 दिन का भाव चार्ट",
      top_crops: "आज की टॉप 10 फसलें",
      compare_crops: "फसलों की तुलना",
      set_alert: "भाव अलर्ट सेट करें",
      weather_center: "मौसम केंद्र",
      buyer_market: "सीधा बाज़ार",
      govt_schemes: "सरकारी योजनाएं",
      crop_advisor: "फसल सलाहकार",
      forum: "किसान चर्चा",
      dashboard: "मेरा खेत डैशबोर्ड",
      rain_alert: "बारिश चेतावनी",
      buyers_looking: "खरीदार ढूंढ रहे हैं",
      near_you: "आपके पास",
      loading: "किसान सेतु लोड हो रहा है...",
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'hi',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;
