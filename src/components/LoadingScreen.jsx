import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let current = 0;

    const interval = setInterval(() => {
      current += Math.random() * 4 + 1;

      if (current >= 100) {
        current = 100;
        clearInterval(interval);

        setTimeout(() => {
          setFinished(true);

          setTimeout(() => {
            onComplete();
          }, 900);
        }, 500);
      }

      setProgress(Math.floor(current));
    }, 90);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!finished && (
        <motion.section
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(12px)",
          }}
          transition={{
            duration: 0.9,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <div className="loading-background" />

          <GoldenParticles />

          <div className="loading-content">
            <motion.div
              className="loading-rakhi"
              initial={{
                opacity: 0,
                scale: 0.5,
                rotate: -20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              transition={{
                duration: 1.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="rakhi-aura" />

              <div className="rakhi-thread left-thread" />
              <div className="rakhi-thread right-thread" />

              <div className="rakhi-center">
                <div className="rakhi-ring outer-ring" />
                <div className="rakhi-ring middle-ring" />

                <div className="rakhi-jewel">
                  ✦
                </div>
              </div>
            </motion.div>

            <motion.p
              className="loading-eyebrow"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.8,
              }}
            >
              A special surprise is waiting
            </motion.p>

            <motion.h1
              className="loading-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.7,
                duration: 0.9,
              }}
            >
              Preparing something
              <span>special for you...</span>
            </motion.h1>

            <motion.div
              className="loading-status"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <span>Loading memories... ❤️</span>
              <span>{progress}%</span>
            </motion.div>

            <div className="loading-bar">
              <motion.div
                className="loading-bar-progress"
                animate={{
                  width: `${progress}%`,
                }}
                transition={{
                  duration: 0.15,
                  ease: "linear",
                }}
              />
            </div>

            <motion.div
              className="loading-dots"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <span />
              <span />
              <span />
            </motion.div>
          </div>

          <div className="loading-corner loading-corner-left" />
          <div className="loading-corner loading-corner-right" />
        </motion.section>
      )}
    </AnimatePresence>
  );
}

function GoldenParticles() {
  const particles = Array.from({ length: 45 });

  return (
    <div className="golden-particles">
      {particles.map((_, index) => {
        const size = Math.random() * 4 + 1;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 5 + 4;
        const delay = Math.random() * 4;

        return (
          <span
            key={index}
            className="golden-particle"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              top: `${top}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}

export default LoadingScreen;