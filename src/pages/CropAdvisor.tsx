import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Leaf, TrendingUp, DollarSign, Calendar, ChevronRight, Droplets, Sun, Thermometer } from "lucide-react";

interface CropRecommendation {
  name: string;
  emoji: string;
  yield: string;
  demandScore: number;
  inputCost: string;
  profitEstimate: string;
  season: string;
  duration: string;
  waterNeed: string;
  tips: string[];
}

const soilTypes = [
  { value: "alluvial", label: "जलोढ़ (Alluvial)", emoji: "🏔️" },
  { value: "black", label: "काली मिट्टी (Black)", emoji: "⬛" },
  { value: "red", label: "लाल मिट्टी (Red)", emoji: "🟥" },
  { value: "laterite", label: "लैटेराइट (Laterite)", emoji: "🟫" },
  { value: "sandy", label: "बलुई (Sandy)", emoji: "🏜️" },
  { value: "clay", label: "चिकनी (Clay)", emoji: "🟤" },
];

const seasons = [
  { value: "kharif", label: "खरीफ (जून-अक्टूबर)", emoji: "🌧️" },
  { value: "rabi", label: "रबी (नवंबर-मार्च)", emoji: "❄️" },
  { value: "zaid", label: "जायद (मार्च-जून)", emoji: "☀️" },
];

const recommendations: Record<string, CropRecommendation[]> = {
  "alluvial-rabi": [
    { name: "गेहूं", emoji: "🌾", yield: "45-55 क्विंटल/हेक्टेयर", demandScore: 92, inputCost: "₹18,000-22,000", profitEstimate: "₹65,000-80,000", season: "रबी", duration: "120-150 दिन", waterNeed: "4-5 सिंचाई", tips: ["HD-2967 या PBW-343 किस्म बोएं", "बुवाई नवंबर के पहले सप्ताह में करें", "यूरिया 3 बार में डालें"] },
    { name: "सरसों", emoji: "🌼", yield: "15-20 क्विंटल/हेक्टेयर", demandScore: 85, inputCost: "₹12,000-15,000", profitEstimate: "₹55,000-70,000", season: "रबी", duration: "110-140 दिन", waterNeed: "2-3 सिंचाई", tips: ["पूसा बोल्ड किस्म अच्छी रहेगी", "अक्टूबर अंत तक बुवाई करें", "एफिड कीट की निगरानी रखें"] },
    { name: "चना", emoji: "🟤", yield: "18-25 क्विंटल/हेक्टेयर", demandScore: 88, inputCost: "₹14,000-18,000", profitEstimate: "₹70,000-95,000", season: "रबी", duration: "100-130 दिन", waterNeed: "1-2 सिंचाई", tips: ["JG-11 या पूसा-256 किस्म लगाएं", "दीमक से बचाव ज़रूरी", "फूल आने पर सिंचाई न करें"] },
  ],
  "alluvial-kharif": [
    { name: "धान", emoji: "🍚", yield: "50-65 क्विंटल/हेक्टेयर", demandScore: 95, inputCost: "₹22,000-28,000", profitEstimate: "₹75,000-1,00,000", season: "खरीफ", duration: "120-150 दिन", waterNeed: "लगातार पानी", tips: ["पूसा बासमती 1121 या 1509", "जून के दूसरे सप्ताह में रोपाई", "ब्लास्ट रोग की निगरानी रखें"] },
    { name: "मक्का", emoji: "🌽", yield: "60-80 क्विंटल/हेक्टेयर", demandScore: 82, inputCost: "₹16,000-20,000", profitEstimate: "₹60,000-80,000", season: "खरीफ", duration: "90-110 दिन", waterNeed: "3-4 सिंचाई", tips: ["हाइब्रिड किस्म HQPM-1 लगाएं", "तना छेदक कीट से बचाव", "जून में बुवाई करें"] },
    { name: "सोयाबीन", emoji: "🫘", yield: "20-25 क्विंटल/हेक्टेयर", demandScore: 87, inputCost: "₹15,000-18,000", profitEstimate: "₹65,000-85,000", season: "खरीफ", duration: "90-120 दिन", waterNeed: "2-3 सिंचाई", tips: ["JS-9560 किस्म बेहतर", "बीज उपचार ज़रूर करें", "जून के अंत तक बुवाई करें"] },
  ],
  "black-kharif": [
    { name: "कपास", emoji: "☁️", yield: "20-25 क्विंटल/हेक्टेयर", demandScore: 90, inputCost: "₹25,000-30,000", profitEstimate: "₹90,000-1,20,000", season: "खरीफ", duration: "150-180 दिन", waterNeed: "4-6 सिंचाई", tips: ["Bt कपास की अच्छी किस्म चुनें", "गुलाबी सुंडी से बचाव", "समय पर चुनाई करें"] },
    { name: "सोयाबीन", emoji: "🫘", yield: "22-28 क्विंटल/हेक्टेयर", demandScore: 88, inputCost: "₹14,000-17,000", profitEstimate: "₹70,000-90,000", season: "खरीफ", duration: "90-110 दिन", waterNeed: "2-3 सिंचाई", tips: ["काली मिट्टी में बहुत अच्छी उपज", "जल निकास का ध्यान रखें", "JS-9560 या JS-2034 लगाएं"] },
    { name: "तुअर (अरहर)", emoji: "🟡", yield: "15-20 क्विंटल/हेक्टेयर", demandScore: 84, inputCost: "₹12,000-16,000", profitEstimate: "₹75,000-1,00,000", season: "खरीफ", duration: "150-180 दिन", waterNeed: "1-2 सिंचाई", tips: ["ICPL-87 किस्म लगाएं", "फलीछेदक कीट से बचाव", "जून में बुवाई करें"] },
  ],
};

const getKey = (soil: string, season: string) => `${soil}-${season}`;

const CropAdvisor = () => {
  const { t } = useTranslation();
  const [soil, setSoil] = useState("");
  const [season, setSeason] = useState("");
  const [landSize, setLandSize] = useState("");
  const [state, setState] = useState("");
  const [showResults, setShowResults] = useState(false);

  const key = getKey(soil, season);
  const results = recommendations[key] || recommendations["alluvial-rabi"] || [];

  const handleSubmit = () => {
    if (soil && season) setShowResults(true);
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <section className="bg-gradient-to-br from-crop/10 via-sky to-primary/10 py-10 noise-bg">
        <div className="container text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl md:text-5xl mb-3"
          >
            🌿 {t('crop_advisor')}
          </motion.h1>
          <p className="text-muted-foreground">AI आधारित फसल सिफारिश — सबसे फायदेमंद फसल जानें</p>
        </div>
      </section>

      <div className="container py-8">
        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-card border border-border rounded-2xl p-6 shadow-md mb-8"
        >
          <h2 className="font-display text-xl mb-4">🧑‍🌾 अपनी जानकारी भरें</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">मिट्टी का प्रकार</label>
              <div className="grid grid-cols-2 gap-2">
                {soilTypes.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setSoil(s.value)}
                    className={`p-3 rounded-xl text-left text-sm transition-all ${
                      soil === s.value
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-background border border-border hover:bg-muted"
                    }`}
                  >
                    <span className="text-lg">{s.emoji}</span>
                    <p className="mt-1 text-xs font-medium">{s.label}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">मौसम</label>
                <div className="space-y-2">
                  {seasons.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setSeason(s.value)}
                      className={`w-full p-3 rounded-xl text-left text-sm flex items-center gap-3 transition-all ${
                        season === s.value
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "bg-background border border-border hover:bg-muted"
                      }`}
                    >
                      <span className="text-xl">{s.emoji}</span>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">ज़मीन का आकार (एकड़)</label>
                <input
                  type="number"
                  value={landSize}
                  onChange={(e) => setLandSize(e.target.value)}
                  placeholder="जैसे: 5"
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">राज्य</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm"
                >
                  <option value="">राज्य चुनें</option>
                  <option>उत्तर प्रदेश</option>
                  <option>मध्य प्रदेश</option>
                  <option>राजस्थान</option>
                  <option>महाराष्ट्र</option>
                  <option>पंजाब</option>
                  <option>हरियाणा</option>
                  <option>गुजरात</option>
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!soil || !season}
            className="mt-6 w-full bg-crop text-crop-foreground rounded-xl py-3 font-bold text-base hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            🌱 फसल सिफारिश पाएं
          </button>
        </motion.div>

        {/* Results */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-display text-2xl mb-6 text-center">🎯 आपके लिए सबसे अच्छी फसलें</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {results.map((crop, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className={`bg-card border-2 rounded-2xl p-5 shadow-md relative overflow-hidden ${
                    i === 0 ? "border-primary" : "border-border"
                  }`}
                >
                  {i === 0 && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-xl">
                      ⭐ सर्वोत्तम
                    </div>
                  )}
                  <div className="text-center mb-4">
                    <span className="text-5xl block mb-2">{crop.emoji}</span>
                    <h3 className="font-display text-xl">{crop.name}</h3>
                    <p className="text-xs text-muted-foreground">{crop.season} • {crop.duration}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp size={16} className="text-crop" />
                      <span className="text-muted-foreground">उपज:</span>
                      <span className="font-bold">{crop.yield}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign size={16} className="text-primary" />
                      <span className="text-muted-foreground">अनुमानित लाभ:</span>
                      <span className="font-bold text-crop">{crop.profitEstimate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Leaf size={16} className="text-muted-foreground" />
                      <span className="text-muted-foreground">लागत:</span>
                      <span className="font-medium">{crop.inputCost}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Droplets size={16} className="text-blue-500" />
                      <span className="text-muted-foreground">पानी:</span>
                      <span className="font-medium">{crop.waterNeed}</span>
                    </div>

                    {/* Demand score bar */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">बाज़ार माँग</span>
                        <span className="font-bold text-primary">{crop.demandScore}%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${crop.demandScore}%` }}
                          transition={{ delay: 0.5 + i * 0.15, duration: 0.8 }}
                          className="h-full bg-gradient-to-r from-primary to-crop rounded-full"
                        />
                      </div>
                    </div>

                    {/* Tips */}
                    <div className="pt-3 border-t border-border">
                      <h4 className="text-xs font-bold mb-2">💡 सुझाव:</h4>
                      <ul className="space-y-1">
                        {crop.tips.map((tip, j) => (
                          <li key={j} className="text-xs text-muted-foreground flex items-start gap-1.5">
                            <ChevronRight size={10} className="text-primary mt-0.5 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Crop Rotation Planner */}
            <div className="mt-10 bg-card border border-border rounded-2xl p-6 shadow-md">
              <h2 className="font-display text-xl mb-4">🔄 फसल चक्र योजना (Crop Rotation)</h2>
              <div className="flex flex-col md:flex-row items-center gap-4">
                {[
                  { season: "खरीफ (जून-अक्)", crop: "🍚 धान / 🫘 सोयाबीन", bg: "bg-crop/10" },
                  { season: "रबी (नव-मार्च)", crop: "🌾 गेहूं / 🌼 सरसों", bg: "bg-primary/10" },
                  { season: "जायद (मार्च-जून)", crop: "🍈 मूंग / 🥒 खीरा", bg: "bg-gold/20" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 flex-1">
                    <div className={`${item.bg} rounded-xl p-4 flex-1 text-center`}>
                      <p className="text-xs text-muted-foreground mb-1">{item.season}</p>
                      <p className="font-display text-base">{item.crop}</p>
                    </div>
                    {i < 2 && <ChevronRight size={20} className="text-muted-foreground hidden md:block" />}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CropAdvisor;
