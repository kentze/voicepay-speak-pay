import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mic } from "lucide-react";
import AppShell from "@/components/AppShell";

const Listening = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/confirming"), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <AppShell>
      <div className="flex flex-col items-center justify-center px-6 min-h-[calc(100vh-57px)]">
        {/* Ripple rings */}
        <div className="relative flex items-center justify-center mb-14">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute w-40 h-40 rounded-full border border-primary/25"
              style={{
                animation: `mic-ring 2.8s cubic-bezier(0.16, 1, 0.3, 1) infinite ${i * 0.7}s`,
              }}
            />
          ))}

          <div
            className="relative z-10 w-28 h-28 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center box-glow-lg"
            style={{ animation: "mic-pulse 2.5s ease-in-out infinite" }}
          >
            <Mic className="w-10 h-10 text-primary" strokeWidth={1.5} />
          </div>
        </div>

        <p
          className="text-xl font-semibold text-foreground tracking-tight"
          style={{ animation: "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s both" }}
        >
          Listening…
        </p>
        <p
          className="mt-3 text-sm text-muted-foreground text-center"
          style={{ animation: "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.25s both" }}
        >
          Say something like: "Pay with Digital Garage"
        </p>

        <button
          onClick={() => navigate("/demo")}
          className="mt-16 text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors cursor-pointer"
          style={{ animation: "fade-in 0.8s ease-out 0.5s both" }}
        >
          Cancel
        </button>
      </div>
    </AppShell>
  );
};

export default Listening;
