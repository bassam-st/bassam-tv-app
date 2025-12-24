import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";

export function ensureRecaptcha(id = "recaptcha-container") {
  if (window.recaptchaVerifier) return window.recaptchaVerifier;
  window.recaptchaVerifier = new RecaptchaVerifier(auth, id, { size: "invisible" });
  return window.recaptchaVerifier;
}

export async function sendOtp(phone) {
  const verifier = ensureRecaptcha();
  const result = await signInWithPhoneNumber(auth, phone, verifier);
  window.confirmationResult = result;
}

export async function confirmOtp(code) {
  return await window.confirmationResult.confirm(code);
}
