import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Builder from "./sections/Builder";

function App() {
  return (
    <div className="bg-base-100 min-h-screen">
      <Navbar />
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
