import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ThumbsUp, MessageCircle, Tag, Shield, Camera, ChevronUp, Send, Award } from "lucide-react";

interface Post {
  id: string;
  author: string;
  authorEmoji: string;
  isExpert: boolean;
  location: string;
  tags: string[];
  title: string;
  content: string;
  upvotes: number;
  replies: number;
  timeAgo: string;
  category: string;
}

interface SuccessStory {
  id: string;
  farmer: string;
  location: string;
  title: string;
  story: string;
  achievement: string;
  emoji: string;
}

const posts: Post[] = [
  { id: "1", author: "रामेश्वर सिंह", authorEmoji: "👨‍🌾", isExpert: false, location: "वाराणसी, UP", tags: ["गेहूं", "कीट"], title: "गेहूं में पीला रतुआ रोग — क्या करें?", content: "मेरे गेहूं की पत्तियों पर पीले धब्बे आ रहे हैं। क्या यह पीला रतुआ है? कैसे रोकें? HD-2967 किस्म है, बुवाई 15 नवंबर को की थी।", upvotes: 47, replies: 12, timeAgo: "2 घंटे पहले", category: "रोग" },
  { id: "2", author: "डॉ. अनिल शर्मा", authorEmoji: "👨‍🔬", isExpert: true, location: "IARI, नई दिल्ली", tags: ["गेहूं", "उपचार"], title: "पीला रतुआ का उपचार — विशेषज्ञ सलाह", content: "प्रोपिकोनाज़ोल 25% EC, 1ml/लीटर पानी में मिलाकर छिड़काव करें। 15 दिन बाद दोबारा। सुबह या शाम को स्प्रे करें। ज़्यादा नमी में रोग बढ़ता है।", upvotes: 156, replies: 8, timeAgo: "1 घंटा पहले", category: "उपचार" },
  { id: "3", author: "सुनीता देवी", authorEmoji: "👩‍🌾", isExpert: false, location: "मुज़फ्फरपुर, बिहार", tags: ["सब्ज़ी", "जैविक"], title: "जैविक खेती से टमाटर में कमाल का मुनाफा!", content: "इस बार जैविक विधि से टमाटर उगाए — वर्मी कम्पोस्ट + नीम तेल। 40% कम लागत और 25% ज़्यादा भाव मिला। सबको सलाह — जैविक अपनाएं!", upvotes: 89, replies: 23, timeAgo: "5 घंटे पहले", category: "सफलता" },
  { id: "4", author: "विक्रम पटेल", authorEmoji: "👨‍🌾", isExpert: false, location: "इंदौर, MP", tags: ["सोयाबीन", "बाज़ार"], title: "सोयाबीन कब बेचें — भाव बढ़ेगा या गिरेगा?", content: "अभी ₹4,650/क्विंटल मिल रहा है। क्या होल्ड करूं या बेच दूं? गोदाम में 100 क्विंटल रखा है। विशेषज्ञ बताएं।", upvotes: 34, replies: 15, timeAgo: "3 घंटे पहले", category: "बाज़ार" },
  { id: "5", author: "डॉ. प्रिया गुप्ता", authorEmoji: "👩‍🔬", isExpert: true, location: "ICAR, भोपाल", tags: ["सोयाबीन", "भाव"], title: "सोयाबीन भाव विश्लेषण — होल्ड करें", content: "वैश्विक माँग बढ़ रही है। अगले 2 महीने में ₹5,000+ जाने की संभावना। लेकिन नमी 12% से कम रखें वरना गुणवत्ता गिरेगी। भंडारण सही हो तो होल्ड करें।", upvotes: 112, replies: 6, timeAgo: "2 घंटे पहले", category: "बाज़ार" },
  { id: "6", author: "मनोज यादव", authorEmoji: "👨‍🌾", isExpert: false, location: "लखनऊ, UP", tags: ["आलू", "भंडारण"], title: "आलू का भंडारण कैसे करें — 6 महीने तक?", content: "100 क्विंटल आलू है। कोल्ड स्टोरेज महंगा है। घर पर कोई सस्ता तरीका है क्या? पिछली बार सड़ गया था बहुत सारा।", upvotes: 28, replies: 9, timeAgo: "6 घंटे पहले", category: "भंडारण" },
];

const successStories: SuccessStory[] = [
  { id: "1", farmer: "राजेश कुमार", location: "करनाल, हरियाणा", title: "₹5 लाख की कमाई — स्ट्रॉबेरी से", story: "पहले सिर्फ गेहूं-धान उगाता था। किसान सेतु पर फसल सलाहकार ने स्ट्रॉबेरी का सुझाव दिया। 1 एकड़ में ₹5 लाख कमाए!", achievement: "आय 3 गुना बढ़ी", emoji: "🍓" },
  { id: "2", farmer: "कमला बाई", location: "इंदौर, MP", title: "जैविक खेती से बदली ज़िंदगी", story: "रासायनिक खाद से मिट्टी खराब हो गई थी। जैविक विधि अपनाई — 2 साल में मिट्टी सुधरी, लागत आधी, भाव डेढ़ गुना।", achievement: "लागत 50% कम", emoji: "🌿" },
  { id: "3", farmer: "अमित सिंह", location: "वाराणसी, UP", title: "सीधा बाज़ार से ₹2 लाख ज़्यादा कमाए", story: "पहले बिचौलिए को बेचता था। किसान सेतु के बाज़ार से सीधे रेस्तरां को बेचा — हर महीने ₹20,000 ज़्यादा।", achievement: "20% ज़्यादा भाव", emoji: "🤝" },
];

const forumCategories = ["सभी", "रोग", "उपचार", "बाज़ार", "सफलता", "भंडारण"];

const Community = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"forum" | "stories">("forum");
  const [activeCategory, setActiveCategory] = useState("सभी");
  const [showNewPost, setShowNewPost] = useState(false);
  const [upvoted, setUpvoted] = useState<Set<string>>(new Set());

  const filteredPosts = posts.filter(p =>
    activeCategory === "सभी" || p.category === activeCategory
  );

  const toggleUpvote = (id: string) => {
    setUpvoted(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <section className="bg-gradient-to-br from-primary/10 via-sky to-crop/10 py-10 noise-bg">
        <div className="container text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl md:text-5xl mb-3"
          >
            👨‍🌾 {t('community')}
          </motion.h1>
          <p className="text-muted-foreground mb-6">सवाल पूछें, अनुभव बांटें, विशेषज्ञों से सीखें</p>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab("forum")}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === "forum" ? "bg-primary text-primary-foreground shadow-md" : "bg-card border border-border"
              }`}
            >
              💬 चर्चा मंच
            </button>
            <button
              onClick={() => setActiveTab("stories")}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === "stories" ? "bg-primary text-primary-foreground shadow-md" : "bg-card border border-border"
              }`}
            >
              🏆 सफलता की कहानियां
            </button>
          </div>
        </div>
      </section>

      <div className="container py-8">
        {activeTab === "forum" ? (
          <>
            {/* Category filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {forumCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
              <button
                onClick={() => setShowNewPost(!showNewPost)}
                className="ml-auto bg-crop text-crop-foreground px-4 py-1.5 rounded-lg text-sm font-bold"
              >
                ✍️ नया सवाल
              </button>
            </div>

            {/* New post form */}
            {showNewPost && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="bg-card border border-border rounded-2xl p-5 mb-6 shadow-md"
              >
                <input type="text" placeholder="सवाल का शीर्षक..." className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm mb-3" />
                <textarea placeholder="विस्तार से लिखें..." rows={4} className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm resize-none mb-3" />
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                    <Camera size={16} /> फोटो जोड़ें
                  </button>
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                    <Tag size={16} /> टैग जोड़ें
                  </button>
                  <button className="ml-auto bg-primary text-primary-foreground px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                    <Send size={14} /> पोस्ट करें
                  </button>
                </div>
              </motion.div>
            )}

            {/* Posts */}
            <div className="space-y-4">
              {filteredPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    {/* Upvote */}
                    <button
                      onClick={() => toggleUpvote(post.id)}
                      className="flex flex-col items-center gap-0.5 pt-1"
                    >
                      <ChevronUp
                        size={20}
                        className={`transition-colors ${upvoted.has(post.id) ? "text-primary" : "text-muted-foreground"}`}
                      />
                      <span className={`text-sm font-bold ${upvoted.has(post.id) ? "text-primary" : "text-muted-foreground"}`}>
                        {post.upvotes + (upvoted.has(post.id) ? 1 : 0)}
                      </span>
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span>{post.authorEmoji}</span>
                        <span className="text-sm font-medium">{post.author}</span>
                        {post.isExpert && (
                          <span className="flex items-center gap-0.5 text-xs bg-crop/10 text-crop px-2 py-0.5 rounded-full">
                            <Shield size={10} /> विशेषज्ञ
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground">• {post.location} • {post.timeAgo}</span>
                      </div>

                      <h3 className="font-display text-base md:text-lg mb-1">{post.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{post.content}</p>

                      <div className="flex items-center gap-3 flex-wrap">
                        {post.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-muted px-2 py-0.5 rounded-lg">#{tag}</span>
                        ))}
                        <span className="text-xs text-muted-foreground flex items-center gap-1 ml-auto">
                          <MessageCircle size={12} /> {post.replies} जवाब
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          /* Success Stories */
          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story, i) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <div className="bg-gradient-to-r from-crop/20 to-primary/20 p-8 text-center">
                  <span className="text-6xl block mb-2">{story.emoji}</span>
                  <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    <Award size={12} /> {story.achievement}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg mb-2">{story.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{story.story}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>👤 {story.farmer}</span>
                    <span>•</span>
                    <span>📍 {story.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
