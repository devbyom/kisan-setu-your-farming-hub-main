import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    if (!isLogin && !fullName.trim()) return;

    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await signIn(email.trim(), password);
        if (error) {
          toast({ title: "लॉगिन विफल", description: error.message === "Invalid login credentials" ? "गलत ईमेल या पासवर्ड" : error.message, variant: "destructive" });
        } else {
          toast({ title: "स्वागत है! 🌾", description: "सफलतापूर्वक लॉगिन हुआ" });
          navigate("/");
        }
      } else {
        const { error } = await signUp(email.trim(), password, fullName.trim());
        if (error) {
          toast({ title: "रजिस्ट्रेशन विफल", description: error.message, variant: "destructive" });
        } else {
          toast({ title: "खाता बना! 🎉", description: "कृपया अपना ईमेल जाँचें और पुष्टि करें" });
          setIsLogin(true);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pb-20 md:pb-0 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky via-background to-crop/5" />
      <div className="absolute top-10 right-10 text-8xl opacity-10 select-none">🌾</div>
      <div className="absolute bottom-10 left-10 text-8xl opacity-10 select-none">🚜</div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-5xl block mb-3">🌾</span>
          <h1 className="font-display text-3xl">किसान सेतु</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {isLogin ? "अपने खाते में लॉगिन करें" : "नया खाता बनाएं"}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-xl">
          {/* Toggle */}
          <div className="flex bg-muted rounded-xl p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                isLogin ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground"
              }`}
            >
              लॉगिन
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                !isLogin ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground"
              }`}
            >
              रजिस्टर
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="name"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <label className="text-sm font-medium mb-1.5 block">पूरा नाम</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="आपका नाम"
                      className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="text-sm font-medium mb-1.5 block">ईमेल</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">पासवर्ड</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="कम से कम 6 अक्षर"
                  required
                  minLength={6}
                  className="w-full pl-10 pr-12 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground rounded-xl py-3 font-bold text-base flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  {isLogin ? "लॉगिन करें" : "खाता बनाएं"}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-4">
            {isLogin ? "खाता नहीं है? " : "पहले से खाता है? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary font-semibold hover:underline"
            >
              {isLogin ? "रजिस्टर करें" : "लॉगिन करें"}
            </button>
          </p>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          🔒 आपकी जानकारी सुरक्षित है
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
