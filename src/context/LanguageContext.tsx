import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "EN" | "JP";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Landing
  "hero.title": {
    EN: "Pay anything, anywhere, just by speaking.",
    JP: "いつでも、どこでも、声で支払い。",
  },
  "hero.subtitle": {
    EN: "The first voice-native payment agent powered by Digital\u00a0Garage\u00a0AppPay",
    JP: "Digital Garage AppPayが提供する、初の音声ネイティブ決済エージェント",
  },
  "hero.tryDemo": { EN: "Try Demo", JP: "デモを試す" },
  "howItWorks.title": { EN: "How it works", JP: "使い方" },
  "howItWorks.step1.title": { EN: "Speak", JP: "話す" },
  "howItWorks.step1.desc": {
    EN: "Say who you're paying and how much.",
    JP: "支払い先と金額を伝えてください。",
  },
  "howItWorks.step2.title": { EN: "Confirm", JP: "確認" },
  "howItWorks.step2.desc": {
    EN: "Review the details with a single tap.",
    JP: "ワンタップで内容を確認。",
  },
  "howItWorks.step3.title": { EN: "Done", JP: "完了" },
  "howItWorks.step3.desc": {
    EN: "Payment sent instantly. Receipt saved.",
    JP: "即座に決済完了。領収書を保存。",
  },
  "sponsors.title": { EN: "Backed by", JP: "パートナー" },
  "footer.credit": {
    EN: "Built at Builders Weekend Tokyo 2026 · 48hrs",
    JP: "Builders Weekend Tokyo 2026で制作・48時間",
  },

  // Demo
  "demo.payByVoice": { EN: "Pay by Voice", JP: "音声で支払う" },
  "demo.orPayNormally": { EN: "or pay normally →", JP: "通常の支払いへ →" },
  "demo.shipping": {
    EN: "Free shipping · Ships within 2 days · Sold by Matcha Co.",
    JP: "送料無料・2日以内発送・Matcha Co.販売",
  },

  // Listening
  "listening.connecting": {
    EN: "Connecting to VoicePay AI…",
    JP: "VoicePay AIに接続中…",
  },
  "listening.preparing": {
    EN: "Preparing your voice session",
    JP: "音声セッションを準備中",
  },
  "listening.title": { EN: "Listening…", JP: "聞いています…" },
  "listening.hint": {
    EN: 'Say something like: "Pay with Digital Garage"',
    JP: "例：「Digital Garageで支払う」",
  },
  "listening.anyLanguage": {
    EN: "Speak in any language",
    JP: "お好きな言語でどうぞ",
  },
  "listening.cancelled": {
    EN: "Payment cancelled",
    JP: "支払いをキャンセルしました",
  },
  "listening.gotIt": { EN: "Got it!", JP: "了解！" },
  "listening.cancel": { EN: "Cancel", JP: "キャンセル" },
  "listening.onlyPayments": {
    EN: "I can only help with payments",
    JP: "お支払いのみサポートしています",
  },

  // Confirming
  "confirming.yesPay": { EN: "Yes, pay now", JP: "はい、支払う" },
  "confirming.cancel": { EN: "Cancel", JP: "キャンセル" },
  "confirming.secured": {
    EN: "Secured by Digital Garage VeriTrans4G · PCI DSS compliant",
    JP: "Digital Garage VeriTrans4G保護・PCI DSS準拠",
  },

  // Processing
  "processing.title": { EN: "Processing payment…", JP: "決済処理中…" },
  "processing.subtitle": {
    EN: "Connecting to Digital Garage AppPay…",
    JP: "Digital Garage AppPayに接続中…",
  },

  // Success
  "success.title": { EN: "Payment confirmed!", JP: "お支払いが完了しました！" },
  "success.returnToStore": { EN: "Return to store", JP: "ストアに戻る" },
  "success.viewReceipt": { EN: "View receipt", JP: "領収書を見る" },
  "success.poweredBy": {
    EN: "Powered by Digital Garage",
    JP: "Digital Garage提供",
  },

  // Receipt
  "receipt.paymentSuccessful": {
    EN: "Payment successful",
    JP: "お支払い成功",
  },
  "receipt.orderSummary": { EN: "Order summary", JP: "注文概要" },
  "receipt.product": { EN: "Kyoto Premium Matcha Kit", JP: "京都プレミアム抹茶キット" },
  "receipt.quantity": { EN: "Quantity", JP: "数量" },
  "receipt.shipping": { EN: "Shipping", JP: "送料" },
  "receipt.subtotal": { EN: "Subtotal", JP: "小計" },
  "receipt.tax": { EN: "Tax (10%)", JP: "消費税（10%）" },
  "receipt.total": { EN: "Total", JP: "合計" },
  "receipt.paymentDetails": { EN: "Payment details", JP: "お支払い詳細" },
  "receipt.paymentMethod": { EN: "Payment method", JP: "お支払い方法" },
  "receipt.processing": { EN: "Processing", JP: "処理" },
  "receipt.authCode": { EN: "Auth code", JP: "認証コード" },
  "receipt.status": { EN: "Status", JP: "ステータス" },
  "receipt.confirmed": { EN: "Confirmed", JP: "確認済み" },
  "receipt.secured": {
    EN: "Secured by VeriTrans4G · PCI DSS compliant",
    JP: "VeriTrans4G保護・PCI DSS準拠",
  },
  "receipt.downloadPdf": { EN: "Download PDF", JP: "PDFをダウンロード" },
  "receipt.returnToStore": { EN: "Return to store", JP: "ストアに戻る" },
  "receipt.transactionId": { EN: "Transaction ID", JP: "取引ID" },
  "receipt.date": { EN: "Date", JP: "日付" },
  "receipt.time": { EN: "Time", JP: "時刻" },

  // Nav
  "nav.poweredBy": {
    EN: "Powered by Digital Garage",
    JP: "Digital Garage提供",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: "EN",
  setLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("EN");

  useEffect(() => {
    const root = document.documentElement;
    if (language === "JP") {
      root.style.setProperty("--primary", "0 60% 46%");
      root.style.setProperty("--accent", "0 60% 46%");
      root.style.setProperty("--ring", "0 60% 46%");
      root.style.setProperty("--glow", "0 60% 46%");
      root.style.setProperty("--sidebar-primary", "0 60% 46%");
      root.style.setProperty("--sidebar-ring", "0 60% 46%");
    } else {
      root.style.setProperty("--primary", "210 72% 54%");
      root.style.setProperty("--accent", "210 72% 54%");
      root.style.setProperty("--ring", "210 72% 54%");
      root.style.setProperty("--glow", "210 72% 54%");
      root.style.setProperty("--sidebar-primary", "210 72% 54%");
      root.style.setProperty("--sidebar-ring", "210 72% 54%");
    }
  }, [language]);

  const t = (key: string) => translations[key]?.[language] ?? key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
