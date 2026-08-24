import {
  useRef,
} from "react";

import {
  motion,
} from "framer-motion";

function BlessingRakhi({
  active,
  onClick,
}) {
  const buttonRef =
    useRef(null);

  return (
    <motion.button
      ref={buttonRef}
      className={`blessing-rakhi ${
        active
          ? "blessing-rakhi-active"
          : ""
      }`}
      onClick={onClick}
      whileHover={{
        scale: 1.04,
      }}
      whileTap={{
        scale: 0.96,
      }}
      aria-label="Open your Rakhi blessing"
    >
      <div className="blessing-rakhi-aura" />

      <div className="blessing-rakhi-outer">
        <div className="blessing-rakhi-inner">
          <div className="blessing-rakhi-gem">
            <span>✦</span>
          </div>
        </div>
      </div>

      <div className="blessing-rakhi-bead bead-1" />
      <div className="blessing-rakhi-bead bead-2" />
      <div className="blessing-rakhi-bead bead-3" />
      <div className="blessing-rakhi-bead bead-4" />

      <div className="blessing-rakhi-thread thread-left" />
      <div className="blessing-rakhi-thread thread-right" />

      {!active && (
        <motion.div
          className="blessing-rakhi-hint"
          animate={{
            opacity: [
              0.4,
              1,
              0.4,
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          Tap me ✨
        </motion.div>
      )}
    </motion.button>
  );
}

export default BlessingRakhi;