import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function Overlay({ children }) {
  const [overlayRoot, setOverlayRoot] = useState(null);

  useEffect(() => {
    const overlayDiv = document.createElement("div");
    overlayDiv.id = "overlay-root";
    document.body.appendChild(overlayDiv);
    setOverlayRoot(overlayDiv);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.removeChild(overlayDiv);
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!overlayRoot) return null;

  return createPortal(
    <div className="bg-dark/5 fixed w-screen h-screen top-0 z-50 font-geist">
      {children}
    </div>,
    overlayRoot
  );
}

export default Overlay;
