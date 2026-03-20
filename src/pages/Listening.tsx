import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, Loader2 } from "lucide-react";
import { Conversation } from "@11labs/client";
import AppShell from "@/components/AppShell";

type AgentStatus = "connecting" | "connected" | "disconnected";

const Listening = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<AgentStatus>("connecting");
  const conversationRef = useRef<Conversation | null>(null);
  const navigatedRef = useRef(false);

  const endSession = useCallback(async () => {
    try {
      await conversationRef.current?.endSession();
    } catch {
      /* already ended */
    }
    conversationRef.current = null;
  }, []);

  useEffect(() => {
    let cancelled = false;

    const start = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });

        const agentId = import.meta.env.VITE_ELEVENLABS_AGENT_ID;
        if (!agentId) {
          console.warn("VITE_ELEVENLABS_AGENT_ID not set — skipping agent");
          return;
        }

        const conversation = await Conversation.startSession({
          agentId,
          onMessage: (message: any) => {
            if (
              message.type === "agent_response" &&
              !navigatedRef.current
            ) {
              const text =
                message.agent_response_event?.agent_response ??
                message.message ??
                "";
              if (text.toLowerCase().includes("confirm")) {
                navigatedRef.current = true;
                endSession();
                navigate("/confirming", {
                  state: { agentMessage: text },
                });
              }
            }
          },
          onError: (error: any) => console.error("Agent error:", error),
          onStatusChange: (s: any) => {
            if (!cancelled) {
              const mapped =
                s === "connected"
                  ? "connected"
                  : s === "disconnected"
                    ? "disconnected"
                    : "connecting";
              setStatus(mapped as AgentStatus);
            }
          },
        });

        if (cancelled) {
          await conversation.endSession();
          return;
        }

        conversationRef.current = conversation;
      } catch (err) {
        console.error("Failed to start agent session:", err);
      }
    };

    start();

    return () => {
      cancelled = true;
      endSession();
    };
  }, [navigate, endSession]);

  return (
    <AppShell>
      <div className="flex flex-col items-center justify-center px-6 min-h-[calc(100vh-57px)]">
        {status === "connecting" ? (
          /* Connecting state */
          <div
            className="flex flex-col items-center gap-6"
            style={{
              animation: "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
            }}
          >
            <Loader2
              className="w-10 h-10 text-primary animate-spin"
              strokeWidth={1.5}
            />
            <p className="text-lg font-medium text-foreground tracking-tight">
              Connecting to VoicePay AI…
            </p>
            <p className="text-sm text-muted-foreground">
              Preparing your voice session
            </p>
          </div>
        ) : (
          /* Connected — pulsing mic */
          <>
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
                <Mic
                  className="w-10 h-10 text-primary"
                  strokeWidth={1.5}
                />
              </div>
            </div>

            <p
              className="text-xl font-semibold text-foreground tracking-tight"
              style={{
                animation:
                  "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s both",
              }}
            >
              Listening…
            </p>
            <p
              className="mt-3 text-sm text-muted-foreground text-center"
              style={{
                animation:
                  "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.25s both",
              }}
            >
              Say something like: "Pay with Digital Garage"
            </p>
          </>
        )}

        <button
          onClick={() => {
            endSession();
            navigate("/demo");
          }}
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
