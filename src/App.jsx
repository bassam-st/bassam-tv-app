import { useGate } from "./auth/useGate";
import LoginPhone from "./pages/LoginPhone";
import Blocked from "./pages/Blocked";
import Home from "./pages/Home";

export default function App() {
  const gate = useGate();

  if (gate.loading) {
    return (
      <div className="container">
        <div className="card">جاري التحقق…</div>
      </div>
    );
  }

  if (!gate.user) {
    return <LoginPhone />;
  }

  if (gate.blocked) {
    return <Blocked />;
  }

  return <Home phone={gate.user.phone} isAdmin={gate.admin} />;
}
