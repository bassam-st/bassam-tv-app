import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

// تشغيل كونسول داخل الصفحة على الجوال عند فتح الرابط مع ?debug=1
async function enableMobileDebug() {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("debug") === "1") {
      const eruda = (await import("eruda")).default;
      eruda.init();
      console.log("Eruda enabled");
    }
  } catch (e) {
    // تجاهل
  }
}

enableMobileDebug();

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
