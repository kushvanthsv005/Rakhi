import {
    motion,
    useScroll,
    useSpring,
} from "framer-motion";

import {
    journey,
} from "../data/journey";

import JourneyCard from "./JourneyCard";

function JourneyTimeline() {
    const {
        scrollYProgress,
    } = useScroll();

    const lineScale =
        useSpring(
            scrollYProgress,
            {
                stiffness: 80,
                damping: 25,
            }
        );

    return (
        <section
            id="journey"
            className="journey-section"
        >
            <div className="journey-glow" />

            <div className="journey-header">
                <motion.p
                    className="section-kicker"
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
                    A story written together
                </motion.p>

                <motion.h2
                    initial={{
                        opacity: 0,
                        y: 25,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        duration: 0.8,
                    }}
                >
                    Our Journey Together
                    <span>❤️</span>
                </motion.h2>

                <motion.p
                    className="journey-intro"
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
                        delay: 0.2,
                    }}
                >
                    From childhood adventures to
                    the memories we continue making
                    today.
                </motion.p>
            </div>

            <div className="journey-timeline">
                <div className="journey-line-track" />

                <motion.div
                    className="journey-line-progress"
                    style={{
                        scaleY: lineScale,
                    }}
                />

                <div className="journey-items">
                    {journey.map(
                        (item, index) => (
                            <JourneyCard
                                key={item.id}
                                item={item}
                                index={index}
                            />
                        )
                    )}
                </div>
            </div>

            <motion.div
                className="journey-ending"
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
            >
                <div className="journey-ending-heart">
                    ❤️
                </div>

                <h3>
                    And our story continues...
                </h3>

                <p>
                    The best memories are still
                    waiting to be created.
                </p>

                <motion.button
                    className="letter-scroll-button"
                    whileHover={{
                        y: -3,
                    }}
                    whileTap={{
                        scale: 0.96,
                    }}
                    onClick={() => {
                        document
                            .getElementById("letter")
                            ?.scrollIntoView({
                                behavior: "smooth",
                            });
                    }}
                >
                    Read something from my heart
                    <span>↓</span>
                </motion.button>
            </motion.div>
        </section>
    );
}

export default JourneyTimeline;