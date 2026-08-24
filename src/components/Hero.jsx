import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [5, -5]),
    {
      stiffness: 120,
      damping: 20,
    }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-5, 5]),
    {
      stiffness: 120,
      damping: 20,
    }
  );

  const handlePointerMove = (event) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) /
        rect.width -
      0.5;

    const y =
      (event.clientY - rect.top) /
        rect.height -
      0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const resetPointer = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollToMemories = () => {
    const section =
      document.getElementById(
        "memories"
      );

    section?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section
      id="home"
      className="hero-section"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="hero-vignette" />

      <div className="hero-glow hero-glow-one" />
      <div className="hero-glow hero-glow-two" />

      {/* Decorative floating elements */}

      <motion.div
        className="hero-orb orb-one"
        animate={{
          y: [-15, 15, -15],
          x: [-5, 5, -5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="hero-orb orb-two"
        animate={{
          y: [15, -15, 15],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="hero-flower flower-one"
        animate={{
          y: [-10, 10, -10],
          rotate: [-5, 5, -5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        ✿
      </motion.div>

      <motion.div
        className="hero-flower flower-two"
        animate={{
          y: [10, -10, 10],
          rotate: [5, -5, 5],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        ✿
      </motion.div>

      <motion.div
        className="hero-heart heart-one"
        animate={{
          y: [-12, 12, -12],
          opacity: [0.35, 0.8, 0.35],
          scale: [0.9, 1.05, 0.9],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        ♥
      </motion.div>

      <motion.div
        className="hero-heart heart-two"
        animate={{
          y: [12, -12, 12],
          opacity: [0.25, 0.65, 0.25],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        ♥
      </motion.div>

      {/* Decorative Rakhi thread */}

      <motion.div
        className="hero-thread hero-thread-left"
        animate={{
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="hero-thread hero-thread-right"
        animate={{
          rotate: [3, -3, 3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main content */}

      <motion.div
        className="hero-content"
        style={{
          rotateX,
          rotateY,
        }}
        initial={{
          opacity: 0,
          y: 35,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1.2,
          delay: 0.2,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <motion.div
          className="hero-kicker"
          initial={{
            opacity: 0,
            letterSpacing: "0.45em",
          }}
          animate={{
            opacity: 1,
            letterSpacing: "0.22em",
          }}
          transition={{
            duration: 1,
            delay: 0.4,
          }}
        >
          A celebration of our bond
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.55,
          }}
        >
          Happy Raksha Bandhan,
          <span>
            Sister ❤️
          </span>
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
            delay: 0.8,
          }}
        >
          No matter how far life takes us,
          you will always have a special
          place in my heart.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 1,
          }}
        >
          <button
            className="hero-memory-button"
            onClick={
              scrollToMemories
            }
          >
            <span>
              Our Memories
            </span>

            <span className="hero-button-icon">
              📸
            </span>
          </button>
        </motion.div>

        <motion.div
          className="hero-scroll-hint"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.5,
            duration: 1,
          }}
        >
          <span>
            Scroll to explore
          </span>

          <motion.div
            className="scroll-arrow"
            animate={{
              y: [0, 7, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ↓
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom glow */}

      <div className="hero-bottom-glow" />
    </section>
  );
}

export default Hero;