import { useEffect, useState } from "react";

export default function useScrollProgress(): number {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // total scrollable distance, not just one screen
      const totalScrollable =
        document.documentElement.scrollHeight - window.innerHeight;

      const p = scrollY / totalScrollable;
      setProgress(Math.min(Math.max(p, 0), 1));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}
