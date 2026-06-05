import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ExternalLink, CheckCircle, FileText, ChevronDown, ChevronUp, Search, Filter } from "lucide-react";

interface Scheme {
  id: string;
  name: string;
  nameHi: string;
  emoji: string;
  ministry: string;
  category: string;
  description: string;
  benefits: string[];
  eligibility: string[];
  documents: string[];
  applyLink: string;
  states: string[];
  crops: string[];
  amount: string;
  lastDate: string;
}

const schemes: Scheme[] = [
  {
    id: "1", name: "PM-Kisan Samman Nidhi", nameHi: "प्रधानमंत्री किसान सम्मान निधि", emoji: "🏦",
    ministry: "कृषि एवं किसान कल्याण मंत्रालय", category: "आर्थिक सहायता",
    description: "छोटे और सीमांत किसानों को प्रति वर्ष ₹6,000 की आर्थिक सहायता, ₹2,000 की तीन किश्तों में।",
    benefits: ["₹6,000 प्रति वर्ष सीधे बैंक खाते में", "3 किश्तों में ₹2,000", "कोई बिचौलिया नहीं"],
    eligibility: ["भारतीय नागरिक किसान", "2 हेक्टेयर तक खेती योग्य भूमि", "आधार कार्ड अनिवार्य", "बैंक खाता होना चाहिए"],
    documents: ["आधार कार्ड", "बैंक पासबुक", "खसरा/खतौनी", "मोबाइल नंबर"],
    applyLink: "https://pmkisan.gov.in", states: ["सभी राज्य"], crops: ["सभी फसलें"], amount: "₹6,000/वर्ष", lastDate: "हमेशा खुला"
  },
  {
    id: "2", name: "PM Fasal Bima Yojana", nameHi: "प्रधानमंत्री फसल बीमा योजना", emoji: "🛡️",
    ministry: "कृषि एवं किसान कल्याण मंत्रालय", category: "फसल बीमा",
    description: "प्राकृतिक आपदा, कीट रोग से फसल नुकसान पर बीमा कवर। खरीफ: 2%, रबी: 1.5% प्रीमियम।",
    benefits: ["फसल नुकसान पर पूरा मुआवज़ा", "कम प्रीमियम — सरकार देती है बाकी", "सभी प्राकृतिक आपदाओं पर कवर", "72 घंटे में क्लेम रिपोर्ट"],
    eligibility: ["सभी किसान (ऋणी और गैर-ऋणी)", "अधिसूचित फसल उगाने वाले", "बुवाई से पहले आवेदन ज़रूरी"],
    documents: ["आधार कार्ड", "बैंक पासबुक", "खसरा/खतौनी", "बुवाई प्रमाण पत्र", "फोटो"],
    applyLink: "https://pmfby.gov.in", states: ["सभी राज्य"], crops: ["खरीफ और रबी फसलें"], amount: "फसल अनुसार", lastDate: "सीज़न अनुसार"
  },
  {
    id: "3", name: "Kisan Credit Card", nameHi: "किसान क्रेडिट कार्ड", emoji: "💳",
    ministry: "वित्त मंत्रालय / NABARD", category: "ऋण",
    description: "₹3 लाख तक का अल्पकालिक कृषि ऋण 4% ब्याज दर पर। ATM से भी निकासी।",
    benefits: ["4% ब्याज दर (समय पर भुगतान)", "₹3 लाख तक ऋण", "ATM कार्ड से कभी भी निकासी", "फसल बीमा भी शामिल"],
    eligibility: ["सभी किसान — मालिक, बटाईदार, किरायेदार", "18-75 वर्ष आयु", "खेती योग्य भूमि"],
    documents: ["आधार कार्ड", "पैन कार्ड", "खसरा/खतौनी", "पासपोर्ट फोटो", "बैंक पासबुक"],
    applyLink: "https://www.nabard.org", states: ["सभी राज्य"], crops: ["सभी फसलें"], amount: "₹3 लाख तक", lastDate: "हमेशा खुला"
  },
  {
    id: "4", name: "Soil Health Card", nameHi: "मृदा स्वास्थ्य कार्ड", emoji: "🧪",
    ministry: "कृषि एवं किसान कल्याण मंत्रालय", category: "मिट्टी जाँच",
    description: "मिट्टी की जाँच रिपोर्ट और फसल अनुसार खाद की सिफारिश। हर 2 साल में मुफ्त जाँच।",
    benefits: ["मुफ्त मिट्टी जाँच", "फसल अनुसार खाद सिफारिश", "उत्पादन बढ़ाने में सहायक", "खाद खर्च में बचत"],
    eligibility: ["सभी किसान", "खेती योग्य भूमि धारक"],
    documents: ["आधार कार्ड", "मिट्टी का नमूना", "खेत का विवरण"],
    applyLink: "https://soilhealth.dac.gov.in", states: ["सभी राज्य"], crops: ["सभी"], amount: "मुफ्त", lastDate: "हमेशा खुला"
  },
  {
    id: "5", name: "PM Krishi Sinchai Yojana", nameHi: "प्रधानमंत्री कृषि सिंचाई योजना", emoji: "💧",
    ministry: "कृषि एवं किसान कल्याण मंत्रालय", category: "सिंचाई",
    description: "ड्रिप और स्प्रिंकलर सिंचाई पर 55-80% सब्सिडी। हर खेत को पानी।",
    benefits: ["55-80% सब्सिडी सिंचाई उपकरण पर", "ड्रिप/स्प्रिंकलर सेटअप", "पानी की 40% बचत", "उत्पादन में 20-30% वृद्धि"],
    eligibility: ["सभी किसान", "5 हेक्टेयर तक भूमि को प्राथमिकता", "जल स्रोत उपलब्ध होना चाहिए"],
    documents: ["आधार कार्ड", "खसरा/खतौनी", "बैंक पासबुक", "सिंचाई योजना"],
    applyLink: "https://pmksy.gov.in", states: ["सभी राज्य"], crops: ["सभी"], amount: "55-80% सब्सिडी", lastDate: "राज्य अनुसार"
  },
  {
    id: "6", name: "eNAM - National Agriculture Market", nameHi: "राष्ट्रीय कृषि बाज़ार (eNAM)", emoji: "🏪",
    ministry: "कृषि एवं किसान कल्याण मंत्रालय", category: "बाज़ार",
    description: "ऑनलाइन मंडी — देश की किसी भी मंडी में अपनी फसल बेचें। पारदर्शी नीलामी।",
    benefits: ["देशभर की मंडियों में पहुँच", "पारदर्शी नीलामी", "बेहतर कीमत", "सीधे बैंक में भुगतान"],
    eligibility: ["सभी किसान", "मंडी लाइसेंस धारक व्यापारी", "आधार लिंक्ड"],
    documents: ["आधार कार्ड", "बैंक पासबुक", "मोबाइल नंबर"],
    applyLink: "https://enam.gov.in", states: ["सभी राज्य"], crops: ["सभी अधिसूचित फसलें"], amount: "बाज़ार भाव", lastDate: "हमेशा खुला"
  },
];

const categories = ["सभी", "आर्थिक सहायता", "फसल बीमा", "ऋण", "मिट्टी जाँच", "सिंचाई", "बाज़ार"];

const SchemeCard = ({ scheme }: { scheme: Scheme }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="bg-card border border-border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
    >
      <div className="p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl flex-shrink-0">
            {scheme.emoji}
          </div>
          <div className="flex-1">
            <h3 className="font-display text-lg leading-tight">{scheme.nameHi}</h3>
            <p className="text-xs text-muted-foreground">{scheme.ministry}</p>
          </div>
          <span className="text-xs font-bold bg-crop/10 text-crop px-2 py-1 rounded-lg">{scheme.amount}</span>
        </div>

        <p className="text-sm text-muted-foreground mb-3">{scheme.description}</p>

        {/* Benefits preview */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {scheme.benefits.slice(0, 2).map((b, i) => (
            <span key={i} className="text-xs bg-muted px-2 py-1 rounded-lg flex items-center gap-1">
              <CheckCircle size={12} className="text-crop" /> {b}
            </span>
          ))}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-1 text-sm text-primary font-medium py-2 hover:bg-primary/5 rounded-lg transition-colors"
        >
          {expanded ? "कम देखें" : "पूरी जानकारी"}
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-3 space-y-4 border-t border-border">
                {/* Eligibility */}
                <div>
                  <h4 className="text-sm font-bold mb-2">✅ पात्रता</h4>
                  <ul className="space-y-1">
                    {scheme.eligibility.map((e, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-crop mt-0.5">•</span> {e}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Documents */}
                <div>
                  <h4 className="text-sm font-bold mb-2">📄 ज़रूरी दस्तावेज़</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {scheme.documents.map((d, i) => (
                      <span key={i} className="text-xs bg-sky px-2 py-1 rounded-lg flex items-center gap-1">
                        <FileText size={10} /> {d}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Benefits full */}
                <div>
                  <h4 className="text-sm font-bold mb-2">🎁 लाभ</h4>
                  <ul className="space-y-1">
                    {scheme.benefits.map((b, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                        <CheckCircle size={12} className="text-crop mt-0.5 flex-shrink-0" /> {b}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>📅 अंतिम तिथि: {scheme.lastDate}</span>
                </div>

                <a
                  href={scheme.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground rounded-xl py-2.5 font-bold text-sm hover:opacity-90 transition-opacity"
                >
                  <ExternalLink size={16} />
                  ऑनलाइन आवेदन करें
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Schemes = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("सभी");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = schemes.filter(s => {
    const matchCat = activeCategory === "सभी" || s.category === activeCategory;
    const matchSearch = !searchQuery || s.nameHi.includes(searchQuery) || s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.includes(searchQuery);
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <section className="bg-gradient-to-br from-primary/10 via-sky to-crop/10 py-10 noise-bg">
        <div className="container text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl md:text-5xl mb-3"
          >
            📋 {t('govt_schemes')}
          </motion.h1>
          <p className="text-muted-foreground mb-6">किसानों के लिए सरकारी योजनाएं — पात्रता जाँचें, आवेदन करें</p>

          <div className="max-w-xl mx-auto mb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="योजना खोजें..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card border border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Checker CTA */}
      <div className="container py-6">
        <div className="bg-gradient-to-r from-crop/10 to-primary/10 border border-crop/20 rounded-2xl p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span className="text-5xl">🎯</span>
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-display text-xl">पात्रता जाँचें</h2>
              <p className="text-sm text-muted-foreground">अपनी जानकारी भरें — हम बताएंगे कौन सी योजना आपके लिए है</p>
            </div>
            <button className="bg-crop text-crop-foreground px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
              🔍 अभी जाँचें
            </button>
          </div>
        </div>
      </div>

      <div className="container pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schemes;
