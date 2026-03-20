import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "@/components/AppShell";

const Processing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/success"), 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <AppShell>
      <div className="flex flex-col items-center justify-center px-6 min-h-[calc(100vh-57px)]">
        <div
          className="w-20 h-20 rounded-full border-2 border-border/30 border-t-primary mb-12"
          style={{ animation: "spin 1s linear infinite" }}
        />

        <p
          className="text-xl font-semibold text-foreground tracking-tight"
          style={{ animation: "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both" }}
        >
          Processing payment…
        </p>
        <p
          className="mt-3 text-sm text-muted-foreground text-center"
          style={{ animation: "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s both" }}
        >
          Connecting to Digital Garage AppPay…
        </p>
      </div>
    </AppShell>
  );
};

export default Processing;
