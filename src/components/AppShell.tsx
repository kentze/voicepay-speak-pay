import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AppShellProps {
  children: ReactNode;
  showNav?: boolean;
}

const AppShell = ({ children, showNav = true }: AppShellProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-background">
      {/* Dot pattern overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(210 20% 92% / 0.04) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Nav */}
      {showNav && (
        <nav className="relative z-10 flex items-center justify-between px-6 sm:px-8 py-4 border-b border-border/20">
          <span
            className="text-sm font-semibold tracking-tight text-foreground cursor-pointer"
            onClick={() => navigate("/")}
          >
            VoicePay
          </span>
          <span className="text-[11px] text-muted-foreground/40 tracking-wide">
            Powered by Digital Garage
          </span>
        </nav>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AppShell;
