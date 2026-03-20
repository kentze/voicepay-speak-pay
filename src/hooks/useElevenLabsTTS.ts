import { useEffect, useRef } from "react";

const useElevenLabsTTS = (text: string, autoPlay: boolean = true) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    if (!autoPlay || hasPlayed.current) return;
    hasPlayed.current = true;

    const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
    if (!apiKey) {
      console.warn("VITE_ELEVENLABS_API_KEY not set — skipping TTS");
      return;
    }

    const voiceId = "21m00Tcm4TlvDq8ikWAM";

    const speak = async () => {
      try {
        const res = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
          {
            method: "POST",
            headers: {
              "xi-api-key": apiKey,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text,
              model_id: "eleven_monolingual_v1",
            }),
          }
        );

        if (!res.ok) {
          console.error("ElevenLabs TTS failed:", res.status);
          return;
        }

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audioRef.current = audio;
        await audio.play();
      } catch (err) {
        console.error("TTS error:", err);
      }
    };

    speak();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [text, autoPlay]);
};

export default useElevenLabsTTS;
