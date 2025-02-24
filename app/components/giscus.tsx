"use client";
import { useEffect, useRef, useState } from "react";

function Giscus() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("light");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedTheme =
      localStorage.getItem("theme") === "dark" ? "dark" : "light";
    setTheme(storedTheme);

    if (!ref.current || ref.current.hasChildNodes()) return;

    const scriptElem = document.createElement("script");
    scriptElem.src = "https://giscus.app/client.js";
    scriptElem.async = true;
    scriptElem.crossOrigin = "anonymous";

    scriptElem.setAttribute("data-repo", "dyeon-dev/nextjs-blog");
    scriptElem.setAttribute("data-repo-id", "R_kgDONnU0MQ");
    scriptElem.setAttribute("data-category", "General");
    scriptElem.setAttribute("data-category-id", "DIC_kwDONnU0Mc4CnEMP");
    scriptElem.setAttribute("data-mapping", "pathname");
    scriptElem.setAttribute("data-strict", "0");
    scriptElem.setAttribute("data-reactions-enabled", "1");
    scriptElem.setAttribute("data-emit-metadata", "0");
    scriptElem.setAttribute("data-input-position", "bottom");
    scriptElem.setAttribute("data-theme", storedTheme);
    scriptElem.setAttribute("data-lang", "ko");

    ref.current.appendChild(scriptElem);
    setMounted(true);
  }, []);
  return <div className="mt-8" ref={ref} />;
}

export default Giscus;

// 테마 변경 시 즉시 Giscus 업데이트
export const updateGiscusTheme = (newTheme: string) => {
  const iframe = document.querySelector<HTMLIFrameElement>(
    "iframe.giscus-frame"
  );
  iframe?.contentWindow?.postMessage(
    { giscus: { setConfig: { theme: newTheme } } },
    "https://giscus.app"
  );
};
