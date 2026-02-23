import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Tech from "./sections/Tech";
import Works from "./sections/Works";
import Feedbacks from "./sections/Feedbacks";
import FeedbackSection from "./sections/FeedbackSection";
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
      {/* Fixed background layers — OUTSIDE the overflow container so fixed positioning works */}

      {/* Global 3D Star Background - Only on desktop */}
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

      {/* 3D Orbital Star Sphere — fixed, always visible while scrolling */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 1,
        display: "flex", alignItems: "center", justifyContent: "center",
        pointerEvents: "none", overflow: "hidden",
      }}>
        <div style={{ perspective: "800px", width: 500, height: 500 }}>
          <motion.div
            animate={{ rotateY: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            style={{ width: "100%", height: "100%", position: "relative", transformStyle: "preserve-3d" }}
          >
            {/* Ambient glow */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: 260, height: 260, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(145,94,255,0.22) 0%, transparent 70%)",
              filter: "blur(28px)",
            }} />
            {/* Glowing core sphere */}
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: 72, height: 72, borderRadius: "50%",
                background: "radial-gradient(circle at 38% 32%, #f3e8ff 0%, #a855f7 45%, #4c1d95 100%)",
                boxShadow: "0 0 24px 8px rgba(167,139,250,0.55), 0 0 60px 20px rgba(124,58,237,0.25), inset 0 -6px 12px rgba(0,0,0,0.35)",
              }}
            />
            {/* Inner ring */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%) rotateX(68deg)", width: 270, height: 270 }}>
              <motion.svg width={270} height={270} animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} style={{ overflow: "visible" }}>
                <defs><filter id="sg2"><feGaussianBlur stdDeviation="1.2" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
                {Array.from({ length: 18 }, (_, i) => { const a = (2 * Math.PI * i) / 18; const cx = 135 + 120 * Math.cos(a); const cy = 135 + 120 * Math.sin(a); const s = i % 3 === 0 ? 5 : 3; return <path key={i} filter="url(#sg2)" d={`M${cx},${cy - s} L${cx + s * .28},${cy - s * .28} L${cx + s},${cy} L${cx + s * .28},${cy + s * .28} L${cx},${cy + s} L${cx - s * .28},${cy + s * .28} L${cx - s},${cy} L${cx - s * .28},${cy - s * .28}Z`} fill={i % 3 === 0 ? "#f3e8ff" : "white"} opacity={i % 3 === 0 ? 1 : 0.65} />; })}
              </motion.svg>
            </div>
            {/* Outer ring */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%) rotateX(72deg) rotateZ(40deg)", width: 390, height: 390 }}>
              <motion.svg width={390} height={390} animate={{ rotate: -360 }} transition={{ duration: 14, repeat: Infinity, ease: "linear" }} style={{ overflow: "visible" }}>
                {Array.from({ length: 26 }, (_, i) => { const a = (2 * Math.PI * i) / 26; const cx = 195 + 180 * Math.cos(a); const cy = 195 + 180 * Math.sin(a); const s = i % 5 === 0 ? 4.5 : 2; return <path key={i} d={`M${cx},${cy - s} L${cx + s * .28},${cy - s * .28} L${cx + s},${cy} L${cx + s * .28},${cy + s * .28} L${cx},${cy + s} L${cx - s * .28},${cy + s * .28} L${cx - s},${cy} L${cx - s * .28},${cy - s * .28}Z`} fill={i % 5 === 0 ? "#c4b5fd" : "white"} opacity={i % 5 === 0 ? 0.95 : 0.3} />; })}
              </motion.svg>
            </div>
            {/* Equatorial ring */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%) rotateX(82deg)", width: 320, height: 320 }}>
              <motion.svg width={320} height={320} animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} style={{ overflow: "visible", opacity: 0.5 }}>
                {Array.from({ length: 32 }, (_, i) => { const a = (2 * Math.PI * i) / 32; const cx = 160 + 148 * Math.cos(a); const cy = 160 + 148 * Math.sin(a); return <circle key={i} cx={cx} cy={cy} r={1.2} fill="white" opacity={i % 4 === 0 ? 0.9 : 0.3} />; })}
              </motion.svg>
            </div>
          </motion.div>
        </div>
      </div>

      {/* App Container — scrollable content */}
      <div className="relative w-full min-h-screen overflow-x-hidden" style={{ zIndex: 2 }}>

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
          <FeedbackSection />

          <div className="relative z-0">
            <Contact />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
