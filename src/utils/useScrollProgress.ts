import { useEffect, useState } from "react";

export default function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const builder = document.getElementById("builder");

      if (!builder) return;

      const builderTop = builder.offsetTop;
      const builderHeight = builder.offsetHeight;

      const start = builderTop - window.innerHeight;
      const end = builderTop + builderHeight;

      const rawProgress = (window.scrollY - start) / (end - start);

      setProgress(Math.min(Math.max(rawProgress, 0), 1));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}