import { useNavigate, useLocation } from "react-router-dom";
import AppShell from "@/components/AppShell";
import useElevenLabsTTS from "@/hooks/useElevenLabsTTS";

const FALLBACK_TEXT =
  "Got it! I'll process a payment of 3,200 yen for Kyoto Premium Matcha Kit via Digital Garage AppPay. Shall I confirm?";

const Confirming = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const agentMessage: string =
    (location.state as any)?.agentMessage || FALLBACK_TEXT;

  useElevenLabsTTS(agentMessage);

  return (
    <AppShell>
      <div className="flex flex-col items-center justify-center px-6 min-h-[calc(100vh-57px)]">
        <div
          className="w-full max-w-md flex flex-col items-start px-2"
          style={{ animation: "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both" }}
        >
          {/* AI avatar + name */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
              <span className="text-xs font-bold text-primary tracking-tight">VP</span>
            </div>
            <span className="text-sm font-medium text-foreground">VoicePay AI</span>
          </div>

          {/* Chat bubble — shows the agent's actual message */}
          <div
            className="rounded-2xl rounded-tl-md bg-card border border-border/60 px-5 sm:px-6 py-5"
            style={{ animation: "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.12s both" }}
          >
            <p className="text-[15px] text-foreground/90 leading-relaxed">
              {agentMessage}
            </p>
          </div>

          {/* Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-3 w-full mt-6"
            style={{ animation: "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.25s both" }}
          >
            <button
              onClick={() => navigate("/processing")}
              className="flex-1 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm tracking-wide hover:brightness-110 active:scale-[0.97] transition-all box-glow cursor-pointer"
            >
              Yes, pay now
            </button>
            <button
              onClick={() => navigate("/demo")}
              className="flex-1 py-3.5 rounded-full border border-border/60 text-muted-foreground font-medium text-sm hover:border-border hover:text-foreground active:scale-[0.97] transition-all cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Security footer */}
        <p
          className="mt-16 text-[11px] text-muted-foreground/40 tracking-wide text-center"
          style={{ animation: "fade-in 0.8s ease-out 0.5s both" }}
        >
          Secured by Digital Garage VeriTrans4G · PCI DSS compliant
        </p>
      </div>
    </AppShell>
  );
};

export default Confirming;
