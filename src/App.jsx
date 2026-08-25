import {
  useEffect,
  useState,
} from "react";

import { SpeedInsights } from "@vercel/speed-insights/react";

import LoadingScreen from "./components/LoadingScreen";
import RakhiOpening from "./components/RakhiOpening";
import Main3DEnvironment from "./components/Main3DEnvironment";
import MouseParallax from "./components/MouseParallax";
import Hero from "./components/Hero";
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
      <SpeedInsights />

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
      <Hero />
      <PhotoGallery />
      <JourneyTimeline />
      <LetterSection />
      <BlessingSection />
      <FinalCelebration
        onReplay={onReplay}
      />

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