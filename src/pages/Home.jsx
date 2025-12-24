import { useEffect, useMemo, useState } from "react";
import WhatsAppButton from "../components/WhatsAppButton";
import VideoPlayer from "../components/VideoPlayer";
import { clearAccount, loadAccount } from "../utils/storage";
import { getLiveCategories, getLiveStreams, buildLiveHlsUrl } from "../xtream/xtreamApi";

export default function Home() {
  const acc = loadAccount();

  const [loading, setLoading] = useState(true);
  const [cats, setCats] = useState([]);
  const [streams, setStreams] = useState([]);

  const [catId, setCatId] = useState("all");
  const [q, setQ] = useState("");

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);

        const [c, s] = await Promise.all([
          getLiveCategories(acc),
          getLiveStreams(acc)
        ]);

        if (!alive) return;

        const categories = Array.isArray(c) ? c : [];
        const liveStreams = Array.isArray(s) ? s : [];

        setCats(categories);
        setStreams(liveStreams);

        // اختار أول قناة تلقائيًا
        setSelected(liveStreams[0] || null);
      } catch (e) {
        alert(e?.message || "خطأ في تحميل القنوات");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => { alive = false; };
  }, []);

  const filtered = useMemo(() => {
    let list = streams;

    if (catId !== "all") {
      list = list.filter((x) => String(x.category_id) === String(catId));
    }

    const t = q.trim().toLowerCase();
    if (t) {
      list = list.filter((x) => (x.name || "").toLowerCase().includes(t));
    }

    return list;
  }, [streams, catId, q]);

  const currentUrl = selected ? buildLiveHlsUrl(acc, selected.stream_id) : "";

  const changeAccount = () => {
    clearAccount();
    location.reload();
  };

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: 12, display: "grid", gap: 12 }}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "grid", gap: 6 }}>
          <div style={{ fontWeight: 800, fontSize: 18 }}>القنوات المباشرة</div>
          <div style={{ opacity: 0.7, fontSize: 12 }}>
            {acc?.server} — {acc?.username}
          </div>
        </div>

        <button onClick={changeAccount} style={{ padding: 10, borderRadius: 10, border: "1px solid #222", background: "#111", color: "#fff" }}>
          تغيير بيانات الاشتراك
        </button>
      </div>

      <VideoPlayer streamUrl={currentUrl} title={selected?.name || ""} />

      <div style={{ display: "grid", gap: 10 }}>
        <div style={{ display: "grid", gap: 8, gridTemplateColumns: "1fr 1fr" }}>
          <select
            value={catId}
            onChange={(e) => setCatId(e.target.value)}
            style={{ padding: 10, borderRadius: 10, border: "1px solid #222", background: "#111", color: "#fff" }}
          >
            <option value="all">كل التصنيفات</option>
            {cats.map((c) => (
              <option key={c.category_id} value={c.category_id}>
                {c.category_name}
              </option>
            ))}
          </select>

          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="بحث عن قناة..."
            style={{ padding: 10, borderRadius: 10, border: "1px solid #222", background: "#111", color: "#fff" }}
          />
        </div>

        <div style={{ opacity: 0.7, fontSize: 12 }}>
          {loading ? "جاري التحميل..." : `النتائج: ${filtered.length}`}
        </div>

        <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
          {filtered.map((ch) => (
            <button
              key={ch.stream_id}
              onClick={() => setSelected(ch)}
              style={{
                textAlign: "right",
                padding: 10,
                borderRadius: 12,
                border: "1px solid #222",
                background: selected?.stream_id === ch.stream_id ? "#1f2937" : "#111",
                color: "#fff",
                cursor: "pointer"
              }}
            >
              <div style={{ fontWeight: 800, fontSize: 13 }}>{ch.name}</div>
              <div style={{ opacity: 0.6, fontSize: 11 }}>ID: {ch.stream_id}</div>
            </button>
          ))}
        </div>
      </div>

      <WhatsAppButton />
    </div>
  );
}
