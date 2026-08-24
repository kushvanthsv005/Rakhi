import {
    AnimatePresence,
    motion,
} from "framer-motion";

import {
    useState,
} from "react";

import BlessingRakhi from "./BlessingRakhi";

import {
    blessings,
} from "../data/blessings";

function BlessingSection() {
    const [
        selectedBlessing,
        setSelectedBlessing,
    ] = useState(null);

    const [
        activated,
        setActivated,
    ] = useState(false);

    const revealBlessing = () => {
        if (activated) return;

        const randomIndex =
            Math.floor(
                Math.random() *
                blessings.length
            );

        setActivated(true);

        setTimeout(() => {
            setSelectedBlessing(
                blessings[randomIndex]
            );
        }, 700);
    };

    const resetBlessing = () => {
        setActivated(false);
        setSelectedBlessing(null);
    };

    return (
        <section
            id="blessing"
            className="blessing-section"
        >
            <div className="blessing-background-glow" />

            <div 
            className="blessing-stars"
            aria-hidden="true">
                <span>✦</span>
                <span>✧</span>
                <span>✦</span>
                <span>·</span>
                <span>✧</span>
            </div>

            <motion.div
                className="blessing-header"
                initial={{
                    opacity: 0,
                    y: 30,
                }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                }}
                viewport={{
                    once: true,
                    amount: 0.3,
                }}
                transition={{
                    duration: 0.9,
                }}
            >
                <p className="section-kicker">
                    A little blessing for you
                </p>

                <h2>
                    One More
                    <span>Wish ✨</span>
                </h2>

                <p>
                    Close your eyes, make a wish,
                    and touch the Rakhi.
                </p>
            </motion.div>

            <motion.div
                className="blessing-stage"
                initial={{
                    opacity: 0,
                    scale: 0.9,
                }}
                whileInView={{
                    opacity: 1,
                    scale: 1,
                }}
                viewport={{
                    once: true,
                    amount: 0.25,
                }}
                transition={{
                    duration: 1,
                    ease: [
                        0.16,
                        1,
                        0.3,
                        1,
                    ],
                }}
            >
                <BlessingRakhi
                    active={activated}
                    onClick={
                        revealBlessing
                    }
                />

                <AnimatePresence>
                    {activated && (
                        <>
                            {Array.from({
                                length: 18,
                            }).map(
                                (_, index) => (
                                    <motion.span
                                        key={index}
                                        className="blessing-particle"
                                        initial={{
                                            opacity: 1,
                                            x: 0,
                                            y: 0,
                                            scale: 0,
                                        }}
                                        animate={{
                                            opacity: 0,
                                            x:
                                                Math.cos(
                                                    (index /
                                                        18) *
                                                    Math.PI *
                                                    2
                                                ) *
                                                (100 +
                                                    Math.random() *
                                                    90),
                                            y:
                                                Math.sin(
                                                    (index /
                                                        18) *
                                                    Math.PI *
                                                    2
                                                ) *
                                                (100 +
                                                    Math.random() *
                                                    90),
                                            scale:
                                                Math.random() *
                                                0.7 +
                                                0.5,
                                        }}
                                        transition={{
                                            duration:
                                                1 +
                                                Math.random() *
                                                0.5,
                                            ease: "easeOut",
                                        }}
                                    >
                                        {index % 3 === 0
                                            ? "✦"
                                            : "·"}
                                    </motion.span>
                                )
                            )}
                        </>
                    )}
                </AnimatePresence>
            </motion.div>

            <AnimatePresence mode="wait">
                {!selectedBlessing && (
                    <motion.div
                        key="hint"
                        className="blessing-hint"
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                    >
                        {activated
                            ? "Your wish is on its way..."
                            : "A little magic is waiting for you"}
                    </motion.div>
                )}

                {selectedBlessing && (
                    <motion.div
                        key="blessing"
                        className="blessing-result"
                        initial={{
                            opacity: 0,
                            y: 30,
                            scale: 0.94,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            y: -20,
                        }}
                        transition={{
                            duration: 0.7,
                            ease: [
                                0.16,
                                1,
                                0.3,
                                1,
                            ],
                        }}
                    >
                        <div className="blessing-result-icon">
                            {selectedBlessing.icon}
                        </div>

                        <p>
                            Your blessing
                        </p>

                        <h3>
                            {selectedBlessing.title}
                        </h3>

                        <span className="blessing-divider">
                            ✦
                        </span>

                        <blockquote>
                            {selectedBlessing.message}
                        </blockquote>

                        <button
                            className="blessing-again"
                            onClick={
                                resetBlessing
                            }
                        >
                            Make another wish
                            <span>↻</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                className="brother-promise"
                initial={{
                    opacity: 0,
                    y: 30,
                }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                }}
                viewport={{
                    once: true,
                    amount: 0.4,
                }}
                transition={{
                    delay: 0.25,
                    duration: 0.9,
                }}
            >
                <span className="promise-line" />

                <p>
                    And one promise from me...
                </p>

                <h3>
                    I'll always be your
                    <span>brother, protector,</span>
                    and biggest supporter.
                </h3>

                <div className="promise-heart">
                    ❤️
                </div>
            </motion.div>

            <motion.button
                className="finale-scroll-button"
                initial={{
                    opacity: 0,
                    y: 15,
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
                }}
                whileHover={{
                    y: -3,
                }}
                whileTap={{
                    scale: 0.97,
                }}
                onClick={() => {
                    document
                        .getElementById("finale")
                        ?.scrollIntoView({
                            behavior: "smooth",
                        });
                }}
            >
                One final message
                <span>↓</span>
            </motion.button>
        </section>
    );
}

export default BlessingSection;