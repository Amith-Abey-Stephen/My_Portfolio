import { useEffect } from "react";

export function Analytics() {
  useEffect(() => {
    const initClarity = () => {
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "x120rxf18g");
    };

    if (document.readyState === "complete") {
      setTimeout(initClarity, 1000);
    } else {
      window.addEventListener("load", () => setTimeout(initClarity, 1000));
    }
  }, []);

  return null;
}
