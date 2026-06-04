import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Builder from "./sections/Builder";
import CanvaScene from "./components/Threejs/CanvaScene";
import Projects from "./sections/Projects";

type Section = "hero" | "builder";

function App() {
  const [section, setSection] = useState<Section>("hero");

  return (
    <div className="bg-base-100 min-h-screen">
      <Navbar />
      <CanvaScene section={section} />
      <div id="home" >
        <Hero />
      </div>
      <div id="builder" className="relative">
        <Builder onSectionChange={setSection} />
      </div>
      <div className="relative z-20 bg-base-100">
        <div id="projects" >
          <Projects />
        </div>
      </div>
    </div>
  );
}

export default App;
