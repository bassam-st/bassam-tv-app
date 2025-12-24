import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

export function useGate() {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({ user: null, blocked: false, admin: false });

  useEffect(() => {
    return onAuthStateChanged(auth, async (u) => {
      if (!u) {
        setState({ user: null, blocked: false, admin: false });
        setLoading(false);
        return;
      }

      const phone = u.phoneNumber;
      const ref = doc(db, "users", phone);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        await setDoc(ref, {
          phone,
          status: "active",
          createdAt: serverTimestamp(),
        });
      }

      const fresh = await getDoc(ref);
      const blocked = fresh.data()?.status === "blocked";

      const adminSnap = await getDoc(doc(db, "admins", phone));
      setState({ user: phone, blocked, admin: adminSnap.exists() });
      setLoading(false);
    });
  }, []);

  return { loading, ...state };
}
