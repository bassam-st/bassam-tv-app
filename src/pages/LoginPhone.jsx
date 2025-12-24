import { useState } from "react";
import { sendOtp, confirmOtp } from "../auth/phoneAuth";

export default function LoginPhone() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);

  const send = async () => {
    await sendOtp(phone);
    setStep(2);
  };

  const verify = async () => {
    await confirmOtp(code);
  };

  return (
    <div className="screen">
      <div id="recaptcha-container"></div>
      {step === 1 ? (
        <>
          <input placeholder="+9677..." onChange={e => setPhone(e.target.value)} />
          <button onClick={send}>إرسال الكود</button>
        </>
      ) : (
        <>
          <input placeholder="الكود" onChange={e => setCode(e.target.value)} />
          <button onClick={verify}>تأكيد</button>
        </>
      )}
    </div>
  );
}
