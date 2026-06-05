import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { formatIndianPrice } from "@/lib/mockData";
import { Plus, TrendingUp, TrendingDown, Calendar, MapPin, Droplets, IndianRupee, Wheat, BarChart3 } from "lucide-react";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const farmData = {
  name: "रामलाल का खेत",
  location: "वाराणसी, उत्तर प्रदेश",
  size: "8 एकड़",
  crops: [
    { name: "गेहूं", emoji: "🌾", area: "5 एकड़", sown: "12 नवंबर 2025", harvest: "अप्रैल 2026", status: "बढ़ रही है", progress: 65 },
    { name: "सरसों", emoji: "🌼", area: "2 एकड़", sown: "20 अक्टूबर 2025", harvest: "फरवरी 2026", status: "फूल आ रहे", progress: 80 },
    { name: "आलू", emoji: "🥔", area: "1 एकड़", sown: "25 अक्टूबर 2025", harvest: "जनवरी 2026", status: "कटाई तैयार", progress: 95 },
  ],
  expenses: [
    { item: "बीज", amount: 12000, emoji: "🌱" },
    { item: "खाद/उर्वरक", amount: 18000, emoji: "🧪" },
    { item: "कीटनाशक", amount: 5000, emoji: "🐛" },
    { item: "सिंचाई", amount: 8000, emoji: "💧" },
    { item: "मज़दूरी", amount: 25000, emoji: "👷" },
    { item: "ट्रैक्टर/जुताई", amount: 10000, emoji: "🚜" },
  ],
  income: [
    { item: "आलू बिक्री (जनवरी)", amount: 85000, emoji: "🥔" },
    { item: "सरसों बिक्री (अनुमान)", amount: 65000, emoji: "🌼" },
    { item: "गेहूं बिक्री (अनुमान)", amount: 120000, emoji: "🌾" },
  ],
  notifications: [
    { text: "⚠️ गेहूं भाव ₹2,140 — आपका लक्ष्य ₹2,200 के करीब!", type: "price" },
    { text: "🌧️ कल बारिश की संभावना — सिंचाई टालें", type: "weather" },
    { text: "📋 PM-Kisan की अगली किश्त 1 अप्रैल को आएगी", type: "scheme" },
  ],
};

const Dashboard = () => {
  const { t } = useTranslation();
  const totalExpense = farmData.expenses.reduce((s, e) => s + e.amount, 0);
  const totalIncome = farmData.income.reduce((s, e) => s + e.amount, 0);

  const expenseChart = {
    labels: farmData.expenses.map(e => e.item),
    datasets: [{
      data: farmData.expenses.map(e => e.amount),
      backgroundColor: [
        'hsl(122, 46%, 33%)', 'hsl(25, 100%, 50%)', 'hsl(0, 84%, 60%)',
        'hsl(210, 80%, 55%)', 'hsl(40, 95%, 55%)', 'hsl(25, 70%, 22%)'
      ],
      borderWidth: 0,
    }],
  };

  const monthlyData = {
    labels: ["अक्टू", "नवं", "दिसं", "जन", "फर", "मार्च"],
    datasets: [
      {
        label: "आमदनी (₹)",
        data: [0, 0, 0, 85000, 65000, 120000],
        borderColor: 'hsl(122, 46%, 33%)',
        backgroundColor: 'hsla(122, 46%, 33%, 0.1)',
        fill: true, tension: 0.4, borderWidth: 3, pointRadius: 4,
      },
      {
        label: "खर्च (₹)",
        data: [15000, 22000, 12000, 8000, 10000, 11000],
        borderColor: 'hsl(0, 84%, 60%)',
        backgroundColor: 'hsla(0, 84%, 60%, 0.1)',
        fill: true, tension: 0.4, borderWidth: 3, pointRadius: 4,
      },
    ],
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <section className="bg-gradient-to-br from-crop/10 via-sky to-primary/10 py-8 noise-bg">
        <div className="container">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl md:text-4xl">📱 {farmData.name}</h1>
              <p className="text-muted-foreground flex items-center gap-2 mt-1">
                <MapPin size={14} /> {farmData.location} • {farmData.size}
              </p>
            </div>
            <button className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:opacity-90">
              <Plus size={16} /> फसल जोड़ें
            </button>
          </motion.div>
        </div>
      </section>

      <div className="container py-6">
        {/* Notifications */}
        <div className="space-y-2 mb-6">
          {farmData.notifications.map((n, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              className={`px-4 py-3 rounded-xl text-sm font-medium border ${
                n.type === "price" ? "bg-primary/5 border-primary/20" : n.type === "weather" ? "bg-blue-50 border-blue-200" : "bg-crop/5 border-crop/20"
              }`}
            >
              {n.text}
            </motion.div>
          ))}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "कुल खर्च", value: `₹${formatIndianPrice(totalExpense)}`, icon: TrendingDown, color: "text-destructive", bg: "bg-destructive/10" },
            { label: "कुल आमदनी", value: `₹${formatIndianPrice(totalIncome)}`, icon: TrendingUp, color: "text-crop", bg: "bg-crop/10" },
            { label: "शुद्ध लाभ", value: `₹${formatIndianPrice(totalIncome - totalExpense)}`, icon: IndianRupee, color: "text-primary", bg: "bg-primary/10" },
            { label: "फसलें", value: `${farmData.crops.length} फसलें`, icon: Wheat, color: "text-earth", bg: "bg-earth/10" },
          ].map((card, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-4 shadow-sm"
            >
              <div className={`w-10 h-10 ${card.bg} rounded-xl flex items-center justify-center mb-2`}>
                <card.icon size={20} className={card.color} />
              </div>
              <p className="text-xs text-muted-foreground">{card.label}</p>
              <p className={`text-lg font-bold ${card.color}`}>{card.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Crop Progress */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-display text-xl">🌾 मेरी फसलें</h2>
            {farmData.crops.map((crop, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                className="bg-card border border-border rounded-2xl p-5 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{crop.emoji}</span>
                  <div className="flex-1">
                    <h3 className="font-display text-lg">{crop.name}</h3>
                    <p className="text-xs text-muted-foreground">{crop.area} • {crop.status}</p>
                  </div>
                  <span className="text-sm font-bold text-primary">{crop.progress}%</span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-3">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${crop.progress}%` }} transition={{ duration: 1, delay: i * 0.2 }}
                    className="h-full bg-gradient-to-r from-crop to-primary rounded-full" />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>🌱 बुवाई: {crop.sown}</span>
                  <span>🌾 कटाई: {crop.harvest}</span>
                </div>
              </motion.div>
            ))}

            {/* Income vs Expense Chart */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
              <h3 className="font-display text-lg mb-4">📈 आमदनी vs खर्च</h3>
              <div className="h-64">
                <Line data={monthlyData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom" as const, labels: { font: { family: "Hind" } } } }, scales: { y: { ticks: { callback: (v: any) => `₹${formatIndianPrice(v)}` } } } }} />
              </div>
            </div>
          </div>

          {/* Expense Breakdown */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
              <h3 className="font-display text-lg mb-4">💰 खर्च विवरण</h3>
              <div className="w-48 h-48 mx-auto mb-4">
                <Doughnut data={expenseChart} options={{ responsive: true, plugins: { legend: { display: false } } }} />
              </div>
              <div className="space-y-2">
                {farmData.expenses.map((e, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span>{e.emoji} {e.item}</span>
                    <span className="font-medium">₹{formatIndianPrice(e.amount)}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-border flex items-center justify-between font-bold text-sm">
                  <span>कुल</span>
                  <span className="text-destructive">₹{formatIndianPrice(totalExpense)}</span>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
              <h3 className="font-display text-lg mb-3">💵 आमदनी</h3>
              <div className="space-y-2">
                {farmData.income.map((e, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span>{e.emoji} {e.item}</span>
                    <span className="font-medium text-crop">₹{formatIndianPrice(e.amount)}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-border flex items-center justify-between font-bold text-sm">
                  <span>कुल</span>
                  <span className="text-crop">₹{formatIndianPrice(totalIncome)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
