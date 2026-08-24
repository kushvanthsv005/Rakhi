import {
    useState,
} from "react";

import {
    motion,
} from "framer-motion";

import {
    photos,
} from "../data/photos";

import PhotoCard from "./PhotoCard";
import PhotoModal from "./PhotoModal";

function PhotoGallery() {
    const [
        selectedPhoto,
        setSelectedPhoto,
    ] = useState(null);

    const handleClose = () => {
        setSelectedPhoto(null);
    };

    return (
        <>
            <section
                id="memories"
                className="memories-section"
            >
                <div className="memories-background-glow" />

                <div className="memories-header">
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
                        Moments we keep forever
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
                        Our Memories
                        <span>📸</span>
                    </motion.h2>

                    <motion.p
                        className="memories-description"
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
                            duration: 0.8,
                        }}
                    >
                        A collection of little moments
                        that became some of my biggest
                        memories.
                    </motion.p>
                </div>

                <div className="photo-gallery">
                    {photos.map(
                        (photo, index) => (
                            <PhotoCard
                                key={photo.id}
                                photo={photo}
                                index={index}
                                onClick={
                                    setSelectedPhoto
                                }
                            />
                        )
                    )}
                </div>

                <motion.div
                    className="gallery-hint"
                    initial={{
                        opacity: 0,
                    }}
                    whileInView={{
                        opacity: 1,
                    }}
                    viewport={{
                        once: true,
                    }}
                >

                    <motion.button
                        className="journey-scroll-button"
                        onClick={() => {
                            document
                                .getElementById("journey")
                                ?.scrollIntoView({
                                    behavior: "smooth",
                                });
                        }}
                        whileHover={{
                            y: -3,
                        }}
                        whileTap={{
                            scale: 0.96,
                        }}
                    >
                        Continue our journey
                        <span>↓</span>
                    </motion.button>
                    <span>✦</span>

                    Tap a memory to
                    see it closer

                    <span>✦</span>
                </motion.div>
            </section>

            <PhotoModal
                photo={selectedPhoto}
                onClose={handleClose}
            />
        </>
    );
}

export default PhotoGallery;