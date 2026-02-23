import { BrowserRouter } from "react-router-dom";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Tech from "./sections/Tech";
import Works from "./sections/Works";
import Feedbacks from "./sections/Feedbacks";
import Contact from "./sections/Contact";
import StarsCanvas from "./components/canvas/Stars";
import EarthCanvas from "./components/canvas/Earth";

const App = () => {
  return (
    <BrowserRouter>
      {/* App Container - Transparent to show Body BG */}
      <div className="relative z-0 bg-transparent w-full min-h-screen overflow-x-hidden">

        {/* Global 3D Background - Fixed behind everything */}
        <div className="fixed inset-0 z-[-1] bg-primary">
          <StarsCanvas />
          <EarthCanvas />
        </div>

        {/* Main Content - Scrollable */}
        <div className="relative z-10 text-white">
          <div className="bg-transparent bg-contain bg-no-repeat bg-center">
            {/* Navbar removed as it does not exist */}
            <Hero />
          </div>

          <About />
          <Experience />
          <Tech />
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
