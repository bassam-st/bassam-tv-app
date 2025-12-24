import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

export default function VideoPlayer({ streamUrl, title }) {
  const videoRef = useRef(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !streamUrl) return;

    setErr("");

    // تنظيف
    video.pause();
    video.removeAttribute("src");
    video.load();

    // iOS/Safari
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = streamUrl;
      video.play().catch(() => {});
      return;
    }

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true
      });

      hls.loadSource(streamUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data?.fatal) {
          setErr("تعذر تشغيل البث. قد يكون الرابط غير صالح أو محمي.");
          try { hls.destroy(); } catch {}
        }
      });

      return () => {
        try { hls.destroy(); } catch {}
      };
    } else {
      setErr("هذا المتصفح لا يدعم HLS.");
    }
  }, [streamUrl]);

  return (
    <div style={{ background: "#000", border: "1px solid #222", borderRadius: 12, overflow: "hidden" }}>
      <div style={{ padding: 10, borderBottom: "1px solid #222" }}>
        <div style={{ fontWeight: 700 }}>{title || "مشغل"}</div>
        {err ? <div style={{ color: "#fca5a5", marginTop: 6 }}>{err}</div> : null}
      </div>

      <video
        ref={videoRef}
        controls
        playsInline
        style={{ width: "100%", background: "#000" }}
      />
    </div>
  );
}
