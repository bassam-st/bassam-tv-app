import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

/**
 * بوابة الدخول:
 * - يتأكد من تسجيل الدخول
 * - ينشئ/يحدث سجل المستخدم في Firestore
 * - يتحقق من blocked
 * - يتحقق هل هو admin (موجود في collection admins)
 */
export function useGate() {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    user: null,
    ok: false,
    blocked: false,
    admin: false
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setLoading(true);

      if (!u) {
        setState({ user: null, ok: false, blocked: false, admin: false });
        setLoading(false);
        return;
      }

      try {
        const phone = u.phoneNumber; // مثل +9677xxxxxxx
        const userRef = doc(db, "users", phone);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            phone,
            status: "active",
            createdAt: serverTimestamp(),
            lastLoginAt: serverTimestamp()
          });
        } else {
          await updateDoc(userRef, { lastLoginAt: serverTimestamp() });
        }

        const fresh = await getDoc(userRef);
        const data = fresh.data() || {};
        const isBlocked = data.status === "blocked";

        const adminRef = doc(db, "admins", phone);
        const adminSnap = await getDoc(adminRef);
        const isAdmin = adminSnap.exists();

        setState({
          user: { phone, ...data },
          ok: !isBlocked,
          blocked: isBlocked,
          admin: isAdmin
        });
      } catch (e) {
        // في حالة خطأ قراءة القاعدة: امنع الدخول
        setState({ user: null, ok: false, blocked: true, admin: false });
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  return { loading, ...state };
}
