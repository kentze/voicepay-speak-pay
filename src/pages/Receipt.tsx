import { useNavigate } from "react-router-dom";
import { CheckCircle, Download } from "lucide-react";
import AppShell from "@/components/AppShell";
import { useLanguage } from "@/context/LanguageContext";

const Receipt = () => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const now = new Date();
  const locale = language === "JP" ? "ja-JP" : "en-US";
  const date = now.toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" });
  const time = now.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  const isJP = language === "JP";
  const cardBg = isJP ? "hsl(350 60% 97%)" : "hsl(0 0% 97%)";
  const checkColor = isJP ? "hsl(0 60% 46%)" : "hsl(150 50% 40%)";
  const checkTextColor = isJP ? "hsl(0 60% 38%)" : "hsl(150 50% 35%)";
  const statusBg = isJP ? "hsl(0 60% 46% / 0.15)" : "hsl(150 50% 45% / 0.15)";
  const statusColor = isJP ? "hsl(0 60% 38%)" : "hsl(150 50% 30%)";

  return (
    <AppShell>
      <div
        className="flex flex-col items-center px-4 sm:px-6 py-10 sm:py-14 min-h-[calc(100vh-57px)]"
        style={{ animation: "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both" }}
      >
        <div className="w-full max-w-[420px] rounded-2xl overflow-hidden" style={{ background: cardBg }}>
          {/* Header */}
          <div className="px-6 pt-7 pb-5 border-b" style={{ borderColor: "hsl(0 0% 90%)" }}>
            <div className="flex items-center gap-2.5 mb-4">
              <CheckCircle className="w-5 h-5 shrink-0" style={{ color: checkColor }} strokeWidth={2} />
              <span className="text-sm font-semibold" style={{ color: checkTextColor }}>
                {t("receipt.paymentSuccessful")}
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between">
                <span className="text-[11px]" style={{ color: "hsl(220 10% 50%)" }}>{t("receipt.transactionId")}</span>
                <span className="text-xs font-medium" style={{ color: "hsl(220 20% 20%)" }}>DG-2026-03847</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[11px]" style={{ color: "hsl(220 10% 50%)" }}>{t("receipt.date")}</span>
                <span className="text-xs font-medium" style={{ color: "hsl(220 20% 20%)" }}>{date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[11px]" style={{ color: "hsl(220 10% 50%)" }}>{t("receipt.time")}</span>
                <span className="text-xs font-medium tabular-nums" style={{ color: "hsl(220 20% 20%)" }}>{time}</span>
              </div>
            </div>
          </div>

          {/* Itemized */}
          <div className="px-6 py-5 border-b" style={{ borderColor: "hsl(0 0% 90%)" }}>
            <p className="text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: "hsl(220 10% 55%)" }}>
              {t("receipt.orderSummary")}
            </p>

            {([
              [t("receipt.product"), "¥3,200"],
              [t("receipt.quantity"), "1"],
              [t("receipt.shipping"), "¥0 (Free)"],
            ] as const).map(([label, value]) => (
              <div key={label} className="flex justify-between py-1.5">
                <span className="text-xs" style={{ color: "hsl(220 10% 40%)" }}>{label}</span>
                <span className="text-xs font-medium tabular-nums" style={{ color: "hsl(220 20% 20%)" }}>{value}</span>
              </div>
            ))}

            <div className="my-3 h-px" style={{ background: "hsl(0 0% 88%)" }} />
            <div className="flex justify-between py-1.5">
              <span className="text-xs" style={{ color: "hsl(220 10% 40%)" }}>{t("receipt.subtotal")}</span>
              <span className="text-xs font-medium tabular-nums" style={{ color: "hsl(220 20% 20%)" }}>¥3,200</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-xs" style={{ color: "hsl(220 10% 40%)" }}>{t("receipt.tax")}</span>
              <span className="text-xs font-medium tabular-nums" style={{ color: "hsl(220 20% 20%)" }}>¥320</span>
            </div>
            <div className="my-3 h-px" style={{ background: "hsl(0 0% 85%)" }} />
            <div className="flex justify-between items-baseline pt-1">
              <span className="text-sm font-semibold" style={{ color: "hsl(220 20% 15%)" }}>{t("receipt.total")}</span>
              <span className="text-xl font-bold tabular-nums" style={{ color: "hsl(220 20% 15%)" }}>¥3,520</span>
            </div>
          </div>

          {/* Payment details */}
          <div className="px-6 py-5 border-b" style={{ borderColor: "hsl(0 0% 90%)" }}>
            <p className="text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: "hsl(220 10% 55%)" }}>
              {t("receipt.paymentDetails")}
            </p>
            {([
              [t("receipt.paymentMethod"), "Digital Garage AppPay"],
              [t("receipt.processing"), "VeriTrans4G"],
              [t("receipt.authCode"), "AUTH-8842-XK"],
            ] as const).map(([label, value]) => (
              <div key={label} className="flex justify-between py-1.5">
                <span className="text-xs" style={{ color: "hsl(220 10% 40%)" }}>{label}</span>
                <span className="text-xs font-medium" style={{ color: "hsl(220 20% 20%)" }}>{value}</span>
              </div>
            ))}
            <div className="flex justify-between items-center py-1.5">
              <span className="text-xs" style={{ color: "hsl(220 10% 40%)" }}>{t("receipt.status")}</span>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full" style={{ color: statusColor, background: statusBg }}>
                {t("receipt.confirmed")}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-5 flex flex-col items-center gap-3">
            <p className="text-[11px] font-semibold tracking-wide" style={{ color: "hsl(220 10% 35%)" }}>Digital Garage</p>
            <p className="text-[10px] text-center" style={{ color: "hsl(220 10% 55%)" }}>{t("receipt.secured")}</p>
            <button className="mt-1 flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-medium transition-all hover:brightness-95 active:scale-[0.97] cursor-pointer" style={{ color: "hsl(220 20% 20%)", background: "hsl(0 0% 92%)" }}>
              <Download className="w-3.5 h-3.5" />
              {t("receipt.downloadPdf")}
            </button>
          </div>
        </div>

        <button
          onClick={() => navigate("/demo")}
          className="mt-8 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm tracking-wide hover:brightness-110 active:scale-[0.97] transition-all box-glow cursor-pointer"
          style={{ animation: "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s both" }}
        >
          {t("receipt.returnToStore")}
        </button>
      </div>
    </AppShell>
  );
};

export default Receipt;
