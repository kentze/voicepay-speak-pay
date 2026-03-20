import { Mic } from "lucide-react";

const MicButton = () => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Expanding ring */}
      <div
        className="absolute w-40 h-40 rounded-full border border-primary/30"
        style={{ animation: "mic-ring 2.5s cubic-bezier(0.16, 1, 0.3, 1) infinite" }}
      />
      <div
        className="absolute w-40 h-40 rounded-full border border-primary/20"
        style={{ animation: "mic-ring 2.5s cubic-bezier(0.16, 1, 0.3, 1) infinite 0.8s" }}
      />

      {/* Main button */}
      <button
        className="relative z-10 flex items-center justify-center w-32 h-32 rounded-full bg-primary/15 border border-primary/40 cursor-pointer transition-colors hover:bg-primary/25 active:scale-95"
        style={{ animation: "mic-pulse 3s ease-in-out infinite" }}
        aria-label="Activate voice payment"
      >
        <Mic className="w-12 h-12 text-primary" strokeWidth={1.5} />
      </button>
    </div>
  );
};

export default MicButton;
