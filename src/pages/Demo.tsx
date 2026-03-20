import { useNavigate } from "react-router-dom";
import { Mic, ChevronRight } from "lucide-react";
import AppShell from "@/components/AppShell";

const Demo = () => {
  const navigate = useNavigate();

  return (
    <AppShell>
      <main className="max-w-3xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <div
          className="flex items-center gap-1.5 text-xs text-muted-foreground mb-10"
          style={{ animation: "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both" }}
        >
          <span className="hover:text-foreground transition-colors cursor-pointer" onClick={() => navigate("/")}>Home</span>
          <ChevronRight className="w-3 h-3" />
          <span className="hover:text-foreground transition-colors cursor-pointer">Store</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">Matcha Kit</span>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
          style={{ animation: "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.08s both" }}
        >
          {/* Product image placeholder */}
          <div className="aspect-square rounded-2xl bg-card border border-border/60 flex items-center justify-center relative overflow-hidden">
            <div className="absolute w-36 h-36 rounded-full bg-[hsl(150_40%_35%/0.12)] blur-2xl" />
            <div className="relative flex flex-col items-center gap-3">
              <div className="w-20 h-20 rounded-2xl bg-[hsl(150_40%_35%/0.15)] border border-[hsl(150_40%_45%/0.25)] flex items-center justify-center">
                <span className="text-3xl">🍵</span>
              </div>
              <span className="text-[11px] text-muted-foreground/50 tracking-widest uppercase">Product Image</span>
            </div>
          </div>

          {/* Product info */}
          <div className="flex flex-col">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground/60 mb-3">Matcha Co.</p>

            <h1
              className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight leading-tight"
              style={{ textWrap: "balance" }}
            >
              Kyoto Premium Matcha Kit
            </h1>

            <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
              Ceremonial-grade matcha sourced from Uji, Kyoto. Includes a hand-carved bamboo whisk, ceramic bowl, and 30g of first-harvest powder.
            </p>

            <p className="mt-6 text-3xl font-semibold text-foreground tabular-nums">
              ¥3,200
            </p>

            <p className="mt-3 text-xs text-muted-foreground/70 leading-relaxed">
              Free shipping · Ships within 2 days · Sold by Matcha Co.
            </p>

            <div className="my-8 h-px bg-border/40" />

            {/* Pay by Voice */}
            <button
              onClick={() => navigate("/listening")}
              className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm tracking-wide hover:brightness-110 active:scale-[0.97] transition-all box-glow cursor-pointer"
            >
              <Mic className="w-5 h-5" strokeWidth={2} />
              Pay by Voice
            </button>

            <p className="mt-4 text-center">
              <span className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors cursor-pointer">
                or pay normally →
              </span>
            </p>
          </div>
        </div>
      </main>
    </AppShell>
  );
};

export default Demo;
