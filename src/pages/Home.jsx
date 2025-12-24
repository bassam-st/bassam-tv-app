import WhatsAppButton from "../components/WhatsAppButton";
import { clearAccount } from "../utils/storage";

export default function Home() {
  return (
    <div className="screen">
      <h2>القنوات</h2>
      <button onClick={clearAccount}>تغيير الحساب</button>
      <WhatsAppButton />
    </div>
  );
}
