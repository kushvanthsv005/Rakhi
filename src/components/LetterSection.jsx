import {
    motion,
    useScroll,
    useTransform,
} from "framer-motion";

import {
    useRef,
} from "react";

import {
    sisterMessage,
} from "../data/message";

function LetterSection() {
    const sectionRef = useRef(null);

    const {
        scrollYProgress,
    } = useScroll({
        target: sectionRef,
        offset: [
            "start 85%",
            "end 20%",
        ],
    });

    const cardY = useTransform(
        scrollYProgress,
        [0, 1],
        [80, -20]
    );

    const cardRotate = useTransform(
        scrollYProgress,
        [0, 1],
        [2, -1]
    );

    const glowScale = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [0.7, 1.1, 0.8]
    );

    return (
        <section
            ref={sectionRef}
            id="letter"
            className="letter-section"
        >
            <motion.div
                className="letter-background-glow"
                aria-hidden="true"
                style={{
                    scale: glowScale,
                }}
            />

            <div className="letter-floating-heart heart-a">
                <motion.span
                    animate={{
                        y: [-12, 12, -12],
                        rotate: [-8, 8, -8],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    ♥
                </motion.span>
            </div>

            <div className="letter-floating-heart heart-b">
                <motion.span
                    animate={{
                        y: [10, -15, 10],
                        rotate: [8, -8, 8],
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    ♥
                </motion.span>
            </div>

            <div className="letter-header">
                <motion.p
                    className="section-kicker"
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
                        amount: 0.4,
                    }}
                >
                    {sisterMessage.eyebrow}
                </motion.p>

                <motion.h2
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
                        duration: 0.9,
                    }}
                >
                    A Letter
                    <span>For You</span>
                </motion.h2>
            </div>

            <motion.div
                className="letter-card"
                style={{
                    y: cardY,
                    rotateZ: cardRotate,
                }}
                initial={{
                    opacity: 0,
                    scale: 0.92,
                    y: 70,
                }}
                whileInView={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                }}
                viewport={{
                    once: true,
                    amount: 0.2,
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
                <div className="letter-paper">

                    <div className="letter-paper-glow" />

                    <div className="letter-top-decoration">
                        <span>✦</span>
                        <span>♡</span>
                        <span>✦</span>
                    </div>

                    <div className="letter-content">
                        <motion.h3
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
                        >
                            {sisterMessage.title}
                        </motion.h3>

                        <div className="letter-divider">
                            <span />
                            <i>♡</i>
                            <span />
                        </div>

                        <div className="letter-body">
                            {sisterMessage.paragraphs.map(
                                (
                                    paragraph,
                                    index
                                ) => (
                                    <motion.p
                                        key={index}
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
                                            amount: 0.7,
                                        }}
                                        transition={{
                                            duration: 0.7,
                                            delay:
                                                index *
                                                0.12,
                                        }}
                                    >
                                        {paragraph}
                                    </motion.p>
                                )
                            )}
                        </div>

                        <motion.div
                            className="letter-signature"
                            initial={{
                                opacity: 0,
                                x: -15,
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0,
                            }}
                            viewport={{
                                once: true,
                            }}
                            transition={{
                                delay: 0.5,
                                duration: 0.8,
                            }}
                        >
                            <span>
                                {sisterMessage.signature}
                            </span>

                            <strong>
                                {sisterMessage.name}
                            </strong>
                        </motion.div>
                    </div>

                    <div className="letter-bottom-decoration">
                        <span>✿</span>
                    </div>
                </div>
            </motion.div>

            <motion.div
                className="letter-bottom-message"
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
                    delay: 0.4,
                }}
            >
                <span>Made with love</span>
                <span>❤️</span>
            </motion.div>

            <motion.button
                className="blessing-scroll-button"
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
                        .getElementById("blessing")
                        ?.scrollIntoView({
                            behavior: "smooth",
                        });
                }}
            >
                One more little surprise
                <span>✦</span>
            </motion.button>
        </section>
    );
}

export default LetterSection;