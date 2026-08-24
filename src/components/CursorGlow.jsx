import {
  motion,
} from "framer-motion";

import {
  useEffect,
  useState,
} from "react";

function CursorGlow() {
  const [
    position,
    setPosition,
  ] = useState({
    x: -100,
    y: -100,
  });

  useEffect(() => {
    const handleMove = (
      event
    ) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener(
      "pointermove",
      handleMove
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handleMove
      );
    };
  }, []);

  return (
    <motion.div
      className="cursor-glow"
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 30,
        mass: 0.3,
      }}
    />
  );
}

export default CursorGlow;