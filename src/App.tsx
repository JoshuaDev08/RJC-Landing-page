import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Builder from "./sections/Builder";
import CanvaScene from "./components/Threejs/CanvaScene";

function App() {
  return (
    <div className="bg-base-100 min-h-screen">
      <Navbar />
      <CanvaScene />
      <div id="home">
        <Hero />
      </div>
      <div id="builder">
        <Builder />
      </div>
    </div>
  );
}

export default App;
