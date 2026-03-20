import { Mic, ShieldCheck, CircleCheckBig } from "lucide-react";

const steps = [
  {
    icon: Mic,
    title: "Speak",
    description: "Say who you're paying and how much.",
  },
  {
    icon: ShieldCheck,
    title: "Confirm",
    description: "Review the details with a single tap.",
  },
  {
    icon: CircleCheckBig,
    title: "Done",
    description: "Payment sent instantly. Receipt saved.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-16"
          style={{ animation: "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both" }}
        >
          How it works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-card/50 border border-border/50"
              style={{
                animation: `fade-up 0.7s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.1}s both`,
              }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                <step.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
