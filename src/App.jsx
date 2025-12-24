import React, { useEffect, useMemo, useState } from "react";
import { useGate } from "./auth/useGate";
import { loadAccount } from "./utils/storage";
import LoginPhone from "./pages/LoginPhone";
import LoginXtream from "./pages/LoginXtream";
import Blocked from "./pages/Blocked";
import Home from "./pages/Home";

function ErrorScreen({ title, error }) {
  return (
    <div style={{ padding: 16, direction: "rtl", fontFamily: "system-ui" }}>
      <h3 style={{ margin: "0 0 8px" }}>{title}</h3>
      <pre
        style={{
          whiteSpace: "pre-wrap",
          background: "#111",
          color: "#fff",
          padding: 12,
          borderRadius: 10,
          overflow: "auto",
        }}
      >
        {String(error?.stack || error?.message || error || "Unknown error")}
      </pre>
    </div>
  );
}

export default function App() {
  const gate = useGate();

  // 1) التقط أي أخطاء غير معالجة واعرضها على الشاشة
  const [fatal, setFatal] = useState(null);
  useEffect(() => {
    const onError = (e) => setFatal(e?.error || e?.message || e);
    const onRej = (e) => setFatal(e?.reason || e);
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRej);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRej);
    };
  }, []);

  // 2) اجعل loadAccount آمن (حتى لو storage خربان)
  const acc = useMemo(() => {
    try {
      return loadAccount();
    } catch (e) {
      setFatal(e);
      return null;
    }
  }, []);

  if (fatal) return <ErrorScreen title="خطأ في تشغيل التطبيق" error={fatal} />;

  if (gate.loading) return <div className="screen">جاري التحميل...</div>;
  if (!gate.user) return <LoginPhone />;
  if (gate.blocked) return <Blocked />;
  if (!acc) return <LoginXtream onDone={() => location.reload()} />;

  return <Home />;
}
