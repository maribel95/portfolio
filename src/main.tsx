import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@styles/base.scss";
import App from "./App.tsx";
import "./i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
