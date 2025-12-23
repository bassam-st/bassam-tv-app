import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import AdminPanel from "../admin/AdminPanel";

export default function Home({ phone, isAdmin }) {
  return (
    <div className="container">
      <div className="card col">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div className="col" style={{ gap: 6 }}>
            <h2>مرحبًا</h2>
            <div className="row">
              <span className="badge">{phone}</span>
              {isAdmin ? <span className="badge ok">Admin</span> : <span className="badge">User</span>}
            </div>
          </div>

          <button className="btn-secondary" onClick={() => signOut(auth)}>
            تسجيل خروج
          </button>
        </div>

        <div className="hr"></div>

        {!isAdmin && (
          <div className="col">
            <h3>واجهة المستخدم</h3>
            <small>
              هنا ستضع واجهة تطبيقك (القنوات/المشغل/الخ).
              الآن ركزنا على تسجيل الدخول + نظام الحظر/الأدمن.
            </small>
          </div>
        )}

        {isAdmin && (
          <div className="col">
            <h3>لوحة الإدارة</h3>
            <small>تستطيع حظر أو فتح أي مستخدم.</small>
            <AdminPanel />
          </div>
        )}
      </div>
    </div>
  );
}
