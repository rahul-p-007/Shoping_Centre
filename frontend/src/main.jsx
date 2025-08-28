import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
function Root() {
  useEffect(() => {
    const preloader = document.getElementById("preloader");
    if (!preloader) return;
    // allow first paint, then fade out and remove
    requestAnimationFrame(() => {
      preloader.classList.add("hidden");
      setTimeout(() => preloader.remove(), 350);
    });
  }, []);
  return (
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<Root />);
