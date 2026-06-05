import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { formatIndianPrice } from "@/lib/mockData";
import { MapPin, Phone, Star, Shield, Filter, MessageCircle, Search, ChevronDown, X, Heart } from "lucide-react";

interface Listing {
  id: string;
  type: "sell" | "buy";
  farmerName: string;
  crop: string;
  cropEmoji: string;
  quantity: string;
  price: number;
  location: string;
  district: string;
  state: string;
  phone: string;
  verified: boolean;
  trustScore: number;
  distance: number;
  posted: string;
  description: string;
  photo: string;
}

const listings: Listing[] = [
  { id: "1", type: "sell", farmerName: "रामलाल यादव", crop: "गेहूं", cropEmoji: "🌾", quantity: "50 क्विंटल", price: 2200, location: "लखनऊ", district: "Lucknow", state: "Uttar Pradesh", phone: "+919876543210", verified: true, trustScore: 4.8, distance: 12, posted: "2 घंटे पहले", description: "शरबती गेहूं, उच्च गुणवत्ता, नमी 12% से कम। सीधे खेत से।", photo: "🌾" },
  { id: "2", type: "buy", farmerName: "अग्रवाल ट्रेडिंग कंपनी", crop: "टमाटर", cropEmoji: "🍅", quantity: "100 क्विंटल", price: 4000, location: "वाराणसी", district: "Varanasi", state: "Uttar Pradesh", phone: "+919876543211", verified: true, trustScore: 4.5, distance: 25, posted: "1 घंटा पहले", description: "ताज़ा लाल टमाटर चाहिए, A ग्रेड। नियमित आपूर्ति हो तो बेहतर।", photo: "🍅" },
  { id: "3", type: "sell", farmerName: "सुरेश पटेल", crop: "प्याज", cropEmoji: "🧅", quantity: "30 क्विंटल", price: 1900, location: "नासिक", district: "Nashik", state: "Maharashtra", phone: "+919876543212", verified: true, trustScore: 4.9, distance: 8, posted: "30 मिनट पहले", description: "नासिक का लाल प्याज, बड़े साइज़। गोदाम में तैयार।", photo: "🧅" },
  { id: "4", type: "buy", farmerName: "कृष्णा फूड प्रोसेसिंग", crop: "आलू", cropEmoji: "🥔", quantity: "200 क्विंटल", price: 1500, location: "आगरा", district: "Agra", state: "Uttar Pradesh", phone: "+919876543213", verified: true, trustScore: 4.3, distance: 35, posted: "3 घंटे पहले", description: "चिप्स बनाने के लिए आलू चाहिए। चिपसोना या लेडी रोज़ेटा।", photo: "🥔" },
  { id: "5", type: "sell", farmerName: "मोहन सिंह", crop: "सरसों", cropEmoji: "🌼", quantity: "25 क्विंटल", price: 5200, location: "जयपुर", district: "Jaipur", state: "Rajasthan", phone: "+919876543214", verified: false, trustScore: 4.1, distance: 45, posted: "5 घंटे पहले", description: "शुद्ध सरसों, तेल निकालने के लिए उत्तम। 42% तेल अंश।", photo: "🌼" },
  { id: "6", type: "buy", farmerName: "गुजरात कॉटन मिल्स", crop: "कपास", cropEmoji: "☁️", quantity: "500 क्विंटल", price: 6500, location: "राजकोट", district: "Rajkot", state: "Gujarat", phone: "+919876543215", verified: true, trustScore: 4.7, distance: 15, posted: "1 घंटा पहले", description: "लंबे रेशे वाली कपास चाहिए। MCU-5 या शंकर-6।", photo: "☁️" },
  { id: "7", type: "sell", farmerName: "दिनेश कुमार", crop: "धान", cropEmoji: "🍚", quantity: "80 क्विंटल", price: 3900, location: "लुधियाना", district: "Ludhiana", state: "Punjab", phone: "+919876543216", verified: true, trustScore: 4.6, distance: 20, posted: "4 घंटे पहले", description: "पूसा बासमती 1121, सुगंधित, लम्बा दाना।", photo: "🍚" },
  { id: "8", type: "buy", farmerName: "शर्मा दालें", crop: "चना", cropEmoji: "🟤", quantity: "150 क्विंटल", price: 5500, location: "भोपाल", district: "Bhopal", state: "Madhya Pradesh", phone: "+919876543217", verified: true, trustScore: 4.4, distance: 30, posted: "2 घंटे पहले", description: "देसी चना चाहिए, दाल बनाने के लिए। साफ और सूखा हो।", photo: "🟤" },
];

const ListingCard = ({ listing }: { listing: Listing }) => {
  const [showContact, setShowContact] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all group"
    >
      {/* Type badge */}
      <div className={`px-4 py-2 flex items-center justify-between ${
        listing.type === "sell" ? "bg-crop/10" : "bg-primary/10"
      }`}>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
          listing.type === "sell" 
            ? "bg-crop text-crop-foreground" 
            : "bg-primary text-primary-foreground"
        }`}>
          {listing.type === "sell" ? "🌾 बेचना है" : "🛒 खरीदना है"}
        </span>
        <span className="text-xs text-muted-foreground">{listing.posted}</span>
      </div>

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl flex-shrink-0">
            {listing.cropEmoji}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-lg leading-tight">{listing.crop}</h3>
            <p className="text-sm text-muted-foreground">{listing.quantity} • ₹{formatIndianPrice(listing.price)}/क्विंटल</p>
          </div>
          <button className="text-muted-foreground hover:text-destructive transition-colors">
            <Heart size={18} />
          </button>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{listing.description}</p>

        {/* Seller/Buyer info */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm">
            👤
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium flex items-center gap-1">
              {listing.farmerName}
              {listing.verified && <Shield size={14} className="text-crop" />}
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin size={12} /> {listing.location} • {listing.distance} km दूर
            </p>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Star size={14} className="text-gold fill-current" />
            <span className="font-medium">{listing.trustScore}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowContact(!showContact)}
            className="flex-1 bg-primary text-primary-foreground rounded-xl py-2.5 font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Phone size={16} />
            संपर्क करें
          </button>
          <a
            href={`https://wa.me/${listing.phone.replace('+', '')}?text=नमस्ते! मुझे ${listing.crop} के बारे में बात करनी है।`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-crop text-crop-foreground rounded-xl px-4 py-2.5 font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>
        </div>

        <AnimatePresence>
          {showContact && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-sm font-medium">📞 {listing.phone}</p>
                <p className="text-xs text-muted-foreground mt-1">📍 {listing.district}, {listing.state}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Marketplace = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<"all" | "sell" | "buy">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPostForm, setShowPostForm] = useState(false);

  const filtered = listings.filter(l => {
    const matchType = filter === "all" || l.type === filter;
    const matchSearch = !searchQuery || l.crop.includes(searchQuery) || l.farmerName.includes(searchQuery) || l.location.includes(searchQuery);
    return matchType && matchSearch;
  });

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      {/* Header */}
      <section className="bg-gradient-to-br from-crop/10 via-sky to-primary/10 py-10 noise-bg">
        <div className="container text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl md:text-5xl mb-3"
          >
            🤝 {t('buyer_market')}
          </motion.h1>
          <p className="text-muted-foreground mb-6">बिचौलिया हटाएं — सीधे खरीदार/किसान से जुड़ें</p>

          {/* Search + Filters */}
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="फसल, किसान या शहर खोजें..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex items-center justify-center gap-2">
              {[
                { key: "all" as const, label: "सभी", emoji: "📋" },
                { key: "sell" as const, label: "बेचना है", emoji: "🌾" },
                { key: "buy" as const, label: "खरीदना है", emoji: "🛒" },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    filter === f.key
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-card border border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {f.emoji} {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container py-8">
        {/* Post CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-r from-primary/10 to-crop/10 border border-primary/20 rounded-2xl p-6 mb-8 text-center"
        >
          <h2 className="font-display text-xl mb-2">अपनी फसल बेचें या खरीदार खोजें</h2>
          <p className="text-sm text-muted-foreground mb-4">मुफ्त में विज्ञापन डालें — हज़ारों खरीदार देखेंगे</p>
          <button
            onClick={() => setShowPostForm(!showPostForm)}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            ✍️ नई लिस्टिंग डालें
          </button>
        </motion.div>

        {/* Post Form */}
        <AnimatePresence>
          {showPostForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-card border border-border rounded-2xl p-6 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg">नई लिस्टिंग</h3>
                  <button onClick={() => setShowPostForm(false)} className="text-muted-foreground hover:text-foreground">
                    <X size={20} />
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">क्या करना है?</label>
                    <select className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm">
                      <option>🌾 बेचना है</option>
                      <option>🛒 खरीदना है</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">फसल</label>
                    <input type="text" placeholder="जैसे: गेहूं, टमाटर..." className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">मात्रा</label>
                    <input type="text" placeholder="जैसे: 50 क्विंटल" className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">मनचाहा भाव (₹/क्विंटल)</label>
                    <input type="number" placeholder="2000" className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">आपका नाम</label>
                    <input type="text" placeholder="नाम" className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">मोबाइल नंबर</label>
                    <input type="tel" placeholder="+91 98765 43210" className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium mb-1 block">विवरण</label>
                    <textarea placeholder="फसल की गुणवत्ता, किस्म आदि..." rows={3} className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm resize-none" />
                  </div>
                </div>
                <button className="mt-4 w-full bg-primary text-primary-foreground rounded-xl py-3 font-bold hover:opacity-90 transition-opacity">
                  📢 लिस्टिंग प्रकाशित करें
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Listings Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <span className="text-5xl block mb-4">🔍</span>
            <p className="text-muted-foreground">कोई लिस्टिंग नहीं मिली</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
