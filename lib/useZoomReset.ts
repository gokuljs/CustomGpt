"use client";
import { useEffect } from "react";

const useZoomReset = () => {
  useEffect(() => {
    const handleBlur = (event: FocusEvent) => {
      const target = event.target as HTMLElement; // Cast the event target to HTMLElement
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        window.scrollTo(0, 0); // Adjust window scroll to reset zoom
      }
    };

    document.addEventListener("blur", handleBlur, true);

    // Cleanup
    return () => {
      document.removeEventListener("blur", handleBlur, true);
    };
  }, []);
};

export default useZoomReset;
