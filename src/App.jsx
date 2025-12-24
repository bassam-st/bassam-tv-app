import { useGate } from "./auth/useGate";
import { loadAccount } from "./utils/storage";
import LoginPhone from "./pages/LoginPhone";
import LoginXtream from "./pages/LoginXtream";
import Blocked from "./pages/Blocked";
import Home from "./pages/Home";

export default function App() {
  const gate = useGate();
  const acc = loadAccount();

  if (gate.loading) return <div className="screen">جاري التحميل...</div>;
  if (!gate.user) return <LoginPhone />;
  if (gate.blocked) return <Blocked />;
  if (!acc) return <LoginXtream onDone={() => location.reload()} />;

  return <Home />;
}
