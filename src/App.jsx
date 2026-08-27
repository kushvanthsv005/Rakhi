import {
  useEffect,
  useState,
} from "react";

import LoadingScreen from "./components/LoadingScreen";
import RakhiOpening from "./components/RakhiOpening";
import Main3DEnvironment from "./components/Main3DEnvironment";
import Navbar from "./components/Navbar";
import MouseParallax from "./components/MouseParallax";
import Hero from "./components/Hero";
import AudioController from "./components/AudioController";
import PhotoGallery from "./components/PhotoGallery";
import JourneyTimeline from "./components/JourneyTimeline";
import LetterSection from "./components/LetterSection";
import BlessingSection from "./components/BlessingSection";
import FinalCelebration from "./components/FinalCelebration";

import CursorGlow from "./components/CursorGlow";
import { config } from "./config";

function App() {
  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    openingComplete,
    setOpeningComplete,
  ] = useState(false);

  const [
    openingKey,
    setOpeningKey,
  ] = useState(0);

  useEffect(() => {
    if (!openingComplete) {
      window.scrollTo(0, 0);
    }
  }, [openingComplete]);

  useEffect(() => {
    if (!openingComplete) {
      const previousOverflow =
        document.body.style.overflow;

      document.body.style.overflow =
        "hidden";

      return () => {
        document.body.style.overflow =
          previousOverflow;
      };
    }
  }, [openingComplete]);

  return (
    <main className="app">
      {loading && (
        <LoadingScreen
          onComplete={() =>
            setLoading(false)
          }
        />
      )}

      {!loading &&
        !openingComplete && (
          <RakhiOpening
            key={openingKey}
            onComplete={() =>
              setOpeningComplete(true)
            }
          />
        )}

      {!loading &&
        openingComplete && (
          <>
            <MouseParallax />

            <Main3DEnvironment />

            {config.enableCursor && (
              <CursorGlow />
            )}

            <Navbar />

            <MainWebsite
              onReplay={() => {
                setOpeningComplete(false);
                setOpeningKey(
                  (value) => value + 1
                );
              }}
            />
          </>
        )}
    </main>
  );
}

function MainWebsite({ onReplay }) {
  return (
    <div className="main-site">

      <section id="home">
        <Hero />
      </section>
      <AudioController />
      <section id="memories">
        <PhotoGallery />
      </section>
      <section id="journey">
        <JourneyTimeline />
      </section>
      <section id="letter">
        <LetterSection />
      </section>
      <section id="blessings">
        <BlessingSection />
      </section>
      <section id="finale">
        <FinalCelebration
          onReplay={onReplay}
        />
      </section>

      <section
        id="memories"
        className="future-section"
      >
        <p className="eyebrow">
          This Moment Ends Here
        </p>

        <h2>
          But This Bond Lasts Forever ❤️
        </h2>
      </section>
    </div>
  );
}

export default App;