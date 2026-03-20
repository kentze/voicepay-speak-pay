const sponsors = ["Digital Garage", "ElevenLabs", "VoiceOS", "RevenueCat", "Lovable"];

const Sponsors = () => {
  return (
    <section
      className="py-16 px-6 border-t border-border/30"
      style={{ animation: "fade-in 1s ease-out 0.8s both" }}
    >
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-xs uppercase tracking-[0.25em] text-muted-foreground/60 mb-10">
          Backed by
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {sponsors.map((name) => (
            <span
              key={name}
              className="text-sm font-medium text-muted-foreground/50 tracking-wide"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
