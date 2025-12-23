import { useMemo, useState } from "react";
import { sendOtp, confirmOtp } from "../auth/phoneAuth";

function normalizeYemen(phone) {
  // يساعد المستخدم في إدخال رقم يمني بدون +967
  // إذا دخل 77xxxxxxx أو 7xxxxxxxx نحوله إلى +967...
  let p = (phone || "").trim().replace(/\s+/g, "");
  if (!p) return "";

  if (p.startsWith("+")) return p;                 // جاهز E.164
  if (p.startsWith("00967")) return "+" + p.slice(2);
  if (p.startsWith("967")) return "+" + p;

  // لو دخل 7xxxxxxxx أو 77xxxxxxx
  if (/^7\d{8}$/.test(p)) return "+967" + p;
  if (/^0?7\d{8}$/.test(p)) return "+967" + p.replace(/^0/, "");

  // إذا دخل رقم بأي شكل آخر، أرجعه كما هو
  return p;
}

export default function LoginPhone() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState("phone"); // phone | code
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const phoneE164 = useMemo(() => normalizeYemen(phone), [phone]);

  const onSend = async () => {
    setMsg("");
    if (!phoneE164 || !phoneE164.startsWith("+")) {
      setMsg("أدخل رقم صحيح بصيغة +967... أو اكتب رقم يمني يبدأ بـ 7");
      return;
    }
    setBusy(true);
    try {
      await sendOtp(phoneE164);
      setStep("code");
      setMsg("تم إرسال الكود. أدخله الآن.");
    } catch (e) {
      setMsg("فشل إرسال الكود. جرّب مرة أخرى.");
    } finally {
      setBusy(false);
    }
  };

  const onConfirm = async () => {
    setMsg("");
    if (!code.trim()) {
      setMsg("أدخل كود التحقق.");
      return;
    }
    setBusy(true);
    try {
      await confirmOtp(code.trim());
      setMsg("تم تسجيل الدخول بنجاح.");
    } catch (e) {
      setMsg("الكود غير صحيح أو انتهت صلاحيته.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container">
      <div className="card col">
        <h2>تسجيل الدخول</h2>
        <small>أدخل رقم هاتفك للتفعيل عبر SMS (OTP).</small>

        <div id="recaptcha-container"></div>

        {step === "phone" && (
          <>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="مثال: 777123456 أو +967777123456"
              inputMode="tel"
            />
            <button className="btn" onClick={onSend} disabled={busy}>
              {busy ? "جارٍ الإرسال..." : "إرسال الكود"}
            </button>
          </>
        )}

        {step === "code" && (
          <>
            <div className="row">
              <span className="badge">رقمك: {phoneE164}</span>
              <button className="btn-secondary" onClick={() => setStep("phone")} disabled={busy}>
                تغيير الرقم
              </button>
            </div>

            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="أدخل كود SMS"
              inputMode="numeric"
            />
            <button className="btn" onClick={onConfirm} disabled={busy}>
              {busy ? "جارٍ التحقق..." : "تأكيد الكود"}
            </button>
          </>
        )}

        {msg && <div className="badge">{msg}</div>}
      </div>
    </div>
  );
}
