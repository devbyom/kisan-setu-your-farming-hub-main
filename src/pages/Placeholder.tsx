import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const placeholder = ({ title, emoji, desc }: { title: string; emoji: string; desc: string }) => (
  <div className="min-h-screen flex items-center justify-center pb-20 md:pb-0">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center px-6"
    >
      <span className="text-7xl block mb-4">{emoji}</span>
      <h1 className="font-display text-3xl md:text-4xl mb-3">{title}</h1>
      <p className="text-muted-foreground max-w-md">{desc}</p>
      <div className="mt-6 bg-primary/10 rounded-xl px-6 py-3 inline-block">
        <p className="text-sm text-primary font-medium">🚧 जल्द आ रहा है — Coming Soon</p>
      </div>
    </motion.div>
  </div>
);

export const Marketplace = () => placeholder({
  title: "सीधा बाज़ार",
  emoji: "🤝",
  desc: "बिचौलिया हटाएं, सीधे खरीदार से जुड़ें। अपनी फसल का सही दाम पाएं।"
});

export const Schemes = () => placeholder({
  title: "सरकारी योजनाएं",
  emoji: "📋",
  desc: "PM-Kisan, फसल बीमा, किसान क्रेडिट कार्ड — सब एक जगह। पात्रता जाँचें और आवेदन करें।"
});

export const CropAdvisor = () => placeholder({
  title: "फसल सलाहकार",
  emoji: "🌿",
  desc: "AI आधारित फसल सिफारिश। मिट्टी, मौसम और बाज़ार के हिसाब से सबसे फायदेमंद फसल जानें।"
});

export const Community = () => placeholder({
  title: "किसान समुदाय",
  emoji: "👨‍🌾",
  desc: "सवाल पूछें, अनुभव बांटें, विशेषज्ञों से जवाब पाएं। किसानों का अपना मंच।"
});

export const Dashboard = () => placeholder({
  title: "मेरा खेत",
  emoji: "📱",
  desc: "अपने खेत का पूरा हिसाब रखें — फसल, खर्च, आमदनी, बुवाई-कटाई सब एक जगह।"
});
