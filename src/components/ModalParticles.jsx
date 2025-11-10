import { useEffect } from "react";
import { tsParticles } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

export default function ModalParticles() {
  useEffect(() => {
    const loadParticles = async () => {
      await loadSlim(tsParticles);

      tsParticles.load("modalParticles", {
        fullScreen: { enable: false },
        background: { color: "transparent" },
        particles: {
          number: { value: 25 },
          color: { value: ["#6b0f1a", "#4e9bfa", "#ffffff"] },
          size: { value: 2 },
          move: { speed: 0.6 },
          opacity: { value: 0.5 },
        },
      });
    };

    loadParticles();
  }, []);

  return (
    <div
      id="modalParticles"
      className="absolute inset-0 pointer-events-none opacity-70"
    ></div>
  );
}
