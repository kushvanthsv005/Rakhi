import { useEffect, useRef, useState } from "react";

function AudioController() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio("/audio/rakhi-music.mp3");

    audio.loop = true;
    audio.volume = 0.35;

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggleAudio = async () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      try {
        await audioRef.current.play();
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
      aria-label={
        playing
          ? "Pause music"
          : "Play music"
      }
    >
      {playing ? "🔊" : "🔇"}
    </button>
  );
}

export default AudioController;