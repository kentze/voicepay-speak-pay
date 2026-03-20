import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

interface AppShellProps {
  children: ReactNode;
  showNav?: boolean;
}

const AppShell = ({ children, showNav = true }: AppShellProps) => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="relative min-h-screen bg-background">
      {/* Dot pattern overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(210 20% 92% / 0.04) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Nav */}
      {showNav && (
        <nav className="relative z-10 flex items-center justify-between px-6 sm:px-8 py-4 border-b border-border/20">
          <div className="flex items-center gap-2">
            <span
              className="text-sm font-semibold tracking-tight text-foreground cursor-pointer"
              onClick={() => navigate("/")}
            >
              VoicePay
            </span>
            {language === "JP" && (
              <span
                className="text-[9px] font-medium tracking-wide px-1.5 py-0.5 rounded-full"
                style={{ color: "hsl(0 60% 95%)", background: "hsl(0 60% 46% / 0.25)" }}
              >
                日本語モード
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Language toggle */}
            <div className="flex rounded-full border border-border/40 overflow-hidden">
              <button
                onClick={() => setLanguage("EN")}
                className="px-3 py-1 text-[11px] font-semibold tracking-wide transition-all duration-300 cursor-pointer"
                style={
                  language === "EN"
                    ? { background: "hsl(210 72% 54%)", color: "hsl(0 0% 100%)" }
                    : { background: "transparent", color: "hsl(var(--muted-foreground))" }
                }
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("JP")}
                className="px-3 py-1 text-[11px] font-semibold tracking-wide transition-all duration-300 cursor-pointer"
                style={
                  language === "JP"
                    ? { background: "hsl(0 60% 46%)", color: "hsl(0 0% 100%)" }
                    : { background: "transparent", color: "hsl(var(--muted-foreground))" }
                }
              >
                JP
              </button>
            </div>

            <span className="text-[11px] text-muted-foreground/40 tracking-wide">
              {t("nav.poweredBy")}
            </span>
          </div>
        </nav>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AppShell;
