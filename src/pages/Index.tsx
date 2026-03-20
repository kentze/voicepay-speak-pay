import { useNavigate } from "react-router-dom";
import MicButton from "@/components/MicButton";
import HowItWorks from "@/components/HowItWorks";
import Sponsors from "@/components/Sponsors";
import AppShell from "@/components/AppShell";

const Index = () => {
  const navigate = useNavigate();

  return (
    <AppShell>
      {/* Hero */}
      <main className="flex flex-col items-center justify-center px-6 pb-8 pt-20 sm:pt-28 min-h-[70vh]">
        <div
          className="text-center max-w-2xl mb-12"
          style={{ animation: "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) both" }}
        >
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.08] text-glow"
            style={{ textWrap: "balance" }}
          >
            Pay anything, anywhere, just by speaking.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
            The first voice-native payment agent powered by Digital&nbsp;Garage&nbsp;AppPay
          </p>
        </div>

        <div style={{ animation: "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both" }}>
          <MicButton />
        </div>

        <button
          onClick={() => navigate("/demo")}
          className="mt-14 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm tracking-wide hover:brightness-110 active:scale-[0.97] transition-all box-glow cursor-pointer"
          style={{ animation: "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s both" }}
        >
          Try Demo
        </button>
      </main>

      {/* How it works */}
      <HowItWorks />

      {/* Sponsors */}
      <Sponsors />

      {/* Builders Weekend credit */}
      <footer className="py-8 text-center">
        <p className="text-[11px] text-muted-foreground/30 tracking-wide">
          Built at Builders Weekend Tokyo 2026 · 48hrs
        </p>
      </footer>
    </AppShell>
  );
};

export default Index;
