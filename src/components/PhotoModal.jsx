import ImageFallback from "./ImageFallback";
import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  useEffect,
} from "react";

function PhotoModal({
  photo,
  onClose,
}) {
  useEffect(() => {
    if (!photo) {
      return;
    }

    const handleKeyDown = (
      event
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow =
        previousOverflow;
    };
  }, [photo, onClose]);

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          className="photo-modal"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          onClick={onClose}
        >
          <motion.div
            className="photo-modal-backdrop"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          />

          <button
            className="photo-modal-close"
            onClick={onClose}
            aria-label="Close photo"
          >
            ×
          </button>

          <motion.div
            className="photo-modal-content"
            initial={{
              opacity: 0,
              scale: 0.88,
              y: 25,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.92,
              y: 20,
            }}
            transition={{
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="photo-modal-image">
              <ImageFallback
                src={photo.image}
                alt={`Memory: ${photo.title}`}
              />
            </div>

            <div className="photo-modal-info">
              <span>
                {photo.title}
              </span>

              <p>
                {photo.caption}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PhotoModal;