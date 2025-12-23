import { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function VideoPlayer({ streamUrl }) {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  const initHls = () => {
    const video = videoRef.current;
    if (!video || !streamUrl) return;

    // تنظيف القديم
    if (hlsRef.current) {
      try { hlsRef.current.destroy(); } catch {}
      hlsRef.current = null;
    }

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hlsRef.current = hls;
      hls.loadSource(streamUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = streamUrl;
      video.play().catch(() => {});
    }
  };

  // تشغيل أول مرة
  useEffect(() => {
    initHls();

    return () => {
      if (hlsRef.current) {
        try { hlsRef.current.destroy(); } catch {}
        hlsRef.current = null;
      }
    };
  }, [streamUrl]);

  // 🔴 إعادة تحميل قسرية كل 20 ثانية
  useEffect(() => {
    const timer = setInterval(() => {
      initHls();
    }, 20000);

    return () => clearInterval(timer);
  }, [streamUrl]);

  return (
    <video
      ref={videoRef}
      controls
      playsInline
      style={{ width: "100%", background: "#000" }}
    />
  );
}
