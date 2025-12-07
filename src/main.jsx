// src/main.jsx
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ReportApp from "./ReportApp.jsx";

const params = new URLSearchParams(window.location.search);
const mode = params.get("mode");

// Simple debug to see what mode is being read
console.log("App mode:", mode);

const isReportMode = mode === "report";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element with id 'root' not found in index.html");
}

createRoot(rootElement).render(
  <StrictMode>
    {isReportMode ? <ReportApp /> : <App />}
  </StrictMode>
);
