import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import MagicalRakhiScene from "./MagicalRakhiScene";

function RakhiTyingExperience() {
    const [started, setStarted] = useState(false);
    const [completed, setCompleted] = useState(false);

    const handleStart = () => {
        if (started) return;

        setStarted(true);
    };

    const handleComplete = () => {
        setCompleted(true);
    };

    return (
        <section className="magical-rakhi-section">
            <div className="magical-rakhi-heading">
                <p>ONE LAST THING...</p>

                <h2>
                    A Rakhi made with love
                </h2>

                <span>
                    Watch the thread become a promise.
                </span>
            </div>

            <div className="magical-rakhi-stage">
                <Canvas
                    camera={{
                        position: [0, 0.35, 8.5],
                        fov: 42,
                    }}
                    dpr={[1, 1.5]}
                    gl={{
                        antialias: true,
                        alpha: true,
                    }}
                >
                    <ambientLight intensity={1.1} />

                    <directionalLight
                        position={[3, 5, 5]}
                        intensity={2.2}
                    />

                    <pointLight
                        position={[-3, 2, 3]}
                        intensity={2}
                        color="#efc777"
                    />

                    <pointLight
                        position={[3, 1, 2]}
                        intensity={1.5}
                        color="#ff9b4a"
                    />

                    <Environment preset="studio" />

                    <MagicalRakhiScene
                        active={started}
                        onComplete={handleComplete}
                    />

                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        enableRotate={false}
                    />
                </Canvas>

                {!started && (
                    <div className="magical-rakhi-overlay">
                        <motion.button
                            className="magical-tie-button"
                            onClick={handleStart}
                            whileHover={{
                                scale: 1.05,
                                y: -3,
                            }}
                            whileTap={{
                                scale: 0.96,
                            }}
                        >
                            ✨ Tie the Rakhi
                        </motion.button>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {started && !completed && (
                    <motion.p
                        className="tying-status"
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                    >
                        Watch the magic unfold...
                    </motion.p>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {completed && (
                    <motion.div
                        className="rakhi-complete-message"
                        initial={{
                            opacity: 0,
                            y: 30,
                            scale: 0.9,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                    >
                        <span>
                            ✦ RAKHI TIED ✦
                        </span>

                        <h3>
                            Forever connected.
                        </h3>

                        <p>
                            Some bonds are tied with thread.
                            <br />
                            Ours is tied with love.
                        </p>

                        <strong>❤️</strong>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

export default RakhiTyingExperience;