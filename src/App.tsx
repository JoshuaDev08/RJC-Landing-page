import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Builder from "./sections/Builder";
import CanvaScene from "./components/Threejs/CanvaScene";
import Projects from "./sections/Projects";
import Whychooseus from "./sections/Whychooseus";

type Section = "hero" | "builder" | "projects";

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
          <Whychooseus />
      </div>
    </div>
  );
}

export default App;
