import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Builder from "./sections/Builder";
import CanvaScene from "./components/Threejs/CanvaScene";

type Section = "hero" | "builder";

function App() {
  const [section, setSection] = useState<Section>("hero");

  return (
    <div className="bg-base-100 min-h-screen">
      <Navbar />
      <CanvaScene section={section} />
      <div id="home">
        <Hero />
      </div>
      <div id="builder">
        <Builder onSectionChange={setSection} />
      </div>
    </div>
  );
}

export default App;