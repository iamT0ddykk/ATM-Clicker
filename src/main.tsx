import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastContainer
      position="top-center"
      autoClose={3000}
      theme="dark"
      closeOnClick
      pauseOnHover={false}
    />
    <App />
  </StrictMode>,
);
