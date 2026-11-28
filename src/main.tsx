import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Global styles first, so component styles (imported by App) cascade after them.
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/neopop.css";
import App from "./App";
import { initAnalytics } from "./lib/analytics";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

initAnalytics();
