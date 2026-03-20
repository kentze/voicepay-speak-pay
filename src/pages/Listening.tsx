import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, Loader2 } from "lucide-react";
import { Conversation } from "@11labs/client";
import AppShell from "@/components/AppShell";
import { toast } from "sonner";

type AgentStatus = "connecting" | "connected" | "disconnected";
type IntentFlash = null | "cancel" | "payment";

const CANCEL_KEYWORDS = [
  "cancel", "stop", "go back", "never mind",
  "no thanks", "abort", "quit", "exit",
];

const PAYMENT_KEYWORDS = [
  "pay", "purchase", "buy", "confirm",
  "checkout", "proceed", "yes", "sure", "ok", "go ahead",
  "digital garage", "matcha",
];

const Listening = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<AgentStatus>("connecting");
  const [intentFlash, setIntentFlash] = useState<IntentFlash>(null);
  const [detectedLanguage, setDetectedLanguage] = useState("EN");
  const [flashText, setFlashText] = useState("");
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

  const handleCancel = useCallback(() => {
    if (navigatedRef.current) return;
    navigatedRef.current = true;
    setIntentFlash("cancel");
    setFlashText("Payment cancelled");
    endSession();
    setTimeout(() => navigate("/demo"), 1000);
  }, [endSession, navigate]);

  const handlePayment = useCallback(
    (agentMessage?: string) => {
      if (navigatedRef.current) return;
      navigatedRef.current = true;
      setIntentFlash("payment");
      setFlashText("Got it!");
      endSession();
      setTimeout(
        () =>
          navigate("/confirming", {
            state: { agentMessage },
          }),
        500,
      );
    },
    [endSession, navigate],
  );

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
          connectionType: "webrtc",
          onMessage: ({ message, source }) => {
            if (navigatedRef.current) return;

            if (source === "user") {
              const text = message.toLowerCase();

              const wantToCancel = CANCEL_KEYWORDS.some((w) =>
                text.includes(w),
              );
              if (wantToCancel) {
                handleCancel();
                return;
              }

              const wantsToPay = PAYMENT_KEYWORDS.some((w) =>
                text.includes(w),
              );
              if (wantsToPay) {
                handlePayment();
                return;
              }

              // Unrelated intent — show toast, let agent handle it
              toast("I can only help with payments", {
                style: {
                  background: "hsl(45 93% 20%)",
                  color: "hsl(45 93% 80%)",
                  border: "1px solid hsl(45 80% 30%)",
                },
                duration: 3000,
              });
            }

            // Check AI responses
            if (source === "ai") {
              // Language detection
              if ((message as any).language) {
                setDetectedLanguage((message as any).language.toUpperCase().slice(0, 2));
              }
              if (message.toLowerCase().includes("confirm")) {
                handlePayment(message);
              }
            }
          },
          onError: (error) => console.error("Agent error:", error),
          onStatusChange: ({ status: s }) => {
            if (!cancelled) {
              setStatus(
                s === "connected"
                  ? "connected"
                  : s === "disconnected"
                    ? "disconnected"
                    : "connecting",
              );
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
  }, [navigate, endSession, handleCancel, handlePayment]);

  const micBorderColor =
    intentFlash === "cancel"
      ? "border-red-500/80"
      : intentFlash === "payment"
        ? "border-emerald-400/80"
        : "border-primary/40";

  const micBgColor =
    intentFlash === "cancel"
      ? "bg-red-500/20"
      : intentFlash === "payment"
        ? "bg-emerald-400/20"
        : "bg-primary/15";

  const micIconColor =
    intentFlash === "cancel"
      ? "text-red-400"
      : intentFlash === "payment"
        ? "text-emerald-400"
        : "text-primary";

  return (
    <AppShell>
      <div className="flex flex-col items-center justify-center px-6 min-h-[calc(100vh-57px)]">
        {status === "connecting" ? (
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
          <>
            <div className="relative flex items-center justify-center mb-14">
              {/* Language badge */}
              <div
                className="absolute -top-4 -right-4 z-20 px-2.5 py-0.5 rounded-full bg-primary text-white text-xs font-semibold tracking-wide"
                style={{ fontSize: "12px", animation: "fade-in 0.8s ease-out 0.3s both" }}
              >
                {detectedLanguage}
              </div>

              {!intentFlash &&
                [0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="absolute w-40 h-40 rounded-full border border-primary/25"
                    style={{
                      animation: `mic-ring 2.8s cubic-bezier(0.16, 1, 0.3, 1) infinite ${i * 0.7}s`,
                    }}
                  />
                ))}

              <div
                className={`relative z-10 w-28 h-28 rounded-full ${micBgColor} border ${micBorderColor} flex items-center justify-center transition-all duration-300`}
                style={
                  !intentFlash
                    ? { animation: "mic-pulse 2.5s ease-in-out infinite" }
                    : undefined
                }
              >
                <Mic
                  className={`w-10 h-10 ${micIconColor} transition-colors duration-300`}
                  strokeWidth={1.5}
                />
              </div>
            </div>

            <p
              className={`text-xl font-semibold tracking-tight transition-colors duration-300 ${
                intentFlash === "cancel"
                  ? "text-red-400"
                  : intentFlash === "payment"
                    ? "text-emerald-400"
                    : "text-foreground"
              }`}
              style={{
                animation:
                  "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s both",
              }}
            >
              {flashText || "Listening…"}
            </p>
            {!intentFlash && (
              <div
                className="mt-3 flex flex-col items-center gap-1"
                style={{
                  animation:
                    "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.25s both",
                }}
              >
                <p className="text-sm text-muted-foreground text-center">
                  Say something like: &quot;Pay with Digital Garage&quot;
                </p>
                <p className="text-xs text-muted-foreground/60 text-center">
                  Speak in any language
                </p>
              </div>
            )}
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
