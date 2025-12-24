function cleanServerUrl(url) {
  let u = (url || "").trim();
  if (!u) return "";
  // أضف بروتوكول لو ناقص
  if (!/^https?:\/\//i.test(u)) u = "http://" + u;
  // احذف السلاش الأخير
  u = u.replace(/\/+$/, "");
  return u;
}

export function getAccount() {
  const raw = localStorage.getItem("xtream_account");
  return raw ? JSON.parse(raw) : null;
}

export function buildApiBase(server) {
  return cleanServerUrl(server);
}

export async function apiCall({ server, username, password, action }) {
  const base = buildApiBase(server);
  const url =
    `${base}/player_api.php?username=${encodeURIComponent(username)}` +
    `&password=${encodeURIComponent(password)}` +
    (action ? `&action=${encodeURIComponent(action)}` : "");

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("فشل الاتصال بالمزوّد");
  return await res.json();
}

export async function getLiveCategories(acc) {
  return await apiCall({ ...acc, action: "get_live_categories" });
}

export async function getLiveStreams(acc) {
  return await apiCall({ ...acc, action: "get_live_streams" });
}

/**
 * رابط تشغيل LIVE عبر HLS (الأكثر توافقًا مع Hls.js)
 * كثير من مزوّدي Xtream يدعمون:
 * /live/user/pass/stream_id.m3u8
 */
export function buildLiveHlsUrl(acc, streamId) {
  const base = buildApiBase(acc.server);
  return `${base}/live/${encodeURIComponent(acc.username)}/${encodeURIComponent(
    acc.password
  )}/${streamId}.m3u8`;
}
