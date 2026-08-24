import {
  useEffect,
  useState,
} from "react";

function MouseParallax() {
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMove = (event) => {
      const x =
        event.clientX /
          window.innerWidth -
        0.5;

      const y =
        event.clientY /
          window.innerHeight -
        0.5;

      setMouse({
        x,
        y,
      });

      document.documentElement.style.setProperty(
        "--mouse-x",
        `${x}`
      );

      document.documentElement.style.setProperty(
        "--mouse-y",
        `${y}`
      );
    };

    window.addEventListener(
      "pointermove",
      handleMove,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handleMove
      );
    };
  }, []);

  return null;
}

export default MouseParallax;