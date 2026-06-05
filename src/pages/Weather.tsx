import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Cloud, Droplets, Wind, Thermometer, Sun, AlertTriangle } from "lucide-react";

const forecast = [
  { day: "आज", icon: "☀️", high: 38, low: 24, rain: 10, advice: "सिंचाई का अच्छा समय", wind: 12 },
  { day: "कल", icon: "🌦️", high: 35, low: 23, rain: 70, advice: "कीटनाशक छिड़काव टालें — नमी बढ़ेगी", wind: 18 },
  { day: "परसों", icon: "⛈️", high: 32, low: 22, rain: 85, advice: "फसल ढकें — तेज़ बारिश संभव", wind: 25 },
  { day: "गुरुवार", icon: "🌤️", high: 36, low: 23, rain: 20, advice: "खाद डालने का सही समय", wind: 10 },
  { day: "शुक्रवार", icon: "❄️", high: 30, low: 18, rain: 15, advice: "पाला पड़ सकता है — नर्सरी ढकें", wind: 8 },
  { day: "शनिवार", icon: "☀️", high: 37, low: 24, rain: 5, advice: "बुवाई के लिए उपयुक्त", wind: 14 },
  { day: "रविवार", icon: "🌤️", high: 36, low: 23, rain: 10, advice: "सामान्य दिन — खेत की देखभाल करें", wind: 11 },
];

const WeatherCenter = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      {/* Alert Banner */}
      <div className="bg-destructive/90 text-destructive-foreground py-3 px-4">
        <div className="container flex items-center gap-3">
          <AlertTriangle size={20} />
          <span className="font-bold text-sm">⚠️ तेज़ बारिश की चेतावनी — वाराणसी, कल शाम 4 बजे से</span>
        </div>
      </div>

      <section className="relative py-12 overflow-hidden">
        {/* Dynamic sky background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-300 via-amber-100 to-sky" />
        <div className="absolute top-8 right-12 text-6xl animate-sun-rise">☀️</div>

        <div className="container relative z-10">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-display text-3xl md:text-5xl text-center mb-2"
          >
            🌦️ {t('weather_center')}
          </motion.h1>
          <p className="text-center text-muted-foreground mb-8">📍 वाराणसी, उत्तर प्रदेश</p>

          {/* Current Weather */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto bg-card/90 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-xl text-center mb-10"
          >
            <span className="text-6xl block mb-2">☀️</span>
            <p className="font-display text-5xl text-primary">38°C</p>
            <p className="text-muted-foreground mt-1">साफ़ आसमान • महसूस 42°C</p>
            <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-border">
              <div className="flex flex-col items-center gap-1">
                <Droplets size={18} className="text-blue-500" />
                <span className="text-xs text-muted-foreground">नमी</span>
                <span className="text-sm font-bold">45%</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Wind size={18} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">हवा</span>
                <span className="text-sm font-bold">12 km/h</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Cloud size={18} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">बारिश</span>
                <span className="text-sm font-bold">10%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7-day forecast */}
      <section className="container py-8">
        <h2 className="font-display text-2xl mb-6">📅 7 दिन का पूर्वानुमान</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {forecast.map((day, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-4 shadow-md"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-sm">{day.day}</span>
                <span className="text-3xl">{day.icon}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Thermometer size={14} className="text-destructive" />
                <span className="text-sm">{day.high}° / {day.low}°</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Droplets size={14} className="text-blue-500" />
                <span className="text-sm">बारिश: {day.rain}%</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Wind size={14} />
                <span className="text-sm">{day.wind} km/h</span>
              </div>
              <div className="bg-crop/10 rounded-lg p-2">
                <p className="text-xs text-crop font-medium">🌿 {day.advice}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Seasonal Calendar */}
        <div className="mt-10 bg-card border border-border rounded-2xl p-6 shadow-md">
          <h2 className="font-display text-xl mb-4">🗓️ मौसमी कैलेंडर</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { season: "रबी", emoji: "🌾", window: "अक्टूबर 15 – नवंबर 30", crops: "गेहूं, सरसों, चना, मटर" },
              { season: "खरीफ", emoji: "🌽", window: "जून 15 – जुलाई 31", crops: "धान, सोयाबीन, मक्का, कपास" },
              { season: "जायद", emoji: "🍈", window: "मार्च 1 – अप्रैल 15", crops: "तरबूज, खीरा, मूंग" },
            ].map((s, i) => (
              <div key={i} className="bg-sky/50 rounded-xl p-4">
                <span className="text-3xl">{s.emoji}</span>
                <h3 className="font-display text-lg mt-2">{s.season} सीज़न</h3>
                <p className="text-sm text-primary font-bold mt-1">बुवाई: {s.window}</p>
                <p className="text-xs text-muted-foreground mt-1">फसलें: {s.crops}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WeatherCenter;
