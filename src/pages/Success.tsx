import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import AppShell from "@/components/AppShell";
import useElevenLabsTTS from "@/hooks/useElevenLabsTTS";

const SUCCESS_TEXT = "Payment confirmed! Your Kyoto Premium Matcha Kit will arrive within 2 days. Thank you for using VoicePay.";

/* ---------- Confetti ---------- */
const PARTICLE_COUNT = 60;
const COLORS = [
  "hsl(210 72% 54%)",
  "hsl(210 72% 64%)",
  "hsl(150 50% 45%)",
  "hsl(150 40% 55%)",
  "hsl(180 40% 50%)",
];

interface Particle {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  vx: number;
  vy: number;
  spin: number;
  spinV: number;
  opacity: number;
}

function useConfetti(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: -Math.random() * window.innerHeight * 0.5,
      w: 4 + Math.random() * 5,
      h: 6 + Math.random() * 8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      vx: (Math.random() - 0.5) * 2,
      vy: 1.5 + Math.random() * 3,
      spin: Math.random() * Math.PI * 2,
      spinV: (Math.random() - 0.5) * 0.15,
      opacity: 1,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      let alive = false;
      for (const p of particles) {
        if (p.opacity <= 0) continue;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.spin += p.spinV;
        if (p.y > window.innerHeight * 0.85) p.opacity -= 0.02;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.spin);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      if (alive) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
}

/* ---------- Page ---------- */
const Success = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useConfetti(canvasRef);
  useElevenLabsTTS(SUCCESS_TEXT);

  const now = new Date();
  const timestamp =
    now.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) +
    ", " +
    now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  return (
    <AppShell>
      <div className="relative flex flex-col items-center justify-center px-6 min-h-[calc(100vh-57px)] py-12">
        {/* Confetti canvas */}
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-20"
          style={{ width: "100%", height: "100%" }}
        />

        {/* Checkmark */}
        <div
          className="relative z-10 mb-8"
          style={{ animation: "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both" }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle
              cx="40" cy="40" r="36"
              stroke="hsl(150 50% 45%)" strokeWidth="3"
              fill="hsl(150 50% 45% / 0.08)"
              strokeDasharray="226" strokeDashoffset="226" strokeLinecap="round"
            >
              <animate attributeName="stroke-dashoffset" from="226" to="0" dur="0.6s" fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1" />
            </circle>
            <path
              d="M26 41 L35 50 L54 31"
              stroke="hsl(150 50% 45%)" strokeWidth="3.5"
              strokeLinecap="round" strokeLinejoin="round" fill="none"
              strokeDasharray="42" strokeDashoffset="42"
            >
              <animate attributeName="stroke-dashoffset" from="42" to="0" dur="0.35s" begin="0.45s" fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1" />
            </path>
          </svg>
        </div>

        {/* Headline */}
        <h1
          className="relative z-10 text-2xl sm:text-[28px] font-bold text-foreground tracking-tight mb-8"
          style={{ animation: "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.25s both" }}
        >
          Payment confirmed!
        </h1>

        {/* Receipt card */}
        <div
          className="relative z-10 w-full max-w-sm rounded-2xl bg-card border border-border/60 p-5 sm:p-6"
          style={{ animation: "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.35s both" }}
        >
          {[
            ["Product", "Kyoto Premium Matcha Kit"],
            ["Amount", "¥3,200"],
            ["Payment method", "Digital Garage AppPay"],
            ["Transaction ID", "DG-2026-03847"],
            ["Date", timestamp],
          ].map(([label, value], i, arr) => (
            <div
              key={label}
              className={`flex justify-between items-baseline py-3 gap-4 ${i < arr.length - 1 ? "border-b border-border/30" : ""}`}
            >
              <span className="text-xs text-muted-foreground shrink-0">{label}</span>
              <span className="text-sm font-medium text-foreground tabular-nums text-right">{value}</span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div
          className="relative z-10 flex flex-col sm:flex-row gap-3 w-full max-w-sm mt-8"
          style={{ animation: "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.45s both" }}
        >
          <button
            onClick={() => navigate("/demo")}
            className="flex-1 py-3.5 rounded-full border border-border/60 text-muted-foreground font-medium text-sm hover:border-border hover:text-foreground active:scale-[0.97] transition-all cursor-pointer"
          >
            Return to store
          </button>
          <button onClick={() => navigate("/receipt")} className="flex-1 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm tracking-wide hover:brightness-110 active:scale-[0.97] transition-all cursor-pointer">
            View receipt
          </button>
        </div>

        {/* Footer */}
        <p
          className="mt-12 z-10 text-[11px] text-muted-foreground/40 tracking-wide"
          style={{ animation: "fade-in 0.8s ease-out 0.7s both" }}
        >
          Powered by Digital Garage
        </p>
      </div>
    </AppShell>
  );
};

export default Success;
