"use client";

import { useEffect, useState } from "react";

export default function ReadingProgressBar() {
  const [width, setWidth] = useState(0);

  const scrollHeight = () => {
    const element = document.documentElement;
    const ScrollTop = element.scrollTop || document.body.scrollTop;
    const ScrollHeight = element.scrollHeight || document.body.scrollHeight;
    const percent = (ScrollTop / (ScrollHeight - element.clientHeight)) * 100;

    setWidth(percent);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHeight);
    return () => window.removeEventListener("scroll", scrollHeight);
  }, []);

  return (
    <div className="progressBar" style={{ width: `${width}%` }}>
      <style jsx>{`
        .progressBar {
          position: absolute;
          z-index: 50;
          top: 60px;
          left: 0;
          height: 6px;
          border-radius: 0 2px 0 0;
          background: linear-gradient(90deg, #1b41ff, #41fff9);
        }
      `}</style>
    </div>
  );
}
