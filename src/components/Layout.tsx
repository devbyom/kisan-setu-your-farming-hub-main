import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home, BarChart3, Cloud, Store, FileText, Leaf, Users, LayoutDashboard, LogIn, LogOut, UserCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { path: "/", icon: Home, labelKey: "home" },
  { path: "/mandi", icon: BarChart3, labelKey: "mandi_prices" },
  { path: "/weather", icon: Cloud, labelKey: "weather" },
  { path: "/marketplace", icon: Store, labelKey: "buyer_market" },
  { path: "/schemes", icon: FileText, labelKey: "schemes" },
  { path: "/advisor", icon: Leaf, labelKey: "crop_advisor" },
  { path: "/community", icon: Users, labelKey: "community" },
  { path: "/dashboard", icon: LayoutDashboard, labelKey: "my_farm" },
];

const mobileNavItems = navItems.slice(0, 5);

export const Header = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'hi' ? 'en' : 'hi');
  };

  const handleAuthAction = async () => {
    if (user) {
      await signOut();
    } else {
      navigate("/auth");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-14 md:h-16">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🌾</span>
          <span className="font-display text-xl md:text-2xl text-primary">{t('brand')}</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="px-2.5 py-1.5 rounded-lg text-xs font-bold border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {i18n.language === 'hi' ? 'EN' : 'हिं'}
          </button>

          <button
            onClick={handleAuthAction}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
              user
                ? "bg-muted text-foreground hover:bg-destructive/10 hover:text-destructive"
                : "bg-primary text-primary-foreground hover:opacity-90"
            }`}
          >
            {user ? (
              <>
                <UserCircle size={16} />
                <span className="hidden md:inline">{user.user_metadata?.full_name || "किसान"}</span>
                <LogOut size={14} />
              </>
            ) : (
              <>
                <LogIn size={16} />
                <span className="hidden md:inline">लॉगिन</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export const MobileBottomNav = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bottom-nav bg-background/95 backdrop-blur-md border-t border-border">
      <div className="flex items-center justify-around py-2">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center gap-0.5 px-2 py-1 relative"
            >
              {isActive && (
                <motion.div
                  layoutId="bottomNav"
                  className="absolute -top-0.5 w-8 h-1 rounded-full bg-primary"
                />
              )}
              <Icon
                size={22}
                className={isActive ? "text-primary" : "text-muted-foreground"}
              />
              <span
                className={`text-[10px] font-medium ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {t(item.labelKey)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative bg-secondary text-secondary-foreground overflow-hidden pb-20 md:pb-0">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end overflow-hidden">
        <div className="animate-tractor text-4xl">🚜</div>
      </div>
      <div className="container relative py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🌾</span>
            <div>
              <h3 className="font-display text-xl">{t('brand')}</h3>
              <p className="text-sm opacity-80">{t('tagline')}</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} className="opacity-80 hover:opacity-100 transition-opacity">
                {t(item.labelKey)}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-secondary-foreground/20 text-center text-xs opacity-60">
          © 2026 Kisan Setu — Made with ❤️ for Bharat's Farmers
        </div>
      </div>
    </footer>
  );
};
