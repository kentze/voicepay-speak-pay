import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mic } from "lucide-react";

const Demo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <button
        onClick={() => navigate("/")}
        className="absolute top-5 left-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="text-center max-w-sm">
        <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-8 box-glow">
          <Mic className="w-8 h-8 text-primary" strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-3">Voice Demo</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          This is a placeholder for the VoicePay demo experience. Voice recognition and payment flow coming soon.
        </p>
      </div>
    </div>
  );
};

export default Demo;
