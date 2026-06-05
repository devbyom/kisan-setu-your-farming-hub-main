import { useState, useRef, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { cropPrices, states, districts, formatIndianPrice, type CropPrice } from "@/lib/mockData";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import { Search, TrendingUp, TrendingDown, Bell, ArrowLeftRight } from "lucide-react";
import VanillaTilt from "vanilla-tilt";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, ChartTooltip, Legend);

const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      VanillaTilt.init(ref.current, {
        max: 8,
        speed: 400,
        glare: true,
        "max-glare": 0.15,
      });
    }
    return () => {
      if (ref.current && (ref.current as any).vanillaTilt) {
        (ref.current as any).vanillaTilt.destroy();
      }
    };
  }, []);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

const PriceCard = ({ crop }: { crop: CropPrice }) => {
  const { t } = useTranslation();
  const isUp = crop.change > 0;

  return (
    <TiltCard className="bg-card border border-border rounded-2xl p-5 shadow-md tilt-card cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{crop.emoji}</span>
          <div>
            <h3 className="font-display text-lg">{crop.nameHi}</h3>
            <p className="text-xs text-muted-foreground">{crop.name} • {crop.district}</p>
          </div>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-bold ${
          isUp ? 'bg-crop/10 text-crop' : 'bg-destructive/10 text-destructive'
        }`}>
          {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {isUp ? '+' : ''}{crop.change}%
        </div>
      </div>

      <div className="price-highlight rounded-lg px-3 py-2 mb-3">
        <p className="text-2xl font-bold text-primary">₹{formatIndianPrice(crop.currentPrice)}</p>
        <p className="text-xs text-muted-foreground">{t('price_per_quintal')}</p>
      </div>

      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{t('min_price')}: ₹{formatIndianPrice(crop.minPrice)}</span>
        <span>{t('max_price')}: ₹{formatIndianPrice(crop.maxPrice)}</span>
      </div>
      <p className="text-[10px] text-muted-foreground mt-2">{t('last_updated')}: {crop.lastUpdated}</p>
    </TiltCard>
  );
};

const PriceChart = ({ crop }: { crop: CropPrice }) => {
  const { t } = useTranslation();
  const data = {
    labels: crop.history.map((_, i) => `${i + 1}`),
    datasets: [
      {
        label: `${crop.nameHi} (₹/क्विंटल)`,
        data: crop.history,
        borderColor: 'hsl(25, 100%, 50%)',
        backgroundColor: 'hsla(25, 100%, 50%, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'hsl(25, 70%, 22%)',
        titleFont: { family: 'Hind' },
        bodyFont: { family: 'Hind' },
        callbacks: {
          label: (ctx: any) => `₹${formatIndianPrice(ctx.raw)}/क्विंटल`,
        },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { family: 'Hind', size: 10 } } },
      y: {
        grid: { color: 'hsla(30, 30%, 82%, 0.5)' },
        ticks: {
          font: { family: 'Hind', size: 10 },
          callback: (val: any) => `₹${formatIndianPrice(val)}`,
        },
      },
    },
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-md">
      <h3 className="font-display text-lg mb-4">
        📈 {t('price_trend')} — {crop.emoji} {crop.nameHi}
      </h3>
      <div className="h-64">
        <Line data={data} options={options as any} />
      </div>
    </div>
  );
};

const MandiPriceTracker = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCrop, setSelectedCrop] = useState<CropPrice>(cropPrices[0]);
  const [compareCrop, setCompareCrop] = useState<CropPrice | null>(null);
  const [showCompare, setShowCompare] = useState(false);

  const filteredCrops = useMemo(() => {
    return cropPrices.filter((c) => {
      const matchSearch = !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.nameHi.includes(searchQuery);
      const matchState = !selectedState || c.state === selectedState;
      const matchDistrict = !selectedDistrict || c.district === selectedDistrict;
      return matchSearch && matchState && matchDistrict;
    });
  }, [searchQuery, selectedState, selectedDistrict]);

  const topCrops = useMemo(() =>
    [...cropPrices].sort((a, b) => b.change - a.change),
    []
  );

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-sky to-crop/10 py-10 noise-bg">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl md:text-5xl text-center mb-6"
          >
            📊 {t('mandi_prices')}
          </motion.h1>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto flex flex-col md:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder={t('search_crop')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <select
              value={selectedState}
              onChange={(e) => { setSelectedState(e.target.value); setSelectedDistrict(""); }}
              className="px-4 py-3 bg-card border border-border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">{t('search_state')}</option>
              {states.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={!selectedState}
              className="px-4 py-3 bg-card border border-border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            >
              <option value="">{t('search_district')}</option>
              {selectedState && districts[selectedState]?.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </motion.div>
        </div>
      </section>

      <div className="container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Price Cards */}
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <AnimatePresence mode="popLayout">
                {filteredCrops.map((crop) => (
                  <motion.div
                    key={crop.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => setSelectedCrop(crop)}
                  >
                    <PriceCard crop={crop} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Chart */}
            <PriceChart crop={selectedCrop} />

            {/* Compare */}
            {showCompare && compareCrop && (
              <div className="mt-6">
                <PriceChart crop={compareCrop} />
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            {/* Top 10 leaderboard */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-md">
              <h3 className="font-display text-lg mb-4">🏆 {t('top_crops')}</h3>
              <div className="space-y-2">
                {topCrops.map((crop, i) => (
                  <button
                    key={crop.id}
                    onClick={() => setSelectedCrop(crop)}
                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors text-left"
                  >
                    <span className="text-sm font-bold text-muted-foreground w-6">{i + 1}</span>
                    <span className="text-xl">{crop.emoji}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{crop.nameHi}</p>
                      <p className="text-xs text-muted-foreground">₹{formatIndianPrice(crop.currentPrice)}</p>
                    </div>
                    <span className={`text-xs font-bold ${crop.change > 0 ? 'text-crop' : 'text-destructive'}`}>
                      {crop.change > 0 ? '+' : ''}{crop.change}%
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Compare tool */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-md">
              <h3 className="font-display text-lg mb-4">
                <ArrowLeftRight size={18} className="inline mr-2" />
                {t('compare_crops')}
              </h3>
              <select
                value={compareCrop?.id || ""}
                onChange={(e) => {
                  const found = cropPrices.find(c => c.id === e.target.value);
                  setCompareCrop(found || null);
                  setShowCompare(!!found);
                }}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm"
              >
                <option value="">फसल चुनें...</option>
                {cropPrices.filter(c => c.id !== selectedCrop.id).map(c => (
                  <option key={c.id} value={c.id}>{c.emoji} {c.nameHi}</option>
                ))}
              </select>
            </div>

            {/* Price Alert */}
            <div className="bg-gradient-to-br from-primary/10 to-saffron-glow/10 border border-primary/20 rounded-2xl p-5 shadow-md">
              <h3 className="font-display text-lg mb-3">
                <Bell size={18} className="inline mr-2" />
                {t('set_alert')}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                जब भाव आपकी मनचाही कीमत पर पहुँचे, तुरंत सूचना पाएं
              </p>
              <input
                type="number"
                placeholder="लक्ष्य भाव (₹/क्विंटल)"
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm mb-2"
              />
              <button className="w-full bg-primary text-primary-foreground rounded-lg py-2 font-bold text-sm hover:opacity-90 transition-opacity">
                🔔 अलर्ट सेट करें
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MandiPriceTracker;
