import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

// تفعيل كونسول الجوال فقط عند ?debug=1
function enableMobileDebug() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("debug") === "1") {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/eruda";
    script.onload = () => {
      window.eruda.init();
      console.log("Eruda enabled");
    };
    document.body.appendChild(script);
  }
}

enableMobileDebug();

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
