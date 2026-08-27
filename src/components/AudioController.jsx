import { useEffect, useRef, useState } from "react";

function AudioController() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio("/audio/rakhi-music.mp3");

    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = "auto";

    audioRef.current = audio;

    // Try to autoplay when the website opens
    const startMusic = async () => {
      try {
        await audio.play();
        setPlaying(true);
      } catch (error) {
        // Browser may block autoplay with sound
        console.log("Autoplay blocked. User interaction required.");
        setPlaying(false);
      }
    };

    startMusic();

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggleAudio = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch (error) {
        console.log("Audio playback blocked:", error);
      }
    }
  };

  return (
    <button
      className="audio-control"
      onClick={toggleAudio}
      aria-label={playing ? "Pause music" : "Play music"}
    >
      {playing ? "🔊" : "🔇"}
    </button>
  );
}

export default AudioController;