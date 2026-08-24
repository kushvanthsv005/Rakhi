import ImageFallback from "./ImageFallback";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";

function PhotoCard({
    photo,
    index,
    onClick,
}) {
    const mouseX =
        useMotionValue(0);

    const mouseY =
        useMotionValue(0);

    const rotateX = useSpring(
        useTransform(
            mouseY,
            [-0.5, 0.5],
            [8, -8]
        ),
        {
            stiffness: 180,
            damping: 18,
        }
    );

    const rotateY = useSpring(
        useTransform(
            mouseX,
            [-0.5, 0.5],
            [-8, 8]
        ),
        {
            stiffness: 180,
            damping: 18,
        }
    );

    const handlePointerMove = (
        event
    ) => {
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

    const resetTilt = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.article
            className={`photo-card photo-card-${index}`}
            style={{
                rotateX,
                rotateY,
            }}
            initial={{
                opacity: 0,
                y: 60,
                scale: 0.92,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
            }}
            viewport={{
                once: true,
                amount: 0.25,
            }}
            transition={{
                duration: 0.8,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{
                y: -10,
                scale: 1.02,
            }}
            onPointerMove={
                handlePointerMove
            }
            onPointerLeave={
                resetTilt
            }
            onClick={() =>
                onClick(photo)
            }
        >
            <div className="photo-card-glow" />

            <div className="photo-card-inner">
                <div className="photo-image-wrapper">
                    <ImageFallback
                        src={photo.image}
                        alt={`Memory: ${photo.title}`}
                        loading={
                            index < 3
                                ? "eager"
                                : "lazy"
                        }
                        draggable="false"
                    />

                    <div className="photo-image-overlay" />

                    <div className="photo-zoom-icon">
                        +
                    </div>
                </div>

                <div className="photo-card-content">
                    <span>
                        Memory {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3>
                        {photo.title}
                    </h3>
                </div>
            </div>
        </motion.article>
    );
}

export default PhotoCard;