import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ArrowUp, ArrowDown, X, Gem, Check } from "lucide-react";
import AppShell from "@/components/AppShell";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "sonner";

interface Subscription {
  id: string;
  name: string;
  type: "monthly" | "one-time";
  tier: number;
  tiers: number[];
  pricePerUnit: number;
  status: "active";
}

const INITIAL_SUBSCRIPTIONS: Subscription[] = [
  {
    id: "1",
    name: "Matcha Legends",
    type: "monthly",
    tier: 500,
    tiers: [500, 1000, 2000],
    pricePerUnit: 1,
    status: "active",
  },
  {
    id: "2",
    name: "Sakura Quest",
    type: "monthly",
    tier: 1000,
    tiers: [500, 1000, 2000, 5000],
    pricePerUnit: 0.8,
    status: "active",
  },
  {
    id: "3",
    name: "Kyoto Runner",
    type: "one-time",
    tier: 2000,
    tiers: [500, 1000, 2000],
    pricePerUnit: 0.9,
    status: "active",
  },
];

const Subscriptions = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(INITIAL_SUBSCRIPTIONS);
  const [changingTier, setChangingTier] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleChangeTier = (id: string, newTier: number, direction: "up" | "down") => {
    setSubscriptions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, tier: newTier } : sub))
    );
    setChangingTier(null);
    const msg =
      direction === "up"
        ? t("subs.upgradedTo").replace("{tier}", String(newTier))
        : t("subs.downgradedTo").replace("{tier}", String(newTier));
    toast.success(msg);
  };

  const handleCancel = (id: string) => {
    setRemovingId(id);
    setTimeout(() => {
      setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
      setRemovingId(null);
      toast.success(t("subs.cancelled"));
    }, 400);
  };

  const jpCardBg = language === "JP" ? "rgba(255, 240, 243, 0.04)" : undefined;

  return (
    <AppShell>
      <main className="max-w-4xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <div
          className="flex items-center gap-1.5 text-xs text-muted-foreground mb-10"
          style={{ animation: "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both" }}
        >
          <span
            className="hover:text-foreground transition-colors cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{t("subs.title")}</span>
        </div>

        {/* Title */}
        <h1
          className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-8"
          style={{ animation: "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.05s both" }}
        >
          {t("subs.title")}
        </h1>

        {subscriptions.length === 0 && (
          <div
            className="text-center py-20 text-muted-foreground"
            style={{ animation: "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both" }}
          >
            <p className="text-sm">{t("subs.empty")}</p>
            <button
              onClick={() => navigate("/demo")}
              className="mt-4 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 active:scale-[0.97] transition-all cursor-pointer"
            >
              {t("subs.browseStore")}
            </button>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {subscriptions.map((sub, i) => (
            <div
              key={sub.id}
              className="rounded-2xl border border-border/60 bg-card p-5 flex flex-col gap-4 transition-all duration-400"
              style={{
                animation: `fade-up 0.7s cubic-bezier(0.16,1,0.3,1) ${0.08 + i * 0.06}s both`,
                opacity: removingId === sub.id ? 0 : 1,
                transform: removingId === sub.id ? "scale(0.95) translateY(8px)" : undefined,
                transition: "opacity 0.4s, transform 0.4s",
                background: jpCardBg,
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold text-foreground">{sub.name}</h3>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground/60 mt-0.5">
                    {sub.type === "monthly" ? t("subs.monthly") : t("subs.oneTime")}
                  </p>
                </div>
                <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                  <Check className="w-3 h-3" />
                  {t("subs.active")}
                </span>
              </div>

              {/* Tier display */}
              <div className="flex items-center gap-2.5 py-3 px-4 rounded-xl bg-secondary/50 border border-border/30">
                <Gem className="w-5 h-5 text-primary" />
                <div>
                  <span className="text-xl font-bold text-foreground tabular-nums">{sub.tier.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground ml-1.5">
                    {sub.type === "monthly" ? t("subs.gemsMonth") : t("subs.gems")}
                  </span>
                </div>
                <span className="ml-auto text-sm font-semibold text-foreground tabular-nums">
                  ¥{Math.round(sub.tier * sub.pricePerUnit).toLocaleString()}
                  {sub.type === "monthly" && <span className="text-xs text-muted-foreground font-normal">/mo</span>}
                </span>
              </div>

              {/* Tier selector (shown when changing) */}
              {changingTier === sub.id && (
                <div
                  className="flex flex-wrap gap-2"
                  style={{ animation: "fade-up 0.3s cubic-bezier(0.16,1,0.3,1) both" }}
                >
                  {sub.tiers
                    .filter((tier) => tier !== sub.tier)
                    .map((tier) => (
                      <button
                        key={tier}
                        onClick={() =>
                          handleChangeTier(sub.id, tier, tier > sub.tier ? "up" : "down")
                        }
                        className="flex-1 min-w-[70px] py-2 rounded-lg text-xs font-semibold transition-all hover:brightness-110 active:scale-[0.96] cursor-pointer border"
                        style={{
                          background:
                            tier > sub.tier
                              ? "hsl(var(--primary) / 0.12)"
                              : "hsl(var(--muted) / 0.5)",
                          borderColor:
                            tier > sub.tier
                              ? "hsl(var(--primary) / 0.3)"
                              : "hsl(var(--border) / 0.4)",
                          color:
                            tier > sub.tier
                              ? "hsl(var(--primary))"
                              : "hsl(var(--muted-foreground))",
                        }}
                      >
                        {tier.toLocaleString()}
                      </button>
                    ))}
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => {
                    const currentIdx = sub.tiers.indexOf(sub.tier);
                    if (currentIdx < sub.tiers.length - 1) {
                      setChangingTier(changingTier === sub.id ? null : sub.id);
                    } else {
                      toast.info(t("subs.maxTier"));
                    }
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-primary/10 text-primary text-xs font-semibold border border-primary/20 hover:bg-primary/20 active:scale-[0.97] transition-all cursor-pointer"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  {t("subs.upgrade")}
                </button>
                <button
                  onClick={() => {
                    const currentIdx = sub.tiers.indexOf(sub.tier);
                    if (currentIdx > 0) {
                      setChangingTier(changingTier === sub.id ? null : sub.id);
                    } else {
                      toast.info(t("subs.minTier"));
                    }
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-secondary/60 text-muted-foreground text-xs font-semibold border border-border/30 hover:bg-secondary active:scale-[0.97] transition-all cursor-pointer"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                  {t("subs.downgrade")}
                </button>
                <button
                  onClick={() => handleCancel(sub.id)}
                  className="flex items-center justify-center px-3 py-2.5 rounded-xl text-destructive/70 text-xs font-semibold border border-destructive/15 hover:bg-destructive/10 hover:text-destructive active:scale-[0.97] transition-all cursor-pointer"
                  title={t("subs.cancelSub")}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </AppShell>
  );
};

export default Subscriptions;
