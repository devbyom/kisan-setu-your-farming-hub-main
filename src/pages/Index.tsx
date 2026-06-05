import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { mandiTicker, formatIndianPrice } from "@/lib/mockData";
import { WheatField } from "@/components/WheatField";
import { Cloud, Search, ShoppingCart } from "lucide-react";

const HeroStats = () => {
  const { t } = useTranslation();
  return (
    <div className="absolute bottom-8 left-4 right-4 md:bottom-12 md:left-8 md:right-8 z-20 flex flex-col md:flex-row gap-3">
      {[
        { icon: "🌾", text: `${t('today_price')}: गेहूं ₹${formatIndianPrice(2140)}/क्विंटल`, color: "bg-primary/90" },
        { icon: "🌧️", text: `${t('rain_alert')}: वाराणसी — कल शाम 4 बजे`, color: "bg-crop/90" },
        { icon: "🛒", text: `3 ${t('buyers_looking')} टमाटर ${t('near_you')}`, color: "bg-earth/90" },
      ].map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 + i * 0.2, duration: 0.5 }}
          className={`${stat.color} backdrop-blur-sm text-primary-foreground rounded-xl px-4 py-3 flex items-center gap-3 shadow-lg`}
        >
          <span className="text-2xl">{stat.icon}</span>
          <span className="text-sm md:text-base font-medium">{stat.text}</span>
        </motion.div>
      ))}
    </div>
  );
};

const Marquee = () => (
  <div className="bg-secondary text-secondary-foreground py-2 marquee-container">
    <div className="animate-ticker inline-flex gap-12 whitespace-nowrap">
      {[...mandiTicker, ...mandiTicker].map((item, i) => (
        <span key={i} className="text-sm font-medium">
          {item}
        </span>
      ))}
    </div>
  </div>
);

const Hero = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      {/* Ticker */}
      <Marquee />

      {/* Hero Section */}
      <section className="relative flex-1 min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Wheat field background */}
        <WheatField />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent z-10" />

        {/* Content */}
        <div className="relative z-20 text-center px-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-4 drop-shadow-lg">
              {t('brand')}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 font-body"
          >
            {t('hero_subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/mandi"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              <Search size={20} />
              {t('check_crops')}
            </Link>
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 bg-crop text-crop-foreground px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              <ShoppingCart size={20} />
              {t('find_buyers')}
            </Link>
            <Link
              to="/weather"
              className="inline-flex items-center gap-2 bg-earth text-earth-foreground px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              <Cloud size={20} />
              {t('weather')}
            </Link>
          </motion.div>
        </div>

        {/* Live Stats HUD */}
        <HeroStats />

        {/* Birds */}
        <div className="absolute top-20 left-0 z-15 opacity-60">
          <span className="animate-bird inline-block text-2xl" style={{ animationDelay: '0s' }}>🐦</span>
        </div>
        <div className="absolute top-32 left-0 z-15 opacity-40">
          <span className="animate-bird inline-block text-xl" style={{ animationDelay: '3s' }}>🐦</span>
        </div>
        <div className="absolute top-16 left-0 z-15 opacity-50">
          <span className="animate-bird inline-block text-lg" style={{ animationDelay: '7s' }}>🐦</span>
        </div>
      </section>

      {/* Wave divider */}
      <svg viewBox="0 0 1440 60" className="w-full -mt-1" preserveAspectRatio="none">
        <path fill="hsl(var(--sky))" d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z" />
      </svg>

      {/* Features Section */}
      <section className="bg-sky py-16 noise-bg">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl text-center mb-12"
          >
            🌱 हमारी सेवाएं
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: "📊", title: "मंडी भाव", desc: "रोज़ाना ताज़ा भाव", path: "/mandi" },
              { icon: "🌦️", title: "मौसम", desc: "7 दिन का पूर्वानुमान", path: "/weather" },
              { icon: "🤝", title: "सीधा बाज़ार", desc: "बिचौलिया नहीं", path: "/marketplace" },
              { icon: "📋", title: "सरकारी योजनाएं", desc: "PM-Kisan और अन्य", path: "/schemes" },
              { icon: "🌿", title: "फसल सलाह", desc: "AI आधारित", path: "/advisor" },
              { icon: "👨‍🌾", title: "किसान समुदाय", desc: "सवाल-जवाब", path: "/community" },
              { icon: "📱", title: "मेरा खेत", desc: "खेत का हिसाब", path: "/dashboard" },
              { icon: "🔔", title: "अलर्ट", desc: "भाव और मौसम", path: "/mandi" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={item.path}
                  className="block bg-card rounded-2xl p-5 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all border border-border"
                >
                  <span className="text-4xl block mb-2">{item.icon}</span>
                  <h3 className="font-display text-base md:text-lg">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
