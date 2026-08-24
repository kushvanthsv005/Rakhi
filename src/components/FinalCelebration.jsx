import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

import { useRef, useState } from "react";

function FinalCelebration({
  onReplay,
}) {
  const sectionRef = useRef(null);

  const [showMessage, setShowMessage] =
    useState(false);

  const { scrollYProgress } =
    useScroll({
      target: sectionRef,
      offset: [
        "start 85%",
        "end 20%",
      ],
    });

  const titleY = useTransform(
    scrollYProgress,
    [0, 1],
    [70, -30]
  );

  const titleScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.9, 1, 1.04]
  );

  const handleReplay = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      onReplay?.();
    }, 700);
  };

  return (
    <section
      ref={sectionRef}
      id="finale"
      className="final-section"
    >
      <div className="final-background-glow" />

      <div 
        className="final-stars"
        aria-hidden="true"
      >
        {Array.from({
          length: 14,
        }).map((_, index) => (
          <motion.span
            key={index}
            style={{
              left: `${8 + Math.random() * 84}%`,
              top: `${8 + Math.random() * 80}%`,
            }}
            animate={{
              opacity: [
                0.15,
                0.8,
                0.15,
              ],
              scale: [
                0.7,
                1.2,
                0.7,
              ],
            }}
            transition={{
              duration:
                2.5 +
                Math.random() * 2,
              delay:
                Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {index % 3 === 0
              ? "✦"
              : "·"}
          </motion.span>
        ))}
      </div>

      <div className="final-petals">
        {Array.from({
          length: 10,
        }).map((_, index) => (
          <motion.span
            key={index}
            className={`final-petal petal-${index}`}
            animate={{
              y: [
                -20,
                25,
                -20,
              ],
              x: [
                0,
                index % 2 === 0
                  ? 18
                  : -18,
                0,
              ],
              rotate: [
                -10,
                15,
                -10,
              ],
            }}
            transition={{
              duration:
                5 +
                index * 0.25,
              repeat: Infinity,
              ease: "easeInOut",
              delay:
                index * 0.15,
            }}
          >
            ✿
          </motion.span>
        ))}
      </div>

      <motion.div
        className="final-content"
        style={{
          y: titleY,
          scale: titleScale,
        }}
      >
        <motion.p
          className="section-kicker"
          initial={{
            opacity: 0,
            letterSpacing: "0.35em",
          }}
          whileInView={{
            opacity: 1,
            letterSpacing: "0.2em",
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
          }}
        >
          Until the next memory
        </motion.p>

        <motion.div
          className="final-title"
          initial={{
            opacity: 0,
            scale: 0.8,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 1.2,
            ease: [
              0.16,
              1,
              0.3,
              1,
            ],
          }}
        >
          <span>
            Happy Raksha
          </span>

          <strong>
            Bandhan
          </strong>
        </motion.div>

        <motion.div
          className="final-sister"
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.5,
            duration: 0.8,
          }}
        >
          Sister
          <span>❤️</span>
        </motion.div>

        <motion.div
          className="final-divider"
          initial={{
            opacity: 0,
            scaleX: 0,
          }}
          whileInView={{
            opacity: 1,
            scaleX: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.8,
            duration: 0.8,
          }}
        >
          <span />
          <i>✦</i>
          <span />
        </motion.div>

        <motion.p
          className="final-quote"
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 1,
            duration: 0.8,
          }}
        >
          Some bonds are not measured
          by time or distance.
          <br />
          They are simply forever.
        </motion.p>

        <motion.div
          className="final-heart"
          animate={{
            scale: [
              1,
              1.12,
              1,
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ❤️
        </motion.div>

        <motion.button
          className="final-replay-button"
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 1.3,
            duration: 0.8,
          }}
          whileHover={{
            y: -4,
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.97,
          }}
          onClick={handleReplay}
        >
          <span className="replay-icon">
            ↻
          </span>

          Replay the Rakhi
        </motion.button>

        <motion.button
          className="final-message-button"
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 1.5,
          }}
          onClick={() =>
            setShowMessage(
              (value) => !value
            )
          }
        >
          {showMessage
            ? "Hide message"
            : "One last thing..."}
        </motion.button>

        <AnimatePresence>
          {showMessage && (
            <motion.div
              className="final-hidden-message"
              initial={{
                opacity: 0,
                height: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                height: "auto",
                y: 0,
              }}
              exit={{
                opacity: 0,
                height: 0,
                y: -10,
              }}
            >
              <p>
                Thank you for being my
                sister.
              </p>

              <span>
                No matter what happens,
                we will always be family.
                ❤️
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="final-footer"
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          delay: 1.7,
        }}
      >
        <span>
          Made with love
        </span>

        <i>•</i>

        <span>
          For my sister
        </span>

        <i>•</i>

        <span>
          Always ❤️
        </span>
      </motion.div>
    </section>
  );
}

export default FinalCelebration;