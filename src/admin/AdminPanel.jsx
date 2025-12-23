import { useEffect, useMemo, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState("");
  const [busyId, setBusyId] = useState("");

  const load = async () => {
    const snap = await getDocs(collection(db, "users"));
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    list.sort((a, b) => (b.lastLoginAt?.seconds || 0) - (a.lastLoginAt?.seconds || 0));
    setUsers(list);
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const t = q.trim();
    if (!t) return users;
    return users.filter((u) => (u.phone || "").includes(t));
  }, [users, q]);

  const setStatus = async (phone, status) => {
    setBusyId(phone);
    try {
      await updateDoc(doc(db, "users", phone), { status });
      await load();
    } finally {
      setBusyId("");
    }
  };

  return (
    <div className="col">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="بحث برقم الهاتف مثل +967..."
      />

      <div className="col">
        {filtered.map((u) => {
          const isBlocked = u.status === "blocked";
          return (
            <div key={u.id} className="card" style={{ boxShadow: "none" }}>
              <div className="row" style={{ justifyContent: "space-between" }}>
                <div className="col" style={{ gap: 6 }}>
                  <div><b>{u.phone}</b></div>
                  <div className="row">
                    <span className={`badge ${isBlocked ? "bad" : "ok"}`}>
                      {isBlocked ? "Blocked" : "Active"}
                    </span>
                  </div>
                </div>

                <div className="row">
                  <button
                    className="btn"
                    disabled={busyId === u.phone}
                    onClick={() => setStatus(u.phone, "active")}
                  >
                    فتح
                  </button>
                  <button
                    className="btn-danger"
                    disabled={busyId === u.phone}
                    onClick={() => setStatus(u.phone, "blocked")}
                  >
                    حظر
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <small>لا توجد نتائج.</small>
        )}
      </div>
    </div>
  );
}
