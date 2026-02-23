import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Tech from "./sections/Tech";
import Works from "./sections/Works";
import Feedbacks from "./sections/Feedbacks";
import Contact from "./sections/Contact";
import ErrorBoundary from "./components/ErrorBoundary";

// Detect if device is low-end mobile (Android) to skip heavy 3D
const isMobile = () => {
  const ua = navigator.userAgent || "";
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
};

const App = () => {
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    // Only load heavy 3D canvases on desktop
    if (!isMobile()) {
      import("./components/canvas/Stars").then((mod) => {
        setShowCanvas({ Stars: mod.default });
      });
    }
  }, []);

  return (
    <BrowserRouter>
      {/* App Container */}
      <div className="relative z-0 bg-primary w-full min-h-screen overflow-x-hidden">

        {/* Global 3D Background - Only on desktop */}
        {showCanvas && showCanvas.Stars && (
          <ErrorBoundary>
            <div className="fixed inset-0 z-[-1] bg-primary">
              <showCanvas.Stars />
            </div>
          </ErrorBoundary>
        )}

        {/* Fallback dark background for mobile */}
        {!showCanvas && (
          <div className="fixed inset-0 z-[-1] bg-primary" />
        )}

        {/* Main Content - Scrollable */}
        <div className="relative z-10 text-white">
          <div className="bg-transparent bg-contain bg-no-repeat bg-center">
            <Hero />
          </div>

          <About />
          <Experience />
          <ErrorBoundary>
            <Tech />
          </ErrorBoundary>
          <Works />
          <Feedbacks />

          <div className="relative z-0">
            <Contact />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
