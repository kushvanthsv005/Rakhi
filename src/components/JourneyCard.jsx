import ImageFallback from "./ImageFallback";
import {
  motion,
} from "framer-motion";

function JourneyCard({
  item,
  index,
}) {
  const isLeft =
    item.side === "left";

  return (
    <motion.article
      className={`journey-item ${
        isLeft
          ? "journey-left"
          : "journey-right"
      }`}
      initial={{
        opacity: 0,
        x: isLeft ? -70 : 70,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: 0.9,
        delay: 0.1,
        ease: [
          0.16,
          1,
          0.3,
          1,
        ],
      }}
    >
      <div className="journey-card">
        <div className="journey-card-image">
          <ImageFallback
            src={item.image}
            alt={item.title}
            loading="lazy"
          />

          <div className="journey-image-overlay" />

          <div className="journey-chapter">
            {item.year}
          </div>
        </div>

        <div className="journey-card-content">
          <span className="journey-subtitle">
            {item.subtitle}
          </span>

          <h3>
            {item.title}
          </h3>

          <p>
            {item.description}
          </p>
        </div>
      </div>

      <div className="journey-node">
        <span>
          {item.icon}
        </span>
      </div>
    </motion.article>
  );
}

export default JourneyCard;