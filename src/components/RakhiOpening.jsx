import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import Rakhi3D from "./Rakhi3D";

function RakhiOpening({ onComplete }) {
  const [phase, setPhase] = useState("idle");
  const [splitProgress, setSplitProgress] = useState(0);
  const [glowing, setGlowing] = useState(false);

  const startOpening = useCallback(() => {
    if (phase !== "idle") return;

    setPhase("zoom");

    setTimeout(() => {
      setPhase("glow");
      setGlowing(true);
    }, 1000);

    setTimeout(() => {
      setPhase("split");
    }, 2100);

    setTimeout(() => {
      setPhase("burst");
    }, 3300);

    setTimeout(() => {
      setPhase("travel");
    }, 4000);

    setTimeout(() => {
      setPhase("complete");

      setTimeout(() => {
        onComplete?.();
      }, 800);
    }, 5000);
  }, [phase, onComplete]);

  useEffect(() => {
    if (phase !== "split") return;

    let startTime = null;
    let animationFrame;

    const duration = 1100;

    const animate = (time) => {
      if (!startTime) {
        startTime = time;
      }

      const elapsed = time - startTime;

      const progress = Math.min(
        elapsed / duration,
        1
      );

      // Smooth ease-out
      const eased =
        1 - Math.pow(1 - progress, 3);

      setSplitProgress(eased);

      if (progress < 1) {
        animationFrame =
          requestAnimationFrame(animate);
      }
    };

    animationFrame =
      requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [phase]);

  return (
    <motion.section
      className="rakhi-opening"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="opening-background" />

      <motion.div
        className="opening-rakhi-stage"
        animate={{
          scale:
            phase === "zoom"
              ? 1.12
              : phase === "glow"
                ? 1.18
                : phase === "split"
                  ? 1.22
                  : phase === "burst"
                    ? 1.4
                    : phase === "travel"
                      ? 3
                      : 1,

          opacity:
            phase === "complete"
              ? 0
              : 1,

          filter:
            phase === "travel"
              ? "blur(10px)"
              : "blur(0px)",
        }}
        transition={{
          duration: 0.9,
          ease: [0.76, 0, 0.24, 1],
        }}
      >
        <Rakhi3D
          splitProgress={splitProgress}
          glowing={glowing}
          opening={phase !== "idle"}
        />
      </motion.div>

      {/* Initial message */}
      <AnimatePresence>
        {phase === "idle" && (
          <motion.div
            className="opening-content"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.5,
              duration: 0.8,
            }}
          >
            <p className="opening-eyebrow">
              A little something from your brother
            </p>

            <h1>
              For the most special sister
              <span>
                in my world ❤️
              </span>
            </h1>

            <button
              className="opening-button"
              onClick={startOpening}
            >
              <span>
                Open Your Rakhi Gift
              </span>

              <span>✨</span>
            </button>

            <p className="opening-hint">
              Your surprise is waiting...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glow message */}
      <AnimatePresence>
        {phase === "glow" && (
          <motion.div
            className="opening-message"
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
            }}
          >
            Something special is opening...
          </motion.div>
        )}
      </AnimatePresence>

      {/* Burst overlay */}
      <AnimatePresence>
        {phase === "burst" && (
          <motion.div
            className="golden-burst-overlay"
            initial={{
              opacity: 0,
              scale: 0.3,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.3, 1.5, 2.5],
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
          />
        )}
      </AnimatePresence>

      {/* Travel flash */}
      <AnimatePresence>
        {phase === "travel" && (
          <motion.div
            className="travel-light"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1,
            }}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
}

export default RakhiOpening;